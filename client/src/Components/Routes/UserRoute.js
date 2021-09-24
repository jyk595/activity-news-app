import { useEffect } from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';

import ClipsPage from '../Pages/ClipsPage';
import FeedPage from '../Pages/FeedPage';

function UserRoute({ user, renderedArticle, setRenderedArticle, articleList, setArticleList }) {

  useEffect(()=>{
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      setArticleList(data)
      setRenderedArticle(data[0])
    })
  },[])

  return(
    <>
      <Switch>
        <Route exact path="/:username/clips">
          <ClipsPage 

          />
        </Route>
        <Route exact path="/:username">
          <FeedPage 
            user={user}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            articleList={articleList}
            setArticleList={setArticleList}
          />
        </Route> 
      </Switch>
    </>
  )
}

export default UserRoute;