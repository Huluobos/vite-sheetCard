<template>
  <div class="title">{{ queryParam.subName }}阅卷明细</div>
  <div class="nav-box">
    <div class="nav" :class="active==='0'?'active':''">
      <router-link :to="{name:'processProcess', query:props.queryParam}">阅卷进度监控</router-link>
    </div>
    <div class="nav" :class="active==='1'?'active':''">
      <router-link :to="{name:'processSubQuesDetail', query:props.queryParam}">阅卷结果</router-link>
    </div>
    <div class="nav" :class="active==='2'?'active':''">
      <router-link :to="{name:'processMarkingDetail', query:props.queryParam}">在阅任务监控</router-link>
    </div>
    <div class="nav" :class="active==='3'?'active':''">
      <router-link :to="{name:'processArbiDetail', query:props.queryParam}">仲裁详情</router-link>
    </div>
    <div class="nav" :class="active==='4'?'active':''">
      <router-link :to="{name:'processMarkingQuality', query:props.queryParam}">阅卷质量分析</router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
  const route = useRoute()
  const props = defineProps({
    active :{
      type: String,
      default: '0'
    },
    queryParam: {
      type: Object,
      default: {}
    }
  })

  onMounted(()=>{
    console.log(props.queryParam)
  })

</script>

<style lang="scss" scoped>

  .nav-box{
    display: inline-block;
    width: 100%;
    float: left;
    padding-top: 10px;
    font-weight: bold;
    color: #808080;
    border-bottom: 1px solid #D3E0F4;
    .nav {
      display: inline-block;
      float: left;
      cursor: pointer;
      &:hover {
        color: #4381E5;
      }
      min-width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &.active{
        color: #FFFFFF;
        background: #4381E5;
        border-radius: 10px 10px 0px 0px;
      }
    }

    .split{
      width: 2px;
      border-left: 2px solid black;
      display: inline-block;
      float: left;
      margin-left: 5px;
      margin-right: 5px;
      height: 20px;
    }
  }
  .title{
    font-weight: bold;
    font-size: 16px;
  }

</style>
