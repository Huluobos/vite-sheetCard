<template>
  <div class="container">
    <div class="line-container dis">
      <div class="title-style ">分析模式</div>
      <div class="title-value ">说明：此分析模式用于学生新高考模式下的各种选科组合及系别排名使用，如不属于新高考，默认传统模式。</div>
    </div>
    <div class="line-container dis" style="height: 45px">
      <el-select v-model="value" class="m-2 select-style" placeholder="请选择" size="large">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
        />
      </el-select>
    </div>
    <div class="line-container">
      <div class="left title-style">定制科目</div>
      <div class="right" style="text-align: right">
        <el-button class="btn" @click="changeSubRate">合并科目</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const value = ref('1')

  const options = [
    {value: '1', label: '传统模式',},
    {value: '4', label: '3+1+2',},
    {value: '2', label: '7选3',},
    {value: '3', label: '6选3',}
  ]
  onMounted(() => {

  })
</script>

<style lang="scss" scoped>
  @import "../../../style/scanMonitor/scanMonitor.scss";
  @import "../../../style/scoreManage/scoreManage";

  :deep(.el-table) {
    thead.is-group tr:nth-child(2) .el-table__cell {
      left: 0 !important;
    }
  }

  .charts-class {
    width: 100%;
    height: 450px;
    background: #F8FBFF;
  }

  .select-style {
    width: 150px;
  }

  .title-style {
    height: 22px;
    width: 88px;
    font-size: 15px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #202020;
    line-height: 22px;
  }

  .title-value {
    flex: 1;
    height: 22px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #808080;
    line-height: 22px;
  }

  .container {
    width: 100%;

    .line-container {
      display: flex;
      height: 32px;
      line-height: 32px;

      .left {
        width: 1100px
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
  }
</style>
