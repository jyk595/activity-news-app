import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MailchimpSubscribe from "react-mailchimp-subscribe";

import CloseX from '../../Images/times-solid.png';

function HamburgerMenuDialog({ setOpenHamburgerDialog, setOpenSignupDialog, setOpenLoginDialog, setOpenLogoutDialog, setOpenProfileExpand }) {
  const user = useSelector((state)=>state.user);
  const url = `https://gmail.us5.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&amp;id=${process.env.REACT_APP_MAILCHIMP_ID}`
  
  function clickCloseX() {
    setOpenHamburgerDialog(false)
  };

  function clickLoginFromMenu() {
    setOpenHamburgerDialog(false)
    setOpenLoginDialog(true)
  }

  function clickSignupFromMenu() {
    setOpenHamburgerDialog(false)
    setOpenSignupDialog(true)
  }

  function clickFeedFromMenu() {
    setOpenHamburgerDialog(false)
  }

  function clickLogoutFromMenu() {
    setOpenHamburgerDialog(false)
    setOpenLogoutDialog(true)
  }

  function clickProfileFromMenu () {
    setOpenHamburgerDialog(false)
    setOpenProfileExpand(true)
  }
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="dialog-section-container">
          <div className="dialog-header-container">            
            {!user ?
            <div className="dialog-hamburger-menu-container">
              <h2 
                className="dialog-hamburger-menu-items"
                onClick={clickLoginFromMenu}
              >
                <span className="header-hover">01</span>
                Log in
              </h2>
              <h2 
                className="dialog-hamburger-menu-items"
                onClick={clickSignupFromMenu}
              >
                <span className="header-hover">02</span>
                Signup for free
              </h2>
              <div className="mailchimp-container">
                <h3>Get the trendiest news straight to your inbox.</h3>
                <MailchimpSubscribe 
                  url={url}
                />
                <p className="mailchimp-fine-print">By signing up for our newsletter, you hereby agree to our <a href="www.notion.so">privacy policy</a>.</p>
              </div>
            </div>
            :
            <div className="dialog-hamburger-menu-container">
              <h3
                className="dialog-hamburger-menu-items"
                onClick={clickProfileFromMenu}
              >
                <span className="header-hover">01</span>
                Your profile
              </h3>
              <NavLink 
                exact to={`/${user.username}`}
                className="dialog-hamburger-menu-items"
                onClick={clickFeedFromMenu}
              >
                <span className="header-hover">02</span>
                Feed
              </NavLink>
              <NavLink 
                exact to={`/${user.username}/notes`}
                className="dialog-hamburger-menu-items"
              >
                <span className="header-hover">03</span>
                Notes
              </NavLink>
              <h3
                className="dialog-hamburger-menu-items"
                onClick={clickLogoutFromMenu}
              >
                <span className="header-hover">04</span>
                Logout
              </h3>
              <div className="mailchimp-container">
              <h3>Get the trendiest news straight to your inbox.</h3>
                <MailchimpSubscribe 
                  url={url}
                />
                <p className="mailchimp-fine-print">By signing up for our newsletter, you hereby agree to our <a href="www.notion.so">privacy policy</a>.</p>
              </div>
            </div>
            }

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

export default HamburgerMenuDialog;