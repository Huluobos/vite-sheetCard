<template>
  <div class="app-container">
    <el-form ref="addExamForm" :model="examForm" :rules="rules" label-width="90px">
        <div class="card-title mb-10">
        <span class="title">
          基础信息
        </span>
        </div>
    <el-row>
      <el-col :span="14">
        <el-form-item  label="考试名称" prop="examName">
          <!--<el-input v-if="onlySubStatus" disabled style="width:100%" v-model="examForm.examName" placeholder="请输入考试名称" />-->
            <el-input style="width:100%" v-model="examForm.examName" placeholder="请输入考试名称" />
        </el-form-item>
      </el-col>
    </el-row>
        <el-row>
      <el-col :span="14">
        <el-form-item label="考试时间" prop="examTime" required>
              <el-date-picker
                v-model="examForm.examTime"
                size="small"
                style="width: 100%;height: 32px;"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="clickTime"
              >
              </el-date-picker>
          </el-form-item>
      </el-col>
        </el-row>
        <el-row>
      <el-col :span="6">
        <el-form-item label="考试类型" prop="type">
            <el-select style="width:100%" v-model="examForm.type" placeholder="考试类型" clearable>
               <el-option
                  v-for="eType in examTypeList"
                  :key="eType.value"
                  :label="eType.label"
                  :value="eType.value"
               />
            </el-select>
            </el-form-item>
      </el-col>
        </el-row>
        <el-row>
      <el-col :span="6">
        <el-form-item label="学段" prop="period">
            <el-select v-if="allSubStatus" disabled style="width:100%" v-model="examForm.period" placeholder="学段" @change="changePeriod()" clearable>
               <el-option
                  v-for="pre in examPeriodList"
                  :key="pre.value"
                  :label="pre.label"
                  :value="pre.value"
               />
            </el-select>
            <el-select v-else-if="onlySubStatus" disabled style="width:100%" v-model="examForm.period" placeholder="学段" @change="changePeriod()" clearable>
                <el-option
                        v-for="pre in examPeriodList"
                        :key="pre.value"
                        :label="pre.label"
                        :value="pre.value"
                />
            </el-select>

            <el-select v-else style="width:100%" v-model="examForm.period" placeholder="学段" @change="changePeriod()" clearable>
                <el-option
                        v-for="pre in examPeriodList"
                        :key="pre.value"
                        :label="pre.label"
                        :value="pre.value"
                />
            </el-select>
            </el-form-item>
      </el-col>
        </el-row>
        <el-row>
      <el-col :span="6">
        <el-form-item label="年级" prop="grade">
            <el-select v-if="allSubStatus" disabled style="width:100%" v-model="examForm.grade" @change="changeGrade" placeholder="年级" clearable>
               <el-option
                  v-for="gra in examGradeList"
                  :key="gra.value"
                  :label="gra.label"
                  :value="gra.value"
               />
            </el-select>
            <el-select v-else-if="onlySubStatus" disabled style="width:100%" v-model="examForm.grade" @change="changeGrade" placeholder="年级" clearable>
                <el-option
                        v-for="gra in examGradeList"
                        :key="gra.value"
                        :label="gra.label"
                        :value="gra.value"
                />
            </el-select>
            <el-select v-else style="width:100%" v-model="examForm.grade" @change="changeGrade" placeholder="年级" clearable>
                <el-option
                        v-for="gra in examGradeList"
                        :key="gra.value"
                        :label="gra.label"
                        :value="gra.value"
                />
            </el-select>
            </el-form-item>
      </el-col>
        </el-row>
        <el-row>
      <el-col :span="6">
        <el-form-item label="学期" prop="schoolTerm">
            <el-select style="width:100%" v-model="examForm.schoolTerm" placeholder="学期" clearable>
               <el-option
                  v-for="dict in examSemesterList"
                  :key="dict"
                  :label="dict"
                  :value="dict"
               />
            </el-select>
            </el-form-item>
      </el-col>
    </el-row>
        <el-row class="tal">
            <el-col :span="24">
                <el-form-item label="考试范围">
                </el-form-item>
            </el-col>
        </el-row>

    <el-row class="tal">
      <el-col :span="24">考试科目</el-col>
    </el-row>
        <el-row class="tal">
            <el-col class="bl-row" :offset="1" :span="23">
                <el-form-item class="textSmall" label="考试科目" prop="subNames">
                    <el-row>
                        <el-checkbox v-if="allSubStatus" disabled :indeterminate="isIndeterSubject" v-model="checkAllSubject" @change="handleCheckAllSubjectChange">全选</el-checkbox>
                        <el-checkbox v-else-if="onlySubStatus" disabled :indeterminate="isIndeterSubject" v-model="checkAllSubject" @change="handleCheckAllSubjectChange">全选</el-checkbox>
                        <el-checkbox v-else :indeterminate="isIndeterSubject" v-model="checkAllSubject" @change="handleCheckAllSubjectChange">全选</el-checkbox>
                    </el-row>
                    <el-row>
                        <el-checkbox-group v-if="allSubStatus" disabled v-model="examForm.subNames" @change="handleCheckedCitiesSubjectChange">
                            <el-checkbox v-for="subject in subjects" :label="subject" :key="subject">{{subject}}</el-checkbox>
                            <el-button disabled  type="text" style="margin-left: 15px;" @click="addMoreSub">+添加自定义科目</el-button>
                        </el-checkbox-group>

                        <el-checkbox-group v-else-if="onlySubStatus"  v-model="examForm.subNames" @change="handleCheckedCitiesSubjectChange">
                            <el-checkbox  v-for="subject in subjects" :label="subject" :key="subject" :disabled="(subCheck && subCheck.indexOf(subject) > -1)">{{subject}}</el-checkbox>
                            <el-button type="text"  style="margin-left: 15px;" @click="addMoreSub">+添加自定义科目</el-button>
                        </el-checkbox-group>

                        <el-checkbox-group v-else v-model="examForm.subNames" @change="handleCheckedCitiesSubjectChange">
                            <el-checkbox v-for="subject in subjects" :label="subject" :key="subject">{{subject}}</el-checkbox>
                            <el-button type="text" style="margin-left: 15px;" @click="addMoreSub">+添加自定义科目</el-button>
                        </el-checkbox-group>
                    </el-row>

                    <div style="margin: 15px 0;"></div>

                </el-form-item>
                <el-form-item class="textSmall" label="参考班级" prop="classIds">
                    <el-row>
                        <el-checkbox v-if="allSubStatus" disabled  :indeterminate="isIndeterClass" v-model="checkAllClass" @change="handleCheckAllclassChange">全选</el-checkbox>
                        <el-checkbox v-else-if="onlySubStatus" disabled  :indeterminate="isIndeterClass" v-model="checkAllClass" @change="handleCheckAllclassChange">全选</el-checkbox>
                        <el-checkbox v-else  :indeterminate="isIndeterClass" v-model="checkAllClass" @change="handleCheckAllclassChange">全选</el-checkbox>
                    </el-row>
                    <el-row>
                        <el-checkbox-group v-if="allSubStatus" disabled v-model="examForm.classIds" @change="handleCheckedCitiesClassChange">
                            <el-checkbox v-for= "classes in classesList" :value="classes.id" :label="classes.id" :key="classes.id">{{classes.className}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-else-if="onlySubStatus" disabled  v-model="examForm.classIds" @change="handleCheckedCitiesClassChange">
                            <el-checkbox v-for= "classes in classesList" :value="classes.id" :label="classes.id" :key="classes.id">{{classes.className}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-else v-model="examForm.classIds" @change="handleCheckedCitiesClassChange">
                            <el-checkbox v-for= "classes in classesList" :value="classes.id" :label="classes.id" :key="classes.id">{{classes.className}}</el-checkbox>
                        </el-checkbox-group>
                    </el-row>

                </el-form-item>
            </el-col>
        </el-row>

        <div class="card-title mt-20 mb-10">
        <span class="title">
          考试设置
        </span>
        </div>

      <el-row class="tal">
        <el-col :span="24">考试模式</el-col>
      </el-row>
      <el-row class="tal">
        <el-col :span="24">
          <el-form-item  prop="model">
              <el-radio-group v-if="allSubStatus" disabled v-model="examForm.model">
                  <el-radio label="1">先扫后阅</el-radio>
                  <el-radio label="2" disabled>成绩导入</el-radio>
                  <el-radio label="3" disabled>小题分导入</el-radio>
              </el-radio-group>
              <el-radio-group v-else-if="onlySubStatus" disabled v-model="examForm.model">
                  <el-radio label="1">先扫后阅</el-radio>
                  <el-radio label="2" disabled>成绩导入</el-radio>
                  <el-radio label="3" disabled>小题分导入</el-radio>
              </el-radio-group>
              <el-radio-group v-else v-model="examForm.model">
                  <el-radio label="1">先扫后阅</el-radio>
                  <el-radio label="2" disabled>成绩导入</el-radio>
                  <el-radio label="3" disabled>小题分导入</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="tal">
          <el-button :loading="loading" type="primary" size="small" @click="goBack()">取消</el-button>
          <el-button :loading="loading" type="primary" size="small" @click="handleUpdate()">保存</el-button>
      </el-row>
    </el-form>
  </div>

    <el-dialog
            v-model="addSubVisible"
            title="添加自定义科目"
            width="500px"
    >
        <span>科目名称:<el-input v-model="addSub" style="width: 60%;" placeholder="" /></span>
        <template #footer>
            <span class="dialog-footer">
              <el-button style="width: 100px; height: 32px" type="primary"
                         @click="addSubVisible = false">取消</el-button>
              <el-button style="width: 100px; height: 32px" type="danger"
                         @click="toAddSub">确定</el-button>
            </span>
        </template>
    </el-dialog>

    <progress-notify
            v-model="dialogVisible"
            :notify-data="notifyData"
            :stroke-width="18"
            @visibleChange="dialogVisibleChange"
            @statusChange="statusChange"
    >

    </progress-notify>


</template>

<script setup lang='ts'>
import router from '@/router'
import { ElMessage } from 'element-plus'
import ProgressNotify from 'components/ProgressNotify/index.vue';
import {
    saveOrUpdateExam,
    findSubBySchoId,
    findClassBySchoId,
    getExamMessageById,
    findSubByExamId,
    UpdateExam
} from '@/api/exam'
import { ref } from 'vue'


const dialogVisible = ref<boolean>(false)
const notifyData = ref<any>({})
function dialogVisibleChange(f: any) {
    dialogVisible.value = f
}
function statusChange(f: any) {
    publishStatus.value = f
}

const subjectOptions = ref<any>([]);
const classtOptions = ref<any>([]);

const classNameList = ref<any>([])
const addSubVisible = ref<boolean>(false)
const route = useRoute()
const examId = route.query.examId

const { proxy } = getCurrentInstance();

const allSubStatus = ref<boolean>(false)

const onlySubStatus = ref<boolean>(false)
const   addSub= ref<any>()

const subCheck = ref<any>([]);

const data = reactive({
    rules: {
        examName   : [{ required: true, message: "请输入考试名称", trigger: "blur" }],
        beginTime: [{ required: true, message: "开始时间不能为空", trigger: "change" }],
        endTime: [{ required: true, message: "结束时间不能为空", trigger: "change" }],
        type: [{ required: true, message: "考试类型不能为空", trigger: "change" }],
        period: [{ required: true, message: "学段不能为空", trigger: "change" }],
        grade: [{ required: true, message: "年级不能为空", trigger: "change" }],
        schoolTerm: [{ required: true, message: "学期不能为空", trigger: "change" }],
        subNames: [{ required: true, message: "请选择考试科目", trigger: "change" }],
        classIds: [{ required: true, message: "请选择考试班级", trigger: "change" }],
        examTime: [{ required: true, message: "请选择考试时间", trigger: "change" }],
    },
  examForm: {
    id: ref<any>(''),
    examName: '',
    examStartTime: ref<any>(''),
    examEndTime: ref<any>(''),
    type: '',
    period: 2,
    grade: 1,
    schoolTerm: '',
    model: '1',
    subNames: ref<string[]>([]),
    classIds: ref<string[]>([]),
    examTime: ref<any>([]),
    addSubNames: ref<string[]>([]),
    oldSubNames:ref<string[]>([]),
    oldClassIds:ref<string[]>([]),
    oldSubCheck:ref<string[]>([]),
  },
    publishStatus:0,
    loading: false,
    synArray: [],
    topicArray: ['标准考试','成绩导入','小题分导入'],
    tags: [],
    examTypeList: [{value: 1, label: '月考'}, {value: 2, label: '模考'}, {value: 3, label: '期中'}, {value: 4, label: '期末'}],
    examPeriodList: [{value: 2, label: '高中'},{value: 1, label: '初中'},  {value: 3, label: '小学'}],
    examGradeList: [{value: 1, label: '高一'}, {value: 2, label: '高二'}, {value: 3, label: '高三'}],
    examSemesterList :['上学期','下学期'],
    // 科目复选框
    subjects: subjectOptions,
    isIndeterSubject: ref<boolean>(false),
    checkAllSubject: ref<boolean>(false),

    // 班级复选框
    checkAllClass: ref<boolean>(false),
    classesList: classtOptions,
    isIndeterClass: ref<boolean>(false)

});

let { rules,examForm,loading,synArray,topicArray,examTypeList,examPeriodList,
    examGradeList,examSemesterList,checkAllSubject,subjects,isIndeterSubject,
    checkAllClass,classesList,isIndeterClass,publishStatus} = toRefs(data);

  function clickTime() {
      console.log(examForm.value.examTime)
      if (examForm.value.examTime) {
          examForm.value.examStartTime =  formatDateValue(new Date(examForm.value.examTime[0]))
          examForm.value.examEndTime = formatDateValue(new Date(examForm.value.examTime[1]))
          if ((data.examForm.examStartTime).slice(6,7) > '8'){
              data.examForm.schoolTerm = '上学期'
          }else{
              data.examForm.schoolTerm = '下学期'
          }
      } else {
          data.examForm.examStartTime = ''
          data.examForm.examEndTime = ''
      }
  }

  function handleCheckAllSubjectChange(val: boolean) {
      examForm.value.subNames = val ? subjectOptions.value : [];
      isIndeterSubject.value = false;
      }
  function handleCheckedCitiesSubjectChange(value: any) {
        let checkedSubjectCount = value.length;
      checkAllSubject.value = checkedSubjectCount === subjects.value.length;
      isIndeterSubject.value = checkedSubjectCount > 0 && checkedSubjectCount < subjects.value.length;
      }
  function handleCheckAllclassChange(val: any) {
      examForm.value.classIds = val ? classesList.value.map((val:any)=>{return val.id}) : [];
      isIndeterClass.value = false
      }
  function handleCheckedCitiesClassChange(value: any) {
      console.log(value)
        let checkedClassCount = value.length;
      checkAllClass.value = checkedClassCount === classesList.value.length;
      isIndeterClass.value = checkedClassCount > 0 && checkedClassCount < classesList.value.length;
      }
  function handleUpdate() {
      proxy.$refs.addExamForm.validate((valid: any) => {
          if (valid){
              dialogVisible.value = true
              publishStatus.value = 0
              examForm.value.id = examId
              UpdateExam(examForm.value).then((res: any) => {
                  if (res.success) {
                      router.push('/exam')
                      //ElMessage.success('修改成功 !')
                  } else {
                      ElMessage.error('修改失败 !')
                  }
              })
          }else{
              return false
          }
      })

   }
  function goBack() {
        router.push('/exam')
   }


function getSubjectList() {
    findSubBySchoId(examForm.value.grade).then((res: any) => {
        if (res.success) {
            subjectOptions.value = res.data
        } else {
            ElMessage.error('科目查询失败 !')
        }
    })
}


function getSubjectListByExam() {
    findSubByExamId(examId).then((res: any) => {
        if (res.success) {
            subjectOptions.value = res.data
        } else {
            ElMessage.error('科目查询失败 !')
        }
    })
}

function getClassList() {
    findClassBySchoId(examForm.value.grade).then((res: any) => {
        if (res.success) {
            classtOptions.value = []
            res.data.forEach( (val:any) =>{
                let temp = {
                    id: val.id,
                    className: val.className
                }
                classtOptions.value.push(temp)
            })
        } else {
            ElMessage.error('班级查询失败 !')
        }
    })
}

function changePeriod(){
      if (examForm.value.period === 1){
          //getSubjectList()
          //getClassList()
          examForm.value.grade = ref<any>('')
          examGradeList.value =  [{value: 11, label: '初一'}, {value: 12, label: '初二'}, {value: 13, label: '初三'}];
      }else if (examForm.value.period === 2){
          examGradeList.value =  [{value: 1, label: '高一'}, {value: 2, label: '高二'}, {value: 3, label: '高三'}];
          examForm.value.grade = ref<any>('')
          //getSubjectList()
          //getClassList()
      }else{
          examForm.value.grade = ref<any>('')
          examGradeList.value =  [{value: 21, label: '小学一年级'}, {value: 22, label: '小学二年级'}, {value: 23, label: '小学三年级'}
         , {value: 24, label: '小学四年级'}, {value: 25, label: '小学五年级'}, {value: 26, label: '小学六年级'}];
          //getSubjectList()
          //getClassList()
        }

}

function changeGrade() {
    isIndeterSubject.value = true;
    examForm.value.subNames= []
    getSubjectList()
    getClassList()
}


function getExamById(examId : any){
    getExamMessageById(examId).then((res: any) => {


        if (res.success) {
            examForm.value.examName = res.data.examName
            examForm.value.type = res.data.type
            examForm.value.period = res.data.period
            examForm.value.grade = res.data.gradeType
            if ( res.data.period === 1){
                examGradeList.value =  [{value: 11, label: '初一'}, {value: 12, label: '初二'}, {value: 13, label: '初三'}];
                examForm.value.grade = res.data.gradeType
            }else if(res.data.period === 2){
                examGradeList.value =  [{value: 1, label: '高一'}, {value: 2, label: '高二'}, {value: 3, label: '高三'}];
                examForm.value.grade = res.data.gradeType
            }else{
                examGradeList.value =  [{value: 21, label: '小学一年级'}, {value: 22, label: '小学二年级'}, {value: 23, label: '小学三年级'}
                    , {value: 24, label: '小学四年级'}, {value: 25, label: '小学五年级'}, {value: 26, label: '小学六年级'}];
                examForm.value.grade = res.data.gradeType
            }
            // console.log(res.data.subNameList)
            // subjectOptions.value = res.data.subNameList
            // console.log(subjectOptions.value)
            examForm.value.schoolTerm = res.data.schoolTerm
            examForm.value.examTime = [
                res.data.startData,
                res.data.endData
            ]

            examForm.value.subNames = res.data.subNameList
            console.log(examForm.value.subNames)
            if (subjects.value.length === examForm.value.subNames.length) {
                checkAllSubject.value = true
            } else {
                isIndeterSubject.value = true
            }
            console.log(res.data.classIdList)
            examForm.value.classIds = res.data.classIdList
            console.log(examForm.value.classIds);
            console.log("------------------------------------");

            if (classesList.value.length === examForm.value.classIds.length) {
                checkAllClass.value = true
            } else {
                isIndeterClass.value = true
            }
            allSubStatus.value = res.data.allSub
            onlySubStatus.value = res.data.onlySub

            examForm.value.oldClassIds = res.data.classIdList
            examForm.value.oldSubNames = res.data.subNameList
            //examForm.value.oldSubCheck = res.data.subCheck
            subCheck.value  = res.data.subCheck
            console.log(subCheck.value)
            getSubjectListByExam()
            //getSubjectList()
            getClassList()
        } else {
            ElMessage.error('考试任务查询失败 !')
        }
    })


}

function addMoreSub(){
    addSubVisible.value = true
    addSub.value = ''
}

function toAddSub(){
    addSub.value = addSub.value.replace(/\s/g,"")
    console.log(addSub.value )
    if (!addSub.value){
        ElMessage.warning('请输入自定义科目!')
        return
    }
    if (subjectOptions.value.lastIndexOf(addSub.value)!= -1){
        ElMessage.warning('添加科目不能重复!')
        return
    }
    addSubVisible.value = false
    subjectOptions.value.push(addSub.value)
    examForm.value.addSubNames.push(addSub.value)
}


onMounted(() => {
    getExamById(examId)
})


// 给后端发送日期格式
function formatDateValue(now: any) {
    var year = dateZero(now.getFullYear()); //取得4位数的年份
    var month = dateZero(now.getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
    var date = dateZero(now.getDate()); //返回日期月份中的天数（1到31）
    var hour = dateZero(now.getHours()); //返回日期中的小时数（0到23）
    var minute = dateZero(now.getMinutes()); //返回日期中的分钟数（0到59）
    var second = dateZero(now.getSeconds()); //返回日期中的秒数（0到59）
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
// 日期前面加0
function dateZero(time: any) {
    if (time < 10) {
        time = "" + "0" + time;
    }
    return time;
}


watch(() => dialogVisible, (newVal) => {
    if (!newVal.value) {
        notifyData.value = {}
    }
})
proxy.$socket.on('notify', (res: any) => {
    if (res && res.notifyId === 'updateExam') {
        notifyData.value = res
    }
    if(res.percent === 100){
        dialogVisible.value = false
        ElMessage.success('编辑成功 !')
        router.push('/exam')
    }
});



</script>

<style scoped lang="scss">
    .title {
        font-size: 16px;
        font-weight: bold;
        color: #202020;
        line-height: 22px;
        margin-right: 20px;
    }
    .card-title{

    }
    :deep(.el-form-item--default) {
        .el-form-item__label{
            font-size: 14px;
            color: #202020;
            font-weight: 500;
        }
        .textSmall{
            font-size: 12px;
        }


    }
    .bl-row{
        border-left:2px solid #D5DAE5;
    }
    :deep(.el-form-item__content){
        display: block;
    }


</style>
