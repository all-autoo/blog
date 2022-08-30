import * as Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { config } from '../apis'
import { listPaging } from '../utils'
import { userList } from '../data/list'


export default [
  {
    url: "/api/userList",
    response: (config: config) => {
      let size = Number(config.query.size);
      let current = Number(config.query.current);
      let name = config.query.name
      
      let list: any[] = userList
      if (name) {
        list = list.filter(item => item.name.includes(name))
      }
      
      return {
        code: 200,
        data: listPaging(current, size, list),
        message: "操作成功",
      };
    },
  }
 ] as MockMethod[]; // 定义数据格式