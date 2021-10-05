import { useSelector, useDispatch } from 'react-redux';

import { getRenderedArticle, deleteNote } from '../../redux/actions';
import TrashIcon from '../../Images/trash-alt-regular.svg';
import ExportIcon from '../../Images/external-link-alt-solid.svg';


function NoteListCard({ note }) {
  const articleList = useSelector((state)=>state.articleList);
  const dispatch = useDispatch();

  function clickNoteItem() {
    const article = articleList.find((item)=>item.id === note.article.id);
    dispatch(getRenderedArticle(article));
  }

  function clickTrashDelete() {
    dispatch(deleteNote(note.id));
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
      <img 
        src={TrashIcon}
        alt="trash delete icon"
        className="note-item-icon"
        onClick={clickTrashDelete}
      />

      <a
        href={note.article.link}
        target="_blank"
      >
        <img 
          src={ExportIcon}
          alt="export new window icon"
          className="note-item-icon"
        />
      </a>

    </div>
  )
}

export default NoteListCard;