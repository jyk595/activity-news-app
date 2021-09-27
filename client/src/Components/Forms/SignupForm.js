import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignupForm({ openSignupDialog, setOpenSignupDialog, openLoginDialog, setOpenLoginDialog, setArticleList, setUser }) {
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

  async function submitSignupForm(e) {
    e.preventDefault();

    const response = await fetch('/signup',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signupFormData)
    })

    if (response.ok) {
      response.json()
      .then(data=>{
        setUser(data)
        history.push(`/${data.username}`)
        setOpenSignupDialog(false)
        setSignupFormData({
          username: "",
          full_name: "",
          email: "",
          profile_img: "",
          password: "",
          password_confirmation: ""
        })

        fetch(`/conventional_add/${data.id}`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: "Getting started with Activity!",
            image_url: "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
            content: "Lorem ipsum",
            link: "www.google.com",
            is_read: true
          })
        })
      })
    } else {
      response.json()
      .then(data => alert(data.errors))
    }
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