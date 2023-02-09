<template>
	<div id="my_page" class="card-box " :style="{width:(sheetCardVo.pageSize==='pageA33') ? '520px' :'210mm'}" >
		<div class="card-header" :class="sheetCardVo.colorType ===0 ? '':'varColor'">
			<!-- 标题头 cardName -->
			<div class="each header-cardName ">
				<el-input size="small" resize="none" :rows="1" maxlength="100" v-model="sheetCardVo.cardName" type="textarea" placeholder="请填写答题卡名称"/>
			</div>
      <!-- 标题头2 cardName2 -->
      <div class="each header-cardName2">
				<el-input size="small" resize="none" :rows="1" maxlength="100" v-model="sheetCardVo.cardName2" type="textarea" placeholder="请填写答题卡名称"/>
			</div>
      <!-- headConfig -->
      <div class="each headConfig" style="height:36px"> 
        <el-row v-if="sheetCardVo.headConfig.length>0 && sheetCardVo.showQues === 1" > 
          <el-col :span="6" v-for="(item,index) in sheetCardVo.headConfig.split(',')" :key="index+'headConfig'">{{item}}:
            <span class="underLine"></span>
          </el-col>
        </el-row>
        <el-row v-else></el-row>
        <div class="posiBtn" v-if="sheetCardVo.showQues === 1" >
          <el-button size="small" class="btn-blue" @click="openHeadConfigDialog">修改</el-button>
        </div>
			</div>
      <!-- about -->
      <div class="each about">
         <el-row style="line-height: 32px;"> 
          <el-col :span="sheetCardVo.codeorFill !== 0 ? 16 : (24-sheetCardVo.examNoLen)">
            <span v-if="sheetCardVo.showQues === 1">注意事项</span>  
          </el-col>
          <el-col :span="sheetCardVo.examNoLen">
            <div class="posibox2" v-if="sheetCardVo.codeorFill === 0">准考证号 
              <div class="posiBtn2" v-if="sheetCardVo.showQues === 1" >
                <el-button size="small" class="btn-blue" @click="openCodeDialog">修改</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
         <el-row> 
          <el-col :span="sheetCardVo.codeorFill !== 0 ? 16 : (24-sheetCardVo.examNoLen)" v-if="sheetCardVo.showQues === 1">
             <el-row :style="{flexWrap: 'wrap',height: '210px',padding:((sheetCardVo.pageSize==='pageA33') ? '0' : '10px 0')}"> 
                <div style='width:90%' class="tal textI2">1.答题前请将个人信息填写清楚。</div>
                <div style='width:90%' class="tal textI2">2.客观题必须使用2B铅笔填涂，修改时用橡皮擦干净。</div>
                <div style='width:90%' class="tal textI2">3.主观题必须使用黑色签字笔书写。</div>
                <div style='width:90%' class="tal textI2">4.必须在题号对应的区域内作答，超出区域书写无效。</div>
                <div style='width:90%' class="tal textI2">5.保持答卷清洁完整。</div>
            </el-row>
            <el-row style="height:30px"> 
              <div class="tal textI2 about-text">正确填涂 <span class="exbox blackBox"></span> 缺考标记 <span class="exbox whiteBox"></span></div>
            </el-row>
          </el-col>
           <el-col :span="sheetCardVo.codeorFill !== 0 ? 16 : (24-sheetCardVo.examNoLen)" v-if="sheetCardVo.showQues === 0">
            <div class="each headConfig">
                <div v-if="sheetCardVo.headConfig.length>0"> 
                  <div v-for="(item,index) in sheetCardVo.headConfig.split(',')" :key="index+'headConfig'">{{item}}:
                    <span class="underLine"></span>
                  </div>
                </div>
                <div v-else></div>

                <div class="posiBtn">
                  <el-button size="small" class="btn-blue" @click="openHeadConfigDialog">修改</el-button>
                </div>
            </div>
          </el-col>
          <el-col :span="sheetCardVo.examNoLen" v-if="sheetCardVo.codeorFill === 0">
            <el-row style="width:100%;flex-wrap: nowrap;"> 
              <div class="smallCol brBox" :style="{ 'width': ((1/sheetCardVo.examNoLen) * 100) + '%'  }" v-for="i in sheetCardVo.examNoLen" :key="i+'s'">
                <div><span class="nobor-box"></span></div>
              </div>
            </el-row>
            <el-row style="width:100%;flex-wrap: nowrap;"> 
              <div class="minCol brBox" v-for="i in sheetCardVo.examNoLen" :key="i+'s'" :style="{ 'width':  ((1/sheetCardVo.examNoLen) *24*100) + '%' }">
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">0</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">1</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">2</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">3</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">4</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">5</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">6</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">7</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">8</span></div>
                 <div class="num"><span :class="sheetCardVo.fillType == 0 ? 'bor-box': 'bor-box-open'">9</span></div>
              </div>
            </el-row>
          </el-col>

          <el-col class="fill-box" :span="8" v-if="sheetCardVo.codeorFill !== 0">
            <!-- 条形码 -->
            <div class="fill-box-card" style="width:220px;height:110px;border: 2px dashed;border-radius: 10px" :class="sheetCardVo.colorType ===0 ? '':'varColor'"></div>
          </el-col>
        </el-row>
      </div>
		</div>
    <div class="card-content" :class="sheetCardVo.colorType ===0 ? '':'varColor'">
        <div class="each quesBox" v-for="(item,index) in listData" :key="index+'card'" :id="'each_'+ item.quesAreaId">
          <div class="each-title tal">
            <el-input size="small" resize="none" :rows="1" v-model="item.areaTitle" placeholder=""/>
          </div>
          <div class="each-body tal" v-if="item.quesType ==='choice' &&  item.quesListBefore.length>0" >
            <!-- 选择题 -->
            <div class="choice flew-col"  :style="{ 'max-height':  (item.rowNum) * 21 + 'px' }">
              <p class="num" v-for="(its,ins) in item.quesListBefore" >  
                <span class="quesNoBox" :class="'quesNo_' + ins + item.quesAreaId">{{its.quesNo}}</span>
                <span v-if="its.choiceType !== '3'" class="redChoice">
                  <span style="margin-left:10px" :key="ic+'ic'" v-for="(cho,ic) in  choiceTypeList.slice(0,its.choiceNum)" :id="'child_' + ins + item.quesAreaId + ic" :class="sheetCardVo.fillType == 0 ? 'bor-box' : 'bor-box-open'">{{cho}}</span>
                </span>
                <span v-else>
                  <span style="margin-left:10px" :id="'child_'+ ins + item.quesAreaId + '0'" :class="sheetCardVo.fillType == 0 ? 'bor-box' : 'bor-box-open'">T</span>
                  <span style="margin-left:10px" :id="'child_'+ ins + item.quesAreaId + '1'" :class="sheetCardVo.fillType == 0 ? 'bor-box' : 'bor-box-open'">F</span>
                </span>
               
              </p>
             
            </div>
           
            <!-- <Editor v-model="text" :disabled="false"></Editor> -->
          </div>
          <div class="posBtn">
            <div class="btn-list">
                <el-button size="small" class="btn-blue" @click="delListData(item,index)">删除</el-button>
              <el-button size="small" class="btn-blue" @click="upListData(item,index)">修改</el-button>
            </div>
          
          </div>
          
        </div>
    </div>

    <Dialog title="编辑填写区"  :visible="visible" :top="'15vh'" :width="'500px'">
      <template #content>
       <el-checkbox-group v-model="checkList" @change="checkListChange">
          <el-checkbox :key="index+'ss'" v-for='(item,index) in headConfigList' :label="item"/>
        </el-checkbox-group>
        <div class="error-box">{{errText}}</div>
      </template>
      <template #footer>
        <el-button type="primary" @click="commitHeadConfig" :disabled="errText!==''">保存</el-button>
      </template>
    </Dialog>

     <Dialog title="编辑考号"  :visible="visible2" :top="'15vh'" :width="'500px'">
      <template #content>
        考号位数 
        <el-input-number v-model="codeNum" :min="3" :max="15"/>
        <div class="error-box">{{errText2}}</div>
      </template>
      <template #footer>
        <el-button type="primary" @click="commitExamNoLen">保存</el-button>
      </template>
    </Dialog>
	</div>
