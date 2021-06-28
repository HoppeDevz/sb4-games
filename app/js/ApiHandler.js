const LAUNCHER_API_ADRESS = "http://191.96.224.194:40120";
const ACCOUNTS_API_ADRESS = "http://191.96.224.194:3333";
const SOCKET_API_ADRESS = "http://191.96.224.194:4444";

const POST_REQUEST_WITH_JWT_PARAM = (url, body, jwt) => new Promise((resolve, reject) => {
    const axios = require("axios");

    axios.default.post(`${ACCOUNTS_API_ADRESS}${url}`, body, { headers:{ authorization: `Bearer ${jwt}` }})
    .then(response => resolve(response))
    .catch(err => reject(err));
});

const PUT_REQUEST_WITH_JWT_PARAM = (url, body, jwt) => new Promise((resolve, reject) => {
    const axios = require("axios");

    axios.default.put(`${ACCOUNTS_API_ADRESS}${url}`, body, { headers:{ authorization: `Bearer ${jwt}` }})
    .then(response => resolve(response))
    .catch(err => reject(err));
});

const GET_GAME_NOTICES = (gamename) => new Promise((resolve, reject) => {
    const axios = require("axios");

    axios.default.get(`${LAUNCHER_API_ADRESS}/notices`, { headers: { game: gamename } }).then(response => {
        resolve(response);
    }).catch(err => reject(err));
});