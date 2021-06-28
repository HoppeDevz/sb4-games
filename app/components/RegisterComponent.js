const { default: axios } = require("axios");

const RegisterComponent = () => {
    const navigation = useHistory();

    const[UserName, SetUserName] = useState("");
    const[UserLogin, SetUserLogin] = useState("");
    const[UserPassword, SetUserPassword] = useState("");
    const[UserEmail, SetUserEmail] = useState("");
    const[BirthDate, SetBirthDate] = useState("");

    const[Alert, SetAlert] = useState("");
    const[AlertSucess, SetAlertSucess] = useState("");

    function LoginHandler() {
        navigation.push("/");
    }

    function RegisterHandler(formEvent) {
        formEvent.preventDefault();

        let data ={ 
            name: UserName, 
            userLogin: UserLogin, 
            userPassword: UserPassword, 
            email: UserEmail, 
            birthDate: BirthDate
        }

        axios.post(`${ACCOUNTS_API_ADRESS}/createUser`, data)
        .then(response => {
            SetAlert("");
            SetAlertSucess("Conta criada com sucesso!");
        })
        .catch(err => {
            SetAlertSucess("");   
            SetAlert("Email ou usuário em uso!");
        })
    }

    return(
        <React.Fragment>
            <TopBarComponent />

            <div className="login-logo-in-center-offset">
                <img src="./assets/logo.png" />
                <h1>Registro</h1>
            </div>

            <form onSubmit={e => RegisterHandler(e)} className="user-login-container" className="user-login-container">
                
                <div className="user-login-components-container">
                    <input type="email"onChange={e => SetUserEmail(e.target.value)} placeholder="E-Mail" />
                    <input type="text" onChange={e => SetUserName(e.target.value)} placeholder="Nome" maxLength="25" />
                    <input type="text" onChange={e => SetUserLogin(e.target.value)} placeholder="Usuário" maxLength="15" />
                    <input type="password" onChange={e => SetUserPassword(e.target.value)} placeholder="Senha" />
                    <input type="date" onChange={e => SetBirthDate(e.target.value)} placeholder="Data de nascimento" />
                    <button>Registrar-se</button>

                    {Alert != "" ? <span className="login-err-alert-span">{Alert}</span> : null}
                    {AlertSucess != "" ? <span className="login-sucess-alert-span">{AlertSucess}</span> : null}

                    <span className="login-page-register-link">Já possui uma conta? <span onClick={LoginHandler} className="register-word-link">Fazer login</span></span>
                </div>
            </form>
        </React.Fragment>
    )
}

module.exports = RegisterComponent;