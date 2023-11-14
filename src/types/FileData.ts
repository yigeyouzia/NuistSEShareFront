// 定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  msg: string
  map: null
}

// 单个文件信息
export interface LessonDetail {
  fileId: number
  fileBelongsToLesson: string
  fileName: string
  fileType: string
  fileSize: number
  filePath: string
  fileTerm: string
}

// 所有文件信息
export interface AllLessons extends ResponseData {
  data: LessonDetail[]
}

// 分页查询
export interface PageLessons extends ResponseData {
  data: {
    records: LessonDetail[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: any
    maxLimit: any
    searchCount: boolean
    pages: number
  }

}

export interface FileDownloadLink {
  download_link: string
}

export interface GradeandLesson {
  term: string
  lesson_table: string[]
}

export interface LessonLink extends ResponseData {
  data: FileDownloadLink
}

export interface LessonClassify extends ResponseData {
  data: GradeandLesson[]
}