</template>

<script setup lang="ts">
import {headConfigList,choiceTypeList} from '../../config'

import { sheetCardStoreWithOut } from '@/store/modules/sheetCard'

const sheetCardStore = sheetCardStoreWithOut()
const sheetCardVo = sheetCardStore.getSheetCard
// -----------------
const listData = sheetCardStore.getListData


let checkList = ref(sheetCardVo.headConfig.split(',') || []) //复选框绑定
let emit_checkList = ref(sheetCardVo.headConfig) //传递值
let visible = ref<boolean>(false) //显隐参数
let errText = ref<string>('') //显隐参数

// 打开弹窗
function openHeadConfigDialog(){
  visible.value = !visible.value
}
// 复选框回调
function checkListChange(){
  emit_checkList.value = checkList.value.join(',')
  if(checkList.value.length>4){
    errText.value = '最多选4项作为填写区'
  }else{
    errText.value = ''
  }
}
function commitHeadConfig(){
  if(checkList.value.length>4){
    errText.value = '最多选4项作为填写区'
  }else{
    errText.value = ''
    sheetCardVo.headConfig = emit_checkList.value
    sheetCardStore.setSheetCard(sheetCardVo)
  }
  setTimeout(()=>{
    visible.value = !visible.value
  },500)
}
const codeNum = ref<number>(8)
const errText2 = ref('')
let visible2 = ref<boolean>(false) //显隐参数
//准考证号
function openCodeDialog(){
  codeNum.value = sheetCardVo.examNoLen
  visible2.value = !visible2.value
  // sheetCardVo.examNoLen
}
function commitExamNoLen(){
   sheetCardVo.examNoLen= codeNum.value
    sheetCardStore.setSheetCard(sheetCardVo)
    setTimeout(()=>{
      visible2.value = !visible2.value
    },500)
}

