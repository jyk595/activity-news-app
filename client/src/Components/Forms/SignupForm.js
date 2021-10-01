import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createUser } from '../../redux/actions';

function SignupForm({ openSignupDialog, setOpenSignupDialog, openLoginDialog, setOpenLoginDialog }) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    profile_img: "",
    password: "",
    password_confirmation: ""
  });

  function changeSignupForm(e) {
    setSignupFormData((signupFormData)=>({
      ...signupFormData,
      [e.target.name]: e.target.value
    }))
  }

  function clickSwitchForm() {
    setOpenSignupDialog(!openSignupDialog)
    setOpenLoginDialog(!openLoginDialog)
  }

  function submitSignupForm(e) {
    e.preventDefault();

    dispatch(createUser(signupFormData));
    history.push(`/${signupFormData.username}`)
    setOpenSignupDialog(false)
    setSignupFormData({
      username: "",
      full_name: "",
      email: "",
      profile_img: "",
      password: "",
      password_confirmation: ""
    })
  }
  
  return(
    <form 
      onSubmit={submitSignupForm}
    >
      <label
        htmlFor="username"
        className="form-label"
      >
        Username
      </label>
      <input 
        type="text" 
        name="username"
        value={signupFormData.username}
        required
        className="form-input"
        onChange={changeSignupForm}
      />

      <label
        htmlFor="full_name"
        className="form-label"
      >
        Full Name
      </label>
      <input 
        type="text" 
        name="full_name"
        value={signupFormData.full_name}
        required
        className="form-input"
        onChange={changeSignupForm}
      />

      <label
        htmlFor="email"
        className="form-label"
      >
        Email
      </label>
      <input 
        type="text" 
        name="email"
        value={signupFormData.email}
        required
        className="form-input"
        onChange={changeSignupForm}
      />

      <label
        htmlFor="profile_img"
        className="form-label"
      >
        Profile Image URL
      </label>
      <input 
        type="text" 
        name="profile_img"
        value={signupFormData.profile_img}
        required
        className="form-input"
        onChange={changeSignupForm}
      />
      
      <label
        htmlFor="password"
        className="form-label"
      >
        Password
      </label>
      <input 
        type="password" 
        name="password"
        value={signupFormData.password}
        required
        className="form-input"
        onChange={changeSignupForm}
      />

      <label
        htmlFor="password_confirmation"
        className="form-label"
      >
        Password Confirmation
      </label>
      <input 
        type="password" 
        name="password_confirmation"
        value={signupFormData.password_confirmation}
        required
        className="form-input"
        onChange={changeSignupForm}
      />
      
      <button className="form-button">
        Create Account
      </button>

      <button 
        className="form-switch"
        onClick={clickSwitchForm}
      >
        I already have an account
      </button>
    </form>
  )
}

export default SignupForm;