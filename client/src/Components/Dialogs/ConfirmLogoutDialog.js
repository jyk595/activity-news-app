import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CloseX from '../../Images/times-solid.png';
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
            <h2 className="dialog-header">👋</h2>
            <h2 className="dialog-header">Are you sure you want to logout?</h2>
            <button
              className="dialog-button"
              onClick={clickLogout}
            >
              Yes, log me out
            </button>
            <button
              className="dialog-button"
              onClick={clickCloseX}
            >
              Never mind
            </button>
          </div>

          <div>
            
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
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogoutDialog;