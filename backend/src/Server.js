const app = require("./App");
const socket = require("./Socket");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, HTTP_API_PORT, SOCKET_SERVER_PORT } = require("./config/cfg");

function myMapObject(_object, callback) {
    let index = 0;
    let arr = [];
    for (let dkey in _object) {
        let dvalue = _object[dkey];
        arr.push(callback(dkey, dvalue, index));
        index++;
    }

    return arr;
}

socket.on("connection", socketConnection => {

    socketConnection.on("heart-beat", token => {

        try {

            let decoded = jwt.verify(token, JWT_SECRET, {});
            let { userLogin,user_id } = decoded;

            socket.addUserInSessionsList(userLogin, socketConnection.id);

        } catch(err) {
            
            myMapObject(socket.sessions, (username, socketId, index) => {

                if (socketId == socketConnection.id)
                    socket.removeUserFromSessionsList(username);
            });
        }
        
    });

    socketConnection.on("disconnect", () => {

        myMapObject(socket.sessions, (username, socketId, index) => {

            if (socketId == socketConnection.id) {
                socket.removeUserFromSessionsList(username);
            }
                
        });

    });


    socketConnection.on("verify-users-online", (userList, cb) => {

        let NetWorkList = {};

        for (let user of userList) {

            NetWorkList[user] = typeof(socket.sessions[user]) == "string";
        }

        cb(NetWorkList);
    });

    socketConnection.on("send-friend-request", (username, cb) => {

        console.log("send-friend-request", username);
        
        if (socket.sessions[username]) {

            socketConnection.to(socket.sessions[username]).emit("received-friend-request");
            return cb()
        }

        return cb()
    });

    socketConnection.on("accept-friend-request", (username, cb) => {

        console.log("accept-friend-request", username);

        if (socket.sessions[username]) {

            socketConnection.to(socket.sessions[username]).emit("accepted-friend-request");

            return cb();
        }

        return cb();
    });

    socketConnection.on("chat-send-message", (MessageData, cb) => {

        console.log("MessageData", MessageData);

        let { token, ConversationUser, Message } = MessageData;

        try {

            let decoded = jwt.verify(token, JWT_SECRET);

            let { userLogin } = decoded;

            let targetSocket = socket.sessions[ConversationUser];

            if (targetSocket) {

                socketConnection.to(targetSocket).emit("chat-received-message", { ConversationUser: userLogin, Message });

                return cb(true);
            }

            
            return cb(false);

        } catch(err) {
            return cb(false);
        }
    });
    
});

// LISTEN //
socket.listen(SOCKET_SERVER_PORT, () => {
    console.log(`Socket is running in port ${SOCKET_SERVER_PORT}`);
});

app.listen(HTTP_API_PORT, ()=>{
    console.log(`Main HTTP API is running in port ${HTTP_API_PORT}`);
});