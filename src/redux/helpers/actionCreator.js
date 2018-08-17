import { defineAction } from 'redux-define'

const appsCreator = defineAction('alchemist-connect')

export default namespace => action =>
  appsCreator
    .defineAction(namespace)
    .defineAction(action)
    .toString()
