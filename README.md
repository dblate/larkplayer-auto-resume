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
    <video id="my-video" src="https://baikebcs.bdimg.com/baike-other/big-buck-bunny.mp4" width="400" height="300" muted controls></video>

    <script type="text/javascript" src="https://unpkg.com/larkplayer@latest/dist/larkplayer.js"></script>
    <script type="text/javascript" src="https://unpkg.com/larkplayer-auto-resume@latest/dist/index.js"></script>
    <script type="text/javascript">
        var width = Math.min(document.body.clientWidth, 640);
        var player = larkplayer('my-video', {
            width: width,
            height: width * 9 / 16,
            plugin: {
                autoResume: {
                    key: function (src) {
                        return src.replace('https://', '');
                    },
                    minPlayed: 5,
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
