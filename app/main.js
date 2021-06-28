// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcRenderer, BrowserView } = require('electron');
const path = require('path');
const ipcMain = require("electron").ipcMain;

const { updateOptions, isUpdateAvaliblePromise } = require("./lib/update/isUpdateAvalible");

const FiveM_AC = require("./lib/fivem_ac/MainThread");
const GameCounter = require("./lib/game_counter/GameCounter");

ipcMain.on("activate-fivem-anticheat", data => {
  FiveM_AC.start();
});
ipcMain.on("desactive-fivem-anticheat", data => {
  FiveM_AC.stop();
});

ipcMain.on("game-counter-start", (event, game, token, api_adress) => GameCounter.start(30*1000, game, token, api_adress));
ipcMain.on("game-counter-stop", (event, game, token, api_adress) => GameCounter.stop());

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1350,
    height: 720,

    resizable: false,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,

      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function CreateUpdateWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 300,

    resizable: false,
    frame: true,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true

    }
  })

  mainWindow.removeMenu();
  mainWindow.loadFile("./views/update.html");
}

let ChatWindow;

function CreateChatWindow() {
  if (ChatWindow) return ChatWindow.show();

  ChatWindow = new BrowserWindow({
    width: 700,
    height: 500,

    resizable: false,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
 
  // ChatWindow.removeMenu();
  ChatWindow.loadFile("./views/chat.html");

  ChatWindow.on("close", () => ChatWindow = undefined);
}

let AddFriendWindow;
function CreateAddFriendWindow() {
  if (AddFriendWindow) return AddFriendWindow.show();

  AddFriendWindow = new BrowserWindow({
    width: 300,
    height: 500,

    resizable: false,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }

  })

  // AddFriendWindow.removeMenu();
  AddFriendWindow.loadFile("./views/friend.html");

  AddFriendWindow.on("close", () => AddFriendWindow = undefined);
}

let CurrentUserChatting;
ipcMain.on("open-chat-window", function(args, data) {
  CurrentUserChatting = data.target_username;

  CreateChatWindow();
});

ipcMain.on("create-add-friend-window", function(args, data) {

  CreateAddFriendWindow();
})

ipcMain.handle("request-current-chating-user", (event, args) => CurrentUserChatting);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  let isUpdateAvalible = await isUpdateAvaliblePromise(updateOptions);
  console.log(isUpdateAvalible);
  
  if (!isUpdateAvalible) {
    createWindow();
    //CreateLoginWindow();

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
  } else {
    CreateUpdateWindow();
  }
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
