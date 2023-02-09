<template>
  <div>
    <el-row class="tal mb-10 fb">
      <el-col :span="24">答题卡基础信息设置</el-col>
    </el-row>

    <el-row class="tal">
      <el-col :span="8" class="alc">答题卡纸张</el-col>
      <el-col :span="16">
        <el-row class="tal">
          <el-col :span="8" @click="changePage('pageA32')"
            :class="sheetCardVo.pageSize === 'pageA32' ? 'page active' : ''">
            <div class="dtk_icon a32 a3lit little"></div>
            <div class="dtk_label fontsize12">A3两栏</div>
          </el-col>
          <el-col :span="8" @click="changePage('pageA33')"
            :class="sheetCardVo.pageSize === 'pageA33' ? 'page active' : ''">
            <div class="dtk_icon a3 a3lit little"></div>
            <div class="dtk_label fontsize12">A3三栏</div>
          </el-col>
          <el-col :span="8" @click="changePage('pageA4')"
            :class="sheetCardVo.pageSize === 'pageA4' ? 'page active' : ''">
            <div class="dtk_icon a4 a4lit little"></div>
            <div class="dtk_label a4 fontsize12">A4</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="tal">
      <el-col :span="8" class="alc40">填涂样式</el-col>
      <el-col :span="16">
        <el-radio-group v-model="sheetCardVo.fillType" class="ml-4" @change="changeConfig">
          <el-radio :label="0" size="large">
            <img class="radio_img" src="@/assets/filling-close.png" alt="" />
          </el-radio>
          <el-radio :label="1" size="large">
            <img class="radio_img" src="@/assets/filling-open.png" alt="" />
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="tal">
      <el-col :span="8" class="alc40">答题卡颜色</el-col>
      <el-col :span="16">
        <el-radio-group v-model="sheetCardVo.colorType" class="ml-4" @change="changeConfig">
          <el-radio :label="0" size="large">黑色</el-radio>
          <el-radio :label="1" size="large">红色</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="tal mb-10 ">
      <el-col :span="8" class="alc40">答题卡科目</el-col>
      <el-col :span="16">
        <el-select v-model="sheetCardVo.subName" class="m-2" placeholder="Select" @change="changeConfig">
          <el-option v-for="item in subNameOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>

    <el-row class="tal mb-10 fb">
      <el-col :span="24">答题卡卷头样式设置</el-col>
    </el-row>
    <el-row class="tal">
      <el-col :span="24">
        <el-radio-group v-model="sheetCardVo.codeorFill" class="ml-4" @change="changeConfig">
          <el-radio :label="0" size="large">填涂</el-radio>
          <el-radio :label="1" size="large">条码</el-radio>
          <!-- <el-radio :label="2" size="large">填涂+条码</el-radio> -->
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="tal mb-10 ">
      <el-col :span="24">
        <el-checkbox v-model="sheetCardVo.showQues" :true-label="1" :false-label="0" label="显示注意事项和缺考标记" size="large"
          @change='changeConfig' />
      </el-col>
    </el-row>
    <el-row class="tal mb-10 fb">
      <el-col :span="24">题型添加</el-col>
    </el-row>
    <el-row class="tal mb-10 " :gutter="10">
      <el-col class="mb-10" :span="8" v-for="(item, index) in tabData" :key="index + 'tab'">
        <el-button class="btn-orange" @click="openDialog(item,item.name +'添加')">{{item.name}}</el-button>
      </el-col>
      <!-- <el-col class="mb-10" :span="8">
        <el-button class="btn-orange" @click="openDialog(item.name,'选择题添加')">填空题</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-orange">主观题</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-orange">语文作文</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-orange">英语作文</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-orange">选做题</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-orange">非作答区</el-button>
      </el-col> -->
    </el-row>

    <el-row class="tal mb-10 fb">
      <el-col :span="24">功能按钮</el-col>
    </el-row>

    <el-row class="tal mb-10 " :gutter="10">
      <el-col class="mb-10" :span="8">
        <el-button class="btn-blue">
          <View style="width: 1em; height: 1em; margin-right: 5px" />预览
        </el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-blue" @click="saveAllBtn">保存</el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-blue">
          <Download style="width: 1em; height: 1em; margin-right: 5px" />下载
        </el-button>
      </el-col>
      <el-col class="mb-10" :span="8">
        <el-button class="btn-blue">返回</el-button>
      </el-col>
    </el-row>


    <Dialog :title="titleDialog" :visible="visible" :top="'15vh'" :width="'900px'" @dialogVisible="dialogVisible">
      <template #content>
        <component :is="currentTab.tabComp" @formData="formData"  :lastQuesNo="lastQuesNoComputed" :lastBigQues="lastBigQuesComputed" @formDataUpdate="formDataUpdate"></component>
      </template>
    
    </Dialog>
  </div> 
