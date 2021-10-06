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
  return(dispatch)=>{
    fetch('/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginFormData)
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "LOGIN", payload: data })
    })
  }
}

export function createUser(signupFormData) {
  return(dispatch)=>{
    fetch('/signup',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signupFormData)
    })
    .then(res=>res.json())
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
        dispatch({ type: "GET_RENDERED_ARTICLE", payload: moreData})
      })
    })
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
  return(dispatch, getState)=>{
    fetch('/logout', {
      method:'DELETE'
    })
    dispatch({ type: "LOGOUT" })
  }
}

// renderedArticle Actions
export function getRenderedArticle(article_data) {
  return (dispatch) => {
    dispatch({ type: "GET_RENDERED_ARTICLE", payload: article_data })
  }
}

// articleList Actions
export function getArticles(user) {
  return(dispatch, getState) => {
    fetch(`/users/${user.id}/articles`)
    .then(res=>res.json())
    .then(data=>{
      dispatch({ type: "GET_ARTICLE_LIST", payload: data})
      dispatch({ type: "GET_RENDERED_ARTICLE", payload: data[0]})
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
  return(dispatch, getState)=>{
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
    })
  }
}

export function markAllAsRead(user_id) {
  return(dispatch, getState)=>{
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
      // dispatch({ type: "GET_NOTES_LIST", payload: data})
      // dispatch({ type:"FILTER_NOTES_LIST", payload: data})
      console.log(data)
      console.log(data[0].tags[0].id)
      console.log(tagName)
      const filteredData = data.filter((article)=> `${article.tags[0].id}` === `${tagName}`)
      console.log(filteredData)
      dispatch({ type: "GET_NOTES_LIST", payload: filteredData})
    })
  }
}

export function deleteNote(noteId) {
  return(dispatch) => {
    fetch(`/notes/${noteId}`,{
      method: "DELETE"
    })
    dispatch({ type: "DELETE_FROM_NOTES_LIST", payload: noteId})
  }
}

// tagList Actions
export function getTags() {
  return(dispatch, getState)=>{
    fetch('/tags')
    .then(res=>res.json())
    .then((data)=>{
      dispatch({ type: "GET_TAGS", payload: data})
    });
  }
}
