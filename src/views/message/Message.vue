<template>
  <div id="message">
    <ScrollBar ref="ScrollBarRef"></ScrollBar>
    <ListTitle>
      <template v-slot:Header>
        <div class='pattern-header '>
          <h1>留言板</h1>
        </div>
      </template>
    </ListTitle>
    <div class="MainWrapper">
      <div class="CommentsWrapper">
        <div class="reminder">登陆后才可以留言哦 ~</div>
        <h3 class='comments-list-title'>{{ total }} 条留言 </h3>
        <div class="afterLine"></div>
        <div class="CommentTextarea">
          <el-input v-model="messageContent" type="textarea" placeholder="留点什么？ ..." :rows="6"></el-input>
          <div class="promoBtn">
            <el-button plain @click="submitMessage">BiuBiuBiu~</el-button>
          </div>
        </div>
        <!-- 评论列表 -->
        <ul v-if="isShowAvailable" class='commentwrap' v-for="(comment, i) in commentList.value" :key="comment">
          <li class='comment'>
            <div class="commentCo">
              <div class='commentinfo flex-items'>
                <img :src='comment.fromUser.avatar || defaultSettings.defaultAvatar' alt="" class="avatarImg"/>
                <div class='commeta cell'>
                  <h2>{{ comment.fromUser.nickname }}
                    <el-tag v-show="comment.fromUser.admin === 1" color="black" size="small">管理</el-tag>
                  </h2>

                  <h3>{{ comment.createTime }} | {{ parseDates(comment.createTime) }}</h3>
                </div>
                <span v-if="userInfo &&
                    (userInfo.id === comment.fromUser.id
                    || userInfo.roles.includes('admin'))"
                      class='comment-reply-link' @click="deleteMessage(comment)">删除</span>
                <span class='comment-reply-link'
                      @click="reClick(comment.id, comment.fromUser.id, comment.fromUser.nickname)">回复</span>
              </div>
              <div class="commentBody">
                <p class="commentPages">{{ comment.content }}</p>
              </div>
            </div>
            <!-- 回复列表 -->
            <ul class='commentwrap commentReWrap commentRe' style="margin-left: 50px"
                v-for="(reply, index2) in comment.replyList" :key="index2">
              <li class='comment'>
                <div class='commentinfo flex-items'>
                  <img :src='reply.fromUser.avatar || defaultSettings.defaultAvatar' alt="" class="avatarImg"/>
                  <div class='commeta cell reCommeta'>
                    <h2>{{ reply.fromUser.nickname }}
                      <el-tag v-show="reply.fromUser.admin === 1" color="black" size="small">管理</el-tag>
                    </h2>
                    <h3>{{ reply.createTime }} | {{ parseDates(reply.createTime) }}</h3>
                  </div>
                  <span v-if="userInfo &&
                            (userInfo.id === reply.fromUser.id
                            || userInfo.roles.includes('admin'))"
                        class='comment-reply-link-re' @click="deleteMessage(reply)">删除</span>
                  <span class='comment-reply-link-re'
                        @click="reClick(comment.id, comment.fromUser.id, comment.fromUser.nickname)">回复</span>
                </div>
                <div class="commentBody commentBodyRe">
                  <p class="commentPages">
                    <span class="replyNickname">@{{ reply.fromUser.nickname }}</span>
                    回复：
                    <span class="replyNickname">@{{ reply.toUser.nickname }}</span>
                    {{ reply.content }}
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <div v-else class="available">暂无留言</div>
      </div>
      <!-- 分页 -->
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="sizes"
          :current-page="currentPage"
          :pager-count="4"
          style="text-align: right"
          @current-change="currentChange">
      </el-pagination>

      <!-- 回复弹窗 -->
      <el-dialog
          v-model="reEditVisible"
          :title="dialogTitle"
          top="35vh"
          width="30%">
        <el-input v-model="reMessageContent" type="textarea" placeholder="回复 ..." :rows="3"></el-input>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="reEditVisible = false">取消</el-button>
        <el-button type="primary" @click="reSubmit">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/message.less"></style>
