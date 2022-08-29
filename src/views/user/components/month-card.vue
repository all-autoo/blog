<template>
    <el-row>
      <el-col class="label" :span="4">停车场月卡资料</el-col>
      <el-col class="value" :span="20">
        <el-row>
          <el-col class="label" :span="3">月卡套餐</el-col>
          <el-col class="value" :span="9">住宅200套餐</el-col>
          <el-col class="label" :span="3">牌号</el-col>
          <el-col class="value" :span="9">粤Y66666</el-col>
          <el-col class="value" :span="24">
            <div class="card-img">
              <div class="card-item">
                <div>身份证正反面</div>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
              </div>
              <div class="card-item">
                <div>驾驶证正页、副页</div>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
              </div>
              <div class="card-item">
                <div>行驶证正页、副页</div>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
                <el-image :src="login" :preview-src-list="[login]"></el-image>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import login from '@/assets/login.png'

const info = ref()

</script>

<style lang="scss" scoped>
.el-row {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
.el-image {
  width: 100%;
  border: 1px solid #ebeef5;
}
.card-img {
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;

  .card-item {
    text-align: center;
  }
}
</style>