import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  Switch,
  Route
} from 'react-router-dom';

import RenderedArticle from '../Modules/RenderedArticle';
import NewsList from "../Modules/NewsList";
import NotesList from "../Modules/NotesList";
import ProfileExpand from "../Modules/ProfileExpand";
import { getTags, getNotesList, getArticles, getRenderedArticle } from '../../redux/actions';

function UserRoute({ openProfileExpand, setOpenProfileExpand }) {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const notesList = useSelector((state) => state.notesList);
  const articleList = useSelector((state) => state.articleList);
  const[readState,setReadState] = useState(false);

  useEffect(()=>{
    dispatch(getArticles(user));
    dispatch(getTags());
    dispatch(getNotesList(user.id))
  },[dispatch, user, notesList]);

  return(
    <>
      {notesList && articleList &&
      <Switch>
        <Route exact path="/:username/notes">
          <NotesList />
          
          {openProfileExpand ? 
          <ProfileExpand /> 
          :
          <RenderedArticle 
            readState={readState}
            setReadState={setReadState}
          />
          }
        </Route>
        
        <Route exact path="/:username">
          <NewsList 
            setReadState={setReadState}
          />
          {openProfileExpand ?
          <ProfileExpand /> 
          :
          <RenderedArticle 
            readState={readState}
            setReadState={setReadState}
          />
          }
        </Route> 
      </Switch>
      }
    </>
  )
}

export default UserRoute;