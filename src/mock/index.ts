import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';

export default [
  {
   url: '/api/getUserInfo', // 注意，这里只能是string格式
   method: 'get',
   response: () => {
    return 'hello world and get mockData';
   },
  },
  {
   url: '/api/hhh/getUserInfo', // 注意，这里只能是string格式
   method: 'get',
   response: () => {
     return {
      code: 200,
      message: 'ok',
      response: () => {
      //批量模拟随机数
        let data = [];
          for (let i = 1; i < 301; i++) {
            let obj = Mock.mock({
              'rows|1-100': 100,
            });
            data.push(obj.rows);
          }
          console.log(data);
          return data;
     },
     }
   },
  },
 ] as MockMethod[]; // 定义数据格式