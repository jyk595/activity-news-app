const initialTags = [
  {name: "Read Later"},
  {name: "Politics"},
  {name: "Entertainment"},
  {name: "Sports"},
  {name: "Code"}
]

export function tagListReducer(state = initialTags, action) {
  switch (action.type) {
    case "GET_TAGS": {
      return action.payload
    } default: 
      return state
  }
}