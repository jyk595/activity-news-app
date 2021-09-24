function RenderedArticle({ renderedArticle }) {

  console.log(renderedArticle)
  return(
    <>
    {renderedArticle &&
    <div className="article-container">
      <div className="article-image-container">
        <img 
          src={renderedArticle.image_url} 
          alt="article pic"
        />
      </div>

      <div className="article-content-container">
        <a href={renderedArticle.link} target="_blank" rel="noreferrer"><h1 className="article-h1">{renderedArticle.title}</h1></a>
        <p className="article-p">{renderedArticle.content}</p>
      </div>
    </div>}
    </>
  )
}

export default RenderedArticle;