# 背景音乐资产记录

处理日期：2026-11-15（Asia/Shanghai）。三首音乐由用户通过 **StableAudio** 生成并提供 WAV；模型版本和完整生成参数未另行提供。本文只保留源文件名，不记录下载目录或私人绝对路径。

游戏最终采用 **192kbps MP3、44.1kHz、立体声**，使用包内相对路径加载。三首均从原始 WAV 直接编码，完整保留曲长与原有尾部淡出，没有剪曲、加混响、归一化或去削波处理；原 WAV 未修改。早期 M4A 因平台发布链路的 MIME 兼容问题更换为 MP3，没有使用 AAC 二次转码。

## 最终资产

| 用途 | 用户源文件名 | 游戏资产 | 有效曲长 | 成品大小 |
| --- | --- | --- | ---: | ---: |
| 主曲 | `supported by warm analog pads, restrained cello harmonics, a.wav` | `assets/audio/main_theme.mp3` | 180.000s | 4,321,532B |
| 钟楼悬疑 | `slowly shifting analog textures. Occasional delicate piano h.wav` | `assets/audio/clocktower_tension.mp3` | 90.000s | 2,161,728B |
| 结局 | `gently answered by a lyrical solo cello and soft fingerpicke.wav` | `assets/audio/dawn_ending.mp3` | 90.000s | 2,161,728B |

总成品 **8,644,988B（8.64MB / 8.24MiB）**，低于 10MB。原始 WAV 合计 63,558,156B，不进入游戏包。主曲和悬疑曲供播放器循环衔接；结局曲单次播放。跨场景淡入淡出、广告与后台暂停、续播位置和音量由播放器管理。

## 原始音频检查

以 Python 标准库 `wave/array` 分析完整 16-bit PCM 数据。RMS 是未加权全曲均方根电平，不是 LUFS；峰值为离散样本峰值，不是过采样真峰值。满刻度样本指 int16 的 -32768 或 32767，两声道合计。

| 指标 | 主曲 | 钟楼悬疑 | 结局 |
| --- | ---: | ---: | ---: |
| 原始格式 | 44100Hz / 16-bit / 2声道 | 44100Hz / 16-bit / 2声道 | 44100Hz / 16-bit / 2声道 |
| 有效帧数 | 7,938,000 | 3,969,000 | 3,969,000 |
| 样本峰值 | -0.0003dBFS | 0.0000dBFS | -0.4625dBFS |
| 全曲 RMS | -16.4923dBFS | -12.8305dBFS | -16.4580dBFS |
| 非零样本比例 | 99.9799% | 99.6327% | 99.1029% |
| 满刻度样本数 | 11 | 2,984 | 0 |
| 单声道最长连续满刻度 | 11样本 / 0.249ms | 153样本 / 3.469ms | 0 |
| 开头1秒 RMS | -15.9366dBFS | -9.6573dBFS | -19.3336dBFS |
| 结尾1秒 RMS | -52.2911dBFS | -64.1976dBFS | -96.5128dBFS |

三首都有完整非静音内容和源曲尾部淡出。主曲有少量触顶样本；悬疑源曲有满刻度平台片段，约0.038%样本触顶；结局源曲未检测到触顶。这些是用户源音频已有特征，转码未宣称修复源音削波，也没有据此宣称完整听感无失真。

悬疑曲全曲 RMS 比主曲高约3.66dB。播放器使用较低相对音量可减轻换曲的突兀感；文件本身保持用户提供的原音量关系。

## SHA-256

| 文件 | SHA-256 |
| --- | --- |
| 主曲原 WAV | `db756012affc81cf99fd80045abe5b4aee50632eaa4168bc71414db6175c8134` |
| `main_theme.mp3` | `d180dcc7dd83ee3b64a05ac8ac1f8da6acb1260be8b6373f44c85684e0728b57` |
| 悬疑原 WAV | `80d0047bc3c5e9e6497e101bc2796f822476f5b0070dd7489bf89ff89c30036a` |
| `clocktower_tension.mp3` | `2fd53eef6aa54fa413c2a4c9aad32fe01682c757cd364d3f78570c3799200eb5` |
| 结局原 WAV | `3bc7e3f0e2fff560eadcca5e06166a588773f9558848027d39a2f007ad5564fb` |
| `dawn_ending.mp3` | `6d4ee0bb81b125e5817e633914ffe17f8a123515d92a6c46b96b392dc46e1bb2` |

## 转换工具与命令

编码器为 `ffmpeg version 9.0.2-tessus`，从 [imageio-ffmpeg 0.8.1 官方 PyPI wheel](https://pypi.org/project/imageio-ffmpeg/0.8.1/) 临时提取，没有安装全局或游戏运行时依赖。下载文件 `imageio_ffmpeg-0.8.1-py3-none-macosx_10_13_x86_64.whl` 的 SHA-256 为 `9538a10e598257263b5de1a1c1b86e7603417bc219245b1e279b452e5e48cc20`，已与 PyPI 发布哈希核对；wheel 和二进制在完成后已从临时目录删除。

下列源文件名按实际输入位置解析，输出路径相对项目根目录；这里不保存用户原文件所在目录。

```sh
ffmpeg -hide_banner -loglevel error -y \
  -i 'supported by warm analog pads, restrained cello harmonics, a.wav' \
  -map 0:a:0 -c:a libmp3lame -b:a 192k -ar 44100 -ac 2 \
  -map_metadata -1 -write_xing 1 'assets/audio/main_theme.mp3'

ffmpeg -hide_banner -loglevel error -y \
  -i 'slowly shifting analog textures. Occasional delicate piano h.wav' \
  -map 0:a:0 -c:a libmp3lame -b:a 192k -ar 44100 -ac 2 \
  -map_metadata -1 -write_xing 1 'assets/audio/clocktower_tension.mp3'

ffmpeg -hide_banner -loglevel error -y \
  -i 'gently answered by a lyrical solo cello and soft fingerpicke.wav' \
  -map 0:a:0 -c:a libmp3lame -b:a 192k -ar 44100 -ac 2 \
  -map_metadata -1 -write_xing 1 'assets/audio/dawn_ending.mp3'
```

`-map_metadata -1` 不复制源音附带元数据；`-write_xing 1` 保留解码器识别有效音频长度所需的 MP3 信息。没有设置剪裁、起止时间、音量或动态处理滤镜。

## 完整解码验证

每首编码及完整解码进程退出码均为0。验证命令为 `ffmpeg -hide_banner -loglevel error -i '<成品.mp3>' -map 0:a:0 -f s16le -acodec pcm_s16le -`；PCM输出只进入内存分析，不写入项目。

| 产物 | 回解码有效帧 | 回解码有效时长 | 回解码 RMS |
| --- | ---: | ---: | ---: |
| main_theme.mp3 | 7,938,000 | 180.000s | -16.7567dBFS |
| clocktower_tension.mp3 | 3,969,000 | 90.000s | -13.0953dBFS |
| dawn_ending.mp3 | 3,969,000 | 90.000s | -16.7226dBFS |

三首回解码均为44100Hz双声道、非静音；有效帧数与各自原 WAV 逐帧一致，没有截掉音乐或把编码延迟和尾部填充计入曲长。MP3为有损格式，因此不要求解码PCM与源PCM逐字节相等。

本记录证明文件技术参数和完整解码结果，不把自动检查说成三首完整人工试听、CDN MIME 或浏览器实播验收；线上状态以主工作流发布验证为准。
