<template>
  <div>
    <div slot="header">
      <div class="card-title">
        <span class="title">{{ subName }}科目设置</span>
        <span v-if="subjectProcess.step < 3" class="toggle-btn">
          <img class="img" :src="toggleIcon" alt="">
          <el-link :underline="false" type="primary" class="text"
                   @click="typeChangeVisible = true">切换科目模式</el-link>
        </span>
      </div>
    </div>
    <div ref="subjectCard" class="subject-card">
      <div class="item">
        <img class="img" :src="processSuccess" alt="">
      </div>
      <div class="item2">考务人员管理</div>
      <div class="item3">
        <span class="mb-5" style="display: flex;">
          <span class="mr-12" style="width: 98px;">本科目考生总数</span>
          <span class="text-blue">{{ subjectProcess.studentCount }}</span>
          <span>人</span>
        </span>
        <span class="mb-5" style="display: flex;">
          <span class="mr-12" style="width: 98px;">本科目班级总数</span>
          <span class="text-blue">{{ subjectProcess.classCount }}</span>
          <span>个</span>
        </span>
        <span style="display: flex;">
          <span class="mr-12" style="width: 98px;">教学班总数</span>
          <span class="text-blue">{{ subjectProcess.teachClassCount }}</span>
          <span>个</span>
        </span>
      </div>
      <div class="item4">
        <el-button type="primary" style="width: 140px; height: 32px;" @click="goStudentManagement">考生管理</el-button>
      </div>
      <div class="line-bg"></div>
    </div>

    <!--  第三方模式  -->
    <div v-if="subjectProcess.sheetCardType === 0" ref="subjectCard" class="subject-card" :class="'card-dark'">
      <div class="item">
        <img class="img" :src="subjectProcess.step < 2?processNotStarted:processSuccess" alt="">
      </div>
      <div class="item2">试卷题块建立</div>
      <div class="item3">
        <span>设置试卷结构及答案</span>
      </div>
      <div class="item4">
        <el-button type="primary" style="width: 140px; height: 32px;" @click="goQuestionStructure">试题结构建立
        </el-button>
      </div>
      <div class="line-bg" :class="subjectProcess.step < 2?'line-bg-info':''"></div>
    </div>
    <div v-if="subjectProcess.sheetCardType === 0" ref="subjectCard" class="subject-card">
      <div class="item">
        <img class="img" :src="subjectProcess.step < 3?processNotStarted:processSuccess" alt="">
      </div>
      <div class="item2">模版框选制作</div>
      <div class="item3"><span>设置标题、考号、客观题等模板位置</span></div>
      <div class="item4">
        <el-button
            :disabled="subjectProcess.step < 2"
            :type="subjectProcess.step < 2?'info':'primary'"
            :plain="subjectProcess.step < 2"
            style="width: 140px; height: 32px;"
            @click="goMarkTemplate"
        >模板制作
        </el-button>
      </div>
      <div class="line-bg" :class="subjectProcess.step < 3?'line-bg-info':''"></div>
    </div>
    <!--  第三方模式结束  -->

    <!--  系统答题卡模式  -->
    <div v-if="subjectProcess.sheetCardType === 1" ref="subjectCard" class="subject-card card-dark">
      <div class="item">
        <img class="img" :src="subjectProcess.step < 2?processNotStarted:processSuccess" alt="">
      </div>
      <div class="item2">系统答题卡关联</div>
      <div class="item3">
        <span style="margin-bottom: 18px; display: flex;">
          <span class="mr-10" style="min-width: 126px;">修改试卷结构及答案</span>
          <span class="text-blue">去处理</span>
        </span>
        <span style="display: flex;">
          <span class="mr-10" style="min-width: 126px;">修改模版框选大小</span>
          <span class="text-blue">去处理</span>
        </span>
      </div>
      <div class="item4">
        <el-button type="primary" style="width: 140px; height: 32px;">系统答题卡关联</el-button>
      </div>
      <div class="line-bg" :class="subjectProcess.step < 2?'line-bg-info':''"></div>
    </div>
    <!--  系统答题卡模式结束  -->

    <div ref="subjectCard" class="subject-card" :class="subjectProcess.sheetCardType === 0?'card-dark':''">
      <div class="item">
        <img class="img"
             :src="subjectProcess.step < 4 && subjectProcess.uploadSuccessCount <= 0?processNotStarted:processSuccess"
             alt="">
      </div>
      <div class="item2">学生答卷扫描</div>
      <div class="item3">
        <span style="margin-bottom: 18px;">
          <span class="mr-10">已上传学生/参加考试学生</span>
          <span class="text-blue">
            {{ subjectProcess.uploadSuccessCount }} / {{ subjectProcess.studentCount }}
          </span>
        </span>
        <span>
          <span style="margin-right: 85px;">缺考学生数量</span>
          <span class="text-blue">{{ subjectProcess.absentStudentCount }}</span>
        </span>
      </div>
      <div class="item5">
        <span style="margin-bottom: 18px;">
          <span class="mr-10">未上传学生数量</span>
          <span class="text-blue">{{ subjectProcess.notUploadCount }}</span>
        </span>
        <span>
          <span style="margin-right: 24px;">扫描明细结果</span>
          <span :class="subjectProcess.uploadSuccessCount > 0?['text-blue','cursor-pointer']:'un-click-text'"
                @click="goObjectError">去查看</span>
        </span>
      </div>
      <div class="item4">
        <el-button
            :disabled="subjectProcess.step < 3"
            :type="subjectProcess.step < 3?'info':'primary'"
            :plain="subjectProcess.step < 3"
            style="width: 140px; height: 32px;"
            @click="goScanMonitor"
        >扫描监控
        </el-button>
      </div>
      <div class="line-bg" :class="subjectProcess.step < 4?'line-bg-info':''"></div>
    </div>
    <div ref="subjectCard" class="subject-card" :class="subjectProcess.sheetCardType === 0?'':'card-dark'">
      <div class="item">
        <img class="img"
             :src="(subjectProcess.quesCount <= 0 || subjectProcess.unassignedQuesCount > 0 || subjectProcess.notSelectionQuesCount > 0)&&!canStepFrom3To5 && subjectProcess.step<6?processNotStarted:processSuccess"
             alt="">
      </div>
      <div class="item2">题块与阅卷任务分配</div>
      <div class="item3">
        <span style="margin-bottom: 18px;">
          共 <span class="text-blue-no-mr">{{ subjectProcess.quesCount }}</span> 个题块,
          <span class="text-blue-no-mr">{{ subjectProcess.unassignedQuesCount }}</span> 个题块未分配阅卷,
          <span class="text-blue-no-mr">{{ subjectProcess.notSelectionQuesCount }}</span> 个题块未完成框选
        </span>
        <span>
          <span>已完成 </span>
          <span class="text-blue">{{ subjectProcess.completedTaskCount }}%</span>
          <span>阅卷任务 </span>
          <span :class="subjectProcess.step >= 3?['text-blue-no-mr', 'cursor-pointer']:'un-click-text'"
                @click="goMarkDetail">查看阅卷明细</span>
        </span>
      </div>
      <div class="item4">
        <el-button
            :disabled="subjectProcess.step < 2"
            :type="subjectProcess.step < 2?'info':'primary'"
            :plain="subjectProcess.step < 2"
            style="width: 140px; height: 32px;"
            @click="goMarkPaper"
        >题块与阅卷任务分配
        </el-button>
      </div>
      <div class="line-bg"
           :class="subjectProcess.quesCount === 0 || (subjectProcess.unassignedQuesCount > 0 || subjectProcess.notSelectionQuesCount > 0)?'line-bg-info':''"></div>
    </div>
    <div ref="subjectCard" class="subject-card" :class="subjectProcess.sheetCardType === 0?'card-dark':''">
      <div class="item">
        <img class="img" :src="subjectProcess.step < 6?processNotStarted:processSuccess" alt="">
      </div>
      <div class="item2">成绩发布</div>
      <div class="item3">
        <span v-if="subjectProcess.step < 6">
          成绩未发布
        </span>
        <span v-else>
          成绩已发布
          <span style="color: #4381e5; font-size: 14px; cursor: pointer;" @click="goScoreManage">
          查看成绩页面
          </span>
        </span>
      </div>
      <div class="item4">
        <el-button
            :disabled="(subjectProcess.step < 5 || remainNum > 0) && !canStepFrom3To5 && subjectProcess.step < 6"
            :type="subjectProcess.step < 5 && !canStepFrom3To5?'info':'primary'"
            :plain="subjectProcess.step < 5 && !canStepFrom3To5"
            style="width: 140px; height: 32px;"
            @click="calculateScore"
        >成绩发布
        </el-button>
      </div>
    </div>

    <el-dialog
        v-model="typeChangeVisible"
        title="请选择科目模式"
        destroy-on-close
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
      <template #default>
        <div class="sheet-card-dialog">
          <div class="sheet-card-type system" :class="subjectProcess.sheetCardType === 1?'sel':''"
               @click="subjectProcess.sheetCardType = 1">
            <img :src="sheetCardSystem" alt="">
          </div>
          <div class="sheet-card-type other" :class="subjectProcess.sheetCardType <= 0?'sel':''"
               @click="subjectProcess.sheetCardType = 0">
            <img :src="sheetCardOther" alt="">
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="updateSheetCardType(subjectProcess.sheetCardType)">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <score-publish
        v-model="dialogVisible"
        :notify-data="notifyData"
        @visibleChange="dialogVisibleChange"
        @statusChange="statusChange"
        :queryParam="{subId:subjectProcess.subId,...route.query}"
        :msg="msg"
        :publishStatus="publishStatus"
    ></score-publish>
  </div>
