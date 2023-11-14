import request from '@/util/request'
import type { AllLessons, LessonClassify, LessonLink, PageLessons } from '@/types/FileData'

enum API {
  AllLessons_URL = '/file/list', // 获取所有文件
  Page_URL = '/file/page', // 分页查询
  Devide_URL = '/file/classify', // 分类
  LessonDownload_URL = '/lessons/downloadbyid/',
  Filter_URL = '/lessons/filter',
}

// 获取所有文件
export function reqAllLessons(): Promise<AllLessons> {
  return request.get<any, AllLessons>(API.AllLessons_URL)
}

// 分页查询
export function getPageLessons(page?: number, pageSize?: number, term?: string, lesson?: string, filename?: string): Promise<PageLessons> {
  return request({
    url: API.Page_URL,
    params: {
      page,
      pageSize,
      term,
      lesson,
      filename,
    },
  })
}

export function LessonDownload(id: number): Promise<LessonLink> {
  return request.get<any, LessonLink>(API.LessonDownload_URL + id)
}

// 分类
export function LessonDevide(): Promise<LessonClassify> {
  return request.get<any, LessonClassify>(API.Devide_URL)
}

export function FilterByGrade(grade: string, lesson: string): Promise<AllLessons> {
  return request.get<any, AllLessons>(`${API.Filter_URL}?term=${grade}&lesson=${lesson}`)
}
