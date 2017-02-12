//The process that runs package.json’s main script is called the main process. 
//The script that runs in the main process can display a GUI by creating web pages.
const electron = require('electron');
const path = require('path');

electron.app.on('ready', () => {
    let mainWindow = new electron.BrowserWindow({
        height: 650,
        width: 1300,
        icon: path.join(__dirname, 'icon.ico')
    })

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null
    })
 });