</template>

<script setup lang="ts">
import {
  getMarkScheduleApi,
  getSubjectProcessInfoApi,
  updateSubjectSheetCardTypeApi,
  calculateScoreApi,
  checkSubjectQuesApi
} from '@/api/subject'
import { ElMessage } from 'element-plus'
import { useUserStoreWithOut } from '@/store/modules/user'
import router from '@/router'

// 图标资源引入
import toggleIcon from '@/assets/toggle-icon.png'
import processSuccess from '@/assets/process_success.png'
import processNotStarted from '@/assets/process_not_started.png'
import sheetCardSystem from '@/assets/sheet-card-system.png'
import sheetCardOther from '@/assets/sheet-card-other.png'
import ScorePublish from 'components/ProgressNotify/scorePublish.vue';

type apiType = {
  examId: any,
  subName: any,
  sheetCardType: any
}

const userInfo = useUserStoreWithOut().getUserInfo
const route = useRoute()
const examId = route.query.examId
let subName = route.query.subName
let gradeId = route.query.grade
const typeChangeVisible = ref<boolean>(false)
const remainNum = ref<number>(100) // 剩余
const canStepFrom3To5 = ref<boolean>(false)  // 是否能从3跳到5，因为没有主观题，并且已有扫描任务

const data = reactive({
  subjectProcess: {
    step: 0,
    sheetCardType: -1,
    completedTaskCount: '0%',
    subId: '',
    subName: '',
    uploadSuccessCount: 0
  },
  markScheduleQuery: {
    examId: '',
    subName: '',
    specType: 0
  },
  totalNumVos: [{
    paperTotalNum: 0,
    realTotalNum: 0,
    lostNum: 0,
  }],
  routerParam: {
    examId: ref<any>(''),
    subName: ref<any>(''),
    gradeId: ref<any>(''),
    subId: ref<any>(''),
    schoolId: ref<any>(''),
  },
  dialogVisible: false,
  notifyData: {},
  msg:{
    objAnswer: null,
    objAnswerNoScore: null,
    multiObjSet: null,
    quesNum: null,
    imgError: null,
  },
  publishStatus: 0
})

