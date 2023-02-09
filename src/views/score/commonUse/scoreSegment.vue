<template>
  <div class="container">
    <div class="line-container">
      <div class="left">科&emsp;&emsp;目</div>
      <div class="middle">
        <el-radio-group v-model="curSubId" @change="changeData" class="ml-4">
          <el-radio
            v-for="sub in subjects"
            :key=sub.id
            :label=sub.id>{{ sub.subName }}
          </el-radio>
        </el-radio-group>
      </div>
      <div v-show="!showSetting" class="right" style="text-align: right">
        <el-button class="btn" @click="showSetting=true">更多设置</el-button>
        <el-button class="btn" @click="exportScoreSegmentResult">导出</el-button>
      </div>
      <div v-show="showSetting" class="right" style="text-align: right">
        <el-button class="btn" @click="showSetting=false">隐藏</el-button>
      </div>
    </div>
    <div class="line-container">
      <div class="left">班级类型</div>
      <div class="middle">
        <el-radio-group v-model="classType" @change="changeData" class="ml-4">
          <el-radio label="1">行政班</el-radio>
          <el-radio label="2">教学班</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="line-container">
      <div class="left">分数类型</div>
      <div class="middle">
        <el-radio-group v-model="scoreType" @change="changeData" class="ml-4">
          <el-radio label="1">卷面分数</el-radio>
          <el-radio label="2">赋分</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-show="!showSetting">
      <el-table
        style="width: 100%"
        :data="columnsData"
        :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
        :cell-style="{'text-align': 'center',}"
        border
        stripe
      >
        <el-table-column fixed type="index" label="序号" width="60"/>
        <el-table-column fixed prop="name" label="班级" width="200"/>
        <el-table-column v-if="columnsData.length>0" v-for="(data,index) in columnsData[0].data" :key="data.title"
                         :label="data.title">
          <el-table-column label="人数" :prop="`studNum${index}`"></el-table-column>
          <el-table-column label="比例" :prop="`numPercent${index}`"></el-table-column>
          <el-table-column label="比重" :prop="`groupPercent${index}`"></el-table-column>
          <el-table-column label="名次" :prop="`rank${index}`"></el-table-column>
        </el-table-column>
        <el-table-column v-if="columnsData.length==0" label="[100,90)">
          <el-table-column label="人数"></el-table-column>
          <el-table-column label="比例"></el-table-column>
          <el-table-column label="比重"></el-table-column>
          <el-table-column label="名次"></el-table-column>
        </el-table-column>
        <el-table-column v-if="columnsData.length==0" label="[90,80)">
          <el-table-column label="人数"></el-table-column>
          <el-table-column label="比例"></el-table-column>
          <el-table-column label="比重"></el-table-column>
          <el-table-column label="名次"></el-table-column>
        </el-table-column>
        <el-table-column v-if="columnsData.length==0" label="[80,70)">
          <el-table-column label="人数"></el-table-column>
          <el-table-column label="比例"></el-table-column>
          <el-table-column label="比重"></el-table-column>
          <el-table-column label="名次"></el-table-column>
        </el-table-column>
        <el-table-column v-if="columnsData.length==0" label="[70,60)">
          <el-table-column label="人数"></el-table-column>
          <el-table-column label="比例"></el-table-column>
          <el-table-column label="比重"></el-table-column>
          <el-table-column label="名次"></el-table-column>
        </el-table-column>

      </el-table>
    </div>
    <div v-show="showSetting">
      <div class="btn-setting-contain">
        <el-button class="btn" @click="changeVisible(true)">增加指标</el-button>
        <el-button class="btn" @click="setDefaultSegment">默认指标</el-button>
        <el-button class="btn" @click="deleteAllSegment">清除指标</el-button>
      </div>
      <div>
        <el-table
          style="width: 100%"
          :data="segmentData"
          :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
          :cell-style="{'text-align': 'center',}"
          border
          stripe
        >
          <el-table-column fixed type="index" label="序号" width="60"/>
          <el-table-column fixed prop="eExamSubject.subName" label="科目"/>
          <el-table-column fixed prop="normType" label="指标类型">
            <template #default="setting">
              <span v-if="setting.row.normType===0">分数段</span>
              <span v-else-if="setting.row.normType===1">名次段</span>
              <span v-else-if="setting.row.normType===2">百分比段</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="startType" label="开始值类型">
            <template #default="setting">
              <span v-if="setting.row.startType===1">包含</span>
              <span v-else>不包含</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="startScore" label="开始值"/>
          <el-table-column fixed prop="endScore" label="结束值"/>
          <el-table-column fixed prop="endType" label="结束值类型">
            <template #default="setting">
              <span v-if="setting.row.endType===1">不包含</span>
              <span v-else>包含</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="setting">
              <el-link type="primary" @click="deleteSegment(setting.row.id)">删除</el-link>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
    <div>
      <div class="title">分数段对比</div>
      <div class="charts-class">
        <Echarts :options="options" :width="'100%'" :height="'500px'"></Echarts>
      </div>
    </div>
  </div>
  <Dialog title="添加指标" :visible="visible" width="800px" @dialogVisible="changeVisible">
    <template #content>
      <el-form  label-width="100px">
        <el-form-item label="科目">
          <el-checkbox-group v-model="settingForm.subIds" class="ml-4">
            <el-checkbox
              v-for="sub in subjects"
              :key=sub.id
              :label=sub.id>{{ sub.subName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="指标值" >
          <el-row :gutter="20" v-for="(set,index) in settingForm.settings" style="margin-bottom: 5px;">
            <el-col :span="4">
              <el-select v-model="set.startType">
                <el-option key="1" label="包含" value="1"/>
                <el-option key="2" label="不包含" value="2" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input-number controls-position="right" placeholder="开始值" v-model="set.startScore"/>
            </el-col>
            <el-col :span="1">
              <span>-</span>
            </el-col>
            <el-col :span="6">
              <el-input-number controls-position="right" placeholder="结束值" v-model="set.endScore"/>
            </el-col>
            <el-col :span="4">
              <el-select v-model="set.endType">
                <el-option label="不包含" value="1" />
                <el-option label="包含" value="2" />
              </el-select>
            </el-col>
            <el-link v-if="index===0" @click="addSetting">添加</el-link>
            <el-link v-else @click="delSetting(index)">删除</el-link>
          </el-row>

        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button type="primary" @click="saveSegment">保存</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import {ElMessage, ElMessageBox} from 'element-plus/es'
  import {
    getScoreSegmentResultApi,
    getAllSubjectsApi,
    getSchoolAllSubSegmentApi,
    deleteSegmentApi,
    deleteAllShareSegmentApi,
    setDefaultSegmentApi,
    saveSegmentApi
  } from '@/api/analysis'
  import {ref} from "@vue/runtime-core"

  class Setting{
    startScore: any
    startType: any
    endScore: any
    endType: any

    constructor(startScore:any,startType: any,endScore: any,endType:any){
      this.startScore = startScore
      this.startType = startType
      this.endScore = endScore
      this.endType = endType
    }
  }

  const route = useRoute()
  const data = reactive({
    classType: '2',
    scoreType: '1'
  })

  const examId: any = route.query.examId
  const {classType, scoreType} = toRefs(data)
  const columnsData = ref<any>([])
  let options = ref<any>(null) //图表的数据对象

  const subjects = ref<any>([])
  const curSubId = ref<string>('')
  const showSetting = ref<boolean>(false)
  const segmentData = ref<any>([])
  const visible = ref<boolean>(false) //显隐参数
  const {VITE_GLOB_API_URL} = process.env

  const settingForm = reactive({
    subIds:[],
    settings: [new Setting(0,'1',0,'1')]
  })

  function getScoreSegmentResult() {
    const param = {
      classType: classType.value,
      scoreType: scoreType.value,
      examId: route.query.examId,
      subjectId: curSubId.value,
      normType: 0 //分数段
    }
    getScoreSegmentResultApi(param).then((res: any) => {
      columnsData.value = []
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          let column: any = {
            name: '',
            data: []
          }
          for (let j = 0; j < res[i].length; j++) {
            let data = res[i][j]
            if (data.scoreLevel === 1) {
              column.name = data.schools.schoName
            } else {
              column.name = data.className
            }
            let startStr = "";
            let endStr = "";
            if (data.segment.startType === 1) {
              startStr = "[";
            } else {
              startStr = "(";
            }
            if (data.segment.endType === 1) {
              endStr = ")";
            } else {
              endStr = "]";
            }
            column.data.push({
              title: (startStr + data.segment.startScore + "," + data.segment.endScore + endStr),
              studNum: data.studNum,
              numPercent: ((data.numPercent * 100).toFixed(2) + "%"),
              groupPercent: ((data.inGroupPercent * 100).toFixed(2) + "%"),
              rank: data.rank
            })
            column['title' + j] = (startStr + data.segment.startScore + "," + data.segment.endScore + endStr)
            column['studNum' + j] = data.studNum
            column['numPercent' + j] = ((data.numPercent * 100).toFixed(2) + "%")
            column['groupPercent' + j] = ((data.inGroupPercent * 100).toFixed(2) + "%")
            column['rank' + j] = data.rank
          }
          columnsData.value.push(column)
        }
      }

      setRadarData(res)

      console.log(columnsData.value)
    }).catch((e) => {
      ElMessage.error('查询失败')
    })
  }

  function changeData() {
    getScoreSegmentResult()
  }

  function getAllSubjects() {
    getAllSubjectsApi(examId).then((res) => {
      subjects.value = res
      if (subjects.value.length > 0) {
        curSubId.value = subjects.value[0].id

        getScoreSegmentResult()
        getSchoolAllSubSegment()
      }
    }).catch((e) => {
      ElMessage.error('查询失败')
    })
  }

  function setRadarData(data: any) {
    const xDataArr: any = [];
    const yDataArr: any = [];
    for (let i = 0; i < data.length; i++) {
      const schoolOrClass = data[i]
      if (schoolOrClass[0].scoreLevel == 1) {
        xDataArr.push(schoolOrClass[0].schools.schoName);
      } else {
        xDataArr.push(schoolOrClass[0].className);
      }
      if (i == 0) {
        for (let j = 0; j < schoolOrClass.length; j++) {
          let d = schoolOrClass[j]
          let startStr = "";
          let endStr = "";
          if (d.segment.startType === 1) {
            startStr = "[";
          } else {
            startStr = "(";
          }
          if (d.segment.endType === 1) {
            endStr = ")";
          } else {
            endStr = "]";
          }
          yDataArr.push(startStr + d.segment.startScore + "," + d.segment.endScore + endStr);
        }
      }
    }
    let dateDate = [];
    for (let v = 0; v < yDataArr.length; v++) {
      const numDate: any = [];
      for (let i = 0; i < data.length; i++) {
        const segResule = data[i][v];
        numDate.push(segResule.studNum);
      }
      dateDate.push({
        "name": yDataArr[v],
        "type": 'bar',
        "barWidth": "30",
        "stack": '总量',
        "label": {normal: {show: false, position: 'insideRight'}},
        "data": numDate
      });
    }

    options.value = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: yDataArr
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
        y2: 140
      },
      yAxis: {
        type: 'category',
        name: '学校/班级',
        data: xDataArr,
        axisLabel: {
          interval: 0//横轴信息全部显示
//                    rotate:-30//-30度角倾斜显示
        }
      },
      xAxis: {
        type: 'value',
        name: '人数'
      },
      series: dateDate,
      color: ['#1f607c', '#2e6e3e', '#ffa72c', '#f16101', '#ad1603', '#492d45']
    };
  }

  function getSchoolAllSubSegment() {
    const param = {
      examId: route.query.examId,
      subId: curSubId.value,
      normType: 0 //分数段
    }
    getSchoolAllSubSegmentApi(param).then((res: any) => {
      console.log(res)
      segmentData.value = res
    }).catch((e) => {
      ElMessage.error('查询失败')
    })
  }

  function deleteSegment(segmentId: any) {
    ElMessageBox.confirm(
      '确认删除当前配置?',
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
    ).then(() => {
      deleteSegmentApi(segmentId).then((res: any) => {
        console.log(res)
        if (res.success) {
          ElMessage.success('删除完成')
          getSchoolAllSubSegment()
        }else{
          ElMessage.error(res.message)
        }
      }).catch((e) => {
        ElMessage.error('请求失败')
      })
    }).catch(() => {
    })
  }

  function deleteAllSegment() {
    ElMessageBox.confirm(
      '确认清除所有指标配置?',
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
    ).then(() => {
      const param = {
        examId: route.query.examId,
        subId: curSubId.value,
        normType: 0 //分数段
      }
      deleteAllShareSegmentApi(param).then((res: any) => {
        console.log(res)
        if (res.success) {
          ElMessage.success('删除完成')
          getSchoolAllSubSegment()
        }else{
          ElMessage.error(res.message)
        }
      }).catch((e) => {
        ElMessage.error('请求失败')
      })
    }).catch(() => {
    })

  }

  function changeVisible(v:any) {
    visible.value = v
  }

  function setDefaultSegment() {
    ElMessageBox.confirm(
      '确认设置为默认指标?',
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
      }
    ).then(() => {
      const param = {
        examId: route.query.examId,
        normType: 0 //分数段
      }
      setDefaultSegmentApi(param).then((res: any) => {
        console.log(res)
        if (res.success) {
          getSchoolAllSubSegment()
        }
      }).catch((e) => {
        ElMessage.error('请求失败')
      })
    }).catch(() => {
    })

  }

  function saveSegment() {
    if (settingForm.subIds.length < 1){
      ElMessage.error('请勾选科目')
      return
    }
    if (settingForm.settings.length < 1){
      ElMessage.error('请添加指标')
      return
    }
    for (let i=1;i<settingForm.settings.length;i++) {
      const preEndScore = settingForm.settings[i-1].endScore
      const curEndScore = settingForm.settings[i].endScore
      if (preEndScore <= curEndScore) {
        ElMessage.error({
          message:"结束值“" + curEndScore + "”不能大于前一个结束值“" + preEndScore + "”！<br/>注意：分数段的指标请按降序输入！",
          dangerouslyUseHTMLString:true
        })
      }
    }

    console.log(settingForm.settings)
    const param = []
    for (let i=0;i<settingForm.subIds.length;i++) {
      for (let j=0;j<settingForm.settings.length;j++) {
        param.push({
          eExamSubject: {id:settingForm.subIds[i]},
          normType: 0,
          shared: true,
          startScore: settingForm.settings[j].startScore,
          startType: settingForm.settings[j].startType,
          endScore: settingForm.settings[j].endScore,
          endType: settingForm.settings[j].endType,
        })
      }
    }

    saveSegmentApi(route.query.examId, param).then((res: any) => {
      console.log(res)
      if (res.success) {
        changeVisible(false)
        getSchoolAllSubSegment()
      }
    }).catch((e) => {
      ElMessage.error('请求失败')
    })
  }

  function addSetting() {
    settingForm.settings.push(new Setting(0,'1', 0, '1'))
  }
  function delSetting(index:number) {
    settingForm.settings.splice(index, 1)
  }

  function exportScoreSegmentResult() {
    let level = 2;
    if (classType.value === '2') {
      level = 3
    }

    document.location.href = VITE_GLOB_API_URL+"/eExam/score/exportScoreSegmentResult/"+examId+"?level=" + level
      + "&normType=0&scoreType=" + scoreType.value + "&classType=" + classType.value + "&exStud=true"
  }

  onMounted(()=>{
    getAllSubjects()
  })
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;

    .line-container {
      display: flex;
      height: 32px;
      line-height: 32px;

      .left {
        width: 80px
      }

      .middle {
        flex: 1;
      }

      .right {
        width: 200px;
      }
    }

    .btn {
      background-color: #4381E5;
      color: #FFFFFF;
      font-size: 12px;
    }

    .charts-class {
      width: 100%;
      height: 450px;
      background: #F8FBFF;
    }

    .title {
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .btn-setting-contain {
      width: 100%;
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>
