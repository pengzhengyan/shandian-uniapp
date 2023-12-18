<script lang="ts" setup>
import { useMemberStore } from '@/stores';
import { computed } from 'vue';
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
//
defineProps<{
  number: string
}>()

const memberStore = useMemberStore()
// 按钮的文字
const btnText = computed<string>(() => {
  let text = '查看我的额度'
  if (memberStore.step === 0) {
    text = '查看我的额度'
  } else if (memberStore.step === 1) {
    text = '继续申请...'
  } else if (memberStore.step === 2) {
    text = '审核中...'
  }
  return text
})
const isChecked = ref(true)
const onCheckboxChange = () => {
  isChecked.value = !isChecked.value
}
const onVerify = () => {
  if (!memberStore.profile) return uni.showToast({ icon: 'fail', title: '未登录' })

  if (isChecked.value) {
    uni.navigateTo({ url: '/pages/application/application' })
  } else {
    uni.showToast({ icon: 'fail', title: '请先勾选用户协议' })
  }
}
const onOrder = () => {
  console.log('暂未开放,走线下')
}
onLoad(() => { })
</script>

<template>
  <view class="banner">
    <view class="content">
      <view class="header">
        <text class="slogan">闪速放款 垫付专家</text>
        <text class="sub-slogan">展会押金/装修押金/主办展会/场馆设计</text>
      </view>
      <view class="sd-card card">
        <view class="title">
          <text>{{ memberStore.isQualified ? '当前可用额度' : '最高垫付额度' }}（元）</text>
        </view>
        <view class="big-number">
          <text>{{ number }}</text>
        </view>
        <view class="sub-title">
          <text>年化利率6%，以最终审核为准</text>
        </view>
        <button v-if="!memberStore.isQualified"
                @tap="onVerify"
                class="button phone">{{ btnText }}</button>
        <button v-else
                class="button phone"
                @tap="onOrder">垫资申请</button>
        <view class="sub-title">
          <label @tap="onCheckboxChange">
            <checkbox :checked="isChecked" /> <text>确认并同意《隐私协议》</text>
          </label>
        </view>
      </view>
    </view>
    <view class="banner-bg"></view>
  </view>
</template>

<style lang="scss">
.banner {
  position: relative;
  width: 750rpx;
  min-height: 708rpx;
  overflow: hidden;
  background-color: #F6F6F6;
  margin-bottom: 30rpx;

  .content {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
    padding: 0 20rpx;
    width: 100%;
    background-color: transparent;

    .header {
      margin-top: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .slogan {
        background-color: transparent;
        font-size: 70rpx;
        color: white;
        font-weight: $sd-font-weight-xlg;
        display: block;
      }

      .sub-slogan {
        font-size: $sd-font-size-base;
        color: white;
        display: block;
      }
    }

    .card {
      margin: 25rpx 0;

      .title {
        font-size: $sd-font-size-base;
        color: $sd-text-color-black;
      }

      .big-number {
        font-size: $sd-font-size-xlg;
        font-weight: 900;
        margin: 40rpx 0;
        display: block;
        text-align: center;
      }

      .sub-title {
        font-size: $sd-font-size-base;
        color: $sd-text-color-gray;
        margin: 20rpx 0;
        line-height: $sd-font-size-base;
        display: block;
        text-align: center;
      }

      label {
        display: flex;
        align-items: center;
        flex-direction: row;

        checkbox {
          transform: scale(0.7)
        }
      }
    }
  }

  .banner-bg {
    position: absolute;
    left: -25%;
    width: 150%;
    height: 300rpx;
    background-color: $sd-bg-color-main;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    // background-image: linear-gradient(0deg, #5eaf6e, #52B465 50%);
    /* 渐变 */
  }
}
</style>
