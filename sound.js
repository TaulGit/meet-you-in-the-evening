// Original generative score: slow felt-piano voicings and a filtered rain bed.
// All sound is synthesized locally after an explicit player gesture.
export const sound = {
  context: null, master: null, musicOn: false, timer: null, rain: null, step: 0,
  async start(enabled = true) {
    this.musicOn = enabled;
    if (!enabled) { this.stop(); return; }
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      if (!this.context) {
        this.context = new Context();
        this.master = this.context.createGain(); this.master.gain.value = 0.2;
        this.master.connect(this.context.destination);
        const length = this.context.sampleRate * 3;
        const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < length; i++) { last = (last + (Math.random() * 2 - 1) * 0.025) / 1.015; data[i] = last; }
        this.rain = this.context.createBufferSource(); this.rain.buffer = buffer; this.rain.loop = true;
        const filter = this.context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1700;
        const gain = this.context.createGain(); gain.gain.value = 0.28;
        this.rain.connect(filter).connect(gain).connect(this.master); this.rain.start();
      }
      await this.context.resume();
      this.master.gain.setTargetAtTime(0.2, this.context.currentTime, 0.6);
      if (!this.timer) { this.playStep(); this.timer = setInterval(() => this.playStep(), 790); }
    } catch { /* Audio may be unavailable; reading remains fully usable. */ }
  },
  playStep() {
    if (!this.context || !this.musicOn || document.hidden) return;
    const chords = [[50,57,62,65,69,74,69,65], [46,53,58,62,65,70,65,62], [53,60,65,69,72,77,72,69], [48,55,60,64,67,72,67,64]];
    const notes = chords[Math.floor(this.step / 8) % chords.length];
    this.note(notes[this.step % 8], 0.15, 2.8);
    if (this.step % 8 === 0) this.note(notes[0] - 12, 0.13, 4.2);
    this.step++;
  },
  note(midi, volume = 0.1, duration = 2) {
    const t = this.context.currentTime;
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    for (const [multiple, amount] of [[1,1],[2,0.26],[3,0.08]]) {
      const osc = this.context.createOscillator(); osc.type = 'sine'; osc.frequency.value = frequency * multiple;
      const gain = this.context.createGain(); gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume * amount, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration / (multiple ** 0.3));
      osc.connect(gain).connect(this.master); osc.start(t); osc.stop(t + duration);
    }
  },
  stop() {
    this.musicOn = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (this.context && this.master) this.master.gain.setTargetAtTime(0, this.context.currentTime, 0.2);
  },
  memory() { if (this.context && this.musicOn) { this.note(81, 0.06, 1.5); setTimeout(() => this.note(86, 0.045, 1.7), 160); } }
};
