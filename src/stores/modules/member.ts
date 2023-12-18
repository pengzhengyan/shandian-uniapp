import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResult } from '@/types/mumber'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    // 上传申请额度资料的进度
    const step = ref(0) // 0表示未开始，1表示进行中，2表示审核中
    // 更新上传申请额度资料的进度
    const setStep = (val: 0 | 1 | 2) => {
      step.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }
    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
      step,
      setStep,
    }
  },
  // TODO: 持久化
  {
    // persist: true,
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
