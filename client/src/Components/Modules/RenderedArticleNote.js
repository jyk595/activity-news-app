import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TrashIcon from '../../Images/trash-alt-regular.svg';
import EditIcon from '../../Images/pencil-alt-solid.svg';
import { editNoteContent, deleteNote } from '../../redux/actions';

function RenderedArticleNote({ note }) {
  const dispatch = useDispatch();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    content: note.content
  })

  function clickEditNote() {
    setOpenEditForm(!openEditForm)
  }

  function changeEditForm(e) {
    setEditForm({
      content: e.target.value
    })
  }

  function submitEdit(e) {
    e.preventDefault();
    dispatch(editNoteContent(note.id, editForm));
    setOpenEditForm(false);
  }

  function clickDeleteNote() {
    dispatch(deleteNote(note.id))
  }

  return(
    <div
      className="article-note-item"
    >
      {openEditForm ? 
        <form
          onSubmit={submitEdit}
        >
          <textarea 
            name="content"
            value={editForm.content}
            className="article-note-edit-textarea"
            onChange={changeEditForm}
          />
          <input 
            type="submit"
            value="Save Content"
            className="note-item-save"
          />
        </form>
      : note.content}
      <div className="article-note-icon-container">
        {!openEditForm &&
          <img 
            src={EditIcon}
            alt="pencil edit icon"
            className="note-item-icon"
            onClick={clickEditNote}
          />
        }
        <img 
          src={TrashIcon}
          alt="trash delete icon"
          className="note-item-icon"
          onClick={clickDeleteNote}
        />
      </div>
    </div>
  )
}

export default RenderedArticleNote;