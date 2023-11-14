// 评论数据的获取
import request from '@/util/request'
import type { AddCommentData, CommentData, CommentLengthData, CommentResponseData } from '@/types/Comments'
import setting from '@/setting'

enum API {
  GetComments_URL = '/comments/get',
  GetCommentsLength_URL = '/comments/length',
  AddComments_URL = '/comments/add',
}

export function GetCommentsLength(): Promise<CommentLengthData> {
  return request.get<any, CommentLengthData>(API.GetCommentsLength_URL)
}

export function GetCommentsContent(page: number): Promise<CommentResponseData> {
  return request.get<any, CommentResponseData>(`${API.GetComments_URL}?page=${page}&length=${setting.comment.comment_amount_for_single_page}`)
}

export function AddComment(comment: CommentData): Promise<AddCommentData> {
  return request.post<any, AddCommentData>(API.AddComments_URL, comment)
}
