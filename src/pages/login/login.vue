<script setup lang="ts">
import { postLoginWxMinAPI, postLoginWxMinSimpleAPI, postLoginH5API } from '@/services/login'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/mumber'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

//微信登录
// #ifdef MP-WEIXIN
let code = ''
// 通过微信获取手机号
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  if (code) {
    const phoneCode = ev.detail.code
    const res = await postLoginWxMinAPI({ code, phoneCode })
    if (res.code !== '0') return uni.showToast({ title: '登录失败' })

    if (ev.detail.errMsg) {
      uni.showToast({
        icon: 'none', title: `获取手机号失败`
      })
    } else {
      // 更新手机号
      const phoneCode = ev.detail.code
    }

    const result = res.result
    loginSucces(result)
  } else {
    uni.showToast({ title: '获取code失败' })
  }
}

// 通过微信获取手机号-非正式版
const onGetphonenumberSimple: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  if (code) {
    const res = await postLoginWxMinSimpleAPI({ code })
    if (res.code !== '0') return uni.showToast({ title: '登录失败' })
    const result = res.result
    loginSucces(result)
  } else {
    uni.showToast({ title: '获取code失败' })
  }
}
// 获取 code 登录凭证
const getCode = async () => {
  const res = await wx.login()
  code = res.code
}
onLoad(() => {
  getCode()
})
// #endif

// 网页端登录
// #ifdef H5
const account = ref<string>()
const password = ref<string>()
const onH5login = async () => {
  const res = await postLoginH5API({
    account: account.value!,
    password: password.value!
  })
  if (res.code !== '0') {
    console.log(res.msg)
    return uni.showToast({ icon: 'error', title: '注册/登录失败' })
  }
  const result = res.result
  loginSucces(result)
}
// #endif
// 登录成功的处理方法
const loginSucces = (profile: LoginResult) => {
  // 保存会员信息
  const numberStore = useMemberStore()
  numberStore.setProfile(profile)
  // 页面跳转
  uni.switchTab({ url: '/pages/my/my' })
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="http://129.204.228.108/uploads/shandianlogo.png"></image>
      <!-- <view class="image"></view> -->
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <!-- #ifdef H5-->
      <input class="input"
             type="text"
             v-model.trim="account"
             placeholder="请输入用户名/手机号码" />
      <input class="input"
             type="text"
             password
             v-model.trim="password"
             placeholder="请输入密码" />
      <button class="button phone"
              @tap="onH5login">登录</button>
      <!-- #endif-->

      <!-- 小程序端授权登录 -->
      <!-- #ifdef MP-WEIXIN-->
      <button class="button phone"
              open-type="getPhoneNumber"
              @getphonenumber="onGetphonenumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif-->
      <!-- <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <button open-type="getPhoneNumber"
                  @getphonenumber="onGetphonenumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view> -->
      <view class="tips">登录/注册即视为你同意《服务条款》和《隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;

  .image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
    // background-image:image("")
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  // .button {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   height: 80rpx;
  //   font-size: 28rpx;
  //   border-radius: 72rpx;
  //   color: #fff;

  //   .icon {
  //     font-size: 40rpx;
  //     margin-right: 6rpx;
  //   }
  // }

  // .phone {
  //   background-color: #28bb9c;
  // }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;

    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;

      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;

      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }

    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
