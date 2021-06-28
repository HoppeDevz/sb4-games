const { remote } = require("electron");

const TopBarHandlerCloseWindow = () => {
    remote.getCurrentWindow.close();
}

const TopBarHandlerMinimizeWindow = () => {
    remote.getCurrentWindow.minimize();
}
