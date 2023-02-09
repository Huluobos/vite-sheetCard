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
               <div class="background-class">
                   <span class="background-font-style">赋分设置</span>
               </div>
               <div class="not-background-class">
                   <span class="not-background-font-style">等级设置</span>
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
          <el-link :underline="false" class="text" @click="toAddScoreSet()">添加赋分设置</el-link>
        </span>
        <span class="operate-btn">
          <el-link :underline="false" class="text" @click="toAddAnotherSub()">同步其他科目</el-link>
        </span>
           <span class="operate-btn">
          <el-link :underline="false" class="text" @click="toAddAnotherSub()">导入</el-link>
        </span>
       </div>
       <div>
           <span style="font-size: 18px;">赋分设置:{{gradeType}}  赋分方式:    赋分类型:{{scoreType}}</span>
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
               <el-table-column prop="gradeValue" label="数值">
                   <template #default="scope">
                       <span v-if="scope.row.scoreType !== 0">{{scope.row.gradeValue || ''}}</span>
                       <span v-else>{{scope.row.gradeValue || ''}}%</span>
                   </template>
               </el-table-column>

               <el-table-column prop="assignMinValue" label="赋分分值">
                   <template #default="scope">
                       <span v-if="scope.row.assignMaxValue && scope.row.assignMinValue">
                         <el-input   placeholder="请输入" style="width: 80px;"
                                     v-model.number="scope.row.assignMaxValue"></el-input>
                           -<el-input placeholder="请输入" style="width: 80px;" v-model.number="scope.row.assignMinValue"></el-input>
                       </span>
                       <span v-else>
                           <el-input placeholder="请输入" style="width: 80px;" v-model.number="scope.row.score"></el-input>
                       </span>
                   </template>
               </el-table-column>
           </el-table>
       </div>

       <!--等级设置弹窗-->
       <Dialog
               :title="'设置赋分等级'"
               @commitBtn="addScoreSetVisible = false"
               :visible="addScoreSetVisible"
               :width="'800px'"
               :before-close="beforeClose"
       >
           <template #content>
               <el-form
                       :model="scoreSetForm"
                       :rules="rules"
                       label-width="85px"
                       :label-position="'left'"
               >
                   <el-form-item label="赋分设置">
                       <el-radio-group v-model="scoreSetForm.gradeType">
                           <el-radio v-for="item in gradeTypeList" :key="item.value" :label="item.value">
                               {{item.label}}
                           </el-radio>
                       </el-radio-group>
                   </el-form-item>
                   <el-form-item label="选择科目">
                       <el-radio-group v-model="scoreSetForm.subjectId">
                           <el-radio v-for="item in subList" :key="item.id" :label="item.id">
                               {{item.subName}}
                           </el-radio>
                       </el-radio-group>
                   </el-form-item>
                   <el-row>
                     <el-col :span="6">
                   <el-form-item label="" prop="type">
                   <el-select style="width:100%" v-model="scoreSetForm.chooseType" @change="changeChooseType()" placeholder="选择赋分方式" clearable>
                       <el-option
                               v-for="chType in chooseTypeList "
                               :key="chType.value"
                               :label="chType.label"
                               :value="chType.value"
                       />
                   </el-select>
                   </el-form-item>
                     </el-col>
                       <el-col :span ="6" >
                           <el-form-item  prop="type">
                               <el-select style="width:100%" v-model="typeRadio" placeholder="" clearable>
                                   <el-option
                                           v-for="scType in scoreTypeList"
                                           :key="scType.value"
                                           :label="scType.label"
                                           :value="scType.value"
                                   />
                               </el-select>
                           </el-form-item>
                       </el-col>
                       <el-col :span ="6">
                           <el-form-item>
                               <el-button type="primary">添加</el-button>
                           </el-form-item>
                       </el-col>
                   </el-row>

                   <el-form-item>
                       <el-table
                               :data="scoreSetDataList"
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

                           <el-table-column prop="score" label="数值">
                               <template #default="scope">
                                   <el-input v-if="typeRadio !== 0 &&  typeRadio !== 0 "  v-model="scope.row.gradeValue" placeholder="请输入"
                                             style="width: 80px;">{{scope.row.gradeValue }}</el-input>

                                   <el-input v-if="typeRadio=== 0 ||  typeRadio ===0 " v-model="scope.row.gradeValue" placeholder="请输入"
                                             style="width: 80px;">{{scope.row.gradeValue}}</el-input>
                                   <span v-if="typeRadio=== 0 ||  typeRadio === 0 ">%</span>
                               </template>
                           </el-table-column>

                           <el-table-column prop="assignMinValue" label="赋分分值">
                             <template #default="scope">
                                <span v-if="scope.row.assignMaxValue && scope.row.assignMinValue">
                                <el-input   placeholder="请输入" style="width: 80px;"
                                     v-model.number="scope.row.assignMaxValue"></el-input>
                            -<el-input placeholder="请输入" style="width: 80px;" v-model.number="scope.row.assignMinValue"></el-input>
                                </span>
                                <span v-else>
                                    <el-input placeholder="请输入" style="width: 80px;" v-model.number="scope.row.score"></el-input>
                                </span>
                               </template>
                           </el-table-column>

                           <el-table-column  label="操作">
                               <template #default="scope">
                                   <el-button type="text" style="color: red" @click="deleteStu(scope.row.studentNo)">删除</el-button>

                               </template>
                           </el-table-column>
                       </el-table>
                   </el-form-item>

               </el-form>
           </template>

           <template #footer>
          <span class="dialog-footer">
            <el-button style="width: 100px; height: 32px" type="primary"
                       @click="addScoreSetVisible = false">取消</el-button>

              <el-button style="width: 100px; height: 32px" type="primary"
                         @click="addScoreSetData()">确定</el-button>
            </span>
           </template>
       </Dialog>
   </div>

 </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { ElMessage } from 'element-plus'
