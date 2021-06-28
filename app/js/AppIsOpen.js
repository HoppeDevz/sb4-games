const psList = require("ps-list");

let processes_running = [];

setInterval(async () => {
    processes_running = await psList();

    // console.log('processes_running', processes_running);
}, 2000);

function GetIfAppIsOpen(name) {
    let opened = false;

    for (let app of processes_running) {
        if (app.name == name) {
            opened = true;
        }
    }

    return opened;
}