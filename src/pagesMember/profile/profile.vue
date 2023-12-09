<script lang="ts" setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores'

// import { uni } from '@dcloudio/uni-h5';

const { safeAreaInsets } = uni.getSystemInfoSync()
const safeBottom = safeAreaInsets!.bottom + 20

// 设置头像
const avatarUrl = ref(`https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0`)

const onChooseavatar = (e: UniHelper.ButtonOnChooseavatarEvent) => {
  avatarUrl.value = e.detail.avatarUrl
  // console.log(e)
}

// 设置昵称
const nickname = ref('微信用户')
const bindinput: UniHelper.InputOnInput = (ev) => {
  console.log(ev.detail.value)
}

// 获取手机
const phoneNumber = ref('')
const onGetphonenumberSimple: UniHelper.ButtonOnGetphonenumber = (ev) => {
  if (ev.detail.errMsg) {
    uni.showToast({
      icon: 'none', title: `个人开发者无法获取手机`
    })
    // 模拟一个手机号
    phoneNumber.value = '137****9083'
    return
  }
}

// 退出登录
const logout = () => {
  // 清除缓存的profile
  const memberStore = useMemberStore()
  memberStore.clearProfile()

  // 跳到登录页
  uni.navigateTo({ url: '/pages/login/login' })
}
</script>

<template>
  <view class="profile"
        :style="{ paddingBottom: safeBottom + 'rpx' }">
    <view class="sd-card card">
      <view class="list">
        <button hover-class="none"
                class="item arrow"
                open-type="chooseAvatar"
                @chooseavatar="onChooseavatar">
          <view class="inner">
            <text>头像</text>
            <view class="avatar"
                  :style="{ backgroundImage: `url(${avatarUrl})` }"></view>
          </view>
        </button>
        <button hover-class="none"
                class="item arrow">
          <view class="inner">
            <text>用户名</text>
            <input type="nickname"
                   @input="bindinput"
                   class="nickname"
                   :value="nickname">
          </view>
        </button>
        <button hover-class="none"
                class="item arrow"
                open-type="getPhoneNumber"
                @getphonenumber="onGetphonenumberSimple">
          <view class="inner">
            <text>关联手机</text>
            <text>{{ phoneNumber }}</text>
          </view>
        </button>
        <button hover-class="none"
                class="item arrow"
                open-type="contact">联系我们</button>
      </view>
    </view>
    <view class="view2"></view>
    <button class="button phone logout"
            @tap="logout">退出登录</button>
  </view>
</template>

<style scoped lang="scss">
.profile {
  background-color: #F6F6F6;
  width: 100%;
  padding: 20rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .view2 {
    width: 100%;
    flex: 1;
  }

  .card {

    /* 列表 */
    .list {
      // padding: 0 20rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      border-radius: 10rpx;

      .item {
        line-height: 90rpx;
        padding-left: 10rpx;
        font-size: $sd-font-size-base;
        color: $sd-text-color-gray;
        position: relative;
        text-align: left;
        border-radius: 0;
        background-color: #fff;

        .inner {
          padding-right: 20rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .avatar {
            height: 70rpx;
            width: 70rpx;
            background-size: 100% auto;
            background-repeat: no-repeat;
          }

          .nickname {
            line-height: 90rpx;
            height: 90rpx;
            text-align: right;
          }
        }

        &::after {
          width: auto;
          height: auto;
          left: auto;
          border: none;
        }

        &:first-child {
          border: none;
        }

        &::after {
          right: 5rpx;
        }
      }

      .arrow::after {
        content: '\e6c2';
        position: absolute;
        top: 50%;
        color: $sd-text-color-gray;
        font-family: 'erabbit' !important;
        font-size: $sd-font-size-base;
        transform: translateY(-50%);
      }
    }

    /* 操作按钮 */
    .action {
      text-align: center;
      line-height: 90rpx;
      margin-top: 40rpx;
      font-size: 32rpx;
      color: #333;

      .button {
        background-color: #fff;
        margin-bottom: 20rpx;
        border-radius: 10rpx;
      }
    }
  }

  .logout {
    width: 100%;
    height: 70rpx;
    font-size: $sd-font-size-base;
  }
}
</style>
