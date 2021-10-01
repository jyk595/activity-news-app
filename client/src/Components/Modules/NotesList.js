import { useState } from 'react';
import { useSelector } from 'react-redux';

import NoteListCard from './NoteListCard';

function NotesList() {
  const tagList = useSelector((state) => state.tagList);
  const notesList = useSelector((state) => state.notesList);
  const articleList = useSelector((state) => state.articleList);
  const renderedArticle = useSelector((state) => state.renderedArticle);
  
  const [filteredNotesList, setFilteredNotesList] = useState(notesList);

  function clickTag(e) {
    if (e.target.value === "All" || e.target.value === ""){
      setFilteredNotesList(notesList)
    } else {
      const filteredList = notesList.filter((note)=>note.tags.map((tag)=>tag.id).toString() === e.target.value)
      setFilteredNotesList(filteredList)
    }
  }

  return(
    <>
      {notesList && tagList && renderedArticle && articleList && filteredNotesList &&
      <div className="list-container">
        <div className="list-header-container">
          <h1 className="list-header">Notes</h1>
          <span className="list-count">{notesList.length}</span>
        </div>

        <select 
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
          <option>+ Add Tag</option>
        </select>

        {filteredNotesList.map((note)=>{
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