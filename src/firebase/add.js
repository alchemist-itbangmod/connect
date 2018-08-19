import { message } from 'antd'

import { queryUsers, getFriend, setFriend, getQuest, setQuestColor } from './data'
import { generateAndSaveOtpToDB } from './login'
let failedAttempts = 0
let remainingTime = 0
let lock = false

export const addFriendWithOTP = async (userUID, otp) => {
  const friends = await queryUsers(['otp', '==', otp])
  if (friends.length > 0) {
    const friend = friends[0]

    if (userUID === friend.uid) {
      message.error('You can not add yourself')
      return
    }

    const hasThisFriend = await getFriend(userUID, friend.uid)

    if (!hasThisFriend) {
      setFriend(userUID, friend.uid)
      generateAndSaveOtpToDB(friend.uid)
      message.success('Done! You have added!')
    } else {
      message.error('You are already have this friend')
    }
  } else {
    message.error('no user with this otp')
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
    message.error('Too many invalid attempts please try again in a minute')
    return
  }
}

export const addQuestMember = async (questId, otp, { userUID, color }) => {

  const questMembers = await getQuestMember(questId)
  const members = await queryUsers(['otp', '==', otp])

  if (members.length > 0 && questMembers.length > 0) {
    const [ member ] = members
    const checkMembers = await questMembers.filter(({uid}) => uid === member.uid)

    const checkColors = await checkMembers.colors > 0 && checkMembers.colors.filter(scanner => scanner && scanner.color === color)
    if (checkColors > 0) {
      message.error('You are already scan this member')
    } else {
      await setQuestColor(questId, member.uid, { userUID, color })
      generateAndSaveOtpToDB(member.uid)
      message.success('Done! You have scanned!')
    }
  } else {
    message.error('no member with this otp')
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
    message.error('Too many invalid attempts please try again in a minute')
    return
  }
}
