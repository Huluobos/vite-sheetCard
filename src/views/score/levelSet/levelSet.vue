<template>
  <div>
    <div slot="header">
        <div slot="header" style="width: 560px; display: flex;">
            <div slot="header" style="width: 600px; display: flex;">
                <div class="not-background-class">
                    <span class="not-background-font-style">基础设置</span>
                </div>
                <div class="not-background-class" @click="toFilterStudent()">
                    <span class="not-background-font-style">过滤学生</span>
                </div>
                <div class="not-background-class" @click="toScoreSet()">
                    <span class="not-background-font-style">赋分设置</span>
                </div>
                <div class="background-class">
                    <span class="background-font-style">等级设置</span>
                </div>
            </div>
        </div>
        <div style="display: flex;justify-content: left; margin-top: 20px;">
          <el-form>
            <el-form-item label="科目">
              <el-radio-group v-model="subjectId" @change="changeSub">
               <el-radio v-for="item in subList" :key="item.id" :label="item.id">
                   {{item.subName}}
               </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex;justify-content: right">
        <span class="operate-btn" style="margin-right: 15px;">
          <el-link :underline="false" class="text" @click="toAddLevel()">添加等级设置</el-link>
        </span>
        <span class="operate-btn">
          <el-link :underline="false" class="text" @click="toAddAnotherSub()">同步其他科目</el-link>
        </span>
        </div>

        <div>
            <span style="font-size: 18px;">等级数：{{setNum}}</span>
            <span style="float: right"><el-button @click="toUpdate" style="font-size: 18px;" type="text">编辑</el-button></span>
          <el-table
            :data="dataList"
            tyle="width: 100%"
            :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
            :cell-style="{'text-align': 'center',}"
            border
            stripe
            >
              <el-table-column prop="gradeName" label="等级名称"/>
              <el-table-column prop="scoreType" label="等级类型">
                  <template #default="scope">
                      <span v-if="scope.row.scoreType !== 0">分数</span>
                      <span v-else>比例</span>
                  </template>
              </el-table-column>
              <el-table-column prop="score" label="数值">
                  <template #default="scope">
                      <span v-if="scope.row.scoreType !== 0">{{scope.row.score}}</span>
                      <span v-else>{{scope.row.score}}%</span>
                  </template>
              </el-table-column>
          </el-table>
        </div>

        <!--等级设置弹窗-->
        <Dialog
                :title="'等级设置'"
                @commitBtn="addLevelVisible = false"
                :visible="addLevelVisible"
                :width="'800px'"
                :before-close="beforeClose"
        >
            <template #content>
                <el-form
                        :model="leveltForm"
                        :rules="rules"
                        label-width="85px"
                        :label-position="'left'"
                >
                    <el-form-item label="选择科目">
                        <el-radio-group v-model="leveltForm.subjectId">
                            <el-radio v-for="item in subList" :key="item.id" :label="item.id">
                                {{item.subName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="等级数:">
                        <el-input v-model="leveltForm.gradeOrder" @input="changeNum" oninput="if(value>100)value=100" placeholder="请输入" style="width: 200px;height: 32px"/>
                    </el-form-item>

                    <el-form-item label="等级类型" >
                        <el-radio-group v-model="typeRadio" @change="changeType">
                            <el-radio label="0" >比例</el-radio>
                            <el-radio label="1" >分数</el-radio>
                        </el-radio-group>
                    </el-form-item>
                   <el-form-item>
                       <el-table
                               :data="levelDataList"
                               tyle="width: 100%"
                               :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
                               :cell-style="{'text-align': 'center',}"
                               border
                               stripe
                       >
                           <el-table-column prop="gradeName" label="等级名称">
                               <template #default="scope">
                                   {{scope.row.gradeName}}
                               </template>
                           </el-table-column>
                           <el-table-column prop="scoreType" label="等级类型">
                               <template #default="scope">
                                   <span v-if="scope.row.scoreType ===0">比例</span>
                                   <span v-else>分数</span>
                               </template>
                           </el-table-column>
                           <el-table-column prop="score" label="数值">
                               <template #default="scope">
                                   <el-input v-if="~~typeRadio !== 0 "  v-model="scope.row.score" placeholder="请输入"
                                             style="width: 80px;">{{scope.row.score }}</el-input>
<!--                                   -->
                                   <el-input v-else v-model="scope.row.score"  placeholder="请输入"
                                             style="width: 80px;"></el-input>

                                   <span v-if="typeRadio=== 0 ||  typeRadio === '0' ">%</span>
                               </template>
                           </el-table-column>

                       </el-table>
                   </el-form-item>

                </el-form>
            </template>

            <template #footer>
          <span class="dialog-footer">
            <el-button style="width: 100px; height: 32px" type="primary"
                       @click="addLevelVisible = false">取消</el-button>

              <el-button style="width: 100px; height: 32px" type="primary"
                         @click="addLevelData()">确定</el-button>
            </span>
            </template>
        </Dialog>

        <!--同步其他科目-->
        <Dialog
                :title="'同步其他科目'"
                @commitBtn="anotherSubVisible = false"
                @dialogVisible="anotherSubDialog"
                :visible="anotherSubVisible"
                :width="'600px'"
                :before-close="beforeCloseSub"
        >
            <template #content>
                <span style="float: left;">请选择将{{}}学科等级规则同步到下列其他科目</span><br>
                <el-form
                        :model="anotherSubFrom"
                        :rules="rules"
                        label-width="85px"
                        :label-position="'left'"
                >
                    <el-checkbox :indeterminate="isIndeterSubject" v-model="checkAllSubject"
                                 @change="handleCheckAllSubjectChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="anotherSubFrom.anotherSubIds" @change="handleCheckedCitiesSubjectChange">
                        <el-checkbox v-for="subject in subjects" :label="subject.id" :key="subject.id">{{subject.subName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form>
            </template>

            <template #footer>
                <span class="dialog-footer">
            <el-button style="width: 100px; height: 32px" type="primary"
                       @click="anotherSubVisible = false">取消</el-button>

              <el-button style="width: 100px; height: 32px" type="primary"
                         @click="addAnotherSubSet()">确定</el-button>
            </span>
            </template>
        </Dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {findRepublicSubListByExamId} from "@/api/exam";
import { ElMessage } from 'element-plus'
import {gradeScoreJunior,saveGradeScoreJunior,saveAnotherSubSet} from "@/api/analysis";
import router from "@/router";
const examId = '420953384972468224'
const dataList = ref([])
const typeRadio = ref<any>('')
const subjectId = ref<any>('')
const subList = ref([])
const setNum = ref<any>('')
const subjectOptions = ref<any>([]);
const levelDataList = ref([])
const names = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ',
    'AAA','AAB','AAC','AAD','AAE','AAF','AAG','AAH','AAI','AAJ','AAK','AAL','AAM','AAN','AAO','AAP','AAQ','AAR','AAS','AAT','AAU','AAV','AAW','AAX','AAY','AAZ',
    'AAAA','AAAB','AAAC','AAAD','AAAE','AAAF','AAAG','AAAH','AAAI','AAAJ','AAAK','AAAL','AAAM','AAAN','AAAO','AAAP','AAAQ','AAAR','AAAS','AAAT','AAAU','AAAV','AAAW','AAAX','AAAY','AAAZ'];
const addLevelVisible = ref<boolean>(false)
const anotherSubVisible = ref<boolean>(false)


class levelInfo {
    examId: any
    gradeName:any
    subjectId: any
    gradeOrder: any
    scoreType: any
    dataList:any
}

class anotherSubInfo {
    examId:any
    subjectId:any
    anotherSubIds:any
}

let funcom = (row:any)=>{
    console.log(row);
    return row*100
}


const data = reactive({
    queryParams: {
      examId: ref<any>(''),
      subId: ref<any>('')
    },
    leveltForm: new levelInfo(),
    routerStudentParam: {
        examId: ref<any>('')
    },
    isIndeterSubject: ref<boolean>(false),
    checkAllSubject: ref<boolean>(false),
    subjects: subjectOptions,

    anotherSubFrom: new anotherSubInfo()
})

const {queryParams,leveltForm,routerStudentParam,isIndeterSubject,checkAllSubject,subjects,anotherSubFrom} = toRefs(data)
onMounted(() => {
    queryParams.value.examId = examId
    listSubList()
})

function changeSub() {
    getJunior(queryParams.value)
}
/**
 * 查询列表
 * @param data
 */
function listSubList() {
    findRepublicSubListByExamId(examId).then((res: any) => {
        if (res.success) {
            let num = 0
            subList.value = res.data
            subjectOptions.value = res.data
            queryParams.value.examId = examId
            res.data.forEach( (val:any) =>{
                if (num <= 0){
                    queryParams.value.subId = val.id
                    subjectId.value = val.id
                }
                num++
            })
            getJunior(queryParams.value)
            //ElMessage.success('科目查询成功')
        } else {
            ElMessage.error(res.message)
        }
    })
}

function getJunior(query :any) {
    queryParams.value.examId = examId
    queryParams.value.subId = subjectId
    gradeScoreJunior(queryParams.value).then((res: any) => {
        if (res.success) {
            dataList.value = res.data.levelDtos
            if (res.data){
                setNum.value = res.data.setNumber
                leveltForm.value.gradeOrder = res.data.setNumber
                leveltForm.value.subjectId = subjectId
                typeRadio.value = res.data.type
                levelDataList.value = res.data.levelDtos
            }
            //ElMessage.success('获取数据成功')
        } else {
            ElMessage.error(res.message)
        }
    })
}

function toAddLevel() {
    addLevelVisible.value = true
    typeRadio.value = '0'
    leveltForm.value.scoreType = '0'
    leveltForm.value.gradeOrder = 5
    leveltForm.value.subjectId = subjectId
    changeNum(5)
}


function changeNum(val:any) {
    const arr = new Array(parseInt(val)).fill('')
    const arr2:any = []
    let  i = 0;
    arr.forEach((value:any)=>{
        arr2.push({
            gradeName: names[i],
            scoreType: typeRadio,
            gradeOrder : i ,
            score:''
        })
        i++
    })
    levelDataList.value = arr2
}

function addLevelData() {
    let aa = 0;
    levelDataList.value.forEach((value:any)=>{
        if (!value.gradeName){
            aa += 1;
        }
        if (!value.score){
           aa+=1;
        }
    })
    if (aa > 0){
        ElMessage.warning('‘等级名称和等级值不能为空！')
        return;
    }

    if (typeRadio.value === '0'){
        let total = 0;
        levelDataList.value.forEach((value:any)=>{
            total = total + parseInt(value.score)
        })
        console.log(total)
        if (total != 100){
            ElMessage.warning('设置失败，比例数值不应低于或高于100')
            return
        }
    }

    leveltForm.value.examId = examId
    leveltForm.value.scoreType = typeRadio
    leveltForm.value.dataList = levelDataList
    saveGradeScoreJunior(leveltForm.value).then((res: any) => {
        if (res.success) {
            //ElMessage.success('获取数据成功')
            addLevelVisible.value = false
            listSubList()
            getJunior(queryParams.value)
        } else {
            ElMessage.error(res.message)
        }
    })
}

function beforeClose() {
    addLevelVisible.value = false
    checkAllSubject.value = false
    leveltForm.value = new levelInfo()
}

function beforeCloseSub() {
    anotherSubVisible.value = false
    anotherSubFrom.value = new anotherSubInfo()
}

function toUpdate() {
    console.log(typeRadio.value)
    queryParams.value.examId = examId
    queryParams.value.subId = subjectId
    getJunior(queryParams.value)
    addLevelVisible.value = true
}

function changeType() {
    changeNum(leveltForm.value.gradeOrder)
}

function toFilterStudent() {
    routerStudentParam.value.examId = examId
    router.push({path: '/score/filterStudent', query: routerStudentParam.value})
}

function toScoreSet() {
    routerStudentParam.value.examId = examId
    router.push({path: '/score/scoreSet', query: routerStudentParam.value})
}

function handleCheckAllSubjectChange(val: boolean) {
    anotherSubFrom.value.anotherSubIds = val ? subjectOptions.value.map((val:any)=>{return val.id}) : [];
    console.log(subjectOptions.value)
    isIndeterSubject.value = false;
}

function handleCheckedCitiesSubjectChange(value: any) {
    let checkedSubjectCount = value.length;
    checkAllSubject.value = checkedSubjectCount === subjects.value.length;
    isIndeterSubject.value = checkedSubjectCount > 0 && checkedSubjectCount < subjects.value.length;
}

function toAddAnotherSub() {
    anotherSubVisible.value = true
    checkAllSubject.value = false;
    anotherSubFrom.value = new anotherSubInfo()

}

function addAnotherSubSet() {
    if (!anotherSubFrom.value.anotherSubIds){
        ElMessage.warning('请勾选同步科目')
        return
    }
    anotherSubFrom.value.examId = examId
    anotherSubFrom.value.subjectId = subjectId
    saveAnotherSubSet(anotherSubFrom.value).then((res: any) => {
        if (res.success) {
            ElMessage.success('科目等级设置同步成功')
            anotherSubVisible.value = false
            listSubList()
            getJunior(queryParams.value)
        } else {
            ElMessage.error(res.message)
        }
    })
}
</script>

<style scoped lang="scss">
    :deep(.el-table) {
        thead.is-group tr:nth-child(2) .el-table__cell {
            left: 0 !important;
        }
    }
</style>
<style scoped lang="scss">
    .card-title {
        margin-bottom: 16px;
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
    }

    .operate-btn {
        line-height: 22px;
        display: flex;
        justify-content: right;
        align-items: center;
        margin-bottom: 12px;
        text-align: right;

        .text {
            font-size: 14px;
            color: #4381E5;
            line-height: 22px;
            margin-left: 5px;
        }

        .img {
            width: 20px;
            height: 20px;
        }
    }

    .background-font-style {
        width: 90px;
        height: 22px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei, sans-serif;
        font-weight: bold;
        color: #fff;
        line-height: 22px;
        align-items: center;
        display: inline-block;
    }

    .not-background-font-style {
        width: 90px;
        height: 22px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei, sans-serif;
        font-weight: bold;
        color: #808080;
        line-height: 22px;
        align-items: center;
        display: inline-block;
    }

    .background-class {
        width: 120px;
        height: 40px;
        background: #4381e5;
        border-radius: 10px 10px 0 0;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
    .not-background-class {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 10px 10px 0 0;
        cursor: pointer;
    }

    .table-header {
        background: #D3E0F4;
        text-align: center;
    }
</style>
