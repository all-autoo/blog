<template>
  <el-card>
    <div class="user-info">
      <div class="top">
        <div class="title">用户详情</div>
        <div>
          <el-button type="warning">停用</el-button>
        </div>
      </div>
      <div class="info">
        <el-row :gutter="0">
          <el-col class="label" :span="3">手机号码</el-col>
          <el-col class="value" :span="9">15917161424</el-col>
          <el-col class="label" :span="3">姓名</el-col>
          <el-col class="value" :span="9">黄晓燕</el-col>
          <el-col class="label" :span="3">微信名</el-col>
          <el-col class="value" :span="9">阿斯顿发顺丰</el-col>
          <el-col class="label" :span="3">车牌</el-col>
          <el-col class="value" :span="9">粤Y66666</el-col>
        </el-row>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="月卡信息" :name="0"></el-tab-pane>
          <el-tab-pane label="临时停车记录" :name="1"></el-tab-pane>
        </el-tabs>
        <monthCard v-if="activeName === 0"/>
        <record v-if="activeName === 1"/>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import monthCard from './components/month-card.vue'
import record from './components/record.vue'

const info = ref()
const activeName = ref<number>(0)

</script>

<style lang="scss" scoped>
.top {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 18px;
  }
}
.info {
  width: 1000px;
  margin-top: 20px;
}
.el-row {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
</style>