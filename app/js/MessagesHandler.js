
const REGISTER_MESSAGE_IN_STORAGE = (User, Message, Type) => {

    localStorage.setItem("refresh-messages", JSON.stringify(true));

    console.log("REGISTER_MESSAGE_IN_STORAGE", User, Message, Type);

    let StorageMessages = JSON.parse(localStorage.getItem("chat-messages"));

    if (StorageMessages) {

        if (StorageMessages[User]) {

            StorageMessages[User].messages.push({ msg: Message, type: Type });
            localStorage.setItem("chat-messages", JSON.stringify(StorageMessages));

            return
        } 

        
        StorageMessages[User] = { messages: [ { msg: Message, type: Type } ] }
        localStorage.setItem("chat-messages", JSON.stringify(StorageMessages));

        return
    }

    let FirstMessage = { [User]: { messages: [ { msg: Message, type: Type } ] } }
    localStorage.setItem("chat-messages", JSON.stringify(FirstMessage));
}