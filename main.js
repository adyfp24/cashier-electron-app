'use strict';

// Start Express
const expressApp = require('./app')
expressApp.listen(3000, '127.0.0.1')

// Electron
const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

// Not to be a target of GC, mainWindow is declared as a global variable
let mainWindow

// Exit the app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// After finishing initialization of Electron, start the app
app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600})
    mainWindow.loadURL('http://127.0.0.1:3000')

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})




// const { app, BrowserWindow } = require('electron'); function createWindow() {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//         },
//     }); win.loadFile('index.html');
// } app.whenReady().then(createWindow);


// const electron = require('electron');
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;

// const path = require('path');
// const isDev = require("electron-is-dev");
// const server = require('./server/index');

// let mainWindow;

// function createWindow() {
    
//     mainWindow = new BrowserWindow({ width: 1024, height: 800, webPreferences: { nodeIntegration: true } });

    
//     const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`

//     mainWindow.loadURL(startUrl);
    
//     if (isDev) {
//         mainWindow.webContents.openDevTools();
//     }

//     mainWindow.on('closed', function () {
   
//         mainWindow = null
//     })
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', function () {
    
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
//     server.close(() => {
//         console.log('Closed out remaining connections');
//         process.exit(0);
//     });
// });

// app.on('activate', function () {
//     if (mainWindow === null) {
//         createWindow()
//     }
// });