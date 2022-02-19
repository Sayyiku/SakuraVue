/**
 * 手机号正则
 * @type {RegExp}
 */
const mobileReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/

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