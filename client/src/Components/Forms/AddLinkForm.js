import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addArticle } from '../../redux/actions';

function AddLinkForm({ setAddLinkOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const [addLinkData, setAddLinkData] = useState({
    url: ""
  })

  function onFormChange(e) {
    setAddLinkData({
      url: e.target.value
    })
  }

  function submitAddLink(e) {
    e.preventDefault();
    dispatch(addArticle(addLinkData, user));
    setAddLinkData({
      url: ""
    });
    setAddLinkOpen(false);
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
      <button>Add Link</button>
    </form>
  )
}

export default AddLinkForm;