import { useSelector, useDispatch } from 'react-redux';

import { getRenderedArticle } from '../../redux/actions';

function NewsListCard({ article, setReadState }) {
  const { id, title, image_url } = article;
  const renderedArticle = useSelector((state) => state.renderedArticle);
  const dispatch = useDispatch();
  // const renderedImage = <img 
  //   src={image_url} 
  //   alt={title}
  //   className="article-card-preview"
  // />
  
  function clickArticleCard() {
    dispatch(getRenderedArticle(article));

    const response = fetch(`/articles/${id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_read: true
      })
    })
    
    if (response.ok) {
      response.json()
      .then((data)=>{
        article.is_read = data.is_read
        setReadState(true)
      })
    }
  }

  return(
    <button 
      className={article.is_read ? "feed-section-read feed-section-card" : "feed-section-card"}
      onClick={clickArticleCard}
    >
      <h3
        className={renderedArticle.id === article.id ? "active-nav-item" : null}
      >
        <img
          src={image_url}
          alt="preview of article"
          className="article-card-preview"
        />
        {/* {renderedImage === "success" ? renderedImage : <img src="https://i.ibb.co/VgmSGzJ/no-image.png" alt={renderedArticle.title} className="article-card-preview" />} */}
        {title}
        <span
          className={renderedArticle.id === article.id ? "article-card-arrow" : "hide-article-card-arrow"}
        >
          →
        </span>
      </h3>
    </button>
  )
}

export default NewsListCard;