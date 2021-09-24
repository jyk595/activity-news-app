import { useState } from 'react';
import { useParams } from 'react-router-dom';

import NewsList from "../Modules/NewsList";
import RenderedArticle from "../Modules/RenderedArticle";

function FeedPage({ user, renderedArticle, setRenderedArticle, articleList, setArticleList }) {
  const { username } = useParams();
  const[readState,setReadState] = useState(false)

  async function clickReadButton() {
    const response = await fetch(`/articles/${renderedArticle.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_read: !renderedArticle.is_read
      })
    })
    if (response.ok) {
      response.json()
      .then((data)=>{
        renderedArticle.is_read = data.is_read
        setReadState(!readState)
      })
    }
  }


  return(
    <div>
      <div>
        {articleList  && 
        <div className="feed-page-container">
          <NewsList 
            articleList={articleList}
            setArticleList={setArticleList}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
          />
          <RenderedArticle 
            renderedArticle={renderedArticle}
          />
          
          <div className="controls-container">
            <button className="control-button-circle">←</button>
            <button className="control-button-filled">Clip</button>
            <button 
              className="control-button-filled"
              onClick={clickReadButton}  
            >{readState ? "Mark as Unread" : "Mark as Read"}</button>
            <button className="control-button-filled">Delete</button>
            <button className="control-button-circle">→</button>
          </div>
        </div>}
    </div>

  </div>  
  )
}

export default FeedPage;