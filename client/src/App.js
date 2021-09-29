import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home';
import AboutPage from './Components/Pages/AboutPage';
import UserRoute from './Components/Routes/UserRoute';

function App() {
  const [user, setUser] = useState(false);
  const [renderedArticle, setRenderedArticle] = useState({
    "title": "Getting started with Activity!",
    "image_url": "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
    "content": "Lorem ipsum",
    "link": "www.google.com",
    "is_read": true
  });
  const [articleList, setArticleList] = useState(null);
  const [openProfileExpand, setOpenProfileExpand] = useState(false);

  useEffect(()=>{
    fetch('/me')
    .then((r)=>{
      if(r.ok) {
        r.json()
        .then((user) => setUser(user))
      }
    })
  },[]);

  return (
    <Router>
      <Header 
        user={user}
        setUser={setUser}
        setRenderedArticle={setRenderedArticle}
        setArticleList={setArticleList}
        openProfileExpand={openProfileExpand}
        setOpenProfileExpand={setOpenProfileExpand}
      />

      <Switch>
        <Route exact path="/about">
          <AboutPage />
        </Route>

        {user &&
        <Route path="/:username">
          <UserRoute 
            user={user}
            setUser={setUser}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            articleList={articleList}
            setArticleList={setArticleList}
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
