<template>
  <view class="container">
    <view class="category sd-card">
      <navigator class="category-item"
                 hover-class="none"
                 url="/pages/index/index"
                 v-for="item in list"
                 :key="item.id">
        <uni-icons class="icon"
                   :type="item.icon"
                   color="#52B465"
                   size="30" />
        <text class="text">{{ item.name }}</text>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
const list = [
  { id: '1', name: '垫付记录', icon: 'calendar-filled' },
  { id: '2', name: '推荐有奖', icon: 'gift-filled' },
  { id: '3', name: '首登有礼', icon: 'vip-filled' },
  { id: '4', name: '设计券', icon: 'color-filled' },
  { id: '5', name: '关于我们', icon: 'person-filled' },
]
</script>

<style scoped lang="scss">
.container {
  // background-color: #F6F6F6;
  padding: 0 20rpx;
  margin-bottom: 30rpx;

  .category {
    display: flex;
    flex-wrap: wrap;
    min-height: 170rpx;

    .category-item {
      width: 160rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 10rpx;

      .icon {
        margin: 20rpx 20rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 30rpx;
      }

      .text {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
</style>
