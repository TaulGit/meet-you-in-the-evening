# 背景音乐资产记录

处理日期：2026-11-15（Asia/Shanghai）。来源为用户通过 **StableAudio** 生成并提供的三首 WAV；模型版本及完整生成参数未另行提供。下表仅保留用户文件名，不记录下载目录或私人绝对路径。

三首均保留完整曲长、原有淡出、44.1kHz 采样率和立体声，不剪曲、不加混响、不做响度归一化或去削波处理；原始 WAV 未修改。使用 macOS 系统 `afconvert` 转为约 192kbps AAC，M4A 容器；`afinfo` 显示产物为 optimized。

## 用途和体积

| 游戏用途 | 用户源文件名 | 游戏资产 | 时长 | 采样率 / 声道 | 成品大小 |
| --- | --- | --- | ---: | --- | ---: |
| 主曲 | `supported by warm analog pads, restrained cello harmonics, a.wav` | `assets/audio/main_theme.m4a` | 180.000s | 44100Hz / 2 | 4,358,523B |
| 钟楼悬疑 | `slowly shifting analog textures. Occasional delicate piano h.wav` | `assets/audio/clocktower_tension.m4a` | 90.000s | 44100Hz / 2 | 2,182,323B |
| 结局 | `gently answered by a lyrical solo cello and soft fingerpicke.wav` | `assets/audio/dawn_ending.m4a` | 90.000s | 44100Hz / 2 | 2,182,226B |

总成品 **8,723,072B（8.72MB / 8.32MiB）**，低于 10MB。三份原始 WAV 合计 63,558,156B，未打入游戏发布包。

主曲和悬疑曲保留源曲尾淡出，供播放器循环衔接；结局曲按完整单次播放使用。循环、跨场景淡入淡出、广告暂停和音量控制由播放器实现，本次文件处理没有添加循环片段或改写编曲。

## 原始音频检查

以 Python 标准库 `wave/array` 对完整 16-bit PCM 数据分析。RMS 是未加权全曲均方根电平，**不是 LUFS**；峰值为离散样本峰值，**不是过采样真峰值**。满刻度样本指 int16 的 -32768 或 32767，两声道合计。

| 指标 | 主曲 | 钟楼悬疑 | 结局 |
| --- | ---: | ---: | ---: |
| 原始格式 | 16-bit PCM stereo | 16-bit PCM stereo | 16-bit PCM stereo |
| 有效帧数 | 7,938,000 | 3,969,000 | 3,969,000 |
| 样本峰值 | -0.0003dBFS | 0.0000dBFS | -0.4625dBFS |
| 全曲 RMS | -16.4923dBFS | -12.8305dBFS | -16.4580dBFS |
| 非零样本比例 | 99.9799% | 99.6327% | 99.1029% |
| 满刻度样本数 | 11 | 2,984 | 0 |
| 单声道最长连续满刻度 | 11 样本 / 0.249ms | 153 样本 / 3.469ms | 0 |
| 开头 1 秒 RMS | -15.9366dBFS | -9.6573dBFS | -19.3336dBFS |
| 结尾 1 秒 RMS | -52.2911dBFS | -64.1976dBFS | -96.5128dBFS |

三首都有完整非静音音乐内容，原有尾部淡出已经保留。主曲存在少量触顶样本；悬疑源曲存在较明显的满刻度平台片段，约 0.038% 样本触顶；结局源曲未检测到触顶样本。这是用户源音频已有的特征，AAC 转码不会修复源音的削波，也没有据此宣称完整听感无失真。

悬疑曲全曲 RMS 比主曲约高 3.66dB。作为背景音乐混合时，播放器可将其相对增益设为主曲的约 0.65，以减少换曲的突兀音量变化；本次产物保持用户提供的原音量关系，最终混音增益由播放器决定。

## SHA-256

| 文件 | SHA-256 |
| --- | --- |
| 主曲原 WAV | `db756012affc81cf99fd80045abe5b4aee50632eaa4168bc71414db6175c8134` |
| 主曲 `main_theme.m4a` | `b831f57dbddd7b080aa32bf88736c4b88c6c42209f9361e80b62a86431c24d2c` |
| 悬疑原 WAV | `80d0047bc3c5e9e6497e101bc2796f822476f5b0070dd7489bf89ff89c30036a` |
| 悬疑 `clocktower_tension.m4a` | `310446fe10bbeef13ef18904baddf8a5d183fd8e7c3532c86865567146798416` |
| 结局原 WAV | `3bc7e3f0e2fff560eadcca5e06166a588773f9558848027d39a2f007ad5564fb` |
| 结局 `dawn_ending.m4a` | `87899f521f2860618c2f4ab031947e4dad89ed175aea300004fb43da37a0f50d` |

## 转换命令

工具为 macOS `/usr/bin/afconvert`，帮助输出版本 2.0。下列源文件名按实际输入路径解析，输出路径相对项目根目录；这里不保存用户原文件所在目录。

```sh
afconvert -f m4af -d aac@44100 -c 2 -b 192000 -q 127 -s 0 \
  'supported by warm analog pads, restrained cello harmonics, a.wav' \
  'assets/audio/main_theme.m4a'

afconvert -f m4af -d aac@44100 -c 2 -b 192000 -q 127 -s 0 \
  'slowly shifting analog textures. Occasional delicate piano h.wav' \
  'assets/audio/clocktower_tension.m4a'

afconvert -f m4af -d aac@44100 -c 2 -b 192000 -q 127 -s 0 \
  'gently answered by a lyrical solo cello and soft fingerpicke.wav' \
  'assets/audio/dawn_ending.m4a'
```

参数 `-s 0` 为 CBR，`-b 192000` 为双声道总码率，`-q 127` 为编码质量。未指定截取 offset、重采样到更低频率或声道混缩。

## 解码验证

每个成品均通过 `afinfo` 检查，并用 `afconvert -f WAVE -d LEI16 '<成品.m4a>' '<临时验证.wav>'` **完整解码**。解码进程退出码均为 0，输出有效帧数分别为 7,938,000 / 3,969,000 / 3,969,000，采样率均为 44100Hz、双声道，时长与源文件逐帧一致，无首尾截断。AAC priming/remainder 信息由 M4A 正确保留，未计入有效曲长。

三首 PCM16 回解码 RMS 分别为 -16.4985 / -12.8376 / -16.4629dBFS，与源音接近且非静音。因 AAC 是有损格式，解码 PCM 不与源 WAV 做逐字节相等判断。临时解码 WAV 使用系统临时目录，验证后已删除。

本记录证明文件可完整解码及技术参数符合预期；未将自动检测说成三首完整人工试听或浏览器实际播放验收。
