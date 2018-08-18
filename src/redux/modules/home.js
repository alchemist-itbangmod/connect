import actionCreator from '../helpers/actionCreator'

const userAction = actionCreator('home')

const TOGGLE_EDIT = userAction('TOGGLE_EDIT')
const SET_AVATAR = userAction('SET_AVATAR')

const initState = {
  isEdit: false,
  avatarUrl: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT: {
      return {
        ...state,
        isEdit: !state.isEdit
      }
    }

    case SET_AVATAR: {
      return {
        ...state,
        avatarUrl: action.payload
      }
    }

    default:
      return state
  }
}

// Actions
export const actions = {
  toggleEdit: () => ({
    type: TOGGLE_EDIT
  }),
  setAvatar: url => ({
    type: SET_AVATAR,
    payload: url
  })
}
