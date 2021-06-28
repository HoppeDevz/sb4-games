const HeaderComponent = () => {
    const navigation = useHistory();

    function LogoutHandler() {
      localStorage.removeItem("jwt_token");
      navigation.push("/");
    }

    function HomeHandler() {
      navigation.push("/home");
    }

    function ProfileHandler() {
      let parsed_data = JSON.parse(localStorage.getItem("user_info"));
      navigation.push(`/user/${parsed_data.userLogin}`);
    }

    return(
      <React.Fragment>
        <div className="window-header">

          <div className="window-header-left-container">
            <img className="window-header--logo" src="./assets/logo.png" />
            
            <span onClick={HomeHandler} className="window-header--option">JOGOS</span>
            <span onClick={ProfileHandler} className="window-header--option">PERFIL</span>
          </div>

          <div className="window-header-right-container">

            <span onClick={LogoutHandler} className="logout-icon">
              <svg xmlns="../assets/box-arrow-right.svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </span>

          </div>
          
        </div>
      </React.Fragment>
    )
}

module.exports = HeaderComponent;