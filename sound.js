// Author-supplied Stable Audio scores. Ad/background pauses preserve position.
// No procedural score or rain is mixed beneath these recordings.
export const TRACKS = {
  main: { src:'assets/audio/main_theme.m4a', volume:0.35, loop:true },
  clocktower: { src:'assets/audio/clocktower_tension.m4a', volume:0.23, loop:true },
  dawn: { src:'assets/audio/dawn_ending.m4a', volume:0.35, loop:false },
};

export function trackForScene(scene) {
  return scene === 'dawn' ? 'dawn' : scene === 'clocktower' ? 'clocktower' : 'main';
}

function browserAudio(src,key) {
  const audio = new Audio(new URL(src,import.meta.url).href);
  audio.dataset.bgm = key;
  audio.hidden = true;
  document.body.append(audio);
  return audio;
}

export function createSoundPlayer({
  createAudio = browserAudio,
  now = () => performance.now(),
  requestFrame = callback => requestAnimationFrame(callback),
  cancelFrame = handle => cancelAnimationFrame(handle),
  fadeDuration = 1100,
} = {}) {
  const players = new Map();
  let scene = 'cover';
  let current = null;
  let musicOn = false;
  let frame = null;
  let transition = 0;
  let dawnVisit = 0;
  let startedDawnVisit = -1;

  function cancelFade() {
    transition++;
    if (frame !== null) cancelFrame(frame);
    frame = null;
  }

  function getPlayer(key) {
    if (!players.has(key)) {
      const audio = createAudio(TRACKS[key].src,key);
      audio.loop = TRACKS[key].loop;
      audio.volume = 0;
      audio.preload = 'metadata';
      players.set(key,audio);
    }
    return players.get(key);
  }

  function fadeTo(key,duration) {
    cancelFade();
    const version = transition;
    const started = now();
    const from = new Map([...players].map(([id,audio]) => [id,audio.volume]));
    const tick = () => {
      if (!musicOn || version !== transition) return;
      const amount = Math.min(1,Math.max(0,(now() - started) / Math.max(1,duration)));
      for (const [id,audio] of players) {
        const target = id === key ? TRACKS[id].volume : 0;
        audio.volume = Math.max(0,Math.min(1,(from.get(id) || 0) + (target - (from.get(id) || 0)) * amount));
        if (amount === 1 && id !== key) audio.pause();
      }
      frame = amount < 1 ? requestFrame(tick) : null;
    };
    frame = requestFrame(tick);
  }

  async function activate() {
    if (!musicOn) return false;
    const key = trackForScene(scene);
    const changed = key !== current;
    const audio = getPlayer(key);
    const freshDawn = key === 'dawn' && startedDawnVisit !== dawnVisit;
    if (!changed && !audio.paused && !freshDawn) return true;
    // The epilogue plays once per visit, including after background/ad pauses.
    if (!changed && audio.ended && !audio.loop && !freshDawn) return true;
    if (freshDawn) { audio.currentTime = 0; startedDawnVisit = dawnVisit; }
    current = key;
    let operation = transition;
    try {
      // Keep play() in the original user gesture for mobile autoplay policies.
      const playing = audio.play();
      fadeTo(key,changed ? fadeDuration : Math.min(fadeDuration,600));
      operation = transition;
      await playing;
      if (!musicOn || current !== key || transition !== operation) {
        if (!musicOn || current !== key) { audio.pause(); audio.volume = 0; }
        return false;
      }
      return true;
    } catch {
      if (operation === transition && current === key && musicOn) {
        cancelFade();
        for (const player of players.values()) { player.pause(); player.volume = 0; }
      }
      // Failed or blocked audio must never interrupt the story.
      return false;
    }
  }

  return {
    get musicOn() { return musicOn; },
    setScene(value) {
      if (trackForScene(value) === 'dawn' && trackForScene(scene) !== 'dawn') dawnVisit++;
      scene = value;
      if (musicOn) void activate();
    },
    start(enabled = true) {
      if (!enabled) { this.stop(); return Promise.resolve(false); }
      musicOn = true;
      return activate();
    },
    stop() {
      musicOn = false;
      cancelFade();
      for (const audio of players.values()) { audio.pause(); audio.volume = 0; }
    },
  };
}

export const sound = createSoundPlayer();
