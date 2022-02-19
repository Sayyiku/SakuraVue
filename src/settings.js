const defaultSettings = {
  /**
   * @type {String}
   * @description 用户未上传头像时使用的默认头像
   */
  defaultAvatar: 'https://i.w3tt.com/2022/02/11/TftpN.webp',

  /**
   * @description 首页背景图
   * @type {String}
   * @description 首页背景图, 一张图片为一个键值对，数量不限制，建议不要太多，会拖慢加载速度
   */
  BannerImg: [
    {url: 'https://i.w3tt.com/2022/02/12/Tl8dL.jpg'},
  ],

  /**
   * @type {String}
   * @description 跳转页头部背景图，随机使用以下图片
   */
  ArticleImg: [
    {url: 'https://i.w3tt.com/2022/02/12/Tl8dL.jpg'},
    {url: 'https://i.w3tt.com/2022/02/12/Tl8dL.jpg'},
    {url: 'https://i.w3tt.com/2022/02/12/Tl8dL.jpg'}
  ],

  /**
   *
   * @description 推荐文章背景图
   * @type {Boolean}
   * @description 首页推荐文章背景图, 是否使用cover字段, cover字段为编辑文章时上传的背景图
   * true: 使用
   * false: 使用下方配置
   */
     isShowCover: true,

  /**
   *    * @type {String}
   *    * @description 首页推荐文章背景图（建议使用后端返回的cover字段，使用该处则随机使用以下图片）
   */
  Feature: [
    {img: 'https://i.w3tt.com/2022/02/12/Tl8dL.jpg'},
  ],

  /**
   * @type {String}
   * @description 网页名称
   */
  title: 'Sayyiku',

  /**
   * @type {String}
   * @description 头部左侧文字
   */
  titleLeft: 'Sayyiku',


  /**
   * @type {String}
   * @description 底部信息设置
   */
  domain: 'https://sakuravue.vercel.app/', //主页链接，点击底部连接时跳转
  Copyright: 'Copyright @ Sayyiku',
  footTitle: 'Sayyiku',
  footTime: '2021-2022',
  icp: '萌ICP备20215203号'

}

export default defaultSettings
