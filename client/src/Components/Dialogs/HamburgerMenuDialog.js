import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import FadeIn from 'react-fade-in';

import CloseX from '../../Images/times-solid.png';
import { addArticle } from '../../redux/actions';

function HamburgerMenuDialog({ setOpenHamburgerDialog, setOpenSignupDialog, setOpenLoginDialog, setOpenLogoutDialog, setOpenProfileExpand }) {
  const dispatch = useDispatch();
  const [expandAddLinkHamburger, setExpandAddLinkHamburger] = useState(false);
  const [hamburgerLinkData, setHamburgerLinkData] = useState({
    url: ""
  });
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

  function clickLogoutFromMenu() {
    setOpenHamburgerDialog(false)
    setOpenLogoutDialog(true)
  }

  function clickProfileFromMenu () {
    setOpenHamburgerDialog(false)
    setOpenProfileExpand(true)
  }

  function clickHamburgerAddLink() {
    setExpandAddLinkHamburger(!expandAddLinkHamburger)
  }

  function changeHamburgerLink(e) {
    setHamburgerLinkData({
      url: e.target.value
    })
  }

  function submitAddLinkHamburger(e) {
    e.preventDefault();
    dispatch(addArticle(hamburgerLinkData, user));
    setHamburgerLinkData({ url: "" });
    setExpandAddLinkHamburger(false);
    setOpenHamburgerDialog(false);
  }
  
  return(
    <div className="dialog-container">
      <div className="dialog-form-container">
        <div className="dialog-section-container">
          <div className="dialog-header-container">            
            {!user ?
            <div className="dialog-hamburger-menu-container">
              <FadeIn>
                <h2 
                  className="dialog-hamburger-menu-items"
                  onClick={clickLoginFromMenu}
                >
                  <span className="header-hover">01</span>
                  Log in
                </h2>
              </FadeIn>

              <FadeIn>
                <h2 
                  className="dialog-hamburger-menu-items"
                  onClick={clickSignupFromMenu}
                >
                  <span className="header-hover">02</span>
                  Sign up
                </h2>
              </FadeIn>

              <div className="mailchimp-container">
                <h3>Get the trendiest news straight to your inbox.</h3>
                <MailchimpSubscribe 
                  url={url}
                />
              </div>
            </div>
            :
            <div className="dialog-hamburger-menu-container">
              <FadeIn>
                <NavLink 
                  exact to={`/${user.username}`}
                  className="dialog-hamburger-menu-items"
                  onClick={clickCloseX}
                >
                  <span className="header-hover">01</span>
                  Feed
                </NavLink>
              </FadeIn>

              <FadeIn>
                <NavLink 
                  exact to={`/${user.username}/notes`}
                  className="dialog-hamburger-menu-items"
                  onClick={clickCloseX}
                >
                  <span className="header-hover">02</span>
                  Notes
                </NavLink>
              </FadeIn>

              <FadeIn>
                <h3
                  className="dialog-hamburger-menu-items"
                  onClick={clickHamburgerAddLink}
                >
                  <span className="header-hover">03</span>
                  Add link
                </h3>
                {expandAddLinkHamburger &&
                <form
                  className="dialog-hamburger-form-container"
                  onSubmit={submitAddLinkHamburger}
                >
                  <input 
                    type="text"
                    name="url"
                    placeholder="Place URL here"
                    value={hamburgerLinkData.url}
                    className="dialog-hamburger-form-input"
                    onChange={changeHamburgerLink}
                  />
                  <input 
                    type="submit"
                    value="+"
                    className="dialog-hamburger-form-button"
                  />
                </form>
                }
              </FadeIn>

              <FadeIn>
                <h3
                  className="dialog-hamburger-menu-items"
                  onClick={clickProfileFromMenu}
                >
                  <span className="header-hover">04</span>
                  Your profile
                </h3>
              </FadeIn>

              <FadeIn>
                <h3
                  className="dialog-hamburger-menu-items"
                  onClick={clickLogoutFromMenu}
                >
                  <span className="header-hover">05</span>
                  Logout
                </h3>
              </FadeIn>

              <div className="mailchimp-container">
              <h3>Get the trendiest news straight to your inbox.</h3>
                <MailchimpSubscribe 
                  url={url}
                />
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