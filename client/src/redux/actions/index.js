// user Actions
export function getUser() {
  return(dispatch)=>{
    fetch('/me')
    .then((r)=>{
      if(r.ok) {
        r.json()
        .then((data) => dispatch({ type: "LOGIN", payload: data }))
      }
    })
  }
}

export function loginUser(loginFormData) {
  return async(dispatch)=>{
    const response = await fetch('/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginFormData)
    })

    if (response.ok) {
      response.json()
      .then(data=>{
        dispatch({ type: "LOGIN", payload: data })
        
        fetch(`/users/${data.id}/articles`)
        .then(res=>res.json())
        .then(moreData=>{
          dispatch({ type: "GET_RENDERED_ARTICLE", payload: moreData[0]})
        })
      })
    } else {
      response.json()
      .then(data=> alert(data.errors))
    }
  }
}

export function createUser(signupFormData) {
  return async(dispatch)=>{
    const response = await fetch('/signup',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signupFormData)
    })

    if (response.ok) {
      response.json()
      .then(data=>{
        dispatch({ type: "LOGIN", payload: data })
  
        fetch(`/conventional_add/${data.id}`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: "Getting started with 🗞️  Activity.News ↴",
            image_url: "https://deathtostock.imgix.net/000/003/651/original/RCC_-_DTS_HOME_65.jpg?w=630&h=420&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=10512746dc0b3cd4c81b733e1aac00a1",
            content: "1. Find a site you want to keep tabs on while you're browsing? Easy! Just copy the URL.TKTK2. Head over to Activity.News and add your link.TKTK3. Your links will be parsed and saved in your main feed.TKTKT4. As you finish reading your list, mark articles or delete them from your feed. TKTK5. Add notes as you go. Simply highlight the text to save it or click Add Note to write something new.TKTK6. That's it! Have fun! 🙂TKTK-- Activity.News team",
            link: "#",
            is_read: true
          })
        })
        .then(res=>res.json())
        .then(moreData=>{
          dispatch({ type: "ADD_ARTICLE_TO_ARTICLE_LIST", payload: moreData })
          dispatch({ type: "GET_RENDERED_ARTICLE", payload: moreData})
        })
      })
    } else {
      response.json()
      .then(data=>alert(data.errors))
    }
  }
}

export function updateUser(editFormData, user) {
  return(dispatch, getState)=>{
    fetch(`/users/${user.id}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editFormData)
    })
    .then(res=>res.json())
    .then((data)=>{
      dispatch({ type: "LOGIN", payload: data})
    })
  }
}

export function logoutUser() {
  return(dispatch)=>{
    fetch('/logout', {
      method:'DELETE'
    })
    dispatch({ type: "LOGOUT" })
  }
}

// Loading Actions

export function loadingOn() {
  return(dispatch) => {
    dispatch({ type:"LOADING_ON" })
  }
}

// renderedArticle Actions
export function getRenderedArticle(article) {
  return (dispatch) => {
    dispatch({ type: "GET_RENDERED_ARTICLE", payload: article })
  }
}

// articleList Actions
export function getInitialLists(user) {
  return(dispatch, getState) => {
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "GET_ARTICLE_LIST", payload: data})

      fetch('/tags')
      .then(res=>res.json())
      .then((moreData)=>{
        dispatch({ type: "GET_TAGS", payload: moreData})
      });

      fetch(`/users/${user.id}/notes`)
      .then(res=>res.json())
      .then(evenMoreData=>{
        dispatch({ type: "GET_NOTES_LIST", payload: evenMoreData})
      })
    })
  }
}

export function getArticles(user) {
  return(dispatch, getState) => {
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "GET_ARTICLE_LIST", payload: data})
    })
  }
}

export function deleteArticle(article_id) {  
  return(dispatch)=>{
    fetch(`/articles/${article_id}`,{
      method: 'DELETE'
    })
    dispatch({ type: "DELETE_ARTICLE_FROM_ARTICLE_LIST", payload: article_id }) 
  }
}

export function addArticle(addLinkData, user) {
  return(dispatch)=>{    
    fetch(`/add_link/${user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addLinkData)
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type:"GET_RENDERED_ARTICLE", payload: data})
      dispatch({ type:"ADD_ARTICLE_TO_ARTICLE_LIST", payload: data})
      dispatch({ type:"LOADING_OFF" })
    })
  }
}

export function markAllAsRead(user_id) {
  return(dispatch)=>{
    fetch(`/users/${user_id}/articles`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "MARK_RENDERED_ARTICLE_AS_READ"})
      dispatch({ type: "GET_ARTICLE_LIST", payload: data})
    })
  }
}

export function articleAsRead(article_id) {
  return(dispatch)=>{
    fetch(`/articles/${article_id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_read: true
      })
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type:"PATCH_READ_ARTICLE_LIST", payload: data })
    })
  }
}

export function patchSwitchRead(rendered_article, is_read_status) {
  return(dispatch)=>{
    fetch(`/articles/${rendered_article.id}`,{
      method: "PATCH",
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        is_read: is_read_status
      })
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type:"READ_SWITCH" })
      dispatch({ type:"PATCH_READ_ARTICLE_LIST", payload: data })
    })
  }
}

// notesList Actions
export function getNotesList(user_id) {
  return(dispatch, getState) => {
    fetch(`/users/${user_id}/notes`)
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "GET_NOTES_LIST", payload: data})
    })
  }
}

export function addNote(renderedArticleId, newForm, tagName) {
  return(dispatch) => {
    fetch(`/articles/${renderedArticleId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newForm)
    })
    .then(res=>res.json())
    .then(data=>{
      fetch(`/note_tags`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "note_id": data.id,
          "tag": tagName
        })
      })
      .then(res=>res.json())
      .then(moreData=>{
        dispatch({ type: "ADD_NOTES_LIST", payload: data})
        dispatch({ type: "ADD_NOTE_RENDERED_ARTICLE", payload: data})
      })
    })
  }
}

export function filterNotesList(userId, tagName) {
  return(dispatch) => {
    fetch(`/users/${userId}/notes`)
    .then(res=>res.json())
    .then(data=>{
      const filteredData = data.filter((article)=> `${article.tags[0].id}` === `${tagName}`)
      dispatch({ type: "GET_NOTES_LIST", payload: filteredData})
    })
  }
}

export function editNoteContent(noteId, editedContent) {
  return(dispatch) => {
    fetch(`/notes/${noteId}`,{
      method:"PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editedContent)
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type:"EDIT_NOTE", payload: data })
      dispatch({ type:"NOTE_UPDATE_ARTICLE", payload: data })
    })
  }
}

export function deleteNote(noteId) {
  return(dispatch) => {
    fetch(`/notes/${noteId}`,{
      method: "DELETE"
    })
    dispatch({ type: "DELETE_FROM_NOTES_LIST", payload: noteId})
    dispatch({ type: "DELETE_NOTE_FROM_ARTICLE", payload: noteId})
  }
}

// tagList Actions
export function setTags(data) {
  return(dispatch)=>{
    dispatch({ type: "GET_TAGS", payload: data})
  }
}