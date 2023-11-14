import request from '@/util/request'
import type { LessonsByTerm, Terms } from '@/types/Lesson'

enum API {
  Classify_URL = '/lessons/classify/list', // 年级列表
  Lessons_URL = '/lessons/classify', // 根据年级查询课程列表
}

// 年级列表
export function getAllTerms(): Promise<Terms> {
  return request.get<any, Terms>(API.Classify_URL)
}

// 根据年级查询课程列
export function getLessonsByTerm(term: string): Promise<LessonsByTerm> {
  return request.get<any, LessonsByTerm>(`${API.Lessons_URL}?term=${term}`)
}
