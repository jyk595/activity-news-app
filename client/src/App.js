import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignupPage from './Components/Pages/SignupPage';
import Home from './Components/Pages/Home';
import AboutPage from './Components/Pages/AboutPage';
import ClipsPage from './Components/Pages/ClipsPage';
import FeedPage from './Components/Pages/FeedPage';

function App() {
  const [user, setUser] = useState(true)

  return (
    <Router>
      <Header 
        user={user}
      />
      
      <Switch>
        <Route exact path="/login">
          <SignupPage 
            user = {user}
          />
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route path="/:username/clips">
          <ClipsPage 
          />
        </Route>
        
        <Route exact path="/:username">
          <FeedPage 
          />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