<style lang="less" scoped src="../article/style/article.less"></style>

<script setup>
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import ScrollBar from  '/@/components/scrollBar/ScrollBar.vue'

import {useStore} from "vuex";
import {parseDate} from "/@/utils";
import {useRouter} from "vue-router";
import defaultSettings from "/@/settings";
import {ElMessage, ElMessageBox} from "element-plus";
import {defineProps, nextTick, onMounted, reactive, ref} from "vue";
import {getAccessToken, getUserInfo} from "/@/utils/auth";
import {pageMessage, addMessage, addReply, deleteO} from '/@/api/message'


const store = useStore()
const router = useRouter()
const total = ref(0)
const sizes = ref(20)
const userInfo = ref('')
const toUserIds = ref('')
const currentPage = ref(1)
const commentIds = ref('')
const dialogTitle = ref('')
const btnLoading = ref(false)
let reEditVisible = ref(false)
const messageContent = ref('')
const ScrollBarRef = ref(null)
const reMessageContent = ref('')
const commentList = reactive([])

const isShowAvailable = ref(false)

onMounted(() => {
  comment()
  if (getAccessToken()) userInfo.value = getUserInfo()
})
// 分页
const currentChange = (current) => {
  currentPage.value = current
  comment()
}

// 重载
const reload = () => {
  // currentPage.value = 1
  comment()
}

// 日期转换
const parseDates = (str) => {
  str = str.replace(/\-/g, '/')
  return parseDate(new Date(str))
}

//获取留言列表
const comment = () => {
  const params = {
    current: currentPage.value,
    size: sizes.value,
  }
  pageMessage(params).then(res => {
    total.value = res.data.total
    const comment = res.data.records
    for (let i of comment) {
      i.del_visible = false
      const replyList = i.replyList
      for (let j of replyList) j.del_visible = false
    }
    commentList.value = comment
    if (commentList.value.length > 0) isShowAvailable.value = true
    nextTick(() => ScrollBarRef.value.scrollBar())
  }).catch(error => {
    console.error(error)
  })
}

//添加留言
const submitMessage = () => {
  if (!getAccessToken()) {
    store.dispatch('login/changeIsLogin')
    return
  }
  if (!messageContent.value.replace(/<\/?p[^>]*>/gi, '')) {
    ElMessage.info("还没输入内容呢")
    return
  }
  const params = {
    content: messageContent.value
  }
  btnLoading.value = true
  addMessage(params).then(() => {
    btnLoading.value = false
    ElMessage.success("留言成功")
    messageContent.value = ''
    reload()
  }).catch(error => {
    console.log(error)
    btnLoading.value = false
  })
}

// 点击回复
const reClick = (commentId, toUserId, nickname) => {
  if (!getAccessToken()) {
    store.dispatch('login/changeIsLogin')
    return
  }
  dialogTitle.value = '回复@ ' + nickname
  reEditVisible.value = true
  commentIds.value = commentId
  toUserIds.value = toUserId
}

//提交回复
const reSubmit = () => {
  if (!reMessageContent.value.replace(/<\/?p[^>]*>/gi, '')) {
    ElMessage.info("还没输入内容呢")
    return
  }
  const params = {
    pid: commentIds.value,
    toUserId: toUserIds.value,
    content: reMessageContent.value
  }
  addReply(params).then(() => {
    reEditVisible.value = false
    reMessageContent.value = ''
    commentIds.value = ''
    toUserIds.value = ''
    ElMessage.success("回复成功")
    reload()
  }).catch(error => {
    console.error(error)
  })
}

const deleteMessage = (del) => {
  ElMessageBox.confirm(
      '确认删除这条留言吗?',
      '提醒',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
    deleteO(del.id).then(() => {
      ElMessage.success("删除成功")
      reload()
    })
  }).catch(() => {
    ElMessage.info({message:"取消删除"})
  })
}

</script>

<style>
.el-message-box {
  margin-left: 50%;
  margin-top: 20%;
  transform: translateX(-50%);
}
.el-message-box__container {
  display: flex;
}
.el-message-box-icon--warning {
  position: absolute;
}
</style>