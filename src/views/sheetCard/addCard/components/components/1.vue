<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" class="tal">
        <span class="mr-5">大题题号</span>
        <el-select style="width:180px" v-model="bigQues" placeholder="大题题号">
          <el-option v-for="i in bigQuesList" :label="i.label" :value="i.label" />
        </el-select>
      </el-col>
      <el-col :span="8" class="tal">
        <span class="mr-5">题目</span>
        <el-input style="width:200px" v-model="titleQues" placeholder="" />
      </el-col>
      <el-col :span="8" class="tal">
        <span class="mr-5">题型</span>
        <el-select style="width:200px" v-model="area" placeholder="题型">
          <el-option v-for="i in areaQuesList" :label="i.label" :value="i.value" />
        </el-select>

      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-10">
      <el-col :span="24" class="tal">
        <span class="mr-5">从</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="start" placeholder="" /><span
          class="mr-5">到</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="end" placeholder="" /><span
          class="mr-5">题，每题</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="score" placeholder="" /><span
          class="mr-5">分，每题、</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="choice" placeholder="" /><span
          class="mr-5">个选项</span>
      </el-col>
    </el-row>
    <!-- 实例区 -->
    <el-row :gutter="20" class="mt-10">
      <el-col :span="24" class="tal">
        <div class="cont-box">
          <ul v-if="form_choice.quesListBefore.length > 0" class="list-group" id="itemsChoices">
            <li class="list-group-item mb-5" v-for="(item, index) in form_choice.quesListBefore" :key="index">
              <span class="qno mr-5">第{{ item.quesNo }}题</span>
              <el-input type="number" class="mr-5" style="width:120px" v-model.number="item.quesScore" placeholder="" />
              <span class="mr-5">分</span>
              <el-input type="number" class="mr-5" style="width:120px" :disabled="item.choiceType === '3'" v-model.number="item.choiceNum" placeholder="" />
              <span class="mr-5">个选项</span>
              <span class="remove" @click.stop="removeEach(item)">
                <el-icon>
                  <Close />
                </el-icon>
              </span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="20" class="mt-10">
      <el-col :span="12" class="tal">
        <el-checkbox v-if="!isUpdate" v-model="isTitle" label="不添加大标题" size="large" :true-label="'0'" :false-label="'1'" />
      </el-col>
      <el-col :span="12" class="tal">
        <el-checkbox v-if="!isUpdate" v-model="toTop" label="增加题目自动排版至顶端答题题区域" size="large" :true-label="'1'" :false-label="'0'" />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-10">
      <el-col :span="24" class="tal">
        <span class="radio-c">设置每列行数</span>
        <el-radio-group v-model="row">
          <el-radio v-for="(item, index) in lineQuesList" :key="index + 'line'" :label="item.value">{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <div class="mt-10 tar" style="margin-bottom: -20px;">
      <!-- 添加保存 -->
      <el-button  v-if="!isUpdate" type="primary" @click="onSubmit">保存</el-button>
      <!-- 修改保存 -->
      <el-button v-if="isUpdate" type="primary" @click="onUpdate">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bigQuesList, areaQuesList, lineQuesList, } from '../../../config'
import { ElMessage } from 'element-plus'
import { sheetCardStoreWithOut } from '@/store/modules/sheetCard'
import { storeToRefs } from 'pinia'
import { uuid } from 'vue3-uuid';
type qType = {
  rowNum: number, //设置每列行数 5
  quesNo: number, //题号 总题号
  quesScore: number, //每个小题的分数
  quesType: string,
  choiceNum: number, //选项数量
  choiceType: string, //choiceType 单选/多选/判断
  optionCoords: [],//位置数组
}
const emit = defineEmits(['formData','formDataUpdate']);
const sheetCardStore = sheetCardStoreWithOut()
const {updateObj,listData } = storeToRefs(sheetCardStore) 

const isUpdate = ref(false) //是否展示居顶和大标题 是否是更新修改
const form_choice = ref({
  pageNo: 1,  //页码
  quesType:'choice', //外层就是写死的，内层再分判断多选单选
  areaTitle: "", //计算出来的大标题
  addTitle: "1", //是否添加大标题 “1”添加  “0”不加
  quesAreaId: '', //?????
  quesListBefore: ref<qType[]>([]),//小题 的数组对象
  quesList: [[], 80, 4, "选择题", 1, 0],//小题 的数组对象
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  // 需要在外面的接口不需要但是展示需要的参数
  rowNum:5
})
const start = ref(1)//开始题号
const end = ref(1)//结束题号
const score = ref(1)//每题分数
const choice = ref(4)//选项数量 输入框
const row = ref(5)//选项数量 输入框\
const toTop = ref('0')//是否加到顶端，“0” 否 “1”是
const bigQues = ref('') //大题题号 
const titleQues = ref('选择题')//题目 bigQues + '、' +  titleQues = areaTitle
const area = ref('1')//题型、
const isTitle = ref('1')//是否添加大标题 “1”添加  “0”不加

const props = defineProps({
  lastQuesNo: { //上一个题的小题号
    type: Number,
    default: 0
  },

  lastBigQues: { //上一个题的大题号
    type: String,
    default: '一'
  },
})

