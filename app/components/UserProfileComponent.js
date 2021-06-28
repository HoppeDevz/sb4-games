const UserProfileComponent = () => {
    const navigation = useHistory();

    const[SelfUserName, SetSelfUserName] = useState("self_username");

    const[UserName, SetUserName] = useState("Ghett");
    const[UserLogin, SetUserLogin] = useState("ghett");
    const[UserAvatar, SetUserAvatar] = useState(1);
    const[UserBackground, SetUserBackground] = useState(1);
    const[UserDesc, SetUserDesc] = useState("Nenhuma descrição");
    const[UserLevel, SetUserLevel] = useState(1);
    const[UserGamesHours, SetUserGamesHours] = useState([]);

    useEffect(() => {
        let url = window.location.href;
        let username = url.split("/user/")[1];
        let token = localStorage.getItem("jwt_token");
        let parsed_data = JSON.parse(localStorage.getItem("user_info"));

        axios.post(`${ACCOUNTS_API_ADRESS}/get_user_by_userlogin`, {
            userLogin: username
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            SetSelfUserName(parsed_data.userLogin);
            SetUserName(response.data.userName);
            SetUserLogin(response.data.userLogin);
            SetUserAvatar(response.data.userAvatar);
            SetUserBackground(response.data.userBackground);
            SetUserDesc(response.data.userDesc);
            SetUserLevel(response.data.userLevel);
            SetUserGamesHours(response.data.gamesHours);
        });

    }, []);

    function EditProfileHandler() {
        navigation.push("/edit_profile");
    }

    return(
        <React.Fragment>
            <TopBarComponent />
            <HeaderComponent />

            <div className="user-profile-component-background" style={{
                backgroundImage: `url(${ACCOUNTS_API_ADRESS}/static/backgrounds/${UserBackground}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>

                <div className="user-profile-mid-element">
                    
                    <div className="user-profile-header-element">
                        <div className="user-profile-header-left-element" >
                            <img src={`${ACCOUNTS_API_ADRESS}/static/avatars/${UserAvatar}.jpg`} />

                            <div className="user-profile-header-left-element-left-container">
                                <span className="user-profile-username-element">{UserLogin}</span>
                                <span className="user-profile-user-name-element">{UserName}</span>
                                <p className="user-profile-user-desc-element" dangerouslySetInnerHTML={{ __html: UserDesc }}></p>
                            </div>
                        </div>

                        <div className="user-profile-header-right-element">
                            <span className="user-profile-header-right-element-level" style={{
                                border: `2px solid 
                                ${
                                    UserLevel >= 1 && UserLevel <= 9 ? '#ffffff' :
                                    UserLevel > 9 && UserLevel <= 19 ? '#ff2626' :
                                    UserLevel > 19 && UserLevel <= 50 ? '#ffe924' :
                                    '#9224ff'
                                }
                                `
                            }}>{UserLevel}</span>

                            {SelfUserName == UserLogin ? 
                                <button onClick={EditProfileHandler} className="user-profile-header-right-element-edit">Editar</button>
                            :null}
                        </div>
                    </div>
                    
                    <div className="user-profile-game-hours-list">
                        {UserGamesHours.length == 0 ?
                            <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
                                <img width="300px" src="./assets/no-gameplay-gif.gif" />
                                <span style={{ fontFamily:"Roboto, sans-serif" }}>Este usuário não jogou nenhum jogo ainda.</span>
                            </div>
                        :null}

                        {UserGamesHours.map((game, index) => {
                            let { counter, game_banner, game_name } = game;
                            return(
                                <div className="user-profile-game-hours-item" key={index}>
                                    <img width="100px" src={game_banner} />

                                    <div className="user-profile-game-hours-item-left-container">
                                        <span>{game_name}</span>
                                        <span>{(counter / 3600).toFixed(2)} horas registradas</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}