import { useState } from 'react';

import NewsList from "../Modules/NewsList";
import RenderedArticle from "../Modules/RenderedArticle";
import ProfileExpand from "../Modules/ProfileExpand";

function FeedPage({ user, setUser, renderedArticle, setRenderedArticle, articleList, setArticleList, openProfileExpand, setOpenProfileExpand }) {
  const[readState,setReadState] = useState(false)
  
  return(
    <div>
      <div>
        {articleList  && 
        <div className="feed-page-container">
          <NewsList 
            user={user}
            articleList={articleList}
            setArticleList={setArticleList}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            setReadState={setReadState}
          />

          {openProfileExpand ? 
            <ProfileExpand 
              user={user}
              setUser={setUser}
              openProfileExpand={openProfileExpand}
              setOpenProfileExpand={setOpenProfileExpand}
            /> :
            <RenderedArticle 
              renderedArticle={renderedArticle}
              setArticleList={setArticleList}
              setRenderedArticle={setRenderedArticle}
              readState={readState}
              setReadState={setReadState}
            />
          }
        </div>}
    </div>

  </div>  
  )
}

export default FeedPage;