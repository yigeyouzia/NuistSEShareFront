import type { ResponseData } from './FileData'

export interface CommentData {
    comment_id: number
    comment_nickname: string
    comment_datetime: string
    comment_content: string
    comment_email: string
    comment_link: string
}

export interface CommentLength {
    comment_length: number
}

export interface CommentResponseData extends ResponseData {
    data: CommentData[]
}

export interface CommentLengthData extends ResponseData {
    data: CommentLength
}
export interface AddCommentData extends ResponseData {
    data: any
}
