<template>
  <div>
    <el-row class="mb-4">
      <el-col :span="12">
        <el-input v-model="input" placeholder="请输入搜索信息" style="width: 200px; height: 32px; background: #fff; border-radius: 4px; font-size: 12px;"></el-input>
        <el-button type="primary" class="search-button" @click="getList">搜索</el-button>
      </el-col>
      <el-col :span="10">
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <img class="img-pos" src="../../../../assets/more-option.png" style="float: right; width: 35px; height: 35px; display: inline-block; cursor: pointer;" alt="">
          </template>
          <div>
            <el-checkbox-group v-model="selHead" @change="changeBox">
              <el-checkbox v-for="h in dynamicHead"  style="width: 100%;" :label="h">
                {{ h }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-popover>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" class="release" @click="exportSumScore">导出</el-button>
      </el-col>
    </el-row>
      <el-table
          v-if="haveData"
          :data="tableList"
          style="width: 100%;"
          :header-cell-style="{'background': '#D3E0F4','text-align': 'center', 'color': '#202020','font-size': '14px'}"
          :cell-style="{'text-align': 'center',}"
          border
          stripe
          empty-text="数据加载中"
          @sort-change="getListOrder"
      >
        <el-table-column type="index" v-if="selHead.indexOf('序号') >= 0" width="55" align="center" label="序号">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('姓名') >= 0" sortable="custom"  align="center" prop="studentName" label="姓名">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('学号') >= 0" sortable="custom"  align="center" width="180" prop="studentNo" label="学号">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('考号') >= 0" sortable="custom"  align="center" prop="examNo" label="考号">
        </el-table-column>
        <el-table-column v-if="selHead.indexOf('班级') >= 0" sortable="custom"  align="center" prop="className" label="班级">
        </el-table-column>
        <el-table-column width="90" v-for="(sub,index) in columnList" :key="index" sortable :label="sub.subName + sub.value" :prop="sub.subName ? (sub.subName  + (tableInfo.get(sub.value) || '')) : ''" align="center">
          <template #default="scope">
            {{ scope.row[sub.subName ? (sub.subName  + (tableInfo.get(sub.value) || '')) : ''] }}
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-10">
        <Pagination
            v-show="total > 0"
            :total="total"
            v-model:page="queryParams.page"
            v-model:limit="queryParams.limit"
            @pagination="getList"/>
      </div>

  </div>
</template>

<script setup lang="ts">

import {
  getExamScoreTaskByIdApi,
  tableSearchApi,
} from '@/api/scoreManage'
// import {ref} from "@vue/runtime-core";

const route = useRoute()
const router = useRouter()
const examId = route.query.examId
const subName = ref('')
const subId = ref('')
const schoolId = ref('')
const {VITE_GLOB_API_URL} = process.env
const input = ref('')
const haveData = ref(false)
const subList = ref<any>();
const queryParams = ref<any>({
  offset: 0,
  page: 1,
  limit: 10,
  isAllSchool: 0,
  order: 'asc',
  sort: 'studentNo'
})

const tableList = ref<any>([]);
const total = ref<any>(0);
const selHead = ref<string[]>([
  '序号', '姓名','学号', '考号', '班级','科目分数'
])
const dynamicHead = ref<any>([
  '姓名', '学号', '考号', '班级',"总分",
  '科目分数', '标准分', '校排名', '行政班排名', '教学班排名',
  '校内系排名', '行政班系排名', '教学班系排名', '校内组合排名', '等级',
  '卷面分', '得分率'
])
const columnHead = ref<any>([
  '标准分', '校排名', '行政班排名', '教学班排名',
  '校内系排名', '行政班系排名', '教学班系排名', '校内组合排名', '等级',
  '卷面分', '得分率'
    ])
const tableInfo =  new Map([
  ['标准分', '_sd'], ['校排名', '_s'], ['行政班排名', '_c'],
  ['教学班排名', '_t'], ['校内系排名', '_xs'], ['行政班系排名', '_xc'],
  ['教学班系排名', '_xt'], ['校内组合排名', '_gs'], ['等级', '_xc'],
  ['卷面分', '_o'], ['得分率', '_xs']
]);

const sortTable =  new Map([
  ['姓名', 'studentName'], ['学号', 'studentNo'], ['考号', 'examNo'],['班级', 'teachClassName'], ['总分', '_s'],
  ['标准分', 'standardScore'], ['校排名', 'schoRanking'], ['行政班排名', 'classRanking'],
  ['教学班排名', 'teachClassRanking'], ['校内系排名', 'xSchoRanking'], ['行政班系排名', 'xClassRanking'],
  ['教学班系排名', 'xTeachClassRanking'], ['校内组合排名', 'groupSchoRanking'], ['等级', '_xc'],
  ['卷面分', 'score'], ['得分率', '_xs']
]);

const columnList = ref<any>([])
function getList() {
  if (queryParams.value.page < 0) {
    queryParams.value.page = 0
  }
  queryParams.value.offset = (queryParams.value.page - 1) * queryParams.value.limit
  tableSearchApi(queryParams.value, examId).then((res: any) => {
    tableList.value = res.data.rows
    total.value = res.data.total
  })
}

const getListOrder = (param: any) => {
  if (param.prop) {
    queryParams.value.sort = param.prop
  }
  if (param.order === 'descending') {
    queryParams.value.order = 'desc'
  } else if (param.order === 'ascending') {
    queryParams.value.order = 'asc'
  } else {
    queryParams.value.order = 'asc'
  }
  queryParams.value.page = 1
  getList()
}

const exportSumScore = () => {

}

const changeBox = () => {
  columnList.value = []
    subList.value.forEach((item: any) => {
      const showList=columnHead.value.filter((info: string)=>{
        return selHead.value.includes(info)
      })
      let list: any[]
      if (selHead.value.indexOf('科目分数') > -1 && item !== '总分') {
        list = [item].concat(showList)
      } else {
        list = showList
      }
      if (item === '总分' && selHead.value.indexOf('总分') > -1) {
        list = [item].concat(list)
      }
      list.forEach((obj: any) => {
        if (obj !== item) {
          const info = {subName: item,value: obj}
          columnList.value.push(info)
        } else {
          const info = {subName: obj,value: ''}
          columnList.value.push(info)
        }
      })
    })
}

async function getExamScoreTaskById() {
  await getExamScoreTaskByIdApi({examId: examId}).then((res:any) => {
    if (res.success) {
      subList.value = res.data.subNames
    }
  })
}

async function start(){
  await getExamScoreTaskById()
  getList();
  changeBox();
  setTimeout(() => {
    haveData.value = true
  }, 2000)
}
onMounted(() => {
  start()
})
</script>

<style scoped lang="scss">
:deep(.el-table) {
  thead.is-group tr:nth-child(2) .el-table__cell {
    left: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
@import "../../../../style/scanMonitor/scanMonitor";
@import "../../../../style/scoreManage/scoreManage";
</style>