import {findSubListByExamId} from "@/api/exam";
import {gradeScoreJunior, queryGradeScoreSet, saveGradeScoreSet} from "@/api/analysis";


const gradeType = ref<any>('')
const scoreType = ref<any>('')
const subjectId = ref<any>('')
const examId = '420953384972468224'
const dataList = ref([])
const subList = ref([])
const subjectOptions = ref<any>([]);
const scoreSetDataList = ref([])
//3+1+2
const options1 = ['A','B','C','D','E']
const proportion1 = ['15','35','35','13','2']
const max1 = ['100','85','70','55','40']
const min1 = ['86','71','56','41','30']
//6选3 区间
const options2 = ['A','B+','B','C+','C','D+','D','E']
const proportion2 = ['3','7','16','24','24','16','7','3']
const max2 = ['91','81','71','61','51','41','31','21']
const min2 = ['100','90','80','70','60','50','40','30']
const addScoreSetVisible = ref<boolean>(false)

const typeRadio = ref<any>('')

class scoreSetInfo {
    examId: any
    gradeType:any
    subjectId: any
    chooseType: any
    scoreType: any
    dataList:any
}

const data = reactive({
    queryParams: {
        examId: ref<any>(''),
        subId: ref<any>('')
    },
    chooseTypeList : [{value: 1, label: '3+1+2'}, {value: 2, label: '6选3(区间)'}, {value: 3, label: '6选3(分值)'},
        {value: 4, label: '7选3'}],
    scoreTypeList: [{value: 0, label: '百分比'}, {value: 1, label: '分数'}, {value: 2, label: '人数'}],
    gradeTypeList: [{value: 1, label: '等级赋分'}, {value: 2, label: '学考等级'}],

    scoreSetForm : new scoreSetInfo(),
})

const {queryParams,gradeTypeList,chooseTypeList,scoreTypeList,scoreSetForm} = toRefs(data)

onMounted(() => {
    queryParams.value.examId = examId
    listSubList()
})

/**
 * 查询列表
 * @param data
 */
function listSubList() {
    findSubListByExamId(examId).then((res: any) => {
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
            getScoreSet(queryParams.value)
            ElMessage.success('科目查询成功')
        } else {
            ElMessage.error(res.message)
        }
    })
}

function toAddScoreSet() {
    addScoreSetVisible.value = true
    scoreSetForm.value.subjectId = subjectId
    scoreSetForm.value.gradeType = 1
    scoreSetForm.value.scoreType = 0
    typeRadio.value = 0
}

function changeChooseType() {
    console.log(scoreSetForm.value.chooseType)
    if (scoreSetForm.value.chooseType === 1){
        changeNum5(5)
    }else if (scoreSetForm.value.chooseType === 2){
        changeNum8(8)
    }


}

function changeNum5(val:any) {
    const arr = new Array(parseInt(val)).fill('')
    const arr2:any = []
    let  i = 0;
    arr.forEach((value:any)=>{
        arr2.push({
            gradeName: options1[i],
            scoreType: typeRadio,
            gradeOrder : i ,
            gradeValue: proportion1[i],
            assignMaxValue:max1[i],
            assignMinValue:min1[i]
        })
        i++
    })
    scoreSetDataList.value = arr2
}

function changeNum8(val:any) {
    const arr = new Array(parseInt(val)).fill('')
    const arr2:any = []
    let  i = 0;
    arr.forEach((value:any)=>{
        arr2.push({
            gradeName: options2[i],
            scoreType: typeRadio,
            gradeOrder : i ,
            gradeValue: proportion2[i],
            assignMaxValue:max2[i],
            assignMinValue:min2[i]
        })
        i++
    })
    scoreSetDataList.value = arr2
}

function addScoreSetData() {
    scoreSetForm.value.examId = examId
    scoreSetForm.value.scoreType = typeRadio
    scoreSetForm.value.dataList = scoreSetDataList
    saveGradeScoreSet(scoreSetForm.value).then((res: any) => {
        if (res.success) {
            ElMessage.success('获取数据成功')
            addScoreSetVisible.value = false
            listSubList()
            //getScoreSet(queryParams.value)
        } else {
            ElMessage.error(res.message)
        }
    })

}

function getScoreSet(query :any) {
    queryParams.value.examId = examId
    queryParams.value.subId = subjectId
    queryGradeScoreSet(queryParams.value).then((res: any) => {
        if (res.success) {
            dataList.value = res.data.dataList
            gradeType.value = res.data.gradeType
            scoreType.value = res.data.scoreType
            typeRadio.value = res.data.scoreType
            if (res.data){
                scoreSetForm.value.subjectId = subjectId
                typeRadio.value = res.data.type
                scoreSetDataList.value = res.data.dataList
            }
            ElMessage.success('获取数据成功')
        } else {
            ElMessage.error(res.message)
        }
    })
}

function changeSub() {
    getScoreSet(queryParams.value)
}

function toUpdate() {
    console.log(typeRadio.value)
    queryParams.value.examId = examId
    queryParams.value.subId = subjectId
    getScoreSet(queryParams.value)
    addScoreSetVisible.value = true
}

function beforeClose() {
    addScoreSetVisible.value = false
    //checkAllSubject.value = false
    scoreSetForm.value = new scoreSetInfo()
}
</script>

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
