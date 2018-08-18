import firebase from 'firebase/app'

const storageRef = firebase.storage().ref('avatars')

export const uploadAvatar = (uid, file) =>
  storageRef
    .child(`${uid}`)
    .put(file)
    .then(snapshot => snapshot)

export const getAvatar = uid =>
  storageRef
    .child(`${uid}`)
    .getDownloadURL()
    .then(url => url)
    .catch(err => {
      if (err.code === 'storage/object-not-found') return null
      return null
    })
