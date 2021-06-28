const uaup = require("uaup-js");
const path = require("path");

const updateOptions = {
    gitRepo: "sb4-games-launcher",
    gitUsername: "HoppeDevz",

    versionFile: path.resolve(__dirname, "version.json"),

    appName: "sb4-games",
    appExecutableName: "sb4-games.exe"
}

let isUpdateAvaliblePromise = uaup.CheckForUpdates;

module.exports = {
    updateOptions,
    isUpdateAvaliblePromise
}