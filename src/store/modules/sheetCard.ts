
import { defineStore } from 'pinia'
import { store } from '@/store'
// 使用 插件 pinia-plugin-persist 可以辅助实现数据持久化功能
// pinia-plugin-persist
// # 安装插件
// pnpm install pinia-plugin-persist --save


export const sheetCardStore = defineStore({
  id: 'sheet-card',
  state: () => ({
    sheetCardVo: {
      cardName: '',
      cardName2: '',
      cardType: 0,
      codeorFill: 0,
      colorType: 0,
      createTime: '',
      examNoLen: 8,
      fillType: 0,
      headConfig: '考号,姓名,班级',
      id: '',
      notice: 1,
      pageSize: 'pageA32',
      paperAbType: 0,
      paperId: '',
      period: 2,
      quesConfJson: '',
      showQues: 1,
      subName: '语文',
      updateTime: '',
    },
    listData: <any[]>[],
    updateObj: null,
    updateIndex: -1,
  }),
  getters: {
    // this 指向  state
    getSheetCard(): any {
      return this.sheetCardVo
    },
    getListData(): any {
      return this.listData
    },
    getUpdateObj(): any {
      return this.updateObj
    },
  },
  actions: {
    setSheetCard(data: any) {
      
      this.sheetCardVo = data ? data : ''
    },

    // listData
    setListData(data: any) {
      this.listData = data ? data : []
    },
    addListData(data: any) {
      this.listData.push(data)
    },
    updateListData(data: any,ins:number) {
      this.listData[ins] = data
    },
    delListData(indes: number) {
      this.listData.splice(indes, 1)
    },

    // updateObj
    upList(data: any,ins:number) {
      this.updateObj = data
      this.updateIndex = ins
    }
  }
})

export function sheetCardStoreWithOut() {
  return sheetCardStore(store);
}
