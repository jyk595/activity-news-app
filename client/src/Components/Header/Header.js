import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';

import AddLinkForm from '../Forms/AddLinkForm';
import LoginDialog from '../Dialogs/LoginDialog';
import SignupDialog from '../Dialogs/SignupDialog';
import CloseX from '../../Images/times-solid.svg';

function Header({ user, setUser, setRenderedArticle, setArticleList, openProfileExpand, setOpenProfileExpand }) {
  const history = useHistory();

  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);

  function toggleAddLinkOpen() {
    setAddLinkOpen(addLinkOpen=> !addLinkOpen)
  };

  function clickLoginDialog() {
    setOpenLoginDialog(!openLoginDialog)
  };

  function clickSignupDialog() {
    setOpenSignupDialog(!openSignupDialog)
  };

  function clickProfileExpand() {
    setOpenProfileExpand(!openProfileExpand)
  }
  
  function clickLogout() {
    fetch('/logout', {
      method:'DELETE'
    })
    setUser(false);
    history.push('/');
  };

  return(
    <header>
      {openLoginDialog &&
        <LoginDialog 
          open={openLoginDialog}
          openLoginDialog={openLoginDialog}
          setOpenLoginDialog={setOpenLoginDialog}
          openSignupDialog={openSignupDialog}
          setOpenSignupDialog={setOpenSignupDialog}
          setUser={setUser}
        />
      }

      {openSignupDialog &&
        <SignupDialog 
          open={openSignupDialog}
          openSignupDialog={openSignupDialog}
          setOpenSignupDialog={setOpenSignupDialog}
          openLoginDialog={openLoginDialog}
          setOpenLoginDialog={setOpenLoginDialog}
          setArticleList={setArticleList}
          setUser={setUser}
        />
      }

      <div className="left-nav">
        <NavLink 
          to="/"
          className="nav-logo"
        >
          <span className="header-hover">◆</span>
          ACTIVITY.NEWS
        </NavLink>

        {user ?
        <div
          className="nav-item-container"
        >
          <NavLink 
            exact to={`/${user.username}`}
            activestyle={{
              fontWeight: "bold",
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">01</span>
            Feed
          </NavLink>
          <NavLink 
            exact to={`/${user.username}/notes`}
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">02</span>
            Notes
          </NavLink>
          <p
            activestyle={{
              color: "#0000ff"
            }}
            className={addLinkOpen? "nav-item active-nav-item" : "nav-item"}
            onClick={toggleAddLinkOpen}
          >
            <span className="header-hover">03</span>
            Add Article
          </p>
          {addLinkOpen &&
          <AddLinkForm 
            user={user}
            setRenderedArticle={setRenderedArticle}
            setArticleList={setArticleList}
            setAddLinkOpen={setAddLinkOpen}
          /> }
          <NavLink 
            to="/about"
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">04</span>
            About
          </NavLink>
          <p
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
            onClick={clickLogout}
          >
            <span className="header-hover">05</span>
            Logout
          </p>
        </div>
        : 
        <div
          className="nav-item-container"
        >
          <p 
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
            onClick={clickLoginDialog}
          >
            Log in
          </p>
          <p 
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
            onClick={clickSignupDialog}
          >
            Create an account
          </p>
        </div>
        }
      </div>
      
      {user &&
        <div className="profile-nav-container">
          <img 
            src={openProfileExpand ? CloseX : user.profile_img} 
            alt="nav profile pic" 
            className="profile-nav"
            onClick={clickProfileExpand}
          />
        </div>
      }
    </header>
  )
}

export default Header