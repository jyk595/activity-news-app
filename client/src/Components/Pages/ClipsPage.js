import ClipsList from "../Modules/ClipsList";
import RenderedArticle from "../Modules/RenderedArticle";

function ClipsPage({ username }) {
  return(
    <>
      {username}
      <ClipsList />
      <RenderedArticle />
    </>
  )
}

export default ClipsPage;