import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextSelector from 'text-selection-react';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import RenderedArticleNote from './RenderedArticleNote';
import ExportIcon from '../../Images/external-link-alt-solid.svg';
import { deleteArticle, getRenderedArticle, addNote } from '../../redux/actions';
import useWindowSize from '../Hooks/useWindowSize';

function RenderedArticle() {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const user = useSelector((state)=>state.user)
  const tagList = useSelector((state)=>state.tagList);
  const notesList = useSelector((state)=>state.notesList);
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const articleList = useSelector((state) => state.articleList);
  const [openAddNote, setOpenAddNote] = useState(false);
  const filteredArr = articleList.filter((article)=>article.id !== renderedArticle.id)  
    
  useEffect(()=>{
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      dispatch(getRenderedArticle(data[0]))
    })
  },[articleList, dispatch])

  function clickDeleteButton() {
    dispatch(deleteArticle(renderedArticle.id));
    dispatch(getRenderedArticle(filteredArr[0]))
  }

  function handleNoteAdd(text, tagName) {
    const noteForm = {
      "content": text.innerHTML
    }

    dispatch(addNote(renderedArticle.id, noteForm, tagName))
  }

  const parsedArticleContent = renderedArticle.content.split("TKTK")

  function clickAddNote() {
    setOpenAddNote(true)
  }
      
  return(
    <>
    {articleList && renderedArticle && renderedArticle.notes && notesList && tagList &&
    <div>
      {openAddNote && <AddNoteDialog
        setOpenAddNote={setOpenAddNote}
      />}

      {size.width > 769 &&
        <TextSelector 
          events={tagList.map((tag)=>{
            return {
              text: `${tag.name}`,
              key: tag.id,
              handler: (text) => {
                handleNoteAdd(text, `${tag.name}`)
              }
            }
          })}
          colorText={false}
        />
      }

      <div className="article-container">
        <div className="article-image-container">          
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 1"
            key="main-collage-1"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 2"
            key="main-collage-2"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 3"
            key="main-collage-3"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 4"
            key="main-collage-4"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 5"
            key="main-collage-5"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 6"
            key="main-collage-6"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
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
            return <RenderedArticleNote 
              note={note}
              key={note.id}
            />
          })}

          <div className="article-p">
            {parsedArticleContent.map((splitContent)=>{
              return <p
                key={splitContent.id}
              >
                {splitContent}</p>
            })}
          </div>
        </div>

        <div className="controls-container">
          <button 
            className="control-button-filled"
            onClick={clickAddNote}
          >
            Add Note
          </button>

          {articleList.length > 1 &&
            <button 
              className="control-button-filled"
              onClick={clickDeleteButton}
            >
              Delete
            </button>
          }
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default RenderedArticle;