import actionCreator from '../helpers/actionCreator'

const userAction = actionCreator('user')

const SET_USER = userAction('SET_USER')

const initState = {
  userInfo: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        userInfo: action.payload
      }
    }

    default:
      return state
  }
}

// Actions
export const actions = {
  setUser: user => ({
    type: SET_USER,
    payload: user
  })
}
