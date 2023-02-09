<template>
  <div>
    <div class="title">模板制作</div>
    <div id="iframe-container">
      <iframe
        name="subQuestionSplit"
        :src=iframeSrc width="100%"
        :height=height></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">

  import {ElMessage, ElMessageBox} from 'element-plus'
  import {useUserStoreWithOut} from '@/store/modules/user'
  import {globalStoreWithOut} from "@/store/modules/global";
  import {storeToRefs} from "pinia";

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
    data.iframeSrc = data.rootUrl + "/newexam/marking/subQuestionSplit/" + route.query.examId + "/" + route.query.subId + "?token=" + data.token
    window.onmessage = function (e) {
      if (e.data.source === 'subQuestionSplit') {
        if (e.data.height) {
          data.height = e.data.height
        }else if (e.data.checkSubjectTemplate) {
          console.log(e.data.checkSubjectTemplate)
          canILeave.value = e.data.checkSubjectTemplate.success
          leaveMessage.value = e.data.checkSubjectTemplate.message
          if (!canILeave.value && messageBoxFlag === 0) {
            messageBoxFlag = 1;
          }
          console.log(messageBoxFlag)
        }
      }
    }
  })


  router.beforeEach((to, from, next) => {
    // 建议手写弹窗 v-if控制显示隐藏
    if (from.path === '/exam/examProcess/subject/markPaper/subjectArea' && !canILeave.value) {
      if (messageBoxFlag === 1) {
        ElMessageBox.confirm(
          "<span style='color:red;'>题块未框选完成，请继续框选</span>",
          '确定离开此网页',
          {
            cancelButtonText: '留下',
            confirmButtonText: '离开',
            type: 'info',
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          messageBoxFlag++;
          next()
        }).catch(() => {
          messageBoxFlag = 1
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
