let AppOpenedStatus = false;

const GameSectionComponent = ({ GameName, ProcessName }) =>  {

    const[AppOpened, SetAppOpened] = useState(false);
    const[GameNotices, SetGameNotices] = useState([
      {
        imageURL: "./assets/game_imgs/notice00.PNG",
        description: "Nova concessionária permite fazer test-drive no carro!",
        author: "Gabriel Hoppe",
        created_at: "2021-04-06T12:42:22.000Z"
      },

      {
        imageURL: "./assets/game_imgs/notice01.PNG",
        description: "Novo barbeiro, com design e layout novos!",
        author: "Gabriel Hoppe",
        created_at: "2021-04-06T12:42:22.000Z"
      },

      {
        imageURL: "./assets/game_imgs/notice02.PNG",
        description: "Novo banco, com design e layout novos!",
        author: "Gabriel Hoppe",
        created_at: "2021-04-06T12:42:22.000Z"
      }
    ])

    // VERIFY IF APP IS OPEN
    useEffect(() => {

      GET_GAME_NOTICES(GameName).then(response => {
        console.log(response.data.games);
        SetGameNotices(response.data.games);
      });
      
    }, [GameName]);

    useEffect(() => {
      setInterval(() => {
        let opened = GetIfAppIsOpen(ProcessName);
        let token = localStorage.getItem("jwt_token");

        if (opened) {
          const ipcRenderer = require("electron").ipcRenderer;

          let literal_table = { "game00": "Complexo Paulista RP", "game01": "Evolution PVP" };
          let current_game_playing = localStorage.getItem("current_game_playing");

          if (!current_game_playing) {
            localStorage.setItem("current_game_playing", "game00");
          }

          ipcRenderer.send("game-counter-start", literal_table[current_game_playing], token, ACCOUNTS_API_ADRESS);
        } else {
          const ipcRenderer = require("electron").ipcRenderer;
          ipcRenderer.send("game-counter-stop");
        }

        if (AppOpenedStatus == false && opened == true) {
          const ipcRenderer = require("electron").ipcRenderer;
          ipcRenderer.send("activate-fivem-anticheat");
          
        }
        if (AppOpenedStatus == true && opened == false) {
          let ipcRenderer = require("electron").ipcRenderer;
          ipcRenderer.send("desactive-fivem-anticheat");
        }

        SetAppOpened(opened);
        AppOpenedStatus = opened;
      }, 2000);
    }, [GameName]);

    function OpenLinkInBrowser(link, external_browser) {
      console.log('OpenLinkInBrowser', link);
      
      if (external_browser) {
        OpenUrlInExternalBrowser(link);
      } else {
        CreateBrowserWindow(link);
      }
      
    }

    async function OpenAppHandler(game) {

      localStorage.setItem("current_game_playing", game);

      let exec = require("child_process").exec;
      let os = require("os");
      let fs = require("fs");


      try {
        let defaultDir = `C:\\Users\\${os.userInfo().username}\\AppData\\Local\\FiveM`;
        fs.readdirSync(defaultDir);

        // exec file
        exec(`start "${defaultDir}\\FiveM.exe"`, { shell: "powershell.exe" });
        //exec("start fivem://connect/jogar.complexopaulista.com.br", { shell: "powershell.exe" });

      } catch(err) {

        try {
          let storageDir = localStorage.getItem("game00-dir");
          fs.readdirSync(storageDir);

          // exec file
          exec(`start "${storageDir}\\FiveM.exe"`, { shell: "powershell.exe" });
          //exec("start fivem://connect/jogar.complexopaulista.com.br", { shell: "powershell.exe" });

        } catch(err) {
          var { dialog } = require("electron").remote;

          dialog.showOpenDialog({
            title: "Selecione a pasta do FiveM",
            properties: ['openDirectory']
          }).then((data) => {
            let dir = data.filePaths[0];
            let files = fs.readdirSync(dir);


            if ( files.includes("FiveM.exe") ) {
              localStorage.setItem("game00-dir", dir);
            } else {
              dialog.showErrorBox("Erro", "Arquivo FiveM.exe não encontrado!");
            }
          });
        }
        
      }

      /*exec(`start C:\\Users\\${os.userInfo().username}\\AppData\\Local\\FiveM\\FiveM.exe`, (err, stdout) => {
        if (err) {
          throw err;
        }
      });*/
    }

    return(
      <React.Fragment>
        {GameName == "game00" ?
          <div className="game00-section-container">

            <div className="left-container">
              <img className="game-img-banner" src="./assets/games_banner/game00.png" />

              <span className="server-adress">jogar.complexopaulista.com.br</span>

              <div className="game-links-container">
                <span onClick={() => OpenLinkInBrowser("https://loja.complexopaulista.com.br/", false)}><img src="./assets/cart.png" /> Loja</span>
                <span onClick={() => OpenLinkInBrowser("https://discord.gg/cprp", true)}><img src="./assets/discord.png" /> Discord</span>
                <span onClick={() => OpenLinkInBrowser("https://complexopaulista.com.br", true)}><img src="./assets/website.png" /> Site</span>
              </div>

              <div className="game-play-button-container">
                {AppOpened ?
                <a><button disabled>JOGANDO</button></a>
                : 
                <a>
                {/*<a href="fivem://connect/jogar.complexopaulista.com.br"></a>*/}
                  <button onClick={() => OpenAppHandler(GameName)}>JOGAR</button>
                </a>
                }
                <span className="first-span">Versão: 3.0</span>
                <span>Gamebuild: 2189</span>
              </div>

            </div>

            <div className="rigth-container">

              <div className="game-resume">

                <div className="about-server-img"></div>

                <h1>RESUMO</h1>

                <h2>Sobre o CPRP</h2>
                <p>
                  O nosso servidor de roleplay conta com varias atualizações semanais para melhorar a qualidade do roleplay.<br></br>
                  Estamos sempre otimizando nossos scripts para diminuir o peso da cidade em seu computador!<br></br>
                  Além disso, temos vários diferenciais, carros mods totalmente bem feitos e leves, casas remodeladas, mapas modificados, e scripts totalmente inéditos! <br></br>
                  Atualmente estamos na SEASON 3 e vamos focar para que as próximas temporadas sejam tão inesquecíveis como a atual.
                </p>
              </div>

              <div className="game-notices">

                {GameNotices.map((notice, index) => {
                  console.log(notice.created_at);

                  return(
                    <div key={index} className="notice-container">
                      <div className="notice-img" style={{
                        backgroundImage: `url(${notice.imageURL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}></div>
                      <h1>NOVIDADE</h1>
                      <p className="notice-description">{notice.description}</p>

                      <p className="notice-footer-timestamp">{notice.author} {notice.created_at.split("T")[0]}</p>
                    </div>
                  )
                })}

                {/*<div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice00.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>Nova concessionária permite fazer test-drive no carro!</p>
                </div>

                <div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice01.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>Novo barbeiro, com design e layout novos!</p>
                </div>

                <div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice02.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>Novo banco, com design e layout novos!</p>
                </div>*/}

              </div>

            </div>

            <UserAccountComponent />
          </div>
        :null}


        {GameName == "game01" ?
          <div className="game01-section-container">

            <div className="left-container">
              <img className="game-img-banner" src="./assets/games_banner/game01.png" />

              <span className="server-adress">jogar.evolutionpvp.com.br</span>

              <div className="game-links-container">
                <span><img src="./assets/cart.png" /> Loja</span>
                <span onClick={() => OpenLinkInBrowser("https://discord.gg/ecS9xFgXUa", true)}><img src="./assets/discord.png" /> Discord</span>
                <span onClick={() => OpenLinkInBrowser("https://complexopaulista.com.br", true)}><img src="./assets/website.png" /> Site</span>
              </div>

              <div className="game-play-button-container">
                {AppOpened ?
                <a><button disabled>JOGANDO</button></a>
                : 
                <a><button onClick={() => OpenAppHandler(GameName)}>JOGAR</button></a>
                }
                <span className="first-span">Versão: 1.0</span>
                <span>Gamebuild: 2189</span>
              </div>

            </div>

            <div className="rigth-container">

              <div className="game-resume">

                <div className="about-server-img"></div>

                <h1>RESUMO</h1>

                <h2>Sobre o EVOLUTION-PVP</h2>
                <p>
                  Gosta de trocar tiro no GTA? Então vem pro nosso servidor de PVP!<br></br>
                  Estamos sempre otimizando nossos scripts para sua maior performance no server!<br></br>
                  Além disso, o nosso servidor de PVP foi criado do zero, assim, todos os scripts são totalmente inéditos<br></br>
                  Algumas das coisas inéditas são por exemplo: Ranking Global, Sistema de KDA, KillFeed etc...
                </p>
              </div>

              <div className="game-notices">

                {GameNotices.map((notice, index) => {
                  console.log(notice.created_at);

                  return(
                    <div key={index} className="notice-container">
                      <div className="notice-img" style={{
                        backgroundImage: `url(${notice.imageURL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}></div>
                      <h1>NOVIDADE</h1>
                      <p className="notice-description">{notice.description}</p>

                      <p className="notice-footer-timestamp">{notice.author} {notice.created_at.split("T")[0]}</p>
                    </div>
                  )
                })}

                {/*<div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice03.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>KillFeed estilo CSGO!</p>
                </div>

                <div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice04.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>Nova HUD para o servidor!</p>
                </div>

                <div className="notice-container">
                  <div className="notice-img" style={{
                    backgroundImage: "url('./assets/game_imgs/notice05.PNG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}></div>
                  <h1>NOVIDADE</h1>
                  <p>Ranking global de quem matou mais no server!</p>
                </div>*/}

              </div>

            </div>

            <UserAccountComponent />
          </div>
        :null}
      </React.Fragment>
    )
}

module.exports = GameSectionComponent;