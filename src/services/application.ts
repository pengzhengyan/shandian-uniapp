import { http } from "@/utils/http"
import type { ApplicationItem, UploadpanelItem } from '@/types/application'

// get /application/pageInfo
export const getApplicationPageinfoAPI = () => {
  return http<UploadpanelItem[]>({
    method: 'GET',
    url: '/application/pageinfo'
  })
}

// 新建和查询申请信息
export const getApplicationInfoAPI = () => {
  return http<ApplicationItem>({
    method: 'GET',
    url: '/application/info'
  })
}

// 更新图片
export const postUpdatePhaseAPI = (phase: number) => {
  return http<{ phase: number }>({
    method: 'POST',
    url: '/application/updatePhase',
    data: {
      phase
    }
  })
}
