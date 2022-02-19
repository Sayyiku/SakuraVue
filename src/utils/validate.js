/**
 * 手机号正则
 * @type {RegExp}
 */
const mobileReg = /^1((3[0-9])|(4[1579])|(5[0-9])|(6[6])|(7[0-9])|(8[0-9])|(9[0-9]))\d{8}$/

/**
 * 邮箱正则
 * @type {RegExp}
 */
const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/


/**
 * 验证手机号
 * @returns {Boolean}
 * @param {String} mobile
 */
export function validMobile(mobile) {
    const str = '' + mobile
    console.log(mobileReg.test('16651455760'), "is")
    return mobileReg.test(str)
}

/**
 * 验证邮箱
 * @returns {Boolean}
 * @param {String} email
 */
export function validEmail(email) {
    return emailReg.test(email)
}

export default {
    mobileReg,
    emailReg
}