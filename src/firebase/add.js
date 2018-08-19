import { queryUsers, getFriend, setFriend } from './data'
import { generateAndSaveOtpToDB } from './login'
import { message } from 'antd'
let failedAttempts = 0
let remainingTime = 0
let lock = false

export const addFriendWithOTP = async (userUID, otp) => {
  const friends = await queryUsers(['otp', '==', otp])
  if (friends.length > 0) {
    const friend = friends[0]

    if (userUID === friend.uid) {
      message.error('คุณไม่สามารถเพิ่มรายชื่อที่เป็นตัวเองได้')
      return
    }

    const hasThisFriend = await getFriend(userUID, friend.uid)

    if (!hasThisFriend) {
      setFriend(userUID, friend.uid)
      generateAndSaveOtpToDB(friend.uid)
      message.success('เรียบร้อย! คุณเพิ่มรายชื่อแล้ว!')
    } else {
      message.error('คุณมีรายชื่อนี้อยู่ในลิสของคุณอยู่แล้ว')
    }
  } else {
    message.error('ไม่มีรหัสลับนี้อยู่ในระบบ')
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
    message.error(
      'คุณกรอกรหัสลับผิดมากเกินไป! กรุณาลองใหม่อีกครั้งหลังจากผ่านไป 1 นาที'
    )
    return
  }
}
