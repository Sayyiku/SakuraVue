import Cookies from 'js-cookie'
import {Base64} from 'js-base64'
import CryptoJS from 'crypto-js'

const AccessTokenKey = 'access_token'
const UsernameKey = 'username'
const PasswordKey = 'password'
const RememberKey = 'remember'
const userInfoKey = 'USER_INFO'

/**
 * 获取 accessToken
 */
export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

/**
 * 设置 accessToken
 * @param {String} token
 */
export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token, {expires: 15})
}

/**
 * 移除 accessToken
 */
export function removeAccessToken() {
  return Cookies.remove(AccessTokenKey)
}

/**
 * 设置用户名
 * @param {String} username
 */
export function setUsername(username) {
  return Cookies.set(UsernameKey, Base64.encode(username), {expires: 15})
}

/**
 * 获取用户名
 */
export function getUsername() {
  const v = Cookies.get(UsernameKey)
  return v ? Base64.decode(v) : v
}

/**
 * 移除 用户名
 */
export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

/**
 * 设置密码
 * @param {String} password
 */
export function setPassword(password) {
  return Cookies.set(PasswordKey, Base64.encode(password), {expires: 15})
}

/**
 * 获取密码
 */
export function getPassword() {
  const v = Cookies.get(PasswordKey)
  return v ? Base64.decode(v) : v
}

/**
 * 移除 密码
 */
export function removePassword() {
  return Cookies.remove(PasswordKey)
}

/**
 * 设置记住密码
 */
export function setRemember(checked) {
  return Cookies.set(RememberKey, checked, {expires: 15})
}

/**
 * 获取记住密码
 */
export function getRemember() {
  return Cookies.get(RememberKey)
}


/**
 * 设置用户信息
 */
export function setUserInfo(userInfo) {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(userInfoKey))
}

/**
 * 删除用户信息
 */
export function removeUserInfo() {
  localStorage.removeItem(userInfoKey)
}


/**
 * 判断移动端
 */
export function isMobile() {
  return navigator.userAgent.match
  (
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}

/**
 * 多个监听window方法
 */
export function addEvent(type, toDo) {
  if (window.attachEvent) {
    window.attachEvent('on' + type, function() {
      toDo.call(window)
    })
  } else {
    window.addEventListener(type, toDo, false)
  }
}

/**
 * 点击滚动
 */
export function scrollAnimation(currentY, targetY) {
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY;
  let _currentY = currentY;
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    window.scrollTo(_currentY, currentY);
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}

export default {
  //加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'zaqxswcde123vfr4';
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'zaqxswcde123vfr4';
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },


  debounce(fn, delay) {
    let timer = null;
    return function () {
      let context = this, args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}


