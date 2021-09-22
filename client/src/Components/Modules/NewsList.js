import NewsListDateGroup from '../Modules/NewsListDateGroup';

function NewsList() {
  return(
    <div className="list-container">
      <div className="list-header-container">
        <h1 className="list-header">Feed</h1>
        <span className="list-count">41</span>
      </div>

      <NewsListDateGroup />
      <NewsListDateGroup />
      <NewsListDateGroup />
      <NewsListDateGroup />
    </div>
  )
}

export default NewsList;