export default function appReducer (state = {
    title: 'This is a title'
  } , action) {
  switch (action.type) {
    case 'SET_TITLE':
      state = {...state, title: action.payload }
      break
  }
  return state
}
