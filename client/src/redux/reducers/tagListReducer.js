const initialTags = [
  {id: 1, name: "Read Later"},
  {id: 2, name: "Politics"},
  {id: 3, name: "Entertainment"},
  {id: 4, name: "Sports"},
  {id: 5, name: "Code"}
]

export function tagListReducer(state = initialTags, action) {
  switch (action.type) {
    case "GET_TAGS": {
      return action.payload
    } default: 
      return state
  }
}