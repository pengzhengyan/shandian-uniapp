<script setup lang="ts">
import CreditPanel from './components/CreditPanel.vue'
import CategPanel from './components/CategPanel.vue';
import GuidePanel from './components/GuidePanel.vue';
import AboutusPanel from './components/AboutusPanel.vue';

</script>

<template>
  <view class="index">
    <CreditPanel :isQualified="false"
                 :number="'2,000,000'" />
    <CategPanel />
    <view class="title">
      <text>使用攻略</text>
    </view>
    <GuidePanel />
    <AboutusPanel />

  </view>
</template>

<style lang="scss" scoped>
//
.index {
  background-color: #F6F6F6;

  .title {
    padding: 0 20rpx;
    margin-bottom: 20rpx;
  }
}
</style>
