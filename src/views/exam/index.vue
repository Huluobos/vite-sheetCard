<template>
  <div>
    <div slot="header">
      <div style="display: flex;justify-content: right;align-items: center;">
        <el-form ref="addExamForm" :model="data.queryFrom" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="学段" prop="examPeriod">
                <el-select v-model="data.queryFrom.examPeriod" placeholder="学段" @change="changePeriod" clearable>
                  <el-option v-for="period in data.examPeriodList" :key="period.value" :label="period.label"
                    :value="period.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年级" prop="examGrade">
                <el-select v-model="data.queryFrom.examGrade" placeholder="年级" @change="changeGrade" clearable>
                  <el-option v-for="grade in examGradeList" :key="grade.value" :label="grade.label"
                    :value="grade.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="全部考试" prop="examType">
                <el-select v-model="data.queryFrom.examType" placeholder="全部考试" @change="changeType" clearable>
                  <el-option v-for="eType in data.examTypeList" :key="eType.value" :label="eType.label"
                    :value="eType.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button style="" type="primary" size="" @click="createExam()">新建考试</el-button>
            </el-col>
          </el-row>
        </el-form>

      </div>
    </div>
    <!-- Huluobos start-->
    <div class="list-box">
      <div class="each-box" v-for="(item, index) in examList" :key="index + 'q'">
        <div class="each-top">
          <div class="title">
            <el-button type="text" @click="toExamProcess(item.id, item)">{{ item.examName }}</el-button>
            <span v-if="item.examType === 1" class="title-tips text-blue" type="text">校考</span>
            <span v-if="item.examType === 2" class="title-tips text-blue" type="text">联校</span>
            <span v-if="item.model === 1" class="title-tips text-green" type="text">先扫后阅</span>
            <span v-if="item.model === 2" class="title-tips text-green" type="text">先阅后扫</span>
            <div class="icon-btn">
              <span class="icon-box">
                <el-dropdown popper-class="drop-box">
                  <SvgIcon class-name="myIcon" icon-class="exam-1"></SvgIcon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <div class="drop-line">
                          <SvgIcon class-name="myIcon nohover" icon-class="exam-6"></SvgIcon>
                          <SvgIcon class-name="myIcon hover" icon-class="exam-6-6"></SvgIcon>
                          <span class="text" @click="updateExam(item.id, item)">编辑</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div class="drop-line delete">
                          <SvgIcon class-name="myIcon" icon-class="exam-7"></SvgIcon>
                          <span class="text" @click="deleteExam(item.id, item.examName)">删除</span>
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

              </span>
              <span class="icon-box">
                <SvgIcon class-name="myIcon" icon-class="exam-2" @click="examProcess(item.id, item)"></SvgIcon>
                <el-button @click="examProcess(item.id, item)" type="text">考试进程</el-button>
              </span>
            </div>
          </div>
          <div class="detail">
            <span class="detail-each">
              <SvgIcon class-name="myIcon" icon-class="exam-3"></SvgIcon>
              {{ item.examStart }}-{{ item.examEnd }}
            </span>
            <span class="detail-each">
              <SvgIcon class-name="myIcon" icon-class="exam-4"></SvgIcon>
              年级：{{ item.gradeName }}
            </span>
            <span class="detail-each">
              <SvgIcon class-name="myIcon" icon-class="exam-5"></SvgIcon>
              {{ item.creatorName }}
            </span>
          </div>
        </div>
        <div class="each-bottom">
          <div class="line-sub" v-if="item.createList.length > 0">
            <div class="icon-type">
              <SvgIcon v-if="item.createList.length > 0" class-name="myIcon" icon-class="exam-8"></SvgIcon>
            </div>
            <div class="text-txt">
              <span v-if="item.createList.length > 0"> 创建：</span>
            </div>
            <div class="btn-list" v-for="i in item.createList" :key="i">
              <el-button class="sub-btn" @click="toSubjectPrecess(item.id, i, item.grade, item)">{{ i }}</el-button>
            </div>
          </div>

          <div class="line-sub" v-if="item.scanList.length > 0">
            <div class="icon-type">
              <SvgIcon v-if="item.scanList.length > 0" class-name="myIcon" icon-class="exam-9"></SvgIcon>
            </div>
            <div class="text-txt">
              <span v-if="item.scanList.length > 0"> 扫描中：</span>
            </div>
            <div class="btn-list" v-for="i in item.scanList" :key="i">
              <el-button class="sub-btn" @click="toSubjectPrecess(item.id, i, item.grade, item)">{{ i }}</el-button>
            </div>
          </div>

          <div class="line-sub" v-if="item.markingList.length > 0">
            <div class="icon-type">
              <SvgIcon v-if="item.markingList.length > 0" class-name="myIcon" icon-class="exam-10"></SvgIcon>
            </div>
            <div class="text-txt">
              <span v-if="item.markingList.length > 0"> 阅卷中：</span>
            </div>
            <div class="btn-list" v-for="i in item.markingList" :key="i">
              <el-button class="sub-btn" @click="toSubjectPrecess(item.id, i, item.grade, item)">{{ i }}</el-button>
            </div>
          </div>

          <div class="line-sub" v-if="item.announcedList.length > 0">
            <div class="icon-type">
              <SvgIcon v-if="item.announcedList.length > 0" class-name="myIcon" icon-class="exam-11"></SvgIcon>
            </div>
            <div class="text-txt">
              <span v-if="item.announcedList.length > 0"> 待发布：</span>
            </div>
            <div class="btn-list" v-for="i in item.announcedList" :key="i">
              <el-button class="sub-btn" @click="toSubjectPrecess(item.id, i, item.grade, item)">{{ i }}</el-button>
            </div>
          </div>

          <div class="line-sub" v-if="item.publishedList.length > 0">
            <div class="icon-type">
              <SvgIcon v-if="item.publishedList.length > 0" class-name="myIcon" icon-class="exam-12"></SvgIcon>
            </div>
            <div class="text-txt">
              <span v-if="item.publishedList.length > 0"> 已发布：</span>
            </div>
            <div class="btn-list" v-for="i in item.publishedList" :key="i">
              <el-button class="sub-btn" @click="toSubjectPrecess(item.id, i, item.grade, item)">{{ i }}</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="Pagination-box">
      <Pagination v-show="total > 0" :total="total" v-model:page="queryFrom.page"
        v-model:limit="queryFrom.limit" @pagination="getList" />
    </div>
    <!-- Huluobos end-->
  </div>

  <el-dialog v-model="delExamVisible" title="删除确认" width="600px">
    <span>请确认是否删除</span><span style="color: red"> "{{ deleteName }}"</span> <span>任务？</span> <span
      style="color: red">删除后，任务不可恢复</span>
    <el-radio-group v-model="deleteFrom.deleteType">
      <el-radio label="1" @change="model1"  style="width: 100%">删除所有数据，包括考试任务及成绩报告数据</el-radio><br>
      <el-radio label="2" @change="model2" >仅删除成绩报告数据</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="width: 100px; height: 32px" type="primary" @click="delExamVisible = false">取消</el-button>
        <el-button style="width: 100px; height: 32px" type="danger" @click="delExamMessage">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import { findBySchoolGradeAndType, deleteExamById } from '@/api/exam'
