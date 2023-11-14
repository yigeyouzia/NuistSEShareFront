// 创建用户小仓库
import { defineStore } from 'pinia'

// axios
import type { LessonsState } from './types/LessonsState'
import { reqAllLessons } from '@/api/FileDataApi'

const useLessonsStore = defineStore('Lessons', {
  state: (): LessonsState => {
    return {
      AllLessons: [],
    }
  },
  // 异步|逻辑的地方
  getters: {},

  actions: {
    async getAllLessons(): Promise<any> {
      if (this.AllLessons.length !== 0)
        return '已经缓存'

      const res = await reqAllLessons()
      if (res.code === 200) {
        this.AllLessons = res.data
        return '获取课程成功'
      }
      else {
        console.log('rej')
        return Promise.reject(new Error(res.msg))
      }
    },
  },
})

export default useLessonsStore
