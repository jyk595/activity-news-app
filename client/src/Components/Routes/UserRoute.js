import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  Switch,
  Route
} from 'react-router-dom';

import Loading from '../Modules/Loading';
import RenderedArticle from '../Modules/RenderedArticle';
import NewsList from "../Modules/NewsList";
import NotesList from "../Modules/NotesList";
import ProfileEditDialog from '../Dialogs/ProfileEditDialog';
import { getInitialLists } from '../../redux/actions';

function UserRoute({ openProfileExpand, setOpenProfileExpand }) {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const loading = useSelector((state)=>state.loading);
  const notesList = useSelector((state)=>state.notesList);
  const articleList = useSelector((state)=>state.articleList);
  const tagList = useSelector((state)=>state.tagList)

  useEffect(()=>{
    dispatch(getInitialLists(user));
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

          {!loading ?
            <div>
              <NotesList />
              <RenderedArticle />
            </div>
          :
          <Loading />
          }
        </Route>
        
        <Route exact path="/:username">
           {openProfileExpand &&
            <ProfileEditDialog 
              open={openProfileExpand}
              setOpenProfileExpand={setOpenProfileExpand}
            />
          }
          
          {!loading ?
          <div>
            <NewsList />
            <RenderedArticle />
          </div>
          :
          <Loading />
          }
        </Route> 
      </Switch>
      :
      <Loading />
      }
    </>
  )
}

export default UserRoute;