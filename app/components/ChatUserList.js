

const ChatUserList = ({ SwitchUser }) => {
    const [UserList, SetUserList] = useState([]);

    const Switch = User => SwitchUser(User);

    useEffect(() => {

        const { ipcRenderer } = require("electron");
        let StorageUserList = localStorage.getItem("chat-user-list");

        ipcRenderer.invoke("request-current-chating-user", {})
        .then(CurrentUser => {

            SwitchUser(CurrentUser);

            if (StorageUserList) {

                StorageUserList = JSON.parse(StorageUserList);

                console.log(StorageUserList)
            
                // VERIFY IF ALREADY EXIST USER IN USERLIST
                let AlreadyExists = false;
                for (let User of StorageUserList) {

                    if (User == CurrentUser) {

                        AlreadyExists = true;
                    }
                }

                if (AlreadyExists) {

                    SetUserList(StorageUserList);
                } else {

                    StorageUserList.push(CurrentUser);
                    localStorage.setItem("chat-user-list", JSON.stringify(StorageUserList));
                    SetUserList(StorageUserList);
                }

            } else {

                localStorage.setItem("chat-user-list", JSON.stringify([ CurrentUser ]));
                SetUserList([ CurrentUser ]);
            }

        });

        
    }, []);

    return(
        <div className="chat-user-list">
            
            {UserList.map((user, index) => {

                return(
                    <div className="chat-user">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <span onClick={() => Switch(user)}>{user}</span>
                    </div>
                )
            })}
        </div>
    )
}

module.exports = ChatUserList;