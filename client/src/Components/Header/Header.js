import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AddLinkForm from '../Forms/AddLinkForm';

import logo from '../../logo.svg';

function Header({ user }) {
  const history = useHistory();

  return(
    <header>
      <div className="left-nav">
        <NavLink 
          to="/"
          className="nav-logo"
        >
          <span className="header-hover">◆</span>
          ACTIVITY.NEWS
        </NavLink>

        {user &&
        <div
          className="nav-item-container"
        >
          <NavLink 
            exact to="/:username"
            activeStyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">01</span>
            Feed
          </NavLink>
          <NavLink 
            exact to="/:username/clips"
            activeStyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">02</span>
            Clips
          </NavLink>
          <p
            to="/faq"
            activeStyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">03</span>
            Add Articles
          </p>
          <AddLinkForm />
          <NavLink 
            to="/about"
            activeStyle={{
              color: "#0000ff"
            }}
            className="nav-item"
          >
            <span className="header-hover">04</span>
            About
        </NavLink>
        </div>
        }
      </div>
      
      <img src={logo} alt="nav profile pic" className="profile-nav" />
    </header>
  )
}

export default Header