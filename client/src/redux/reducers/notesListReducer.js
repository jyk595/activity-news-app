export function notesListReducer (state = false, action) {
  switch (action.type) {
    case "GET_NOTES_LIST": {
      return action.payload
    } 
    case "ADD_NOTES_LIST": {
      return [
        ...state,
        action.payload
      ]
    }
    case "EDIT_NOTE": {
      return [
        action.payload,
        ...state.filter((note)=>note.id !== action.payload.id)
      ]
    }
    case "DELETE_FROM_NOTES_LIST": {
      return state.filter((note)=> note.id !== action.payload)
    }
    default:
      return state
  }
}