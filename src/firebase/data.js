import firebase from 'firebase/app'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// Utils Functions
const returnDocOrNull = doc => (doc.exists ? doc.data() : null)

function getDataFromSnapshotQuery(snapshot) {
  return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
}

// User Method
export const queryUser = query =>
  firestore
    .collection('users')
    .where(...query)
    .get()
    .then(snapshot => {
      let users = []
      snapshot.forEach(doc => users.push(doc.data()))
      return users
    })

export const getUser = uid =>
  firestore
    .doc(`users/${uid}`)
    .get()
    .then(returnDocOrNull)

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(data, { merge: true })

export const getUserColor = user =>
  user
    .color()
    .get()
    .then(returnDocOrNull)
