// 定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  msg: string
  map: null
}

// 单个课程
export interface lesson {
  lessonId: number
  lessonName: string
  term: string
}

export interface label {
  label: string
  value: string
}

// 学期
export interface Terms extends ResponseData {
  data: label[]
}

// 根据学期差得的课程列表
export interface LessonsByTerm extends ResponseData {
  data: label[]
}
