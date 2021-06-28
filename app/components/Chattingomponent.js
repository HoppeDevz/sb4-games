

const Chattingomponent = ({ ConversationUser }) => {

    const[Messages, SetMessages] = useState([]);
    const[Message, SetMessage] = useState("");

    function ScrollChatToBottom() {
        let MessagesArea = document.querySelector(".messages-area");
        setTimeout(() => MessagesArea.scrollTop = MessagesArea.scrollHeight, 100);
    }

    function ResetMessageForm() {
        let FormElement = document.querySelector(".send-message-area");
        FormElement.reset();
    }

    function SendMessageHandler(FormEvent) {
        FormEvent.preventDefault();

        const token = localStorage.getItem("jwt_token");

        const socket = io(SOCKET_API_ADRESS);
        socket.emit("chat-send-message", {token, ConversationUser, Message}, sucess => {

            if (sucess) {
              
                let StorageMessages = JSON.parse( localStorage.getItem("chat-messages") );

                if (StorageMessages) {

                    if (StorageMessages[ConversationUser]) {

                        StorageMessages[ConversationUser].messages.push({ msg: Message, type: 1 });
                        localStorage.setItem("chat-messages", JSON.stringify(StorageMessages));

                        SetMessages(StorageMessages[ConversationUser].messages);
                    } else {

                        StorageMessages[ConversationUser] = { messages: [ { msg: Message, type: 1 } ] }
                        localStorage.setItem("chat-messages", JSON.stringify(StorageMessages));

                        SetMessages(StorageMessages[ConversationUser].messages);
                    }

                } else {

                    let FirstMessage = { [ConversationUser]: { messages: [ { msg: Message, type: 1 } ] } }
                    localStorage.setItem("chat-messages", JSON.stringify(FirstMessage));

                    SetMessages(FirstMessage[ConversationUser].messages);
                }

            }
            
            socket.disconnect()
        });

        ResetMessageForm();
        ScrollChatToBottom();
    }

    function GetMessages(User) {

        console.log("Refresh Messages!", User);

        let StorageMessages = JSON.parse( localStorage.getItem("chat-messages") );

        if (StorageMessages) {

            if (StorageMessages[User]) {

                console.log( StorageMessages[User].messages )

                SetMessages(StorageMessages[User].messages);
                ScrollChatToBottom();
            } else {
                SetMessages([]);
            }
        }
    }

    function RefreshMessagesListener(User) {
        
        let RefreshMesagges = JSON.parse( localStorage.getItem("refresh-messages") );

        if (RefreshMesagges) {
            GetMessages(User);

            localStorage.setItem("refresh-messages", JSON.stringify(false));
        }

        RefreshMessageThreadId = setTimeout(() => {

            RefreshMessagesListener(User);
        }, 2 * 1000);
    }

    useEffect(() => GetMessages(ConversationUser), [ConversationUser]);

    useEffect(() => {

        clearTimeout(RefreshMessageThreadId);
        RefreshMessagesListener(ConversationUser);
    }, [ConversationUser]);

    return(
        <div className="chat-component">
            <header className="header">

                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                &nbsp;&nbsp;
                {ConversationUser}
            </header>

            <div className="messages-area">
                {Messages.map((message, index) => {
                    let { msg, type } = message; 

                    return(
                        <div className={ type == 1 ? "sended-message-container" : "received-message-container" } key={index}>
                            <span className={ type == 1 ? "sended-message" : "received-message" } >{msg}</span>
                        </div>
                    )
                })}
            </div>

            <form onSubmit={e => SendMessageHandler(e)} className="send-message-area">
                <input type="text" placeholder="Mensagem" onChange={e => SetMessage(e.target.value)} />
            </form>
            
        </div>
    )
}

module.exports = Chattingomponent;