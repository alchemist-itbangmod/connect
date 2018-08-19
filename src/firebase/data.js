import firebase from 'firebase/app'
import * as R from 'ramda'
import { getAvatar } from './storage'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// Utils Functions
const returnDocOrNull = doc => (doc.exists ? doc.data() : null)

const getDataFromSnapshotQuery = snapshot => {
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const userInfoSchema = [
  'color',
  'name',
  'nickName',
  'level',
  'uid',
  'bio',
  'stdID'
]

// User Method
export const queryUsers = query =>
  firestore
    .collection('users')
    .where(...query)
    .get()
    .then(snapshot => {
      let users = []
      snapshot.forEach(doc => users.push(R.pick(userInfoSchema, doc.data())))
      return users
    })

export const getUser = uid =>
  firestore
    .doc(`users/${uid}`)
    .get()
    .then(returnDocOrNull)

export const getRealtimeUser = (uid, callback) =>
  firestore.doc(`users/${uid}`).onSnapshot(async snapshot => {
    if (snapshot.empty) {
      callback(null)
    } else {
      const user = snapshot.data()
      callback(user)
    }
  })

export const setUser = (uid, data = {}) =>
  firestore.doc(`users/${uid}`).set(
    {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )

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
      return R.pick(userInfoSchema, user)
    })
  ).then(res => {
    return res
  })

  return friendList
}

export const getRealtimeFriends = async (uid, callback) =>
  firestore
    .collection(`friends`)
    .where('userUID', '==', uid)
    .onSnapshot(async snapshot => {
      if (snapshot.empty) {
        callback(null)
      } else {
        let friends = getDataFromSnapshotQuery(snapshot)
        await Promise.all(
          friends.map(async friend => {
            const user = await getUser(friend.friendUID)
            const avatarUrl = await getAvatar(friend.friendUID)
            return { ...R.pick(userInfoSchema, user), avatarUrl }
          })
        ).then(res => {
          callback(res)
        })
      }
    })

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

export const getQuests = currentDate =>
  firestore
    .collection(`quests`)
    .where('startDate', '==', currentDate)
    .get()
    .then(
      snapshot => (snapshot.empty ? null : getDataFromSnapshotQuery(snapshot))
    )

export const getQuest = async (questId) => {
  let quest = await firestore
    .collection(`quests`)
    .doc(`${questId}`)
    .get()
    .then(
      doc => (doc.exists ? { ...doc.data() } : null)
    )
  return quest
}

export const setQuestColor = async (questId, memberUID, scanner) => {
  console.log('setQuestColor', questId, memberUID, scanner)
  await firestore.collection(`quests`).doc(questId).update({
    colors: firebase.firestore.FieldValue.arrayUnion({
      ...scanner,
      createdAt: firebase.firestore.Timestamp.now()
    })
  })
}
