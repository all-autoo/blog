import * as Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { config } from '../apis'

type userType = {
  [s: string]: {password: number, token: string}
}

const users: userType = {
  admin: {
    password: 123456,
    token: "admin-token",
  },
  ordinary: {
    password: 123456,
    token: "ordinary-token",
  },
  test: {
    password: 123456,
    token: "test-token",
  },
};

export default [
  {
   url: '/api/login',
   method: 'post',
   response: (config: config) => {
    console.log(config);
    if (users[config.body.username]) {
      const userInfo = Mock.mock({
        id: '@id',
        username: '@cname',
        token: 'admin-token',
        avatar () { return Mock.Random.image('200x100',Mock.Random.color(),'#757575','png', this.username[0]) }
      })
       return {
        code: 200,
        message: 'ok',
        data: userInfo
       }
    } else {
      return {
        code: -1,
        message: '账号不存在'
       }
    }
   },
  },
  {
   url: '/api/getUserInfo',
   method: 'get',
   response: () => {
    const userInfo = Mock.mock({
      id: '@id',
      username: '@cname',
      token: 'admin-token',
      avatar () { return Mock.Random.image('200x100',Mock.Random.color(),'#757575','png', this.username[0]) }
    })
     return {
      code: 200,
      message: 'ok',
      data: userInfo
     }
   },
  },
 ] as MockMethod[]; // 定义数据格式