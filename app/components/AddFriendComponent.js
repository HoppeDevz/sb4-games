const AddFriendComponent = () => {

    const[Receiver, SetReceiver] = useState("");
    const[ReceiverInfo, SetReceiverInfo] = useState(false);
    const[Alert, SetAlert] = useState("");

    function SendFriendRequestHandler() {
        let parsed_data = JSON.parse(localStorage.getItem("user_info"));
        let token = localStorage.getItem("jwt_token");

        axios.post(`${ACCOUNTS_API_ADRESS}/send_friend_request`, 
        {
            receiver_username:Receiver,
            sender_username: parsed_data.userLogin
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        )
        .then(response => {
            let { receiver_avatar, receiver_login, receiver_name } = response.data;
            SetReceiverInfo({ receiver_avatar, receiver_login, receiver_name });
        })
        .catch(err => {
            if (err.response) {
                if (!err.response.data) return;

                if (err.response.data.reason == "User not found") {
                    if (Alert != "") return;
                    SetAlert("Usuário não encontrado!");
                    setTimeout(() => SetAlert(""), 3000);
                }

                if (err.response.data.reason == "Sender request is equal to receiver") {
                    if (Alert != "") return;
                    SetAlert("Você não pode adicionar a si mesmo!");
                    setTimeout(() => SetAlert(""), 3000);
                }
            }
        })
    }

    return(
        <React.Fragment>
            <TopBarComponent />

            <div className="add-friend-window-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>

                <span>Adicionar amigo</span>
            </div>

            <div className="add-friend-window-search-area">
                <input onChange={e => SetReceiver(e.target.value)} placeholder="Usuário" />
                <button onClick={SendFriendRequestHandler}>Adicionar</button>
            </div>

            {Alert != "" ? <span className="add-friend-window-alert">{Alert}</span> : null}

            {ReceiverInfo ? 
            <div className="frind-request-container">
                <img src={`${ACCOUNTS_API_ADRESS}/static/avatars/${ReceiverInfo.receiver_avatar}.jpg`} />
                <span>{ReceiverInfo.receiver_name}</span>
                <p>Solicitação de amizade enviada!</p>
            </div>
            :null}

        </React.Fragment>
    )
}

module.exports = AddFriendComponent;