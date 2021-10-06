import { useSelector, useDispatch } from 'react-redux';

import NoteListCard from './NoteListCard';
import { getNotesList, filterNotesList } from '../../redux/actions';

function NotesList() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const tagList = useSelector((state) => state.tagList);
  const notesList = useSelector((state) => state.notesList);
  const articleList = useSelector((state) => state.articleList);

  function clickTag(e) {
    if (e.target.value === "All" || e.target.value === "") {
      dispatch(getNotesList(user.id))
    } else {
      dispatch(filterNotesList(user.id, e.target.value))
    }
  }

  console.log(notesList)

  return(
    <>
      {notesList && tagList && articleList &&
      <div className="list-container">
        <div className="list-header-container">
          <h1 className="list-header">Notes</h1>
          <span className="list-count">{notesList.length}</span>
        </div>

        <select 
          className="tags-dropdown"
          onChange={clickTag}
        >
          <option value="All">All</option>
          {tagList.map((tag)=>{
            return <option 
              key= {tag.id}
              tag={tag.id}
              value={tag.id}
            >
              {tag.name}
            </option>
          })}
        </select>

        {notesList.map((note)=>{
          return <NoteListCard
            key={note.id}
            note={note}
          />
        })}
      </div>
      }
    </>
  )
}

export default NotesList;