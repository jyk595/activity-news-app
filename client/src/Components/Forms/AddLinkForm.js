import { useState } from 'react';

function AddLinkForm() {
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

    const response = await fetch("add_link", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addLinkData)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }

  console.log(addLinkData)

  return(
    <form
      onSubmit={submitAddLink}
    >
      <label
        for="url"
      >

      </label>
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