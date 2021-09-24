import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm({ setUser, openLoginDialog, setOpenLoginDialog, openSignupDialog, setOpenSignupDialog }) {
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

  async function submitLoginForm(e) {
    e.preventDefault();

    const response = await fetch('/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginFormData)
    });

    if (response.ok) {
      response.json()
      .then(data=> {
        setUser(data)
        history.push(`/${data.username}`)
        setOpenLoginDialog(false)
        setLoginFormData({
          username: "",
          password: ""
        })
      })
    } else {
      response.json()
      .then(data => alert(data.errors))
    }
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
        className="form-switch"
        onClick={clickSwitchForm}
      >
        Don't have an account?
      </button>

      <button 
        className="form-button"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm;