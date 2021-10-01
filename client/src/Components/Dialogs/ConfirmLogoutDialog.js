import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CloseX from '../../Images/times-solid.svg';
import { logoutUser } from '../../redux/actions';

function ConfirmLogoutDialog({ setOpenLogoutDialog}) {
  const dispatch = useDispatch();
  const history = useHistory();

  function clickCloseX() {
    setOpenLogoutDialog(false)
  }

  function clickLogout() {
    dispatch(logoutUser());
    setOpenLogoutDialog(false);
    history.push('/');
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Are you sure you want to logout?</h2>
            
            <button 
              className="dialog-x-button"
              onClick={clickCloseX}
            >
              <img 
                src={CloseX} className="dialog-x" 
                alt="close x"
              />
            </button>
            
            <button
              onClick={clickLogout}
            >
              Yes, log me out
            </button>
            
            <button>Never mind</button>
          </div>
          {/* <LoginForm 
            setUser={setUser}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
            openSignupDialog={openSignupDialog}
            setOpenSignupDialog={setOpenSignupDialog}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogoutDialog;