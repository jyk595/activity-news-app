import { useState, useEffect } from 'react';

import NotesList from "../Modules/NotesList";
import RenderedArticle from "../Modules/RenderedArticle";

function NotesPage({ user, renderedArticle, setArticleList, setRenderedArticle, readState, setReadState }) {
  const [notesList, setNotesList] = useState(null);

  useEffect(()=>{
    fetch(`/users/${user.id}/notes`)
    .then(res=>res.json())
    .then(data=>{
      setNotesList(notesList)
    })
  },[])
  
  return(
    <>
      <NotesList 
        user={user}
        notesList={notesList}
        setNotesList={setNotesList}
      />
      <RenderedArticle 
        renderedArticle={renderedArticle}
        setArticleList={setArticleList}
        setRenderedArticle={setRenderedArticle}
        readState={readState}
        setReadState={setReadState}
      />
    </>
  )
}

export default NotesPage;