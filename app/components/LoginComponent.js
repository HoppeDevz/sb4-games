const LoginComponent = () => {
    const[UserName, SetUserName] = useState("");
    const[Password, SetPassword] = useState("");

    const[Alert, SetAlert] = useState("");

    const navigation = useHistory();

    useEffect(() => {
        let token = localStorage.getItem("jwt_token");

        console.log('token', token);

        axios.post(`${ACCOUNTS_API_ADRESS}/check_token`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("jwt_is_valid!");
            navigation.push("/home");
        })
    }, [])

    function LoginHandler(event) {
        event.preventDefault();

        let data = {
            userLogin: UserName,
            userPassword: Password
        };

        axios.post(`${ACCOUNTS_API_ADRESS}/verifylogin`, data)
        .then(response => {
            let token = response.data.token;

            console.log("saved token!");
            localStorage.setItem("jwt_token", token);
            localStorage.setItem("user_info", JSON.stringify(response.data.user_info));

            navigation.push("/home");
        })
        .catch(err => {

            if (Alert == "") {
                SetAlert("Usuário e/ou senha incorretos!");
                setTimeout(() => SetAlert(""), 3000);
            }
            
        });
    }

    function RegisterHandler() {
        navigation.push("/register");
    }

    return(
        <React.Fragment>
            <TopBarComponent />
            
            <div className="login-logo-in-center-offset">
                <img src="./assets/logo.png" />
                <h1>Fazer login</h1>
            </div>

            <form className="user-login-container" onSubmit={e => LoginHandler(e)} className="user-login-container">
                
                <div className="user-login-components-container">
                    <input type="text" onChange={e => SetUserName(e.target.value)} placeholder="Usuário" />
                    <input type="password" onChange={e => SetPassword(e.target.value)} placeholder="Senha" />
                    <button>Conectar-se</button>

                    {Alert != "" ? <span className="login-err-alert-span">{Alert}</span> : null}

                    <span className="login-page-register-link">Ainda não é cadastrado? <span onClick={RegisterHandler} className="register-word-link">Registrar</span></span>
                </div>
            </form>
            

        </React.Fragment>
    )
}

module.exports = LoginComponent;