import { ElMessage } from 'element-plus'
const total = ref(200);
const align = 'right';
const delExamVisible = ref<boolean>(false)
const examList = ref<any[]>([])
const delExamId = ref<string>('')

const deleteName = ref<any>()

const router = useRouter()

const data = reactive({
  queryFrom: {
    examPeriod: ref<any>(''),
    examGrade: ref<any>(''),
    examType: ref<any>(''),
    page: 1,
    limit: 10,
    offset: 0
  },
  routerStudentParam: {
    examId: ref<any>('')
  },
  routerSubjectParam: {
    examId: ref<any>(''),
    subName: ref<string>(''),
    gradeId: ref<any>('')
  },
  deleteFrom: {
    examId: ref<any>(''),
    deleteType: ref<any>('1')
  },
  examTypeList: [{ value: 1, label: '月考' }, { value: 2, label: '模考' }, { value: 3, label: '期中' }, { value: 4, label: '期末' }],
  examPeriodList: [{ value: 2, label: '高中' }, { value: 1, label: '初中' }, { value: 3, label: '小学' }],
  examGradeList: ref<any>([]),
});


const { queryFrom, examTypeList, examPeriodList, examGradeList, routerStudentParam, routerSubjectParam, deleteFrom } = toRefs(data)

function setExamPaper(item: any) {
  sessionStorage.setItem(item.id, JSON.stringify(item))
}
function removeExamPaper() {
  localStorage.setItem('examPaperName', '')
}
onMounted(() => {
  removeExamPaper()
  queryFrom.value.examPeriod = ''
  queryFrom.value.examType = ''
  getExamListByGradeAndType(queryFrom.value)
})

function getList() {
  if (queryFrom.value.page < 0) {
    queryFrom.value.page = 1
  }
  queryFrom.value.offset = queryFrom.value.limit * (queryFrom.value.page - 1)
  getExamListByGradeAndType(queryFrom.value)
}

function getExamListByGradeAndType(data: any) {
  findBySchoolGradeAndType(data).then((res: any) => {
    if (res.success) {
      total.value = res.data.total
      examList.value = res.data.rows
    } else {
      ElMessage.error(res.message)
    }

  })
}

function changePeriod() {
  if (queryFrom.value.examPeriod === 1) {
    queryFrom.value.examGrade = ''
    examGradeList.value = [{ value: 11, label: '初一' }, { value: 12, label: '初二' }, { value: 13, label: '初三' }];
  } else if (queryFrom.value.examPeriod === 2) {
    queryFrom.value.examGrade = ''
    examGradeList.value = [{ value: 1, label: '高一' }, { value: 2, label: '高二' }, { value: 3, label: '高三' }];
  } else {
    queryFrom.value.examGrade = ''
    examGradeList.value = [{ value: 21, label: '小学一年级' }, { value: 22, label: '小学二年级' }, { value: 23, label: '小学三年级' }
      , { value: 24, label: '小学四年级' }, { value: 25, label: '小学五年级' }, { value: 26, label: '小学六年级' }];
  }
  getExamListByGradeAndType(queryFrom.value)
}

