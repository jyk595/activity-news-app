function NewsListCard({ article, renderedArticle, setRenderedArticle }) {
  const { id, title, image_url, is_read } = article;
  
  async function clickArticleCard() {
    setRenderedArticle(article)

    const response = await fetch(`/articles/${id}`,{
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