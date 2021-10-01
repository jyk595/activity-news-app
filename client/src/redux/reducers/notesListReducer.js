export function notesListReducer (state = [], action) {
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
    default:
      return state
  }
}