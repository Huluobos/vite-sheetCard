<template>
  <div>
    <div slot="header">
      <div style="display: flex; justify-content: space-between;">
        <div class="radioBox">
          <span class="sub">科目</span>
          <el-radio-group v-model="selSub" @change="getStudentScoreInfo">
            <el-radio v-for="(sub, index) in examInfo.subject" :key="index + 'sub'" :label="sub.id">
              {{ sub.name }}
            </el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-button type="primary" style="width: 100px; height: 32px;" @click="dialogOneScoreOneSegmentVisible(true)">
            一分一段表
          </el-button>
          <el-button type="primary" style="width: 100px; height: 32px;" @click="dialogExportVisible(true)">导出
          </el-button>
        </div>
      </div>
      <div></div>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; margin-bottom: 12px;">
        <el-input v-model="queryParams.search" style="width: 200px; margin-right: 10px;"
                  placeholder="请输入搜索内容"/>
        <el-button style="width: 100px; height: 32px;" type="primary" @click="getStudentScoreInfo">搜索</el-button>
      </div>
      <div style="display: flex;">
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <el-button class="myIcon" type="text"></el-button>
          </template>
          <div>
            <el-checkbox-group v-model="selHead">
              <el-checkbox v-for="h in dynamicHead" style="width: 100%;" :label="h">
                {{ h }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-popover>
      </div>
    </div>
    <div>
      <el-table
          :data="dataList"
          style="width: 100%;"
          :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
          :cell-style="{'text-align': 'center',}"
          border
          stripe
          v-loading="listLoading"
          @sort-change="tabOrderFunc"
      >
        <el-table-column type="index" v-if="selHead.indexOf('序号') >= 0" align="center" label="序号" width="80">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('姓名') >= 0" align="center" prop="studentName" label="姓名" width="100">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('学号') >= 0" align="center" sortable="custom" prop="studentNo" width="180"
                         label="学号">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('考号') >= 0" align="center" sortable="custom" prop="examNo" width="100"
                         label="考号">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('行政班') >= 0" align="center" sortable="custom" prop="className"
                         width="100"
                         label="行政班">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('行政班排名') >= 0" align="center" sortable="custom" prop="classRanking"
                         width="120"
                         label="行政班排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('教学班') >= 0" align="center" sortable="custom" prop="teachClassName"
                         label="教学班" width="100">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('教学班排名') >= 0" align="center" sortable="custom" width="120"
                         prop="teachClassRanking"
                         label="教学班排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('科目') >= 0" align="center" prop="subject.subName" label="科目"  width="80">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('卷面分') >= 0" align="center" sortable="custom" prop="score" width="100"
                         label="卷面分">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('标准分') >= 0" align="center" sortable="custom" prop="standardScore" width="100"
                         label="标准分">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('选考赋分/学考等级') >= 0" sortable="custom" align="center" width="160"
                         prop="rateScore"
                         label="选考赋分/学考等级">
          <template #default="scope">
            {{ rateScoreFilter(scope.row.rateScore) }}
          </template>
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('等级') >= 0" align="center" prop="scoreGradeJunior" sortable="custom" width="100"
                         label="等级">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('校内排名') >= 0" align="center" sortable="custom" prop="schoRanking" width="110"
                         label="校内排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('校内系排名') >= 0" sortable="custom" align="center" prop="xSchoRanking" width="140"
                         label="校内系排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('行政班系排名') >= 0" sortable="custom" align="center" width="140"
                         prop="xClassRanking"
                         label="行政班系排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('教学班系排名') >= 0" sortable="custom" align="center" width="140"
                         prop="xTeachClassRanking"
                         label="教学班系排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('校内组合排名') >= 0" sortable="custom" align="center" width="140"
                         prop="groupSchoRanking"
                         label="校内组合排名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('得分率') >= 0" align="center" prop="scoringRate" label="得分率" width="100">
          <template #default="scope">
            {{ (scope.row.scoringRate * 100).toFixed(2) + '%' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-link
                v-if="scope.row.subScore !== null && scope.row.objScore !== null"
                :type="queryParams.subName === '总分'?'info':'primary'"
                :underline="false"
                :disabled="queryParams.subName === '总分'"
                @click="showStudImgs(scope.row.examNo)"
            >查看答题卡
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: right; margin-top: 10px;">
      <Pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.page"
          v-model:limit="queryParams.limit"
          @pagination="getStudentScoreInfo"/>
    </div>
    <Dialog
        :title="'导出一分一段表'"
        :visible="oneScoreOneSegmentVisible"
        @dialogVisible="dialogOneScoreOneSegmentVisible"
        :width="'600px'"
    >
      <template #content>
        <div>
          <el-radio-group v-model="scoreType" style="margin-left: 5px;">
            <el-radio :label="0">一分一段</el-radio>
            <el-radio :label="1">五分一段</el-radio>
            <el-radio :label="2">十分一段</el-radio>
          </el-radio-group>
        </div>
        <div class="mt-10" style="width: 560px; height: 60px; background: #f8fbff;">
          <div style="height: 48px; display: flex; align-items: flex-start;">
            <span style="color: orange; line-height: 24px;" class="flex-align-center">
              <img src="../../../../assets/explain-orange.png" style="width: 20px; height: 20px;" alt="">
            </span>
            <span style="line-height: 24px;">
             说明：如遇到小数点的情况，则进1，进到上一个段内；第一个区间包前又包后，后面的区间不包前包后。
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <el-button style="width: 100px; height: 32px;" type="primary"
                   @click="dialogOneScoreOneSegmentVisible(false)">取消
        </el-button>

        <el-button style="width: 100px; height: 32px;" type="primary"
                   @click="downOneScoreOneSegment()">确定
        </el-button>
      </template>
    </Dialog>
    <Dialog
        :title="'导出'"
        :visible="exportVisible"
        @dialogVisible="dialogExportVisible"
        :width="'600px'"
    >
      <template #content>
        <div style="font-size: 14px; color: #202020;">
          自定义下载数据，请选择需要下载的数据列
        </div>
        <div>
          <el-radio-group v-model="exportType" style="color: #202020;">
            <el-radio label="1">按行政班导出</el-radio>
            <el-radio label="2">按教学班导出</el-radio>
          </el-radio-group>
        </div>
        <div style="background: #f8fbff;">
          <el-checkbox-group v-model="selItem">
            <el-checkbox v-for="(item, index) in downloadItem" :key="index + 'item'" :label="item"/>
          </el-checkbox-group>
        </div>
      </template>
      <template #footer>
        <div style="text-align: center;">
          <el-button type="danger" style="width: 100px; height: 32px;" @click="closeExportDialog">取消</el-button>
          <el-button type="primary" style="width: 100px; height: 32px;" @click="downloadExportFile">确定</el-button>
        </div>
      </template>
    </Dialog>

    <!-- <el-dialog v-model="showStudImgVisible" title="查看学生答题卡原图">
      
    </el-dialog> -->

    <div class="img-dialog" v-show="showStudImgVisible" @touchmove.prevent @mousewheel.prevent>
      <div class="img-dialog-base"></div>
    
      <div :style="{'width':showStudImgVisibleWidth,'height':showStudImgVisibleHeight}" class="img-container" id="iframe-container" @click.self="clickStop">
        <div class="img-dialog-close"  @click.stop="colseImgDialog">
          <SvgIcon class-name="close-icon" icon-class="close-icon"  @click.stop="colseImgDialog"></SvgIcon>
        </div>
        <iframe id='linkedFrame'
                name="showStudImg"
                :src=iframeSrc
                :width="showStudImgVisibleWidth"
                :height="showStudImgVisibleHeight"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  exportOneScoreOneSegmentApi, exportSubjectClassApi,
  getExamScoreTaskByIdApi,
  studentScoreSearchApi
} from '@/api/scoreManage'
import { ElMessage } from 'element-plus'
import { useUserStoreWithOut } from '@/store/modules/user'

class examScore {
  id: any
  examName: any
  examType: any
  type: any
  period: any
  grade: any
  gradeName: any
  schoolTerm: any
  model: any
  examStart: any
  examEnd: any
  subNames: string[] = []
  subject: any
}

class studentScore {
  studentName: any // 姓名
  studentNo: any // 学号
  examNo: any // 考号
  className: any // 行政班
  classRanking: any // 行政班排名
  teachClassName: any // 教学班
  teachClassRanking: any // 教学班排名
  subject: any // 科目信息
  score: any // 卷面分
  standardScore: any // 标准分
  rateScore: any // 选考赋分/学考等级
  schoRanking: any // 校内排名
  xSchoRanking: any // 校内系排名
  xClassRanking: any // 行政班系排名
  xTeachClassRanking: any // 教学班系排名
  groupSchoRanking: any // 校内组合排名
  objScore: any
  subScore: any
}

class scoreQueryClass {
  sort: any
  order: any
  offset: any
  limit: number = 20
  page: any
  examId: any
  subId: any
  subName: any
  search: any
  isAllSchool: any
  classNameList: any
}

const route = useRoute()
const examId = route.query.examId
const examInfo = ref<examScore>(new examScore())
const selSub = ref<any>()
const selHead = ref<string[]>([
  '序号', '姓名', '考号', '行政班', '教学班', '教学班排名', '科目', '卷面分', '校内排名',
])
const dynamicHead = ref<any>([
  '姓名', '学号', '考号', '行政班',
  '行政班排名', '教学班', '教学班排名', '科目', '卷面分',
  '标准分', '选考赋分/学考等级', '等级', '校内排名', '校内系排名',
  '行政班系排名', '教学班系排名', '校内组合排名', '得分率',
])
const total = ref<any>(0)
const oneScoreOneSegmentVisible = ref<any>(false)
const exportVisible = ref<any>(false)
const showStudImgVisible = ref<any>(false)
const showStudImgVisibleWidth = ref<string>('')
const showStudImgVisibleHeight = ref<string>('')
const scoreType = ref<any>(0)
const scoreLevel = ref<any>(1)
const exportType = ref<any>('1')
const downloadItem = ref<any>([
  '教学班', '科目', '卷面分', '标准分', '校内排名',
  '行政班排名', '教学班排名', '校内系排名', '行政班系排名', '教学班系排名',
  '校内组合排名', '等级', '选考赋分/学考等级', '得分率'
])
const selItem = ref<any>(['科目', '卷面分', '校内排名', '教学班排名', '等级',])
const exportSubjectClassParam = ref<any>({})
const {VITE_GLOB_API_URL} = process.env
const listLoading = ref<boolean>(false)
const data = {
  queryParams: ref<scoreQueryClass>(new scoreQueryClass()),
  dataList: ref<studentScore[]>(),
  downOneScoreOneSegmentData: {
    examId: '',
    subId: ref<any>(),
    scoreLevel: 1,
    scoreType: 0,
  },
  token: useUserStoreWithOut().getToken,
  iframeSrc: '',
  iframeSrcDetail: '',
}
const {queryParams, dataList, downOneScoreOneSegmentData, iframeSrc, iframeSrcDetail, token} = toRefs(data)

const getExamScoreTaskById = () => {
  getExamScoreTaskByIdApi({examId: examId}).then((res: any) => {
    if (res.success) {
      examInfo.value = res.data
      const map = []
      for (let [key, value] of Object.entries(examInfo.value.subject)) {
        map.push({id: value, name: key})
      }
      examInfo.value.subject = map
      let subject = examInfo.value.subject.entries().next().value[1]
      queryParams.value.subId = subject.id
      queryParams.value.subName = subject.name
      selSub.value = subject.id
      queryParams.value.sort = 'schoRanking'
      queryParams.value.order = 'asc'
      getStudentScoreInfo()
    }
  })
}

const getStudentScoreInfo = () => {
  if (!queryParams.value.page || queryParams.value.page < 0) {
    queryParams.value.page = 1
  }
  queryParams.value.offset = queryParams.value.limit * (queryParams.value.page - 1)
  queryParams.value.examId = examId
  let subject = examInfo.value.subject.filter((s: any) => s.id === selSub.value)
  if (subject) {
    queryParams.value.subId = subject[0].id
    queryParams.value.subName = subject[0].name
  }
  dataList.value = []
  listLoading.value = true
  studentScoreSearchApi(queryParams.value).then((res: any) => {
    if (res.success) {
      dataList.value = res.data.rows
      total.value = res.data.total
    } else {
      ElMessage.error(res.message)
    }
    listLoading.value = false
  })
}

const tabOrderFunc = (param: any) => {
  if (param.prop) {
    queryParams.value.sort = param.prop
  } else {
    queryParams.value.sort = 'schoRanking'
  }
  if (param.order === 'descending') {
    queryParams.value.order = 'desc'
  } else if (param.order === 'ascending') {
    queryParams.value.order = 'asc'
  } else {
    queryParams.value.order = 'asc'
  }
  queryParams.value.page = 1
  getStudentScoreInfo()
}

const downOneScoreOneSegment = () => {
  downOneScoreOneSegmentData.value.examId = examId as string
  downOneScoreOneSegmentData.value.subId = selSub.value
  downOneScoreOneSegmentData.value.scoreType = scoreType.value
  exportOneScoreOneSegmentApi(downOneScoreOneSegmentData.value).then((res: any) => {
    const link = document.createElement('a')
    const blob = new Blob([res], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', '一分一段表.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    dialogOneScoreOneSegmentVisible(false)
  })
}

const dialogOneScoreOneSegmentVisible = (key: boolean) => {
  oneScoreOneSegmentVisible.value = key
}

const dialogExportVisible = (key: boolean) => {
  exportVisible.value = key
}

const closeExportDialog = () => {
  dialogExportVisible(false)
  selItem.value = ['科目', '卷面分', '校内排名', '教学班排名', '等级',]
}

const downloadExportFile = () => {
  exportSubjectClassParam.value.examId = examId
  exportSubjectClassParam.value.classType = exportType.value === '1' ? 1 : 2
  exportSubjectClassParam.value.subjectId = selSub.value
  exportSubjectClassParam.value.checkTop = selItem.value + ''
  exportSubjectClassApi(exportSubjectClassParam.value).then((res: any) => {
    const link = document.createElement('a')
    const blob = new Blob([res], {type: 'application/vnd.ms-excel'})
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', '成绩.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    closeExportDialog()
  })
}

const showStudImgs = (examNo: string) => {
  let subject = examInfo.value.subject.filter((s: any) => s.id === selSub.value)
  let subName = ''
  if (subject) {
    subName = subject[0].name
  }
  // 默认值
  showStudImgVisibleWidth.value = '962px'
  showStudImgVisibleHeight.value = '672px'
  iframeSrc.value = VITE_GLOB_API_URL + '/newexam/scoreManage/showStudImg?token=' + data.token
      + '&examId=' + examId + '&subId=' + selSub.value + '&subName=' + subName + '&examNo=' + examNo
  window.onmessage = function (e) {
    console.log('e')
    console.log(e)
    if(e.data.source === 'showStudImg'){
      showStudImgVisibleWidth.value = e.data.width + 'px'
      showStudImgVisibleHeight.value = e.data.height + 'px'
     
    }
  }
  setTimeout(()=>{
    showStudImgVisible.value  = true
  })
}
// 关闭
function colseImgDialog (){
  showStudImgVisible.value  = false
  showStudImgVisibleWidth.value = '962px'
  showStudImgVisibleHeight.value = '672px'
} 

const rateScoreFilter = (value: any) => {
  if (value == -1) {
    return 'A';
  } else if (value == -2) {
    return 'B';
  } else if (value == -3) {
    return 'C';
  } else if (value == -4) {
    return 'D';
  } else if (value == -5) {
    return 'E';
  } else if (value == -6) {
    return 'F';
  } else if (value == -7) {
    return 'G';
  } else if (value == -8) {
    return 'H';
  } else {
    return value;
  }
}

onMounted(() => {
  getExamScoreTaskById()

  
})

// 禁止向下冒泡
function clickStop(){

}

</script>

<style lang="scss" scoped>
.radioBox {
  line-height: 40px;
  width: 880px;

  .sub {
    float: left;
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 32px;
    font-size: 14px;
    text-align: justify;
    text-align-last: justify;
    padding-right: 20px;
  }

  .el-radio-group {
    display: block;
    float: right;
    width: 800px;
  }
}

.myIcon {
  width: 30px;
  height: 30px;
  background-image: url("@/assets/icon-svg/more_options.svg");
  background-size: 30px 30px;
  background-repeat: no-repeat;
}

.myIcon:hover,
.myIcon:active,
.myIcon:checked {
  width: 30px;
  height: 30px;
  background-image: url("@/assets/icon-svg/more_options_hover.svg");
  background-size: 29px 29px;
  background-repeat: no-repeat;
  
}

.flex-align-center {
  display: flex;
  align-items: center;
}

</style>
<style lang="scss" scoped>
.img-dialog{
  .img-dialog-base{
    background: #03142F;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9996;
    transition: all 0.5s ease;
  }
 
 
  .img-container{
    background: #fff;
    opacity: 1;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -481px;
    margin-top: -336px;
    z-index: 9997;
    .img-dialog-close{
    position: absolute;
    right: 0;
    top: -30px;
    width: 30px;  
    height: 30px; 
    z-index: 9998;
    .close-icon{
      width: 30px;  
      height: 30px; 
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        opacity: .6;
      }
    }
  }
  }
}
</style>
