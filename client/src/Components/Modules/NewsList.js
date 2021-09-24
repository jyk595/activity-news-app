import NewsListCard from '../Modules/NewsListCard';
import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';

function NewsList({ articleList, setArticleList, renderedArticle, setRenderedArticle }) {
  return(
    <>
      {articleList &&
      <div className="list-container">
        <div className="list-header-container">
          <h1 className="list-header">Feed</h1>
          <span className="list-count">{articleList.filter((article)=>!article.is_read).length}</span>
        </div>

        <LineChart data={{"2021-05-13": 2, "2021-05-14": 5}} discrete={true} />

        {articleList.map((article)=>{
          return <NewsListCard
            key={article}
            article={article}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
          />
        })}
      </div>}
    </>
  )
}

export default NewsList;