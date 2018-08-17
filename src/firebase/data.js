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

export const getUser = async uid => {
  const user = await firestore
    .doc(`users/${uid}`)
    .get()
    .then(returnDocOrNull)

  if (user !== null) {
    const color = await getUserColor(user)

    return {
      ...user,
      color
    }
  } else {
    return null
  }
}

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(
    {
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )

export const getUserColor = user => user.color.get().then(returnDocOrNull)

// Friends Method
export const getFriends = uid => {
  firestore
    .collection(`friends`)
    .where('RelatingUserID', '=', uid)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )
}

export const setFriends = (userUid, friendUid) => {
  firestore.collection(`friends`).add({
    RelatingUserID: `user/${userUid}`,
    RelatedUserID: `user/${friendUid}`,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}
