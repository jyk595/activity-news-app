import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home';
import UserRoute from './Components/Routes/UserRoute';
import { getUser } from './redux/actions/index';

function App() {
  const dispatch = useDispatch();
  const user = useSelector ((state) => state.user);
  const [openProfileExpand, setOpenProfileExpand] = useState(false);

  useEffect(()=>{
    dispatch(getUser())
  },[]);

  return (
    <Router>
      <Header 
        openProfileExpand={openProfileExpand}
        setOpenProfileExpand={setOpenProfileExpand}
      />

      <Switch>
        {user &&
        <Route path="/:username">
          <UserRoute 
            openProfileExpand={openProfileExpand}
            setOpenProfileExpand={setOpenProfileExpand}
          />
        </Route>
        }

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
