import firebase from 'firebase/app'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// Utils Functions
const returnDocOrNull = doc => (doc.exists ? doc.data() : null)

const getDataFromSnapshotQuery = snapshot => {
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// User Method
export const queryUsers = query =>
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
  firestore.doc(`users/${uid}`).set(
    {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )

export const getUserColor = user => user.color.get().then(returnDocOrNull)

// Friends Method
export const getFriends = async uid => {
  let friends = await firestore
    .collection(`friends`)
    .where('userUID', '==', uid)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

  const friendList = await Promise.all(
    friends.map(async friend => {
      const user = await getUser(friend.friendUID)
      return user
    })
  ).then(res => {
    return res
  })

  return friendList
}

export const getFriend = (userUID, friendUID) =>
  firestore
    .collection(`friends`)
    .where('userUID', '==', userUID)
    .where('friendUID', '==', friendUID)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

export const setFriend = async (userUID, friendUID) => {
  // 2-way add friends
  await firestore.collection(`friends`).add({
    userUID,
    friendUID,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  await firestore.collection(`friends`).add({
    userUID: friendUID,
    friendUID: userUID,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}