const {subjectProcess, markScheduleQuery, totalNumVos, dialogVisible, notifyData, msg, publishStatus} = toRefs(data)

function getSubjectProcessInfo(query: any) {
  getSubjectProcessInfoApi(query).then((res: any) => {
    if (res.success) {
      // 判断答题卡类型
      subjectProcess.value = res.data
      typeChangeVisible.value = subjectProcess.value.sheetCardType < 0
      if (subjectProcess.value.sheetCardType < 0) {
        subjectProcess.value.sheetCardType = 0
      }
      markScheduleQuery.value.examId = query.examId
      markScheduleQuery.value.subName = query.subName
      getMarkSchedule(markScheduleQuery.value)
      if (subjectProcess.value.step === 3){
        checkSubjectQues()
      }
      let examInfo = sessionStorage.getItem(examId as string)
      if (examInfo) {
        let parse = JSON.parse(examInfo)
        parse.subId = subjectProcess.value.subId
        parse.subName = subjectProcess.value.subName
        sessionStorage.setItem(parse.id, JSON.stringify(parse))
      }
    } else {
      ElMessage.error('查询失败')
    }
  })
}

function updateSheetCardType(type: any) {
  const update = ref<apiType>({
    examId: examId,
    subName: subName,
    sheetCardType: type,
  })
  updateSubjectSheetCardTypeApi(update.value).then((res: any) => {
    if (res.success) {
      ElMessage.success('修改成功 !')
      typeChangeVisible.value = false
    } else {
      ElMessage.error('修改失败 !')
    }
  })
}

