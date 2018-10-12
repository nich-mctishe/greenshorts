export default function postsReducer (state = {
    fetching: false,
    fetched: false,
    items: [],
    error: null
  } , action) {
  // switch (action.type) {
  //   case 'FETCH_USERS_PENDING':
  //     state = {...state, fetching: true }
  //     break
  //   case 'FETCH_USERS_FULFILLED':
  //     console.log(action.payload)
  //     state = {
  //       ...state,
  //       fetching: false,
  //       fetched: true,
  //       items: action.payload.data
  //     }
  //     break
  //   case 'FETCH_USERS_REJECTED':
  //     state = {
  //       ...state,
  //       fetching: false,
  //       fetched: false,
  //       error: action.payload
  //     }
  //     break
  // }
  return state
}