</template>

<script setup lang="ts">

import useCurrentInstance from "@/util/useCurrentInstance";
import { uuid } from 'vue3-uuid';
import { View, Download } from '@element-plus/icons-vue'
import { subNameOptions,bigQuesList, choiceTypeList} from '../../config'
import { sheetCardStoreWithOut } from '@/store/modules/sheetCard'
import { storeToRefs } from 'pinia'
const { proxy } = useCurrentInstance();
const sheetCardStore = sheetCardStoreWithOut()
const {updateObj,updateIndex,listData } = storeToRefs(sheetCardStore)


const sheetCardVo = sheetCardStore.getSheetCard

// 大题号的计算属性
const lastBigQuesComputed= computed(()=>{
 if(listData.value.length<=0){
    return '一'
  }else{
    const ins = bigQuesList.findIndex(val => val.value === listData.value.length)
    if(ins>-1){
      return bigQuesList[ins+1].label
    }else{
      return '一'
    }
     
  }
}) 
// 小题号计算属性
const lastQuesNoComputed= computed(()=>{
  if(listData.value.length<=0){
    return 1
  }else{
    const list =  listData.value[listData.value.length-1].quesListBefore
    const snum =  list[list.length-1].quesNo + 1
    return snum
  }
  
}) 
function changeConfig() {
  const data: any = sheetCardVo
  sheetCardStore.setSheetCard(data)
}
// 纸张大小
const changePage = (size: string) => {
  sheetCardVo.pageSize = size
  changeConfig()
}

//--------------------------------
type tabType = {
  name: string,
  tabComp: any,
  enName:string,
}
type Comp = Pick<tabType, 'tabComp'>
const DIALOG_1 = defineAsyncComponent(()=> import ('./components/1.vue'))
const DIALOG_2 = defineAsyncComponent(()=> import ('./components/2.vue'))

const tabData = reactive<tabType[]>([
  {name: '选择题',enName: 'choice',tabComp: markRaw(DIALOG_1)},
  {name: '填空题',enName: 'blank',tabComp: markRaw(DIALOG_2)},
])
 
let currentTab = reactive<Comp>({
  tabComp: tabData[0].tabComp
})
const titleDialog = ref('选择题添加')
const visible = ref(false)

function openDialog(tab:tabType,txt:string){
  visible.value = true
  titleDialog.value = txt
  currentTab.tabComp = tab.tabComp
}
const dialogVisible = (key:boolean)=>{
  visible.value= key
  if(key === false){
    // 重置 状态值，这个状态值是用来修改块信息的
     sheetCardStore.upList(null,-1)
  }
}
 
// 接收子组件的值，用于添加块
function formData(data:any){
  
  if(data.form_choice){
    // 选择题
    sheetCardStore.addListData(data.form_choice)
    setTimeout(()=>{visible.value = false})
  }
}
// 接收子组件的值，用于更新块
function formDataUpdate(data:any){
  if(data.form_choice){
    // 选择题
    sheetCardStore.updateListData(data.form_choice,updateIndex.value)
    setTimeout(()=>{visible.value = false})
  }
}
watch(()=> updateObj,(newVal, oldVal)=>{
  if(newVal.value!==null){
    const a:any = newVal.value
    const ins = tabData.findIndex(val=> val.enName === a.quesType )
    openDialog(tabData[ins],tabData[ins].name +'修改')
  } 
},{deep:true})

