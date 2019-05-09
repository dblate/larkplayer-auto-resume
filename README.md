# larkplayer-auto-resume

[larkplayer](https://github.com/dblate/larkplayer) 断点续播插件

## 下载

NPM
```bash
npm install larkplayer-auto-resume
```

CDN
```
<script type="text/javascript" src="https://unpkg.com/larkplayer-auto-resume@latest/dist/index.js"></script>
```

## 使用

#### script
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>larkplayer test</title>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no">
</head>
<body>
    <video id="my-video" src="https://baikebcs.bdimg.com/baike-other/big-buck-bunny.mp4?t=1535099738866" width="400" height="300" muted controls></video>

    <script type="text/javascript" src="https://unpkg.com/larkplayer@latest/dist/larkplayer.js"></script>
    <script type="text/javascript" src="https://unpkg.com/larkplayer-auto-resume@latest/dist/index.js"></script>
    <script type="text/javascript">
        var width = Math.min(document.body.clientWidth, 640);
        var player = larkplayer('my-video', {
            width: width,
            height: width * 9 / 16,
            plugin: {
                // 设置插件参数
                autoResume: {
                    // 标记已播放过的视频的 key，默认为视频 src
                    // 考虑到相同的视频可能 src 并不完全相等，因此提供此函数，使用者可以自己设置相对稳定的 key 值
                    // 该函数在每次播放时均会调用
                    key: function (src) {
                        var result = src;
                        var match = src.match(/\/([\w\-]+)\.mp4/);
                        if (match && match.length) {
                            // 'big-buck-bunny'
                            result = match[1];
                        }
                        
                        return result;
                    },
                    // 最小播放时长，默认为 0s，当上次播放时长大于此值时才会启用自动续播的策略
                    minPlayed: 5,
                    // 最大播放时长，默认为视频总时长 - 5s，可为正数或负数
                    //             - 为正数时，即为最大播放时长，上次播放时长小于此值时才会启用自动续播策略
                    //             - 为负数时，表示距离视频总时长的秒数
                    maxPlayed: -5
                }
            }
        });
    </script>
</body>
</html>
```

#### modular
```javascript
import larkplayer from 'larkplayer';
import 'larkplayer-auto-resume';

const player = larkplayer('video-el-id', {
  width: 480,
  height: 270,
  plugin: {
    autoResume: {
      key: src => src.replace('https://', ''),
      minPlayed: 5,
      maxPlayed: -5
    }
  }
});
```
