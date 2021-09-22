import NewsList from "../Modules/NewsList";
import RenderedArticle from "../Modules/RenderedArticle";

function FeedPage({ username }) {
  return(
    <div className="feed-page-container">
      <NewsList />
      <RenderedArticle />
      <div className="controls-container">
        <button className="control-button-circle">←</button>
        <button className="control-button-filled">Clip</button>
        <button className="control-button-filled">Mark as Unread</button>
        <button className="control-button-filled">Delete</button>
        <button className="control-button-circle">→</button>
      </div>
    </div>
  )
}

export default FeedPage;