// 删除某个题
function delListData(item:any,index:number){
  sheetCardStore.delListData(index)
}


// 修改某个题
function upListData(item:any,index:number){
  sheetCardStore.upList(item,index)
}

</script>

<style scoped lang="scss">

.flew-col{
  display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   flex-wrap: wrap;
}
.quesNoBox{
  display: inline-block;
  width: 12px;
  text-align: right;
}

.card-box {
	position: relative;
  margin: 0 auto;
     text-align: center;
    border: 1px solid;
    margin: 0 auto;
    border-radius: 3px;
	.card-header {
		padding-top: 85px;
    .each{
      margin: 2px 10px;
    }
		.header-cardName {
			.el-textarea {
				text-align: center;
				resize: none;
				font-size: 20px;
				border: 1px dashed #e0dfd5;
				word-break: break-all;
				font-weight: bold;
				font-size: 20px;
				height: 36px;
				width: 100%;
				:deep(.el-textarea__inner) {
					text-align: center;
					width: 100%;
					height: 100%;
					min-height: 34px !important;
					padding: 0px 10px;
					line-height: 34px;
          border:none
				}
			}
      .el-textarea:visited ,
      .el-textarea:focus-within ,
      .el-textarea:focus-visible ,
      .el-textarea:target ,
      .el-textarea:active,
      .el-textarea:hover{
        border: 1px dashed #ff6700;
      }
		}
    .header-cardName2 {
      		height: 22px;
        .el-textarea{
        
           width: 100%;
           height: 100%;
             text-align: center;
				resize: none;
				font-size: 14px;
				word-break: break-all;
          :deep(.el-textarea__inner) {
              text-align: center;
              width: 100%;
              height: 100%;
              min-height: 20px !important;
              padding: 0px 10px;
              line-height: 20px;
              border:none
            }
        }
        
         .el-textarea:visited ,
        .el-textarea:focus-within ,
        .el-textarea:focus-visible ,
        .el-textarea:target ,
        .el-textarea:active,
        .el-textarea:hover{
          border: 1px dashed #ff6700;
        }
        
    }
    .headConfig{
      text-align: left;
      position: relative;
      .underLine{
        display: inline-block;
        border-bottom: 2px solid;
        // border-color: #666;
        width: 80px;
        height: 30px;
      }
      .posiBtn{
         position: absolute;
         right: 0;
         top: 0;
         z-index:3
      }
    }
    .about{
        border-left: 1px solid ;
        
        border-top: 1px solid ;
        //  border-color: #666;
        .el-row{
          border-bottom: 1px solid ;
          //  border-color: #666;
          .brBox{
            border-right: 1px solid;
          }
          .el-col{
            border-right: 1px solid;
            // //  border-color: #666;
            // line-height: 30px;
            .el-col:last-child{
             border-right: none
            }
            .minCol{
              line-height: 21px;
              
            }
            .smallCol{
              line-height: 30px;
               .nobor-box{
                  display: inline-block;
                  height: 16px;
                }
            }
           
          }
          .el-row:last-child{
             border-bottom: none
          }
         
        }
        .exbox{
          width: 20px;
          height: 15px;
          display: inline-block;
          border:3px solid ;
          position: relative;
          top: 2px;
          margin-right: 20px;
        }
        .blackBox{
            background-color: #000;
        }
        .whiteBox{
            background-color: #fff;
        }
        
         .fill-box{
              display: flex;
              align-items: center;
              justify-content: space-around;
              .fill-box-card{
                color: #202020;
              }
              
            }
      
        .about-text{
          line-height: 30px;
        }
    }
	}
  .card-content{
    margin-top: 10px;
    .each{
      margin: 2px 10px;
    }
    .each-title {
      height: 23px;
      .el-input {
				text-align: left;
				resize: none;
				font-size: 14px;
				word-break: break-all;
				height: 22px;
				width: 100%;
        :deep(.el-input__inner){
					text-align: left;
					width: 100%;
					height: 100%;
					min-height: 20px !important;
					line-height: 20px;
          border:none;
          padding: 0;
				}
			}
      .el-input:visited ,
      .el-input:focus-within ,
      .el-input:focus-visible ,
      .el-input:target ,
      .el-input:active,
      .el-input:hover{
        border: 1px dashed #ff6700;
      }
    }
    .each-body{
      border: 1px solid;
      padding: 5px 10px;
      margin: 3px 0;
      overflow: hidden;
      p{
         overflow: hidden;
      }
    }
    // 隔离富文本中的字体颜色
    .each-body>div ,.each-body>p ,.each-body>span{
        color: #202020;
    }

  }
}
.num{
  position: relative;
  .bor-box{
    border: 1px solid;
    display: inline-block;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
    padding: 0 4px;
    width: 18px;
    text-align: center;
  }
  .bor-box-open{
    text-align: center;
    border: none;
    display: inline-block;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
    width: 18px;
    position: relative;
    background: url('@/assets/num.png') no-repeat 50% 100%;
    background-size:18px 14px;
  } 
}
// 颜色改变的样式

.btn-blue{
  background-color: #00a4ff;
    color: #fff;
   width: 100%;
   border:none;
}
// .btn-blue:focus
.btn-blue:active,.btn-blue:hover{
  background-color: #337ecc;
  
}
.error-box{
  width: 100%;
  color: #ff0000;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
}
.posibox2{
  position: relative;
  .posiBtn2{
    position: absolute;
    top: 0;
    right: 3px;
    z-index:3
  }

}

.quesBox{
  position: relative;
  .posBtn{
    position: absolute;
    top: 0;
    right: 3px;
    z-index:3;
    .btn-list{
      width: 100px;
     display: flex;
     justify-content: space-around;
    }
  }

}


</style>
