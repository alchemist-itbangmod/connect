import { getUser, setUser, queryUser } from './data'

export const setUserData = async authUser => {
  const { displayName, email, uid } = authUser
  setUser(authUser.uid, { name: displayName, email, uid })
}

export const createOtpForUserIfNotExist = async user => {
  const userFromDB = await getUser(user.uid)
  const hasOtp = userFromDB && userFromDB.otp > -1
  if (hasOtp) return

  await generateAndSaveOtpToDB(user.uid)
}

export const generateAndSaveOtpToDB = async uid => {
  let otp = generateOtp()
  while (await otpExists(otp)) {
    otp = generateOtp()
  }
  setUser(uid, {
    otp
  })
}

const otpExists = async otp => {
  const users = await queryUser(['otp', '==', otp])
  return users.length > 0
}

const generateOtp = () => {
  const possible = 5
  const str = 'ABCDEFGHIJKLMNPQRSTVWXYZ23456789' // not have 1, 0, O
  let otp = ''

  for (var i = 0; i < possible; i++) {
    otp += str.charAt(Math.floor(Math.random() * str.length))
  }

  return otp
}
