# Vue 3 + Vite 

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [IDEA](https://www.jetbrains.com/idea/)

> 前端项目地址：https://gitee.com/aarabbit1/sakuravue.git

> 后台项目地址：https://gitee.com/aarabbit1/apiadmin.git

> 后端项目地址：https://gitee.com/aarabbit1/spring-boot.git

#### vue3 + vite + ElementPlus，前后端分离博客，基于Sakura主题重构，此仓库为前端，持续更新
拉取后 
- yarn install 安装依赖
- yarn dev 启动本地开发模式
- yarn build 打包项目

在原主题基础上
####添加多用户登录功能，可以评论收藏点赞，删除评论为本人与管理员可删除
####添加个人信息修改功能
####添加用户收藏文章
更多功能持续(缓慢)更新....

修改前端发送的客户端密钥在 src/api/user 修改账号登录、第三方、手机登录、退出登录四个地方，要与数据库的客户端相匹配，值为base64加密后的值加上Basic，
例如 "Basic PC:1234"，PC:1234 加密为 UEM6MTIzNA==
#### 图片资源尽量使用oss，因为vite打包对静态资源还有些问题，
使用nginx反向代理OSS到内网访问，然后再返回到外网，可以免费使用流出流量

#### 网页设置多数在 src/settings

线上地址：https://nannan.website/

