<template>
  <view class="guide-container">
    <view class="guide-item"
          style="padding-right: 20rpx;">
      <view class="sd-card card">
        <text class="title">垫付指南</text>
        <text class="sub-title">闪电获批垫资</text>
        <view class="plain-btn">了解详情</view>

      </view>
    </view>
    <view class="guide-item">
      <view class="sd-card card">
        <text class="title">还款指南</text>
        <text class="sub-title">安全还款</text>
        <view class="plain-btn">了解详情</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.guide-container {
  padding: 0 20rpx;
  margin-bottom: 30rpx;
  display: flex;

  .guide-item {
    width: 50%;

    .card {
      height: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: space-around;

      .title {
        display: inline-block;
        color: $sd-text-color-black;
      }

      .sub-title {
        display: inline-block;
        font-size: $sd-font-size-sm;
        color: $sd-text-color-gray;
      }

      .plain-btn {
        border: 1rpx solid $uni-color-success;
        color: $uni-color-success;
        border-radius: 20rpx;
        height: 40rpx;
        width: 120rpx;
        font-size: $sd-font-size-sm;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
