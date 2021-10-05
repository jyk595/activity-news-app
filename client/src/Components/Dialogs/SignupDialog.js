import SignupForm from '../Forms/SignupForm';
import CloseX from '../../Images/times-solid.png';

function SignupDialog({ openSignupDialog, setOpenSignupDialog, openLoginDialog, setOpenLoginDialog }) {
  function clickCloseX() {
    setOpenSignupDialog(!openSignupDialog)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="create-dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Create an account</h2>
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
          <SignupForm 
            openSignupDialog={openSignupDialog}
            setOpenSignupDialog={setOpenSignupDialog}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
          />
        </div>
      </div>
    </div>
  )
}

export default SignupDialog;