onMounted(()=>{
  // 根据状态管理内的updateObj 判断是否是更新还是新增
  if(updateObj.value && updateObj.value!==null){
    isUpdate.value = true
    form_choice.value = updateObj.value
    // 反向计算工厂函数
    dataComputedReverse( updateObj.value)
  }else{
    form_choice.value.quesAreaId = uuid.v4() //添加新增的id标识
    start.value = props.lastQuesNo
    end.value = props.lastQuesNo
    const ins = bigQuesList.findIndex(val => val.label === props.lastBigQues)
    bigQues.value = bigQuesList[ins].label

    isUpdate.value = false
  }
})

watch([start, end, score, choice, row, toTop, bigQues, titleQues, area, isTitle], (newVal, oldVal) => {
  const arr = {
    start: newVal[0],
    end: newVal[1],
    score: newVal[2],
    choice: newVal[3],
    row: newVal[4],
    toTop: newVal[5],
    bigQues: newVal[6],
    titleQues: newVal[7],
    area: newVal[8],
    isTitle: newVal[9],
  }
  dataComputed(arr)
}, { deep: true, immediate: true })

// 反向计算 对于修改的值预制
function dataComputedReverse(arr: any){
  if(arr.quesListBefore.length>0){
    start.value = arr.quesListBefore[0].quesNo
    end.value = arr.quesListBefore[arr.quesListBefore.length-1].quesNo
    score.value =  arr.quesListBefore[0].quesScore
    choice.value =  arr.quesListBefore[0].choiceNum
    row.value =  arr.quesListBefore[0].rowNum
    isTitle.value = arr.addTitle
    bigQues.value = arr.areaTitle.split('、')[0] || ''
    titleQues.value = arr.quesType === 'choice' ? '选择题' : ''
    const ins = areaQuesList.findIndex(val => val.value === arr.quesListBefore[0].choiceType)
    area.value = areaQuesList[ins].value
  }
}
// 计算三种题型
function areaForQuesType(key:any){
  if(key === 1 || key === '1'){
    return {ch:'选择题',en:'choice'}
  }else if(key === 2|| key === '2'){
    return {ch:'多选题',en:'check'}
  }else{
    return {ch:'判断题',en:'judge'}
  }
}
// 计算工厂函数
function dataComputed(arr: any) {
  if (arr.end >= arr.start && arr.end > 0 && arr.start > 0) {
    const end_start = arr.end - arr.start + 1
    const end_start_arr = Array.from(Array(end_start).keys(), i => i + 1)
    if (arr.area === '3') { //判断题 ，这样就改不了
      choice.value = 2
    }else if (arr.area === '1') { //判断题 ，这样就改不了

    }else{

    }
    
    
    // 将小题写入数组
    form_choice.value.quesListBefore = []
    end_start_arr.forEach((val, ins) => {
      form_choice.value.quesListBefore.push({
        rowNum: arr.row,
        quesNo: arr.start + val -1,
        quesScore: arr.score,
        quesType: areaForQuesType(arr.area).en,
        choiceNum: arr.choice,
        choiceType: arr.area,
        optionCoords: [],
      })
    })
    form_choice.value.quesList[3] =  areaForQuesType(arr.area).ch
    // 
    form_choice.value.rowNum = arr.row
    // 是否添加大标题
    form_choice.value.addTitle = arr.isTitle
    if (form_choice.value.addTitle == '0') {
      form_choice.value.areaTitle = ''
    } else {
      titleComputed()
    }

  } else {
    form_choice.value.quesListBefore = []
  }
}

// 合并标题大题
function titleComputed() {
  let str = ''
  if (form_choice.value.addTitle === '1') {
    let num = 0
    form_choice.value.quesListBefore.forEach((val: any) => {
      num += val.quesScore
    })
    str = bigQues.value + '、' + titleQues.value + '(总分:' + num + ')'
    form_choice.value.areaTitle = str
  } else {
    str = ''
    form_choice.value.areaTitle = ''
  }
  return str
}

function removeEach(item:any){
  const indes = form_choice.value.quesListBefore.findIndex(val=> val === item)

  form_choice.value.quesListBefore.splice(indes, 1)
}
// 保存按钮
const onSubmit = () => {
  titleComputed()
  // 将值推到父组件接收
  emit('formData', {form_choice:form_choice.value})
}
// 更新按钮
const onUpdate = () => {
  titleComputed()
  // 将值推到父组件接收
  emit('formDataUpdate', {form_choice:form_choice.value})
}


</script>

<style lang="scss" scoped>
.cont-box {
  
  height: 280px;
  border: 1px solid #e7e7e7;
  margin: 0 auto;
  overflow-y: auto;
  padding: 5px;
}

.list-group {
  .list-group-item {
    position: relative;

    .remove {
      position: absolute;
      right: 450px;
      top: 5px;
      color: red;
      margin-left: 20px;
      cursor: pointer;
      font-size: 20px;
    }
    .remove:hover {
      opacity: 0.6;
    }
  }
}

.radio-c {
  display: inline-block;
  float: left;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
}
</style>