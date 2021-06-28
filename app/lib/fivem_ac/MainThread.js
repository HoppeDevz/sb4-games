const psList = require("ps-list");
const axios = require("axios");
const screenshot = require('screenshot-desktop');
const ps = require("ps-node");
const dialog = require("electron").dialog;

let processes = [];
let cache = {};
let self_ip = "127.0.0.1";

let ProcessesListThreadTimeout = 2*1000;
let NetWorkStatusThreadTimeout = 2*1000;
let CheatEngineProcessThreadTimeout = 2*1000;
let ProcessHackerProcessThreadTimeout = 2*1000;

let ProcessesListThreadInterval;
let NetWorkStatusThreadInterval;
let CheatEngineProcessThreadInterval;
let ProcessHackerProcessThreadInterval;

let WebHook = "https://discord.com/api/webhooks/836657650258149416/PRF8RwC6Fg5aYFBkftyjBLf3pOz03aQof17pMVH_diFKlLsynJaWlxMY8UeGMClABS__";

function ForceCloseFivem() {
    let processesList = psList();
    for (let process of processesList) {
        if (process.name == "FiveM.exe") {
            ps.kill(parseInt(process.pid));
            dialog.showErrorBox("Erro de conexão", "Você perdeu a conexão com a internet, por isso seu FiveM foi fechado!");
        }
    }
}

class AntiCheatThread {

    constructor() {
        this.antiCheatEnabled = false;
    }
    

    SelfIpThread() {
        axios.get("https://api.my-ip.io/ip")
        .then(response => self_ip = response.data);
    }

    ProcessesListThread() {
        ProcessesListThreadInterval = setInterval(async () => processes = await psList(), ProcessesListThreadTimeout);
    }

    NetWorkStatusThread() {
        function CheckConnection() {
            axios.get("https://www.google.com").catch(err => {
                console.log("NETWORK TIMEOUT");
                ForceCloseFivem();
            });
        }
        NetWorkStatusThreadInterval = setInterval(() => CheckConnection(), NetWorkStatusThreadTimeout)
    }

    CheatEngineProcessThread() {
        CheatEngineProcessThreadInterval = setInterval(() => {

        for (let process of processes) {
            if (process.name.toLowerCase().search("cheatengine") > -1 && !cache["cheatengine"]) {
                cache["cheatengine"] = true;

                //send log;
                axios.post(WebHook, {
                    content: `SALVE FAMÍLIA, POSSO SER ADM?\nO CORNÃO AQUI TA USANDO CHEAT ENGINE\nIP PARA DERRUBAR A NET DELE -> ${self_ip}\n${url}`,
                
                });

                /*screenshot().then(img => {
                    let base64 = img.toString("base64");

                    axios.post("https://api.imgur.com/3/upload", {
                        image: base64,
                        type: "base64"
                    })
                    .then(response => {
                        let url = response.data.data.link;

                        //send to server;
                        axios.post(WebHook, {
                            content: `SALVE FAMÍLIA, POSSO SER ADM?\nO CORNÃO AQUI TA USANDO CHEAT ENGINE\nIP PARA DERRUBAR A NET DELE -> ${self_ip}\n${url}`,
                        
                        });
                    })
                    .catch(err => {
                        //send to server;
                        axios.post(WebHook, {
                            content: `SALVE FAMÍLIA, POSSO SER ADM?\nO CORNÃO AQUI TA USANDO CHEAT ENGINE\nIP PARA DERRUBAR A NET DELE -> ${self_ip}\n`,
                        
                        });
                    })

                });*/
            }
        }

        }, CheatEngineProcessThreadTimeout);
    }

    ProcessHackerProcessThread() {
        ProcessHackerProcessThreadInterval = setInterval(() => {

            for (let process of processes) {
                if (process.name.toLowerCase().search("processhacker") > -1 && !cache["processhacker"]) {
                    cache["processhacker"] = true;

                    //send log;
                    axios.post(WebHook, {
                        content: `SALVE FAMÍLIA, POSSO SER ADM?\nO CORNÃO AQUI TA USANDO PROCESS HACKER\nIP PARA DERRUBAR A NET DELE -> ${self_ip}\n`
                    });
                }
            }
    
        }, ProcessHackerProcessThreadTimeout);
    }

    start() {
        if (this.antiCheatEnabled) return;
        this.antiCheatEnabled = true;
        console.log("ACTIVATE FIVEM ANTI-CHEAT HANDLER");

        this.ProcessesListThread();
        this.NetWorkStatusThread();

        this.CheatEngineProcessThread();
        this.ProcessHackerProcessThread();
        this.SelfIpThread();
    }

    stop() {
        if (!this.antiCheatEnabled) return;
        this.antiCheatEnabled = false;
        console.log("DESACTIVE FIVEM ANTI-CHEAT HANDLER");

        clearInterval(ProcessesListThreadInterval);
        clearInterval(NetWorkStatusThreadInterval);
        clearInterval(CheatEngineProcessThreadInterval);
        clearInterval(ProcessHackerProcessThreadInterval);
    }
}

module.exports = new AntiCheatThread();