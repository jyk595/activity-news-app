import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../../redux/actions';

function LoginForm({ openLoginDialog, setOpenLoginDialog, openSignupDialog, setOpenSignupDialog }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  });

  function changeLoginForm(e) {
    setLoginFormData((loginFormData)=> ({
      ...loginFormData,
      [e.target.name]: e.target.value
    }))
  }

  function submitLoginForm(e) {
    e.preventDefault();

    dispatch(loginUser(loginFormData))
    history.push(`/${loginFormData.username}`)
    setOpenLoginDialog(false)
    setLoginFormData({
      username: "",
      password: ""
    })
  }

  function clickSwitchForm() {
    setOpenLoginDialog(!openLoginDialog)
    setOpenSignupDialog(!openSignupDialog)
  }

  return(
    <form 
      onSubmit={submitLoginForm}
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
        value={loginFormData.username}
        required
        className="form-input"
        onChange={changeLoginForm}
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
        value={loginFormData.password}
        required
        className="form-input"
        onChange={changeLoginForm}
      />

      <button 
        className="form-button"
      >
        Login
      </button>

      <button 
        className="form-switch"
        onClick={clickSwitchForm}
      >
        Don't have an account?
      </button>
    </form>
  )
}

export default LoginForm;