const CircleFill = ({ size, color }) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
        </svg>
    )
}

const UserAccountComponent = () => {
    const navigation = useHistory();

    const[UserName, SetUserName] = useState("Ghett");
    const[UserLogin, SetUserLogin] = useState("ghett");
    const[UserAvatar, SetUserAvatar] = useState(1);

    const[UsersOnline, SetUsersOnline] = useState({});
    const[UserFriendRequests, SetUserFriendRequests] = useState([]);
    const[UserFriendList, SetUserFriendList] = useState([]);
    const[UserFriendListBackup, SetUserFriendListBackup] = useState([]);
    
    function GetUserFriendRequests() {
        let token = localStorage.getItem("jwt_token");

        axios.post(`${ACCOUNTS_API_ADRESS}/get_user_friends_request`, {}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.formatted_friend_requests) {
                SetUserFriendRequests(response.data.formatted_friend_requests);
            }
        })

    }

    function SocketFriendRequestThread() {

        if (RefreshFriendRequest) {
            GetUserFriendRequests();
            RefreshFriendRequest = false;
        }

        CurrentSocketFriendsRequestThreadId = setTimeout(() => SocketFriendRequestThread(), 15 * 1000);
    }

    function SocketGetFriendsOline(friends, cb) {

        socket.emit("verify-users-online", friends, res => {
            cb(res)
        });
    }

    function SocketFriendsOnlineThread() {

        let friendList = JSON.parse(localStorage.getItem("friend-list"));

        if (friendList) {

            let arr = [];

            for (let user of friendList) {

                arr.push(user.username);
            }


            SocketGetFriendsOline(arr, response => {

                console.log(response);
                SetUsersOnline(response);
            });
        }

        CurrentSocketFriendsOnlineThreadId = setTimeout(() => SocketFriendsOnlineThread(), 10 * 1000);
    }

    function GetUserFriendsThread() {

        if (RefreshFriendsList) {
            GetUserFriendList();
            RefreshFriendsList = false;
        }

        RefreshFriendsListThreadId = setTimeout(() => GetUserFriendsThread(), 10 * 1000);
    }

    useEffect(() => GetUserFriendRequests(), []);

    useEffect(() => {

        clearTimeout(CurrentSocketFriendsRequestThreadId);
        SocketFriendRequestThread();
    }, []);

    useEffect(() => {

        clearTimeout(CurrentSocketFriendsOnlineThreadId);
        SocketFriendsOnlineThread();
    }, []);

    useEffect(() => {

        clearTimeout(RefreshFriendsListThreadId);
        GetUserFriendsThread();
    }, []);

    function GetUserFriendList() {
        let token = localStorage.getItem("jwt_token");

        axios.post(`${ACCOUNTS_API_ADRESS}/get_user_friend_list`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.formatted_friend_list) {

                let arr = [];

                for (let user of response.data.formatted_friend_list) {

                    arr.push(user.username);
                }

                SocketGetFriendsOline(arr, res => {
                    SetUsersOnline(res);

                    localStorage.setItem("friend-list", JSON.stringify(response.data.formatted_friend_list));

                    SetUserFriendList(response.data.formatted_friend_list);
                    SetUserFriendListBackup(response.data.formatted_friend_list);
                });
                
            }
        })
    }
    useEffect(() => GetUserFriendList(), []);

    function RefreshUserInfos() {
        GetUserFriendRequests();
        GetUserFriendList();
    }

    function AddFriendHandler() {

        const { ipcRenderer } = require("electron");
        ipcRenderer.send("create-add-friend-window");

        // window.open("../launcher/index.html#/add_friend_window", "_blank", "top=300,left=700,width=300,height=500,frame=false,nodeIntegration=true");
    }

    function AcceptFriendRequestHandler(username) {
        let token = localStorage.getItem("jwt_token");

        axios.post(`${ACCOUNTS_API_ADRESS}/accept_friend_request`, { user_accept: username }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => RefreshUserInfos());
    }

    function DenyFriendRequestHandler(username) {
        let token = localStorage.getItem("jwt_token");
        axios.post(`${ACCOUNTS_API_ADRESS}/deny_friend_request`, { username }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => RefreshUserInfos());
    }

    function OpenChatMessage(target_username) {

        const { ipcRenderer } = require("electron");

        ipcRenderer.send("open-chat-window", { target_username });
        localStorage.setItem("username-chatting-handler", target_username);
    }

    function FilterFriendList(value) {

        let arr = [];

        for (let friend of UserFriendListBackup) {
            let { username } = friend;

            if (username.toLowerCase().search(value.toLowerCase()) > -1) {
                arr.push(friend);
            }
        }

        SetUserFriendList(arr);
    }

    function ProfileHandler(username) {
        navigation.push(`/user/${username}`);
    }

    useEffect(() => {
        let parsed_data = JSON.parse(localStorage.getItem("user_info"));

        SetUserName(parsed_data.name);
        SetUserLogin(parsed_data.userLogin);
        SetUserAvatar(parsed_data.avatarIndex);
    }, []);

    return(
        <div className="user-account-component-container">

            <div className="user-avatar-and-nickname-container">
                <img src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatar}.jpg`} />

                <div className="user-nick-name-and-status">
                    <span className="user-name">{UserLogin}</span>
                    <span className="user-status">Online</span>
                </div>
                
            </div>


            <div className="user-friends-options-container">

                <div onClick={AddFriendHandler} className="add-friend-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </div>

                <div className="friend-list-filter-input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>

                    <input onChange={e => FilterFriendList(e.target.value)} placeholder="Procurar amigos..." />
                </div>
                
            </div>

            <div className="friend-list">
                <h1>Amigos:</h1>

                {UserFriendList.map((friend, index) => {
                    return(
                        <div className="friend-request-item" key={index}>

                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <img onClick={() => ProfileHandler(friend.username)} src={`${ACCOUNTS_API_ADRESS}/static/avatars/${friend.avatar}.jpg`} />
                                
                                <div style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                }}>
                                    <span>{friend.username}</span>
                                    {UsersOnline[friend.username] ? <span className="online"><CircleFill size={10} color="green" /> Online</span> : <span className="offline"><CircleFill size={10} color="red" /> Offline</span> }
                                </div>
                            </div>

                            <span className="friend-request-message-button">
                                <svg onClick={() => OpenChatMessage(friend.username)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="friend-requests-list">
                <h1>Pedidos de amizades:</h1>

                {UserFriendRequests.length == 0 ? 
                <div className="friend-request-empty-container">
                    <img src="./assets/empty-gif.gif" style={{ width:"12vw" }} />
                    <span>Você não possui solicitações</span>
                </div>
                :null}

                {UserFriendRequests.map((friend_request, index) => {
                    return(
                        <div className="friend-request-item" key={index}>

                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <img src={`${ACCOUNTS_API_ADRESS}/static/avatars/${friend_request.avatar}.jpg`} />
                                <span>{friend_request.username}</span>
                            </div>

                            <span className="friend-request-accept-button">
                                <svg onClick={() => AcceptFriendRequestHandler(friend_request.username)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>

                                <svg onClick={() => DenyFriendRequestHandler(friend_request.username)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </span>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

module.exports = UserAccountComponent;