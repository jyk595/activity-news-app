function NoteListCard({ note }) {
  return(
    <div>
      <p>{note.content}</p>
      <p>From: {note.article.title}</p>

    </div>
  )
}

export default NoteListCard;