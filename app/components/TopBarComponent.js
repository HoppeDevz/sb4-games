const TopBarComponent = () => {

  function CloseWindowHandler() {
    const { remote } = require("electron");
    remote.getCurrentWindow().close();
  }

  function MinimizeWindowHandler() {
    const { remote } = require("electron");
    remote.getCurrentWindow().minimize();
  }

  return(
    <div className="window-top-bar-container">
      {/*<img onClick={CloseWindowHandler} id="top-bar-close-button" className="top-bar-action-button" src="./assets/close-ico.webp" />*/}
      {/*<img onClick={MinimizeWindowHandler} id="top-bar-minimize-button" className="top-bar-action-button" src="./assets/minimize-ico.webp" />*/}

      <svg onClick={CloseWindowHandler} className="top-bar-action-button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
      
      <svg onClick={MinimizeWindowHandler} className="top-bar-action-button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>

      
    </div>
  )
}

module.export = TopBarComponent;