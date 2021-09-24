import SignupForm from '../Forms/SignupForm';
import CloseX from '../../Images/times-solid.svg';

function SignupDialog({ openSignupDialog, setOpenSignupDialog, openLoginDialog, setOpenLoginDialog, setArticleList, setUser }) {
  function clickCloseX() {
    setOpenSignupDialog(!openSignupDialog)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="dialog-section-container">
          hello
        </div>
        <div className="dialog-section-container">
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
            setArticleList={setArticleList}
            setUser={setUser}
          />
        </div>
      </div>
    </div>
  )
}

export default SignupDialog;