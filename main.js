'use strict';

const expressApp = require('./app')
expressApp.listen(3000, '127.0.0.1')

const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow


let mainWindow

app.disableHardwareAcceleration();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 1280, height: 720})
    mainWindow.loadURL('http://127.0.0.1:3000')

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