function getMarkSchedule(query: any) {
  getMarkScheduleApi(query).then((res: any) => {
    if (res.success) {
      totalNumVos.value = res.totalNumVos
      if (totalNumVos.value.length > 0) {
        let subTotalGiven = 0 //55
        let totalLeaveNum = 0//0
        for (let i = 0; i < totalNumVos.value.length; i++) {
          subTotalGiven += totalNumVos.value[i].paperTotalNum
          totalLeaveNum += totalNumVos.value[i].lostNum
        }
        const subTotalDone = subTotalGiven - totalLeaveNum//55
        const totalNum = subTotalDone + totalLeaveNum//55
        remainNum.value = totalLeaveNum
        subjectProcess.value.completedTaskCount = (subTotalDone * 100 / totalNum).toFixed(2)
        if (res.step && subjectProcess.value.step < res.step) {
          subjectProcess.value.step = res.step
        }
      }
    }
  })
}

function calculateScore() {
  const data = {
    examId: examId,
    subId: subjectProcess.value.subId,
  }
  dialogVisible.value = true
  publishStatus.value = 0
  calculateScoreApi(data).then((res: any) => {
    if (!res.success) {
      if (res.errorCode === 1) {
        msg.value = res.data
        publishStatus.value = 2
      }
    }
    const query = ref<apiType>({
      examId: examId,
      subName: subName,
      sheetCardType: undefined
    })
    getSubjectProcessInfo(query.value)
  })
}

function checkSubjectQues(){
  const data = {
    examId: examId,
    subName: subName,
  }
  checkSubjectQuesApi(data).then((res:any)=>{
    if (res.success){
      canStepFrom3To5.value = true
    }
  })
}

function dialogVisibleChange(f: any) {
  dialogVisible.value = f
}

function statusChange(f: any) {
  publishStatus.value = f
}

/*页面跳转相关区域*/
const {routerParam} = toRefs(data)

// 跳转单科学生管理页面
function goStudentManagement() {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  router.push({name: 'subjectStudentManagement', query: routerParam.value})
}

// 跳转扫描监控
const goScanMonitor = () => {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  routerParam.value.schoolId = userInfo.schoId
  router.push({name: 'scanMonitor', query: routerParam.value})
}

// 跳转阅卷题块建立
const goMarkPaper = () => {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  routerParam.value.gradeId = route.query.gradeId
  router.push({name: 'markPaper', query: routerParam.value})
}

/* 跳转模板制作 */
function goMarkTemplate() {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  router.push({
    name: 'processTemplate', query: {
      examId: routerParam.value.examId,
      subId: routerParam.value.subId,
      subName: routerParam.value.subName
    }
  })
}

/* 跳转试卷试题结构建立页面 */
function goQuestionStructure() {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  router.push({
    name: 'processObjectiveItem', query: {
      examId: routerParam.value.examId,
      subId: routerParam.value.subId,
      subName: routerParam.value.subName
    }
  })
}

