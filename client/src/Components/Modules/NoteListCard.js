function NoteListCard({ note, setRenderedArticle, articleList }) {

  function clickNoteItem() {
    const article = articleList.find((item)=>item.id === note.article.id)
    setRenderedArticle(article)
  }
  
  return(
    <div 
      className="note-item-container"
    >
      <p className="note-item-content">{note.content}</p>
      <p 
        className="note-item-from"
        onClick={clickNoteItem}
      >
        From: {note.article.title}
        Source
      </p>

    </div>
  )
}

export default NoteListCard;