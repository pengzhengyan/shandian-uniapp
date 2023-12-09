<script setup lang="ts">
import { useMemberStore } from '@/stores';
import { ref } from 'vue';
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单选项
const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
]
// 未登录时的头像
const avatarUrl = ref(`https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0`)

// 获取登录后的信息
const memberStore = useMemberStore()

</script>

<template>
  <scroll-view class="viewport"
               enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile"
          :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 情况1：已登录 -->
      <view class="overview"
            v-if="memberStore.profile">
        <navigator url="/pagesMember/profile/profile"
                   hover-class="none">
          <image class="avatar"
                 mode="aspectFill"
                 :src="avatarUrl"></image>
        </navigator>
        <view class="meta">
          <navigator url="/pagesMember/profile/profile"
                     hover-class="none"
                     class="nickname">
            {{ memberStore.profile?.nickname || memberStore.profile?.account }}
            <uni-icons type="right"
                       color="white"
                       size="16" />
          </navigator>
          <!-- <text class="update">更新头像昵称</text> -->
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview"
            v-else>
        <navigator url="/pages/login/login"
                   hover-class="none">
          <image class="avatar gray"
                 mode="aspectFill"
                 src="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0">
          </image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login"
                     hover-class="none"
                     class="nickname">
            登录/注册
            <uni-icons type="right"
                       color="white"
                       size="16" />
          </navigator>
          <!-- <view class="extra">
            <text class="tips">点击登录账号</text>
          </view> -->
        </view>
      </view>
      <!-- <navigator class="settings"
                 url="/pagesMember/settings/settings"
                 hover-class="none">
        设置
      </navigator> -->
    </view>
    <view class="hello"></view>
    <!-- 我的订单 -->
    <view class="orders">
      <view class="title">
        我的订单
        <navigator class="navigator"
                   url="/pagesOrder/list/list?type=0"
                   hover-class="none">
          查看全部订单<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator v-for="item in orderTypes"
                   :key="item.type"
                   :class="item.icon"
                   :url="`/pagesOrder/list/list?type=${item.type}`"
                   class="navigator"
                   hover-class="none">
          {{ item.text }}
        </navigator>
        <!-- 客服 -->
        <button class="contact icon-handset"
                open-type="contact">售后</button>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="guess">
      <XtxGuess ref="guessRef" />
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(https://p.ipic.vip/entk0l.png);
  background-size: 100% auto;
}

/* 用户信息 */
.profile {
  margin-top: 60rpx;
  position: relative;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: $sd-font-size-lg;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 350rpx;
    margin-bottom: 16rpx;
    font-size: $sd-font-size-lg;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    display: flex;
    align-items: center;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }

  .settings {
    position: absolute;
    bottom: 0;
    right: 40rpx;
    font-size: 30rpx;
    color: #fff;
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 20rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #1e1e1e;

    .navigator {
      font-size: 24rpx;
      color: #939393;
      float: right;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40rpx 20rpx 10rpx;

    .navigator,
    .contact {
      text-align: center;
      font-size: 24rpx;
      color: #333;

      &::before {
        display: block;
        font-size: 60rpx;
        color: #ff9545;
      }
    }

    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
}
</style>