// 保存按钮
function saveAllBtn(){
  const data = listData.value
  // 位置计算
  data.forEach((item:any,index:number)=>{
    // 通过循环大的数组，将全部的选择题 dom 定位 加进去 
    // 如果是选择题，如何如何添加！
    // 如果是其他题如何添加
    // 'each_'+ item.quesAreaId  大题
    // 'quesNo_' + ins + item.quesAreaId  小题 ins是小题的循环顺组，
    // 'child_' + ins + item.quesAreaId  小题
    const each = document.getElementById('each_'+ item.quesAreaId)
    const zywh = getElementPagePosition(each)
    // 大题的位置计算
    item =  {...item,...zywh}
    const itemChild = item.quesListBefore
    itemChild.forEach((it:any, ins:number)=>{
      choiceTypeList.slice(0,it.choiceNum).forEach((t:any,n:number)=>{
          const child = document.getElementById('child_'+ ins + item.quesAreaId + n)
          console.log(child)
          const childDom = getElementParentPosition(child)
            console.log(childDom)
      })
    
      
    
    })
  })
}

// 相对整个纸张的
function getElementPagePosition(element:any){
  // 因为  .card-content 有 position: relative; 所以 取offsetLeft就是相对 .card-content的  .card-content的宽度又是100%
  const yTop = 23  //y轴每个大题有23px固定大标题占位高度
  //计算x坐标
  const actualLeft = element.offsetLeft;
  //计算y坐标
  const actualTop = element.offsetTop + yTop;
  //计算宽度
  const clientWidth = element.clientWidth;
  //计算高度
  const clientHeight = element.clientHeight - yTop ;
  //返回结果
  return {left: actualLeft, top: actualTop, height:clientHeight,width:clientWidth}
}

// 相对大题的计算小题
function getElementParentPosition(element:any,){
  // 因为  .card-content 有 position: relative; 所以 取offsetLeft就是相对 .card-content的  .card-content的宽度又是100%
  const yTop = 23  //y轴每个大题有23px固定大标题占位高度
  //计算x坐标
  const actualLeft = element.offsetLeft;
  //计算y坐标
  const actualTop = element.offsetTop + yTop;
  //计算宽度
  const clientWidth = element.clientWidth;
  //计算高度
  const clientHeight = element.clientHeight - yTop ;
  //返回结果

  return {left: actualLeft, top: actualTop, height:clientHeight,width:clientWidth}
}
</script>

<style scoped>
.dtk_icon.a3.a3lit,
.dtk_icon.a32.a3lit {
  background-size: 55px 50px;
  width: 55px;
  height: 50px;
}

.dtk_icon.a4.a4lit {
  background-size: 35px 50px;
  width: 35px;
  height: 50px;
}

.size-choice.active .dtk_icon {
  border: 2px solid #00a4ff;
}

.dtk_icon.a32 {
  background: url('@/assets/a3_2.png') no-repeat center;
  background-size: 67px 60px;
}

.dtk_icon.a3 {
  background: url('@/assets/a3_3.png') no-repeat center;
  background-size: 67px 60px;
}

.dtk_icon.a4 {
  background: url('@/assets/a4.png') no-repeat center;
  background-size: 42px 60px;
  width: 42px;
}

.dtk_label {
  width: 55px;
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
}

.dtk_label.a4 {
  width: 35px;
}

.alc {
  line-height: 75px;
}

.alc40 {
  line-height: 40px;
}

.page.active .dtk_icon {
  border: 2px solid #00a4ff
}

.page.active .dtk_label {
  color: #00a4ff;
}

.radio_img {
  display: block;
  width: 33px;
  height: 20px;
}

.btn-orange {
  background-color: #FFB401;
  color: #fff;
  padding: 6px 12px;
  width: 100%;
  border: none;
}

.btn-blue {
  background-color: #00a4ff;
  color: #fff;
  padding: 6px 12px;
  width: 100%;
  border: none;
}

.btn-orange:active,
.btn-orange:hover,
.btn-orange:focus,
.btn-blue:active,
.btn-blue:hover,
.btn-blue:focus {
  opacity: 0.8;
}
</style>