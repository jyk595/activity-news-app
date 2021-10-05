import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  Switch,
  Route
} from 'react-router-dom';

import RenderedArticle from '../Modules/RenderedArticle';
import NewsList from "../Modules/NewsList";
import NotesList from "../Modules/NotesList";
import ProfileEditDialog from '../Dialogs/ProfileEditDialog';
import LogoGif from "../../Images/activitynewslogo.gif";
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
  },[dispatch, user]);

  return(
    <>
      {notesList && articleList ?
      <Switch>
        <Route exact path="/:username/notes">
          {openProfileExpand &&
            <ProfileEditDialog 
              open={openProfileExpand}
              setOpenProfileExpand={setOpenProfileExpand}
            />
          }
          
          <NotesList />
          
          <RenderedArticle 
            readState={readState}
            setReadState={setReadState}
          />
        </Route>
        
        <Route exact path="/:username">
           {openProfileExpand &&
            <ProfileEditDialog 
              open={openProfileExpand}
              setOpenProfileExpand={setOpenProfileExpand}
            />
          }
          
          <NewsList 
            setReadState={setReadState}
          />

          <RenderedArticle 
            readState={readState}
            setReadState={setReadState}
          />
        </Route> 
      </Switch>
      :
      <div className="loading-animation-container">
        <img 
          src={LogoGif}
          alt="logo-gif-animation"  
        />
      </div>
      }
    </>
  )
}

export default UserRoute;