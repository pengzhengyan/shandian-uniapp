/** 页面渲染内容 */
export type UploadpanelItem = {
  id: string
  name: Names
  title: string
  src: string
}

export type ApplicationItem = {
  aid: number
  uid: number
  blicense: string
  idcardback: string
  idcardfront: string
  bcredit: string
  pcredit: string
  phase: number
}

export type Names =
  'blicense' |
  'idcardback' |
  'idcardfront' |
  'bcredit' |
  'pcredit'

