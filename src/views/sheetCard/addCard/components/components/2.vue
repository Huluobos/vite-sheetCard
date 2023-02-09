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
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="start" placeholder="" /><span class="mr-5">到</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="end" placeholder="" /><span class="mr-5">题，每题</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="score" placeholder="" /><span class="mr-5">分，每题、</span>
        <el-input class="mr-5" style="width:120px" type="number" v-model.number="choice" placeholder="" /><span class="mr-5">个选项</span>
      </el-col>
    </el-row>
    <!-- 实例区 -->
    <el-row :gutter="20" class="mt-10">
      <el-col :span="24" class="tal">
        <div class="cont-box">
            <ul  v-if="form_choice.quesListBefore.length > 0" class="list-group" id="itemsChoices">
              <li class="list-group-item" v-for="(item, index) in form_choice.quesListBefore" :key="index">
                <span class="qno mr-5">第{{item.quesNo}}题</span>
                <el-input  type="number" class="mr-5" style="width:120px" v-model.number="item.quesScore" placeholder="" />
                <span class="mr-5">分</span>
                <el-input  type="number" class="mr-5" style="width:120px" v-model.number="item.choiceNum" placeholder="" />
                <span class="mr-5">个选项</span>
                <span class="remove"><el-icon><Close /></el-icon></span>
              </li>
            </ul>
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="20" class="mt-10">
      <el-col :span="12" class="tal">
        <el-checkbox v-model="isTitle" label="不添加大标题" size="large" :true-label="'0'" :false-label="'1'" />
      </el-col>
       <el-col :span="12" class="tal">
        <el-checkbox v-model="toTop" label="增加题目自动排版至顶端答题题区域" size="large" :true-label="'1'" :false-label="'0'" />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-10">
      <el-col :span="24" class="tal">
         <el-radio-group v-model="row">
            <el-radio v-for="(item,index) in lineQuesList" :key="index+ 'line'" :label="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { bigQuesList, areaQuesList,lineQuesList } from '../../../config'
import { ElMessage } from 'element-plus'
type qType={
  rowNum:number, //设置每列行数 5
  quesNo:number, //题号 总题号
  quesScore:number, //每个小题的分数
  quesType:string,
  choiceNum:number, //选项数量
  choiceType:string, //choiceType 单选/多选/判断
  optionCoords:[],//位置数组
}
const  form_choice = ref({
    pageNo: ref(1),  //页码
    areaTitle: ref(""), //计算出来的大标题
    addTitle: ref("1"), //是否添加大标题 “1”添加  “0”不加
    // quesAreaId: "2a22c4eb-781c-477e-b5a6-27e4a66922bc", //?????

    quesListBefore:ref<qType[]>([]),//小题 的数组对象
    quesList:[
      [],
      80,
      4,
      "选择题",
      1,
      0
    ],//小题 的数组对象
    left:0,
    top:0,
    width:0,
    height:0,
})
  const start= ref(1)//开始题号
  const end= ref(1)//结束题号
  const score= ref(1)//每题分数
  const choice= ref(1)//选项数量 输入框
  const row= ref('')//选项数量 输入框\
  const toTop= ref('0')//是否加到顶端，“0” 否 “1”是
  const bigQues= ref('') //大题题号
  const titleQues= ref('')//题目 bigQues + '、' +  titleQues = areaTitle
  const area= ref('1')//题型、
  const isTitle= ref('1')//是否添加大标题 “1”添加  “0”不加
// 合并标题大题



watch([start, end, score, choice, row,toTop ,bigQues ,titleQues ,area,isTitle],(newVal,oldVal)=>{
  const arr = {
    start:newVal[0],
    end:newVal[1],
    score:newVal[2],
    choice:newVal[3],
    row:newVal[4],
    toTop:newVal[5] ,
    bigQues:newVal[6] ,
    titleQues:newVal[7] ,
    area:newVal[8],
    isTitle:newVal[9],
  }
  dataComputed(arr)
},{deep:true})

// 计算工厂函数
function dataComputed(arr:any){
  console.log(arr)
  if(arr.end >= arr.start && arr.end > 0 && arr.start > 0){
    const end_start = arr.end - arr.start + 1
    const end_start_arr = Array.from(Array(end_start).keys(), i => i+1)
    if(arr.area === '3'){ //判断题 ，这样就改不了
      choice.value = 2
    }
    form_choice.value.addTitle = arr.isTitle
    // 是否添加大标题

    // 将小题写入数组
    form_choice.value.quesListBefore = []
    end_start_arr.forEach((val,ins) => {
      form_choice.value.quesListBefore.push({
          rowNum:arr.row,
          quesNo:val,
          quesScore:arr.score,
          quesType:'choice',
          choiceNum:arr.choice,
          choiceType:arr.area,
          optionCoords:[],
      })
    });
    console.log(form_choice)
  }else{
    ElMessage({type:'warning',message:'结束题号不能小于或等于开始题号'})
  }
  //
}
//打开弹窗预制函数



const areaTitleComputed= computed(()=>{
   let str  = ''
  if(form_choice.value.addTitle === '1'){
    let num = 0
    form_choice.value.quesListBefore.forEach((val:any)=>{
      num += val.quesScore
    })
    str = bigQues.value + '、' +  titleQues.value  + '(总分:'+ num  + ')'
    form_choice.value.areaTitle = str
  }else{
    str = ''
     form_choice.value.areaTitle  = ''
  }
  console.log(form_choice)
  return str
})
defineExpose({
  form_choice
})
</script>

<style lang="scss" scoped>

.cont-box {
    height: 280px;
    border: 1px solid #e7e7e7;
    margin: 0 auto;
    overflow-y: auto;
    padding: 5px;
}
.list-group{
  .list-group-item{
    position: relative;
    .remove {
      position: absolute;
      right: 20px;
      color: red;
      margin-left: 20px;
      cursor: pointer;
      font-size: 20px;
    }
  }
}

</style>
