import * as Mock from "mockjs";

export const userList = getUserList()

function getUserList(): any[] {
  return Mock.mock({
    'list|100': [{
      'id|+1': 1,
      name: '@cname()',
      date: "@date()",
      image() { return Mock.Random.dataImage('100x100', this.name) },
      'status|1': [0, 1]
    }]
  }).list
}