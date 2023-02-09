<template>
  <div>
    <div class="title">模板制作</div>
    <div id="iframe-container">
      <iframe name="template" :src=iframeSrc width="100%" :height=height></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ElMessage, ElMessageBox} from 'element-plus'
  import {storeToRefs} from 'pinia'
  import {useUserStoreWithOut} from '@/store/modules/user'
  import {globalStoreWithOut} from '@/store/modules/global'

  const globalStore = globalStoreWithOut()
  const {activeIndex} = storeToRefs(globalStore)
  const {VITE_GLOB_API_URL} = process.env
  const route = useRoute()
  const router = useRouter()
  let messageBoxFlag = 0 // 默认未打开

  const data = reactive({
    token: useUserStoreWithOut().getToken,
    iframeSrc: '',
    rootUrl: VITE_GLOB_API_URL,
    height: 700,
    canILeave: true,
    leaveMessage: ""
  });

  const {iframeSrc, height, canILeave, leaveMessage} = toRefs(data)

  onMounted(() => {
    data.iframeSrc = data.rootUrl + "/newexam/marking/questionSplit/" + route.query.examId + "/" + route.query.subId + "?token=" + data.token
    window.onmessage = function (e) {
      if (e.data.source === 'template') {
        if (e.data.height) {
          data.height = e.data.height
        } else if (e.data.checkAllTemplate) {
          console.log(e.data.checkAllTemplate)
          canILeave.value = e.data.checkAllTemplate.success
          leaveMessage.value = e.data.checkAllTemplate.message
          if (!canILeave.value && messageBoxFlag === 0) {
            messageBoxFlag = 1;
          }
        }
      }
    }
  })

  router.beforeEach((to, from, next) => {
    console.log(canILeave.value)
    // 建议手写弹窗 v-if控制显示隐藏
    if (from.path === '/exam/examProcess/subject/template' && !canILeave.value) {
      if (messageBoxFlag === 1) {
        ElMessageBox.confirm(
          "<span style='color:red;'>" + leaveMessage.value + '</span>，确认离开？',
          '确定离开此网页',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'info',
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          messageBoxFlag++;
          next()
        }).catch(() => {
          messageBoxFlag = 1;
          const nav: any = route.meta.nav ? route.meta.nav : ''
          globalStore.setActiveIndex("/")
          setTimeout(() => {
            globalStore.setActiveIndex("/" + nav)
          },)
          next(false)
        })
      }else{
        next()
      }
    } else {
      next()
    }
  })

</script>

<style scoped>

  .title{
    font-weight: bold;
    font-size: 16px;
    color: #202020;
  }
</style>