function changeGrade() {
  getExamListByGradeAndType(queryFrom.value)
}

function changeType() {
  getExamListByGradeAndType(queryFrom.value)
}


function createExam() {
  router.push('/exam/examAdd')
}

function toSubjectPrecess(examId: any, subName: any, gradeType: any, item: any) {
  routerSubjectParam.value.examId = examId
  removeExamPaper()
  setExamPaper(item)
  let examInfo = sessionStorage.getItem(examId)
  if (examInfo) {
    let parse = JSON.parse(examInfo)
    parse.subName = subName
    setExamPaper(parse)
  }
  setTimeout(() => {
    router.push({ name: 'subjectProcessIndex', query: routerSubjectParam.value })
  }, 20)

}

function updateExam(examId: any, item: any) {
  routerStudentParam.value.examId = examId
  removeExamPaper()
  setExamPaper(item)
  setTimeout(() => {
    router.push({ path: '/exam/examUpdate', query: routerStudentParam.value })
  }, 20)
}

function deleteExam(examId: any, deleteExamName: any) {
  deleteFrom.value.examId = examId
  deleteName.value = deleteExamName
  delExamVisible.value = true
}

function delExamMessage() {
  deleteExamById(deleteFrom.value).then((res: any) => {
    if (res.success) {
      delExamVisible.value = false
      queryFrom.value.page = 1
      queryFrom.value.offset = 0
      getExamListByGradeAndType(queryFrom.value)
      ElMessage.success(res.message)
    } else {
      ElMessage.error(res.message)
    }
  })
}

function examProcess(examId: any, item: any) {
  routerStudentParam.value.examId = examId
  removeExamPaper()
  setExamPaper(item)
  setTimeout(() => {
    router.push({ path: '/exam/examProcess', query: routerStudentParam.value })
  }, 20)
}

function toExamProcess(examId: any, item: any) {
  routerStudentParam.value.examId = examId
  removeExamPaper()
  setExamPaper(item)
  setTimeout(() => {
    router.push({ path: '/exam/examProcess', query: routerStudentParam.value })
  }, 20)
}



</script>

<style scoped lang="scss">
.el-button {
  padding: 8px 15px;
}

.myIcon {
  width: 20px;
  height: 20px;
  top: 3px;
}

.drop-box {
  .drop-line {
    height: 20px;
    line-height: 20px;

    .text {
      margin-left: 5px;
      color: #202020;
      font-size: 14px;
    }

    .nohover {
      display: inline-block;
    }

    .hover {
      display: none;
    }

  }

  .drop-line:hover .text {
    color: #4381E5;
  }

  .drop-line:hover .nohover {
    display: none;
  }

  .drop-line:hover .hover {
    display: inline-block;
  }

  .delete:hover {
    color: #FF3333;

    .text {
      color: #FF3333;
    }
  }
}

.list-box {
  // width: 100%;

  .each-box {
    width: 100%;


    .each-top {
      height: 80px;
      background: #FFFFFF;
      border-radius: 4px 4px 0px 0px;
      border: 1px solid #D5DAE5;
      margin-top: 20px;

      .title {
        height: 40px;
        line-height: 40px;

        .title-text {
          font-size: 15px;
          font-weight: bold;
          color: #202020;
          margin-left: 10px;
        }

        .title-tips {
          display: inline-block;
          padding: 0 6px;
          height: 22px;
          font-size: 12px;
          background: #E8F1FF;
          border-radius: 4px;
          line-height: 22px;
          margin-left: 10px;
          //cursor: pointer;
          user-select: none;
        }

        .text-blue {
          color: #4381E5;
        }

        .text-green {
          color: #25C881;
        }

        .icon-btn {
          float: right;
          height: 40px;
          line-height: 40px;
          margin-right: 10px;

          .icon-box {
            line-height: 40px;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
            user-select: none;
            color: #4381E5;



          }
        }
      }

      .detail {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #202020;

        .detail-each {
          margin-left: 7px;
          margin-right: 20px;
        }
      }
    }

    .each-bottom {
      background: #F8FBFF;
      border-radius: 0px 0px 4px 4px;
      border: 1px solid #D5DAE5;
      padding: 5px 0;

      .line-sub {
        height: auto;
        line-height: 40px;

        .icon-type {
          display: inline-block;
          margin-left: 10px;
          margin-right: 15px;
          color: #fff;
        }

        .text-txt {
          display: inline-block;
          width: 58px;
          font-size: 14px;
          text-align: left;
          color: #202020;
        }

        .btn-list {
          display: inline-block;

          .sub-btn {
            margin-right: 10px;
          }
        }
      }
    }

  }
}

.Pagination-box {
  margin-top: 10px;
}
</style>
