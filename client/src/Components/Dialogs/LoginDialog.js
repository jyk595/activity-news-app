import LoginForm from '../Forms/LoginForm';
import CloseX from '../../Images/times-solid.png';

function LoginDialog({ openLoginDialog, setOpenLoginDialog, openSignupDialog, setOpenSignupDialog }) {
  function clickCloseX() {
    setOpenLoginDialog(false)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="login-dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Login to your account</h2>
            <button 
              className="dialog-x-button"
              onClick={clickCloseX}
            >
              <img 
                src={CloseX} className="dialog-x" 
                alt="close x"
              />
            </button>
          </div>
          <LoginForm 
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
            openSignupDialog={openSignupDialog}
            setOpenSignupDialog={setOpenSignupDialog}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginDialog;