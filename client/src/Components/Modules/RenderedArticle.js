import { useState } from 'react';
import TextSelector from 'text-selection-react';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import ExportIcon from '../../Images/external-link-alt-solid.svg';

function RenderedArticle({ renderedArticle, setArticleList, setRenderedArticle, readState, setReadState, notesList, setNotesList, tagList }) {
  const [openAddNote, setOpenAddNote] = useState(false);
  const textSelectorTags = 
    tagList.map((tag)=>{
      return {
        text: `${tag.name}`,
        handler: (text) => {
          handleNoteAdd(text, `${tag.name}`)
        }
      }
    })

  function clickDeleteButton() {
    fetch(`/articles/${renderedArticle.id}`,{
      method: 'DELETE'
    })
    setArticleList((articleList)=>{
      const filteredList = articleList.filter((article)=>article.id !== renderedArticle.id);
      setRenderedArticle(filteredList[0]);
      return filteredList
    })
  }

  async function clickReadButton() {
    const response = await fetch(`/articles/${renderedArticle.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_read: !renderedArticle.is_read
      })
    })
    if (response.ok) {
      response.json()
      .then((data)=>{
        renderedArticle.is_read = data.is_read
        setReadState(!readState)
      })
    }
  }

  async function handleNoteAdd(text, tagName) {
    const noteForm = {
      "content": text.innerHTML
    }

    const response = await fetch(`/articles/${renderedArticle.id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(noteForm)
    })
    if (response.ok) {
      response.json()
      .then(data=>{
        fetch(`/note_tags`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "note_id": data.id,
            "tag": tagName
          })
        })
        
        setRenderedArticle((renderedArticle)=>({
          ...renderedArticle,
          notes: [
            ...renderedArticle.notes,
            data
          ]
        }))

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

  function clickAddNote() {
    setOpenAddNote(true)
  }
    
  return(
    <>
    {renderedArticle.notes && notesList &&
    <div>
      {openAddNote && <AddNoteDialog
        setOpenAddNote={setOpenAddNote}
        renderedArticle={renderedArticle}
        setRenderedArticle={setRenderedArticle}
        setNotesList={setNotesList}
      />}

      <TextSelector
        events={textSelectorTags}
        // color={'yellow'}
        colorText={false}
      />

      <div className="article-container">
        <div className="article-image-container">
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
        </div>

        <div className="article-content-container">
          <h1 
            className="article-h1"
          >
            {renderedArticle.title}
            <a 
              href={renderedArticle.link} 
              target="_blank" 
              rel="noreferrer"
              className="article-content-link"
            >
              <img 
                src={ExportIcon}
                alt="export icon"
                className="article-content-link-icon"
              />
            </a>
          </h1>

          {renderedArticle.notes.map((note)=>{
            return <p 
              key={note.id}
              className="article-note-item"
            >
              {note.content}
            </p>
          })}

          <p className="article-p">{renderedArticle.content}</p>
        </div>

        <div className="controls-container">
          <button 
            className="control-button-filled"
            onClick={clickAddNote}
          >
            Add Note
          </button>
          
          <button 
            className="control-button-filled"
            onClick={clickReadButton}  
          >{readState ? "Mark as Unread" : "Mark as Read"}
          </button>

          <button 
            className="control-button-filled"
            onClick={clickDeleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default RenderedArticle;