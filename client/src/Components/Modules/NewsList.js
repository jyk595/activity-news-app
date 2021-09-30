import NewsListCard from '../Modules/NewsListCard';
// import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';

function NewsList({ user, articleList, setArticleList, renderedArticle, setRenderedArticle, setReadState }) {

  async function clickAllRead() {
    const response = await fetch(`/users/${user.id}/articles`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      response.json()
      .then((data)=>{
        renderedArticle.is_read = data.is_read
        setReadState(true)
        setArticleList(data)
      })
    }
  }
  
  return(
    <>
      {articleList &&
      <div className="list-container">
        <div className="list-header-container">
          <h1 className="list-header">Feed</h1>
          <span className="list-count">{articleList.filter((article)=>!article.is_read).length}</span>
        </div>
        
        <button 
          className="list-read-button"
          onClick={clickAllRead}
        >
          Mark all as read
        </button>

        {/* <LineChart data={{"2021-05-13": 2, "2021-05-14": 5}} discrete={true} /> */}

        {articleList.map((article)=>{
          return <NewsListCard
            key={article.id}
            article={article}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            setReadState={setReadState}
          />
        })}
      </div>}
    </>
  )
}

export default NewsList;