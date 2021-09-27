import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import { 
  Switch,
  Route
} from 'react-router-dom';

// import NotesPage from '../Pages/NotesPage';
// import FeedPage from '../Pages/FeedPage';
import RenderedArticle from '../Modules/RenderedArticle';
import NewsList from "../Modules/NewsList";
import NotesList from "../Modules/NotesList";
import ProfileExpand from "../Modules/ProfileExpand";

function UserRoute({ user, setUser, renderedArticle, setRenderedArticle, articleList, setArticleList, openProfileExpand, setOpenProfileExpand }) {
  // const { username } = useParams();
  const [notesList, setNotesList] = useState(null);
  const[readState,setReadState] = useState(false)

  useEffect(()=>{
    fetch(`/users/${user.id}/notes`)
    .then(res=>res.json())
    .then(data=>{
      setNotesList(data)
    })
  },[])

  useEffect(()=>{
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      setArticleList(data)
      setRenderedArticle(data[0])
    })
  },[setArticleList, setRenderedArticle, user.id])

  return(
    <>
      <Switch>
        <Route exact path="/:username/notes">
          {/* <NotesPage 
            user={user}
            renderedArticle={renderedArticle}
            setArticleList={setArticleList}
            setRenderedArticle={setRenderedArticle}
            // readState={readState}
            // setReadState={setReadState}
          /> */}
          <NotesList 
            user={user}
            notesList={notesList}
            setNotesList={setNotesList}
          />
          {openProfileExpand ? 
          <ProfileExpand 
            user={user}
            setUser={setUser}
            openProfileExpand={openProfileExpand}
            setOpenProfileExpand={setOpenProfileExpand}
          /> :
          <RenderedArticle 
            renderedArticle={renderedArticle}
            setArticleList={setArticleList}
            setRenderedArticle={setRenderedArticle}
            readState={readState}
            setReadState={setReadState}
          />
        }
        </Route>
        <Route exact path="/:username">
          {/* <FeedPage 
            user={user}
            setUser={setUser}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            articleList={articleList}
            setArticleList={setArticleList}
            openProfileExpand={openProfileExpand}
            setOpenProfileExpand={setOpenProfileExpand}
          /> */}
          <NewsList 
            user={user}
            articleList={articleList} 
            setArticleList={setArticleList}
            renderedArticle={renderedArticle}
            setRenderedArticle={setRenderedArticle}
            setReadState={setReadState}
          />
          {openProfileExpand ?
            <ProfileExpand 
              user={user}
              setUser={setUser}
              openProfileExpand={openProfileExpand}
              setOpenProfileExpand={setOpenProfileExpand}
            /> :
            <RenderedArticle 
              renderedArticle={renderedArticle}
              setArticleList={setArticleList}
              setRenderedArticle={setRenderedArticle}
              readState={readState}
              setReadState={setReadState}
              notesList={notesList}
              setNotesList={setNotesList}
            />
          }
        </Route> 
      </Switch>
    </>
  )
}

export default UserRoute;