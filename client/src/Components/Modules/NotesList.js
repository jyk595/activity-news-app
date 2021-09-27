import NoteListCard from './NoteListCard';

function NotesList({ user, notesList, setNotesList }) {
  
  return(
    <>
      {notesList &&
      <div className="list-container">
        <div className="list-header-container">
          <h1 className="list-header">Notes</h1>
          <span className="list-count">{notesList.length}</span>
        </div>

        {notesList.map((note)=>{
          return <NoteListCard
            key={note.id}
            note={note}
            // renderedArticle={renderedArticle}
            // setRenderedArticle={setRenderedArticle}
            // setReadState={setReadState}
          />
        })}
      </div>
      }
    </>
  )
}

export default NotesList;