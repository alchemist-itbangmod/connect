/* eslint-env node, mocha */

import { checkMailKmutt } from './check-mail-kmutt'
import chai from 'chai'

const should = chai.should()

describe('Check Mail KMUTT', () => {
  it('should return false when email not match @mail.kmutt.ac.th', () => {
    const isKmutt = checkMailKmutt('keerati.potae@gmail.com')
    isKmutt.should.be.a('boolean').equal(false)
  })
  it('should return true when email match @mail.kmutt.ac.th', () => {
    const isKmutt = checkMailKmutt('keerati.potae@mail.kmutt.ac.th')
    isKmutt.should.be.a('boolean').equal(true)
  })
})
