<template>
  <div class="nav-box">
    <div class="nav" :class="active==='0'?'active':''">
      <router-link :to="{path:'/baseData/teacherManage'}">教师管理</router-link>
    </div>
    <div class="nav" :class="active==='1'?'active':''">
      <router-link :to="{path:'/baseData/teacherUser'}">教师账户</router-link>
    </div>
    <div class="nav" :class="active==='2'?'active':''">
      <router-link :to="{path:'/baseData/studentManage'}">学生管理</router-link>
    </div>
    <div class="nav" :class="active==='3'?'active':''">
      <router-link :to="{path:'/baseData/studentUser'}">学生账户</router-link>
    </div>
    <div class="nav" :class="active==='4'?'active':''">
      <router-link :to="{path:'/baseData/classRoomManage'}">教室管理</router-link>
    </div>
    <div class="nav" :class="active==='5'?'active':''">
      <router-link :to="{path:'/baseData/baseClass'}">班级管理</router-link>
    </div>
    <div class="nav" :class="active==='6'?'active':''">
      <router-link :to="{path:'/baseData/baseTeachClass'}">任课管理</router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>

  const route = useRoute()
  const props = defineProps({
    active :{
      type: String,
      default: '0'
    }
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

</style>
