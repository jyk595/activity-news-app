const currentUser = (state = {}, action) => {
  switch(action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      }
    case "LOG_OUT":
      return {
        ...state,
        user: {}
      }
    default: 
      return state
  }
}

export default currentUser;