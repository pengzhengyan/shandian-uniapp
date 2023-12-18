import { http } from "@/utils/http"
import type { ProfileDetail } from '@/types/mumber'


/**
 * 小程序登录请求
 * @param data: LoginWxMinParams
 */
export const getUserInfoAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/my/userinfo',
  })
}

type InfoUpdate = { nickname?: string, phone?: string, company?: string }

export const postUpdataUserInfoAPI = (info: InfoUpdate) => {
  return http({
    method: 'POST',
    url: '/my/userinfo',
    data: info
  })
}

export const postUpdateWxPhoneAPI = (phoneCode: string) => {
  return http<InfoUpdate>({
    method: 'POST',
    url: '/my/update/wx/phone',
    data: {
      phoneCode
    }
  })
}
