const axios = require("axios");

let intervalId;

class GameCounter {
    constructor() {
        this.counterEnabled = false;
    }

    start(interval, game, token, api_adress) {
        if (this.counterEnabled) return;
        this.counterEnabled = true;

        intervalId = setInterval(() => {
            console.log(`INCREASE ${interval} SECONDS IN GAME ${game}`);
            console.log(`${api_adress}/increase_game_counter`);
            axios.default.post(`${api_adress}/increase_game_counter`, 
            {
                game: game,
                increase: interval / 1000
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            );
        }, interval);
    }

    stop() {
        if (!this.counterEnabled) return;
        this.counterEnabled = false;

        clearInterval(intervalId);
    }
}

module.exports = new GameCounter();