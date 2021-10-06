import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getRenderedArticle, deleteNote, editNoteContent } from '../../redux/actions';
import TrashIcon from '../../Images/trash-alt-regular.svg';
import ExportIcon from '../../Images/external-link-alt-solid.svg';
import EditIcon from '../../Images/pencil-alt-solid.svg';

function NoteListCard({ note }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [editFormData, setEditFormData] = useState({
    content: note.content
  })
  const articleList = useSelector((state)=>state.articleList);
  const dispatch = useDispatch();

  function clickNoteItem() {
    const article = articleList.find((item)=>item.id === note.article.id);
    dispatch(getRenderedArticle(article));
  }

  function clickTrashDelete() {
    dispatch(deleteNote(note.id));
  }

  function clickPencilEdit() {
    setOpenEdit(!openEdit)
  }

  function changeEditForm(e) {
    setEditFormData({
      content: e.target.value
    })
  }

  function submitEditNote(e) {
    e.preventDefault();
    dispatch(editNoteContent(note.id, editFormData));
    setOpenEdit(false)
    setEditFormData({
      content: note.content
    })
  }
  
  return(
    <div 
      className="note-item-container"
    >
      {openEdit ? 
        <form onSubmit={submitEditNote}>
          <textarea 
            type="text"
            value={editFormData.content}
            name="content"
            className="note-item-edit-input"
            onChange={changeEditForm}
          />
          <input 
            type="submit"
            value="Save Content"
            className="note-item-save"
          />
        </form>

      : <p className="note-item-content">{note.content}</p>}


      <p 
        className="note-item-from"
        onClick={clickNoteItem}
      >
        From: {note.article.title}
      </p>

      <div className="note-tag-container">
      {note.tags.map((tag)=>{
        return <p
          key={tag.id}
          className="note-tag-bubble"
        >{tag.name}</p>
      })}
      </div>
      
      {!openEdit && 
        <img 
          src={EditIcon}
          alt="edit pencil icon"
          className="note-item-icon"
          onClick={clickPencilEdit}
        />
      }

      <img 
        src={TrashIcon}
        alt="trash delete icon"
        className="note-item-icon"
        onClick={clickTrashDelete}
      />

      <a
        href={note.article.link}
        target="_blank"
        rel="noreferrer"
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