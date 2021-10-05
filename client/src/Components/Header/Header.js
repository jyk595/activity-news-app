import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ConfirmLogoutDialog from '../Dialogs/ConfirmLogoutDialog';
import AddLinkForm from '../Forms/AddLinkForm';
import LoginDialog from '../Dialogs/LoginDialog';
import SignupDialog from '../Dialogs/SignupDialog';
import ProfileEditDialog from '../Dialogs/ProfileEditDialog';
import HamburgerMenuDialog from '../Dialogs/HamburgerMenuDialog';
import LogoGif from '../../Images/activitynewslogo.gif';

function Header({ openProfileExpand, setOpenProfileExpand, openSignupDialog, setOpenSignupDialog }) {
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openHamburgerDialog, setOpenHamburgerDialog] = useState(false);
  const user = useSelector ((state) => state.user);

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

  function clickLogoutExpand() {
    setOpenLogoutDialog(!openLogoutDialog)
  }

  function clickHamburgerMenu() {
    setOpenHamburgerDialog(!openHamburgerDialog)
  }

  return(
    <header>
      {openLogoutDialog &&
        <ConfirmLogoutDialog 
          setOpenLogoutDialog={setOpenLogoutDialog}
        />
      }

      {openLoginDialog &&
        <LoginDialog 
          open={openLoginDialog}
          openLoginDialog={openLoginDialog}
          setOpenLoginDialog={setOpenLoginDialog}
          openSignupDialog={openSignupDialog}
          setOpenSignupDialog={setOpenSignupDialog}
        />
      }

      {openSignupDialog &&
        <SignupDialog 
          open={openSignupDialog}
          openSignupDialog={openSignupDialog}
          setOpenSignupDialog={setOpenSignupDialog}
          openLoginDialog={openLoginDialog}
          setOpenLoginDialog={setOpenLoginDialog}
        />
      }

      {openHamburgerDialog &&
        <HamburgerMenuDialog 
          open={openHamburgerDialog}
          setOpenHamburgerDialog={setOpenHamburgerDialog}
          setOpenSignupDialog={setOpenSignupDialog}
          setOpenLoginDialog={setOpenLoginDialog}
          setOpenLogoutDialog={setOpenLogoutDialog}
          setOpenProfileExpand={setOpenProfileExpand}
        />
      }

       {openProfileExpand &&
        <ProfileEditDialog 
          open={openProfileExpand}
          setOpenProfileExpand={setOpenProfileExpand}
        />
       }

      <div className="left-nav">
        <img 
          src={LogoGif} 
          alt="logo gif"
          className="nav-logo-gif"
        />
        <NavLink 
          to="/"
          className="nav-logo"
        >
          <span className="logo-span">Activity.</span>
          <span className="logo-span">News</span>
        </NavLink>

        <div 
          className="hamburger-menu-container"
          onClick={clickHamburgerMenu}
        >
          <img 
            src="https://www.kindpng.com/picc/m/160-1608249_menu-icon-png-circle-transparent-png.png"
            alt="hamburger menu icon"
          />
        </div>

        {user ?
        <div
          className="nav-item-container"
        >
          <div className="nav-main-container">
          <img 
            src={user.profile_img} 
            alt="nav profile pic" 
            className="profile-nav"
            onClick={clickProfileExpand}
          />
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
          <p
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
            onClick={clickLogoutExpand}
          >
            <span className="header-hover">04</span>
            Logout
          </p>
          </div>
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
            <span className="header-hover">01</span>
            Log in
          </p>
          <p 
            activestyle={{
              color: "#0000ff"
            }}
            className="nav-item"
            onClick={clickSignupDialog}
          >
            <span className="header-hover">02</span>
            Signup for free
          </p>
        </div>
        }
      </div>

      {addLinkOpen && <div className="header-add-article-container">
        <AddLinkForm 
          setAddLinkOpen={setAddLinkOpen}
        /> 
      </div>}
    </header>
  )
}

export default Header