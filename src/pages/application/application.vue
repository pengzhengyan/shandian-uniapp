<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import type { ApplicationItem, UploadpanelItem, Names } from '@/types/application'
import { getApplicationPageinfoAPI, getApplicationInfoAPI, postUpdatePhaseAPI } from '@/services/application'
import { useMemberStore } from '@/stores';

const { safeAreaInsets } = uni.getSystemInfoSync()
const safeBottom = safeAreaInsets!.bottom + 20
const memberStore = useMemberStore()
onLoad(() => {
  getApplicationPageinfo()
  getApplicationInfo()
})

// 上传资料窗口渲染所需要的内容
const uploadpanelItemList = ref<UploadpanelItem[]>([])
const getApplicationPageinfo = async () => {
  const res = await getApplicationPageinfoAPI()
  uploadpanelItemList.value = res.result
}

// 当前用户进入上传界面，查询和获取用户的申请信息
const applicationInfo = ref<ApplicationItem>({
  aid: 0,
  uid: 0,
  blicense: '',
  idcardback: '',
  idcardfront: '',
  bcredit: '',
  pcredit: '',
  phase: 0
})
const getApplicationInfo = async () => {
  const res = await getApplicationInfoAPI()
  applicationInfo.value = res.result
  // 将用户phase，设置为currentActive的值
  currentActive.value = res.result.phase
}

// 当前用户点击决定在第几步
const currentActive = ref(1)

// 是否可能进行下一步的判断。
const isNext = ref(false)

// ‘下一步’按钮的函数
const goNext = () => {
  if (!isNext.value) return
  const next = currentActive.value + 1
  // 如果下一步比页面还长，则返回
  if (next > uploadpanelItemList.value.length + 1) return
  // 如果下一步大于phase,则更新phase
  if (next > applicationInfo.value.phase) {
    updatePhase(currentActive.value + 1)
    // 将下一步的按钮置灰
    isNext.value = false
  }
  // 更新当前所在的步
  currentActive.value = next
}

// 更新phase的方法
const updatePhase = async (phase: number) => {
  const res = await postUpdatePhaseAPI(phase)
  applicationInfo.value.phase = res.result.phase
}


// 上传图片的方法
const onChooseImg = (name: Names) => {
  uni.chooseImage({
    count: 1,
    success: (e) => {
      // 文件上传
      uni.uploadFile({
        url: '/application/updateimg',
        name: 'file',
        filePath: e.tempFilePaths[0],
        formData: { name },
        success: (res) => {
          if (res.statusCode === 200) {
            const image = JSON.parse(res.data).result
            applicationInfo.value[name] = image
            isNext.value = true
          } else {
            uni.showToast({ icon: 'error', title: '获取图片失败' })
          }
        },
      })
    },
  })
}

// 步骤按钮被点击
const stepOnTap = (index: number) => {
  // 如果被点击的按钮下标没超过phase,则跳到点击那步
  if (index <= applicationInfo.value.phase) currentActive.value = index + 1
}

// 是否完成
const btnText = computed<string>(() => {
  let text = '下一步'
  if (currentActive.value === 1) {
    // 更新store中step信息
    memberStore.setStep(1)
  }
  if (currentActive.value === uploadpanelItemList.value.length) {
    text = '完成'
    // 更新store中step信息
    memberStore.setStep(2)
  }
  return text
})

// 是否完成
const isCompleted = computed<boolean>(() => applicationInfo.value.phase > uploadpanelItemList.value.length)


</script>

<template>
  <view v-if="!isCompleted"
        class="fileuploader"
        :style="{ paddingBottom: safeBottom + 'rpx' }">
    <view v-for="(item, index) in uploadpanelItemList"
          v-show="currentActive === (index + 1)"
          :key="item.id">
      <view class="
        header">
        <view class="title">第{{ item.id }}步：{{ item.title }}</view>
        <view class="tips">
          <uni-icons type="locked-filled"
                     color="#4cd964">
          </uni-icons>
          仅用于额度评估，信息将严格保密
        </view>
      </view>
      <view class="sd-card card">
        <image class="pictrue"
               :src="applicationInfo[item.name] || item.src"
               mode="aspectFit"
               @tap="onChooseImg(item.name)"></image>
      </view>
    </view>
    <!-- 步骤进度条 -->
    <view class="steps">
      <view class="step-item"
            v-for="(item, index) in uploadpanelItemList"
            :key="item.id"
            @tap="stepOnTap(index)"
            :class="applicationInfo.phase > index ? 'active' : ''">
        <text class="item">{{ item.id }}</text>
        <uni-icons type="checkbox-filled"
                   :color="applicationInfo.phase > index + 1 ? '#52B465' : '#A2A2A2'"
                   class="item"></uni-icons>
      </view>
    </view>
    <button class="button"
            :disabled="!isNext"
            :class="isNext ? 'phone' : 'disable'"
            @tap="goNext">{{ btnText }}</button>
    <view class="view2"></view>
    <view class="foot">
      <text class="tips">无须抵押 审核通过立即获得额度</text>
    </view>
  </view>
  <view v-else
        class="completed">
    <view> <text>资料审核中...</text></view>
  </view>
</template>

<style scoped lang="scss">
.completed {
  background-color: #F6F6F6;
  width: 100%;
  padding: 20rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.fileuploader {
  background-color: #F6F6F6;
  width: 100%;
  padding: 20rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .notshow {
    visibility: hidden;
  }

  .view2 {
    width: 100%;
    flex: 1;
  }

  .header {
    margin: 40rpx 0;

    .title {
      font-size: 40rpx;
      margin-bottom: 10rpx;
    }

    .tips {
      font-size: 24rpx;
      color: $sd-text-color-gray;
      display: flex;
      align-items: top;
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40rpx;

    .pictrue {
      width: 80%;
      margin: 30rpx 0rpx;
      height: 580rpx;
      // margin: 30rpx;
      // background-color: aqua;
    }
  }

  .steps {
    margin-bottom: 40rpx;
    display: flex;
    justify-content: space-around;

    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $sd-text-color-gray;

      &.active {
        color: $sd-bg-color-main;
      }
    }
  }

  .disable {
    border: 1rpx solid $sd-text-color-gray;
    background-color: $sd-text-color-gray;
  }

  .foot {
    display: flex;
    justify-content: space-around;

    .tips {
      font-size: 24rpx;
      color: $sd-text-color-gray;
    }
  }
}
</style>
