import Mock from 'mockjs';
import apis from './apis';
import { param2Obj } from './utils';
import { MockMethod } from 'vite-plugin-mock'

const ENV =  (import.meta as any).env

export interface options {
  body: string
  type: string
  url:  string
}

export function mockXHR(){
  function XHRreq(response:any){
      return function(options:options) {
          let result = null       
          if(response instanceof Function){
            let {body,type,url} = options
              result = response({
                  body: typeof body == 'string' ? JSON.parse(body) : body ,
                  method: type,
                  query: param2Obj(url)
              })
          }else{
              result = response
          }
          return result
        }
  }
  type iType = MockMethod
  let i: iType
  for(i of apis){
      Mock.mock(new RegExp(ENV.VITE_API_URL + i.url), i.method || 'get', XHRreq(i.response))
  }
}