/* 跳转阅卷明细 */
function goMarkDetail() {
  if (subjectProcess.value.step >= 3) {
    routerParam.value.examId = examId
    routerParam.value.subName = subName
    routerParam.value.subId = subjectProcess.value.subId
    router.push({
      name: 'processProcess', query: {
        examId: routerParam.value.examId,
        subId: routerParam.value.subId,
        subName: routerParam.value.subName
      }
    })
  }
}

/* 跳转扫描结果（客观题异常） */
function goObjectError() {
  if (subjectProcess.value.step >= 3 && subjectProcess.value.uploadSuccessCount > 0) {
    routerParam.value.examId = examId
    routerParam.value.subName = subName
    routerParam.value.subId = subjectProcess.value.subId
    router.push({
      name: 'processObjectError', query: {
        examId: routerParam.value.examId,
        subId: routerParam.value.subId,
        subName: routerParam.value.subName
      }
    })
  }
}

/* 成绩页面 */
function goScoreManage() {
  routerParam.value.examId = examId
  routerParam.value.subName = subName
  routerParam.value.subId = subjectProcess.value.subId
  routerParam.value.schoolId = userInfo.schoId
  router.push({
    name: 'processOverview', query: {
      examId: routerParam.value.examId,
      subId: routerParam.value.subId,
      subName: routerParam.value.subName,
      schoolId: routerParam.value.schoolId
    }
  })
}

/*页面跳转区域结束*/
onMounted(() => {
  if (subName) {
    const query = ref<apiType>({
      examId: examId,
      subName: subName,
      sheetCardType: undefined
    })
    getSubjectProcessInfo(query.value)
  }
})

watch(() => dialogVisible, (newVal) => {
  if (!newVal.value) {
    notifyData.value = {}
  }
})

const {proxy}: any = getCurrentInstance()

proxy.$socket.on('notify', (res: any) => {
  if (res && res.notifyId === 'calculateScore') {
    notifyData.value = res
  }
});


</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 14px;
  height: 22px;
  display: flex;
  justify-content: left;
  align-items: center;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #202020;
    line-height: 22px;
    margin-right: 20px;
  }

  .toggle-btn {
    line-height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      width: 93px;
      height: 22px;
      font-size: 14px;
      color: #4381e5;
      line-height: 22px;
    }

    .img {
      width: 20px;
      height: 20px;
    }
  }
}

.subject-card {
  background-color: #f8fbff;
  border-radius: 4px;
  width: 1280px;
  height: 100px;
  position: relative;
  margin-bottom: 10px;

  .item {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
    height: 30px;

    .img {
      width: 30px;
      height: 30px;
    }
  }

  .item2 {
    margin-left: 70px;
    line-height: 100px;
    font-size: 14px;
    font-weight: bold;
    color: #202020;
  }

  .item3 {
    margin-left: 220px;
    position: absolute;
    top: 50%;
    display: grid;
    transform: translate(0, -50%);
  }

  .item5 {
    margin-left: 520px;
    position: absolute;
    top: 50%;
    display: grid;
    transform: translate(0, -50%);
  }

  .item4 {
    position: absolute;
    right: 0;
    margin-right: 20px;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.card-dark {
  background: #f1f6fd;
}

.sheet-card-dialog {
  display: flex;
  justify-content: center;

  .sheet-card-type {
    width: 270px;
    height: 220px;
    background: #d5dae5;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 250px;
      height: 200px;
    }
  }

  .sel {
    background: #4381e5;
  }
}

.mb-5 {
  margin-bottom: 5px;
}

.mr-12 {
  margin-right: 12px;
}

.text-blue {
  color: #4381e5;
  margin-right: 5px;
  min-width: 35px;
  text-align: center;
}

.text-blue-no-mr {
  color: #4381e5;
  min-width: 35px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.line-bg {
  width: 2px;
  height: 80px;
  background-color: #4381e5;
  position: absolute;
  z-index: 1;
  top: 65px;
  left: 34px;
}

.line-bg-info {
  background-color: #c2c2c2;
}

.un-click-text {
  color: #C2C2C2;
  cursor: not-allowed;
}
</style>
