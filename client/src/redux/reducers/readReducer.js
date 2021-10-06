export function readReducer(state = false, action) {
  switch(action.type) {
    case "READ_TURN_TRUE": {
      return true
    }
    case "READ_SWITCH": {
      return !state
    }
    default:
      return state
  }
}