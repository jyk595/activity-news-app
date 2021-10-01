import { useSelector, useDispatch } from 'react-redux';

import { getRenderedArticle } from '../../redux/actions';

function NoteListCard({ note }) {
  const articleList = useSelector((state)=>state.articleList);
  const dispatch = useDispatch();

  function clickNoteItem() {
    const article = articleList.find((item)=>item.id === note.article.id)
    dispatch(getRenderedArticle(article))
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
      </p>

    </div>
  )
}

export default NoteListCard;