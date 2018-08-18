import { queryUsers, getFriend, setFriend } from './data'
import { generateAndSaveOtpToDB } from './login'

let failedAttempts = 0
let remainingTime = 0
let lock = false

export const addFriendWithOTP = async (userUID, otp) => {
  const friends = await queryUsers(['otp', '==', otp])
  if (friends.length > 0) {
    const friend = friends[0]
    const hasThisFriend = await getFriend(userUID, friend.uid)

    if (!hasThisFriend) {
      setFriend(userUID, friend.uid)
      generateAndSaveOtpToDB(friend.uid)
      console.log('friend added')
    } else {
      console.log('you are already have this friend')
    }
  } else {
    failedAttempts += 1
    if (failedAttempts >= 3) {
      lock = true
      remainingTime = 10
      const interval = setInterval(() => remainingTime--, 1000)
      setTimeout(() => {
        failedAttempts = 0
        lock = false
        clearInterval(interval)
      }, remainingTime * 1000)
    }
  }

  if (lock) {
    console.log('Too many invalid attempts please try again in a minute')
    return
  }

  console.log('no user with this otp')
}
