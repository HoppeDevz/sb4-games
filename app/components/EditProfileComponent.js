const EditProfileComponent = () => {

    const[EditOption, SetEditOption] = useState(1);

    const[UserAvatarIndex, SetUserAvatarIndex] = useState(1);
    const[UserBackgroundIndex, SetUserBackgroundIndex] = useState(1);
    const[UserLogin, SetUserLogin] = useState("ghett");
    const[UserName, SetUserName] = useState("ghett");
    const[UserDesc, SetUserDesc] = useState("");

    const[AllAvatars, SetAllAvatars] = useState([]);
    const[AllBackgrounds, SetAllBackgrounds] = useState([]);


    useEffect(() => {
        let parsed_data = JSON.parse(localStorage.getItem("user_info"));

        SetUserAvatarIndex(parsed_data.avatarIndex);
        SetUserLogin(parsed_data.userLogin);
        SetUserName(parsed_data.name);
        SetUserDesc(parsed_data.profile_desc);
        SetUserBackgroundIndex(parsed_data.backgroundIndex);
    }, []);

    useEffect(() => {
        axios.get(`${ACCOUNTS_API_ADRESS}/get_all_avatars`)
        .then(response => {
            SetAllAvatars(response.data.avatars);
        });

        axios.get(`${ACCOUNTS_API_ADRESS}/get_all_backgrounds`)
        .then(response => {
            SetAllBackgrounds(response.data.backgrounds);
        });
    }, []);

    async function UpdateUserInfoHandler(edit_option, data) {
        if (edit_option == 1) {
            let { UserName, UserDesc } = data;
            let jwt_token = localStorage.getItem("jwt_token");
            let parsed_data = JSON.parse(localStorage.getItem("user_info"));

            try {
                await PUT_REQUEST_WITH_JWT_PARAM("/updatename", { userName: UserName }, jwt_token);
                parsed_data.name = UserName;

                await PUT_REQUEST_WITH_JWT_PARAM("/updatedesc", { userDesc: UserDesc.replace(/\r?\n/g, '<br />') }, jwt_token);
                parsed_data.profile_desc = UserDesc;

                localStorage.setItem("user_info", JSON.stringify(parsed_data));
            } catch(err) {
                console.log(err);
            }

        }

        if (edit_option == 2) {
            let { UserAvatar } = data;
            let jwt_token = localStorage.getItem("jwt_token");
            let parsed_data = JSON.parse(localStorage.getItem("user_info"));

            try {
                await PUT_REQUEST_WITH_JWT_PARAM("/updateavatar", { userAvatar: UserAvatar }, jwt_token);
                parsed_data.avatarIndex = UserAvatar;

                localStorage.setItem("user_info", JSON.stringify(parsed_data));
                SetUserAvatarIndex(UserAvatar);

            } catch(err) {
                console.log(err);
            }
        }
    }

    return(
        <React.Fragment>
            <TopBarComponent />
            <HeaderComponent />

            <div className="edit-profile-page">
                <div className="edit-profile-mid-element">
                    <header className="edit-profile-header-element">
                        <img src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatarIndex}.jpg`} />
                        <span>{UserLogin}</span>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>

                        <span>Editar perfil</span>
                    </header>

                    <div className="edit-profile-menu-and-handlers-area">
                        <div className="edit-profile-nav-menu">
                            <span onClick={() => SetEditOption(1)} className="edit-profile-menu-option">Geral</span>
                            <span onClick={() => SetEditOption(2)} className="edit-profile-menu-option">Avatar</span>
                            <span onClick={() => SetEditOption(3)} className="edit-profile-menu-option">Tema</span>
                        </div>

                        {EditOption == 1 ? 
                            <div className="edit-profile-edit-option-1">

                                <div className="edit-profile-edit-option-1-first-container">
                                    <h2>GERAL</h2>
                                    <p>
                                        Defina o nome e os detalhes do seu perfil. Forneça dados adicionais, como o seu nome<br></br>
                                        verdadeiro, para ajudar os seus amigos a encontrá-lo(a) na comunidade.<br></br>
                                        <br></br>
                                        O seu nome de perfil e o seu avatar representam você por toda a comunidade e devem ser apropriados<br></br>
                                        para todos os públicos.
                                    </p>
                                </div>

                                <div className="edit-profile-edit-option-1-second-container">
                                    <input onChange={e => SetUserName(e.target.value)} value={UserName} />
                                    <textarea onChange={e => SetUserDesc(e.target.value)} value={UserDesc}></textarea>
                                    <button onClick={() => UpdateUserInfoHandler(EditOption, { UserName, UserDesc })}>Salvar</button>
                                </div>
                            </div>
                        :null}

                        {EditOption == 2 ? 
                            <div className="edit-profile-edit-option-2">
                                <div className="edit-profile-edit-option-2-first-container">
                                    <h2>AVATAR</h2>
                                    <p>
                                        Escolha a imagem do seu avatar.
                                    </p>
                                </div>

                                <div className="edit-profile-edit-option-2-second-container">

                                    <div style={{ display:"flex", flexDirection:"column", marginRight:"2vw" }}>
                                        <img width="128px" src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatarIndex}.jpg`} />
                                        <span>128px</span>
                                    </div>
                                    
                                    <div style={{ display:"flex", flexDirection:"column", marginRight:"2vw" }}>
                                        <img width="64px" src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatarIndex}.jpg`} />
                                        <span>64px</span>
                                    </div>

                                    <div style={{ display:"flex", flexDirection:"column", marginRight:"2vw" }}>
                                        <img width="32px" src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatarIndex}.jpg`} />
                                        <span>32px</span>
                                    </div>

                                </div>

                                <div className="edit-profile-edit-option-2-third-container">
                                    {AllAvatars.map((avatar, index) => {
                                        return(
                                            <div onClick={() => UpdateUserInfoHandler(EditOption, { UserAvatar: Number(avatar.replace(".jpg", "")) })} className="edit-profile-edit-option-2-third-container-avatar-container" key={index}>
                                                <img width="64px" src={`${ACCOUNTS_API_ADRESS}/static/avatars/${avatar}`} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        :null}

                        {EditOption == 3 ?
                            <div className="edit-profile-edit-option-3">
                                <div className="edit-profile-edit-option-3-first-container">
                                    <h2>TEMA DE FUNDO</h2>
                                    <p>
                                        Selecione uma imagem de fundo para ser exibida na sua página de perfil.
                                    </p>
                                </div>

                                <div className="edit-profile-edit-option-3-preview-box" style={{
                                    backgroundImage: `url(${ACCOUNTS_API_ADRESS}/static/backgrounds/${UserBackgroundIndex}.jpg)`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}>
                                    <div className="edit-profile-edit-option-3-preview-box-mid-element"></div>
                                </div>
                                
                                <div className="edit-profile-edit-option-3-background-list">
                                    {AllBackgrounds.map((background, index) => {
                                        return(
                                            <div className="edit-profile-edit-option-3-background-item" key={index} style={{
                                                backgroundImage: `url(${ACCOUNTS_API_ADRESS}/static/backgrounds/${background})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center"
                                            }}>
                                                
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        :null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}