# IFTTT + Telegram 调整灯光解决方案
其实只是自己新买了一个 Yeelight 灯，但是米家 app 太蠢了，就想到用 IFTTT + Telegram 来完成控制灯具的操作。

基本上就是自己写着好玩 + 调试快为目标……

## 安装 + 配置
```
git clone https://github.com/Astrian/telegram-appliance-manager
cd telegram-appliance-manager
cp config.sample.json config.json
vi config.json
npm install
npm install pm2 --global
npm start
```

记得去 [IFTTT](https://ifttt.com) 设置你的灯具 applet。
