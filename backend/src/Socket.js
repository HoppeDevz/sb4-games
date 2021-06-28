class Socket {

    constructor() {
        this.socketApp = require("express")();
        this.http = require("http");

        this.sv = this.http.createServer(this.socketApp);

        this.server = require("socket.io").Server;

        this.io = new this.server(this.sv);


        // this.sessions[username] = socket.id;
        this.sessions = {};
    }


    on(event, cb) {
        this.io.on(event, socket => {

            cb(socket);
        })
    }

    listen(port, cb) {

        this.io.listen(port);
        cb();
    }

    addUserInSessionsList(username, socketId) {
        console.log("Add in session list ", username, socketId);

        this.sessions[username] = socketId;
    }

    removeUserFromSessionsList(username) {
        console.log("Remove from session list ", username);

        delete this.sessions[username];
    }

    sendFriendRequestSocket(username) {

        if (this.sessions[username]) {

            this.io.to(this.sessions[username]).emit("received-friend-request");
        }
    }
}

module.exports = new Socket();