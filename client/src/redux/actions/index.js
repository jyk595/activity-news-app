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
          title: "Getting started with Activity!",
          image_url: "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
          content: "Lorem ipsum",
          link: "www.google.com",
          is_read: true
        })
      })
    })
  }
}

export function updateUser(editFormData, user) {
  return(dispatch, getState)=>{
    const response = fetch(`/users/${user.id}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editFormData)
    })

    if (response.ok) {
      response.json()
      .then((data)=>{
        dispatch({ type: "LOGIN", payload: data})
      })
    } else {
      response.json()
      .then(data=> alert(data.errors))
    }
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
      dispatch({ type: "GET_RENDERED_ARTICLE", payload: data[0]})
      dispatch({ type: "GET_ARTICLE_LIST", payload: data})
    })
  }
}

export function deleteArticle(article_id) {  
  return(dispatch, getState)=>{
    fetch(`/articles/${article_id}`,{
      method: 'DELETE'
    })
    dispatch({ type: "DELETE_ARTICLE_FROM_ARTICLE_LIST", payload: article_id })
    // setArticleList((articleList)=>{
    //   const filteredList = articleList.filter((article)=>article.id !== renderedArticle.id);
    //   dispatch(getRenderedArticle(filteredList[0]))
    //   return filteredList
    // })
    // dispatch({ type: "GET_RENDERED_ARTICLE", payload: articleList.filter})    
  }
}

export function addArticle(addLinkData, user) {
  return(dispatch, getState)=>{
    fetch(`add_link/${user.id}`, {
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

// export function markAsRead(article) {
//   return(dispatch, getState)=>{
//     const response = await fetch(`/articles/${article.id}`,{
//       method: "PATCH",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         is_read: true
//       })
//     })
    
//     if (response.ok) {
//       response.json()
//       .then((data)=>{
//         // article.is_read = data.is_read
//         dispatch({ type: "ARTICLE_MARK_READ", payload: data})
//       })
//     }
//   }
// }

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
