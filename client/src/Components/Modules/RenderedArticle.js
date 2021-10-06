import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextSelector from 'text-selection-react';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import RenderedArticleNote from './RenderedArticleNote';
import ExportIcon from '../../Images/external-link-alt-solid.svg';
import { deleteArticle, getRenderedArticle, addNote, readSwitch, patchSwitchRead } from '../../redux/actions';

function RenderedArticle() {
  const dispatch = useDispatch();
  const tagList = useSelector((state)=>state.tagList);
  const notesList = useSelector((state)=>state.notesList);
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const articleList = useSelector((state) => state.articleList);
  const readState = useSelector((state)=>state.readState)
  const [openAddNote, setOpenAddNote] = useState(false);
  const filteredArr = articleList.filter((article)=>article.id !== renderedArticle.id)

  useEffect(()=>{
    dispatch(getRenderedArticle(articleList[0]));
  },[articleList, dispatch])
    
  function clickDeleteButton() {
    dispatch(deleteArticle(renderedArticle.id));
    dispatch(getRenderedArticle(filteredArr[0]))
  }

  async function clickReadButton() {
    // const response = await fetch(`/articles/${renderedArticle.id}`,{
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     is_read: !renderedArticle.is_read
    //   })
    // })
    // if (response.ok) {
    //   response.json()
    //   .then((data)=>{
    //     renderedArticle.is_read = data.is_read
    //     dispatch(readSwitch())
    //   })
    // }
    dispatch(patchSwitchRead(renderedArticle, !renderedArticle.is_read))
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

      {/* <TextSelector
        events={textSelectorTags}
        // color={'yellow'}
        colorText={false}
      /> */}

      <TextSelector 
        events={tagList.map((tag)=>{
          return {
            text: `${tag.name}`,
            handler: (text) => {
              handleNoteAdd(text, `${tag.name}`)
            }
          }
        })}
        colorText={false}
      />

      <div className="article-container">
        <div className="article-image-container">
          {/* {renderedImage.src === "success" ? renderedImage : <img src="https://i.ibb.co/VgmSGzJ/no-image.png"/>} */}
          
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 1"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 2"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 3"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 4"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 5"
            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.ibb.co/19PvMCT/no-image.png"}}
          />
          <img 
            src={renderedArticle.image_url} 
            alt="main collage 6"
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
            />
          })}

          <p className="article-p">
            {parsedArticleContent.map((splitContent)=>{
              return <p
                key={splitContent.id}
              >
                {splitContent}</p>
            })}
          </p>
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