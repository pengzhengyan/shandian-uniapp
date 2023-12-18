<script lang="ts" setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import { getUserInfoAPI, postUpdataUserInfoAPI, postUpdateWxPhoneAPI } from '@/services/profile'
import type { ProfileDetail } from '@/types/mumber'
import { onLoad } from '@dcloudio/uni-app'


// import { uni } from '@dcloudio/uni-h5';

const { safeAreaInsets } = uni.getSystemInfoSync()
const safeBottom = safeAreaInsets!.bottom + 20
const memberStore = useMemberStore()

// 获取个人信息
const profile = ref<ProfileDetail>()
const getUserInfoData = async () => {
  const res = await getUserInfoAPI()
  profile.value = res.result
}

onLoad(() => {
  getUserInfoData()
})

// 更新头像
const onChooseavatar = (e: UniHelper.ButtonOnChooseavatarEvent) => {
  if (e.detail.avatarUrl) {
    // 文件上传
    uni.uploadFile({
      url: '/my/update/avatar',
      name: 'file',
      filePath: e.detail.avatarUrl,
      formData: { name: 'avatar' },
      success: (res) => {
        // 把头像更新到store
        if (res.statusCode === 200) {
          const avatar = JSON.parse(res.data).result.avatar
          profile.value!.avatar = avatar
          memberStore.profile!.avatar = avatar
        } else {
          uni.showToast({ icon: 'error', title: '获取图片失败' })
        }
      },
    })
  }
}

// 设置昵称
const bindinput: UniHelper.InputOnInput = (ev) => {
  // 如果输入内容为空白，则直接返回
  if (!ev.target?.value) return
  postUpdataUserInfoAPI({ nickname: ev.detail.value })
    .then(res => {
      if (res.code !== '0') return uni.showToast({ icon: 'error', title: '更新昵称失败' })
      profile.value!.nickname = ev.detail.value
      // 同步到store
      memberStore.profile!.nickname = ev.detail.value
    })
    .catch(err => {
      uni.showToast({ icon: 'error', title: err })
    })
}

// 获取手机
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const phoneCode = ev.detail.code
  const res = await postUpdateWxPhoneAPI(phoneCode!)
  if (res.code === '0') {
    memberStore.profile!.phone = res.result.phone!
    profile.value!.phone = res.result.phone
    uni.showToast({ icon: 'success', title: res.msg })
  } else {
    uni.showToast({ icon: 'fail', title: '更新号码失败' })
    console.log(res.msg)
  }
}

// 设置公司
const updateCompany: UniHelper.InputOnInput = (ev) => {
  // 如果输入内容为空白，则直接返回
  if (!ev.target?.value) return
  const company = ev.detail.value
  console.log(company)
  postUpdataUserInfoAPI({ company })
    .then(res => {
      if (res.code !== '0') return uni.showToast({ icon: 'error', title: '更新公司失败' })
      profile.value!.company = ev.detail.value
    })
    .catch(err => {
      uni.showToast({ icon: 'error', title: err })
    })
}

// 退出登录
const logout = () => {
  // 清除缓存的profile
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
            <!-- <view class="avatar"
                  :style="{ backgroundImage: `url(${avatarUrl})` }"></view> -->
            <image class="avatar"
                   :src="profile?.avatar"
                   mode="aspectFit"></image>
          </view>
        </button>
        <button hover-class="none"
                class="item arrow">
          <view class="inner">
            <text>用户名</text>
            <input type="nickname"
                   @blur="bindinput"
                   class="nickname"
                   :value="profile?.nickname || profile?.account">
          </view>
        </button>
        <button hover-class="none"
                class="item arrow"
                open-type="getPhoneNumber"
                @getphonenumber="onGetphonenumber">
          <view class="inner">
            <text>我的手机</text>
            <text>{{ profile?.phone }}</text>
          </view>
        </button>
        <button hover-class="none"
                class="item arrow">
          <view class="inner">
            <text>我的公司</text>
            <input @blur="updateCompany"
                   type="text"
                   class="nickname"
                   :value="profile?.company">
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
    height: 80rpx;
    font-size: $sd-font-size-base;
  }
}
</style>
