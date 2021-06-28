const { shell } = require("electron");
const path = require('path')

function OpenUrlInExternalBrowser(link) {
    shell.openExternal(link)
}

function CreateBrowserWindow(url) {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
    
        resizable: false,
        autoHideMenuBar: true,
    });
  
    win.removeMenu();
    win.loadURL(url);
  }