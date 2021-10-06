import { useSelector, useDispatch } from 'react-redux';
import { getRenderedArticle } from '../../redux/actions';

import { readTurnTrue, articleAsRead } from '../../redux/actions';

function NewsListCard({ article, setReadState }) {
  const dispatch = useDispatch();
  const { title, image_url } = article;
  const renderedArticle = useSelector((state) => state.renderedArticle);
  
  function clickArticleCard() {
    dispatch(getRenderedArticle(article));
    dispatch(readTurnTrue());
    // dispatch(articleAsRead(article.id))
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
          onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
        />
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