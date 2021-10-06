import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import FadeIn from 'react-fade-in';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home';
import UserRoute from './Components/Routes/UserRoute';
import { getUser } from './redux/actions/index';

function App() {
  const dispatch = useDispatch();
  const user = useSelector ((state) => state.user);
  const [openProfileExpand, setOpenProfileExpand] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);

  useEffect(()=>{
    dispatch(getUser())
  },[dispatch]);

  return (
    <Router>
      <Header 
        openProfileExpand={openProfileExpand}
        setOpenProfileExpand={setOpenProfileExpand}
        openSignupDialog={openSignupDialog}
        setOpenSignupDialog={setOpenSignupDialog}
      />
      <FadeIn>
      <Switch>
        {user &&
          <Route path="/:username">
            <UserRoute 
            />
          </Route>
        }

        <Route exact path="/">
          <Home 
            setOpenSignupDialog={setOpenSignupDialog}
          />
        </Route>
      </Switch>
      </FadeIn>

      <Footer />
    </Router>
  );
}

export default App;
