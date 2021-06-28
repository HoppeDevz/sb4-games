const uaup = require("uaup-js");

const defaultStages = {
    Checking: "Verificando atualizações!", // When Checking For Updates.
    Found: "Atualização encontrada!",  // If an Update is Found.
    NotFound: "Nenhuma atualização encontrada.", // If an Update is Not Found.
    Downloading: "Baixando...", // When Downloading Update.
    Unzipping: "Instalando...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizando...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Iniciando..." // When Launching the Application.
};

const updateOptions = {
    gitRepo: "sb4-games-launcher",
    gitUsername: "HoppeDevz",

    appName: "sb4-games",
    appExecutableName: "sb4-games.exe",

    progressBar: document.getElementById("download"),
    label: document.getElementById("download-label"),
    stageTitles: defaultStages
}

uaup.Update(updateOptions);
