import { useState } from 'react';

function EditProfileForm({ user, setUser, openProfileEdit, setOpenProfileEdit }) {
  const [editFormData, setEditFormData] = useState({
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    profile_img: user.profile_img
  });

  function changeForm(e) {
    setEditFormData((editFormData)=>({
      ...editFormData,
      [e.target.name]: e.target.value
    }))
  }

  async function submitEditProfile(e) {
    e.preventDefault()

    const response = await fetch(`/users/${user.id}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editFormData)
    })

    if (response.ok) {
      response.json()
      .then((data)=>{
        setUser(data)
        setOpenProfileEdit(false)
      })
    } else {
      response.json()
      .then(data=> alert(data.errors))
    }
  }
  
  return(
    <div onSubmit={submitEditProfile}>
      <img 
          src={user.profile_img}
          alt="nav profile pic" 
          className="profile-expand-img"
        />
        <form>
          <label
            htmlFor="full_name"
            className="profile-expand-label"
          >
            Full Name
          </label>
          <input 
            name="full_name"
            value={editFormData.full_name}
            className="profile-expand-input"
            onChange={changeForm}
          />

          <label
            htmlFor="username"
            className="profile-expand-label"
          >
            Username
          </label>
          <input 
            name="username"
            value={editFormData.username}
            className="profile-expand-input"
            onChange={changeForm}
          />

          <label
            htmlFor="profile_img"
            className="profile-expand-label"
          >
            Profile Image
          </label>
          <input 
            name="profile_img"
            value={editFormData.profile_img}
            className="profile-expand-input"
            onChange={changeForm}
          />

          <label
            htmlFor="email"
            className="profile-expand-label"
          >
            Email
          </label>
          <input 
            name="email"
            value={editFormData.email}
            className="profile-expand-input"
            onChange={changeForm}
          />

          <button>Save Profile</button>
          
        </form>
    </div>
  )
}

export default EditProfileForm;