import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EditProfileForm from '../Forms/EditProfileForm';
import { logoutUser } from '../../redux/actions';

function ProfileExpand() {
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [openProfileEdit, setOpenProfileEdit] = useState(false);

  function clickProfileEdit() {
    setOpenProfileEdit(!openProfileEdit)
  }

  function clickLogout() {
    dispatch(logoutUser());
    history.push('/');
  };
  
  return(
    <div className="profile-expand-container">
      {openProfileEdit ?
      <EditProfileForm 
        openProfileEdit={openProfileEdit}
        setOpenProfileEdit={setOpenProfileEdit}
      /> :
      <div>
        <img 
          src={user.profile_img}
          alt="nav profile pic" 
          className="profile-expand-img"
        />
        <h3 className="profile-nav-name">{user.full_name}</h3>
        <p>@{user.username}</p>
        <p>{user.email}</p>
      </div>}
      
      <p 
        className="profile-expand-secondary"
        onClick={clickProfileEdit}
      >
        Edit My Profile
      </p>
      
      <p 
        className="profile-expand-secondary"
        onClick={clickLogout}
      >
        Logout
      </p>
    </div>
  )
}

export default ProfileExpand;