export function userReducer(state = false, action) {
  switch (action.type) {
    case "LOGIN": {
      return action.payload
    }
    case "LOGOUT": {
      return false
    }
    default: 
      return state
  } 
};