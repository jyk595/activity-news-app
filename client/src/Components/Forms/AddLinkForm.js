import { useState } from 'react';

function AddLinkForm({ user, setRenderedArticle, setArticleList }) {
  const [addLinkData, setAddLinkData] = useState({
    url: ""
  })

  function onFormChange(e) {
    setAddLinkData({
      url: e.target.value
    })
  }

  async function submitAddLink(e) {
    e.preventDefault()

    const response = await fetch(`add_link/${user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addLinkData)
    })

    if (response.ok) {
      response.json()
      .then(data=>{
        setRenderedArticle(data)
        setArticleList((articleList)=>([
          data,
          ...articleList
        ]))
      })
    } else {
      response.json()
      .then(data=> alert(data.errors))
    }
  }

  return(
    <form
      onSubmit={submitAddLink}
    >
      <input 
        type="text"
        name="url"
        value={addLinkData.url}
        placeholder="Place URL here"
        onChange={onFormChange}
      />
      <button>+</button>
    </form>
  )
}

export default AddLinkForm;