import { http } from "@/utils/http"
import type { LoginResult } from '@/types/mumber'
type LoginWxMinParams = {
  code: string,
  phoneCode?: string
}

/**
 * 小程序登录请求
 * @param data: LoginWxMinParams
 */
export const postLoginWxMinAPI = (data: LoginWxMinParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/api/login/wxMin',
    data
  })
}

/**
 * 小程序登录_内测版
 * @param phoneNumber
 */
export const postLoginWxMinSimpleAPI = (data: LoginWxMinParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/api/login/wxMin/simple',
    data
  })
}

type LoginParams = {
  account: string
  password: string
}
/**
 * 传统登录-用户名+密码
 * @param data 请求参数
 */
export const postLoginAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login',
    data,
  })
}
