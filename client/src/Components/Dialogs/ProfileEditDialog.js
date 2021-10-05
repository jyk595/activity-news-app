
import EditProfileForm from '../Forms/EditProfileForm';
import CloseX from '../../Images/times-solid.png';

function ProfileEditDialog({ setOpenProfileExpand }) {
  function clickCloseX() {
    setOpenProfileExpand(false)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="edit-profile-dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Your profile</h2>
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
          
          <EditProfileForm 
            setOpenProfileExpand={setOpenProfileExpand}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileEditDialog;