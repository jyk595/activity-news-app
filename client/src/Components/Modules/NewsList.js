import NewsListCard from '../Modules/NewsListCard';
import { useSelector, useDispatch } from 'react-redux';
// import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';

import { markAllAsRead } from '../../redux/actions';

function NewsList() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const articleList = useSelector((state)=>state.articleList);
  
  function clickAllAsRead() {
    dispatch(markAllAsRead(user.id));
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
          onClick={clickAllAsRead}
        >
          Mark all as read
        </button>

        {/* <LineChart data={{"2021-05-13": 2, "2021-05-14": 5}} discrete={true} /> */}

        {articleList.map((article)=>{
          return <div
            key={article.id}
          >
          <span>{article.count}</span>
          <NewsListCard
            article={article}
          />
          </div>
        })}
      </div>}
    </>
  )
}

export default NewsList;