const GameListComponent = () => {
    const [GameSelected, SetGameSelected] = useState("game00");

    function ChangeGameHandler(value) {
      localStorage.setItem("current_game_selected", value);
      SetGameSelected(value);
    }

    return(
      <React.Fragment>
        <div className="game-list-container">

          <div className="game-list--enhanced-box">
            <img src="./assets/menu.png" />
            <span>TODOS OS JOGOS</span>
          </div>

          <div className="game-list--game-bar">

            {GameSelected == "game00" ? 
            <div className="game-select game-selected">
              <img src="./assets/games/game00.png" />
            </div>
            : 
            <div onClick={() => ChangeGameHandler("game00")} className="game-select">
              <img src="./assets/games/game00.png" />
            </div>
            }

            {GameSelected == "game01" ? 
            <div className="game-select game-selected">
              <img src="./assets/games/game01.png" />
            </div>
            : 
            <div onClick={() => ChangeGameHandler("game01")} className="game-select">
              <img src="./assets/games/game01.png" />
            </div>
            }

          </div>

        </div>

        <GameSectionComponent GameName={GameSelected} ProcessName="FiveM.exe" />
      </React.Fragment>
    )
}

module.exports = GameListComponent;