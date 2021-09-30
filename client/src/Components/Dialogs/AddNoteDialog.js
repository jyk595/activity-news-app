import { useState } from 'react';

import CloseX from '../../Images/times-solid.svg';

function AddNoteDialog({ setOpenAddNote, renderedArticle, setRenderedArticle, setNotesList }){
  const [noteFormData, setNoteFormData] = useState({
    content: ""
  })

  function onChangeNote(e) {
    setNoteFormData({
      [e.target.name]: e.target.value
    })
  }

  async function submitNoteForm(e) {
    e.preventDefault()

    const response=await fetch(`/articles/${renderedArticle.id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(noteFormData)
    })

    if (response.ok) {
      response.json()
      .then(data=>{        
        setRenderedArticle((renderedArticle)=>({
          ...renderedArticle,
          notes: [
            ...renderedArticle.notes,
            data
          ]
        }))
        setOpenAddNote(false)
        setNotesList((notesList)=>({
          data,
          ...notesList
        }))
      })
    } else {
      response.json()
      .then(data=> alert("Your note couldn't be added."))
    }
  }

  function clickCloseX() {
    setOpenAddNote(false)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-note-form-container">
        {/* <div className="dialog-section-container">
          hello
        </div> */}
        <div className="dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Add a note</h2>
            <button 
              className="dialog-x-button"
              onClick={clickCloseX}
            >
              <img 
                src={CloseX} className="dialog-x" 
                alt="close x"
              />
            </button>
          </div>
          <form
            onSubmit={submitNoteForm}
          >
            <label>Your note</label>
            <input 
              type="text"
              name="content"
              value={noteFormData.content}
              onChange={onChangeNote}
            />
            <input
              type="submit"
            />
          </form>
          {/* <LoginForm 
            setUser={setUser}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
            openSignupDialog={openSignupDialog}
            setOpenSignupDialog={setOpenSignupDialog}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default AddNoteDialog;