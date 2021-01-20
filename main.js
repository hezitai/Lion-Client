const {
    app,
    BrowserWindow
} = require('electron'); //引入electron
// const Stores = require('electron-store');
// const store = new Stores();
// store.set('ipconfig', 'http://127.0.0.1:8080/');
// "mirror": "https://npm.taobao.org/mirrors/electron/"
let win;
let windowConfig = {
    // fullscreen: true,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}; //窗口配置程序运行窗口的大小
function createWindow() {
    win = new BrowserWindow(windowConfig); //创建一个窗口
    win.loadURL(`file://${__dirname}/index.html`); //在窗口内要展示的内容index.html 就是打包生成的index.html
    win.webContents.openDevTools(); //开启调试工具
    // win.webContents.on('did-finish-load', () => {
    //     win.webContents.send('ipconfig', store.get('ipconfig'))
    //         // win.webContents.send('ipconfig', 'http://128.0.0.1:8080')
    // })
    win.on('close', () => {
        //回收BrowserWindow对象
        win = null;
    });
    win.on('resize', () => {
        // win.reload();
    });
    win.maximize()
    win.show()
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit();
});
app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
});