import Mock from 'mockjs'
import {getRandom} from '../utils' 
const Random = Mock.Random

var token= ''

Random.extend({
    subTitle: function(date) {
        var subTitles = ["Hermes Cinhetic Mini手包","Constance长钱包","Clic Cadenas手镯"]
        return this.pick(subTitles)
    },
    productImageBig: function(date) {
        var productImageBigs = ["/static/upload/a1.jpg","/static/upload/a2.jpg","/static/upload/a3.jpg","/static/upload/a4.jpg", "/static/upload/b1.jpg", "/static/upload/b2.jpg"]
        return this.pick(productImageBigs)
    }
})
Random.subTitle()
Random.productImageBig()
// => "水瓶座"
Mock.mock('@SUBTITLE')
Mock.mock('@productImageBig')
let data = []

for (let i = 0; i < 50; i++) {
    let Template = {
        productId: i + 1,
        typeId: Random.natural(1, 2),
        subTitle: "@SUBTITLE",
        "productImageBig": "@productImageBig",
        "salePrice": Random.natural(10000,100000),
        "small": ["/static/upload/a1.jpg","/static/upload/a2.jpg","/static/upload/a3.jpg","/static/upload/a4.jpg", "/static/upload/b1.jpg", "/static/upload/b2.jpg"]

    }
    data.push(Template)
}

Mock.mock('/goods/allGoods', 'get', {
    "success": true,
    data: data
})

Mock.mock(/\/member\/checkLogin/,'get'
,(option)=>{
   let token = option.url.split('token=')[1]
   if(token){
    return Mock.mock({
        state: 0,
        msg: '',
        result: {
            userId: Random.uuid(),
            username: Random.name(),
            avatar: '/static/upload/avatar.jpg'
        }
    })
   }else {
       return Mock.mock({
           state: 1,
           msg: '没有登录',
           result: ''
       })
   }
})

Mock.mock('/member/login','post',(option)=>{
    token = getRandom(32)
    return Mock.mock({
        state: 0,
        msg: '',
        result: {
            id: Random.uuid(),
            token: token
        }
    })
})

Mock.mock(/\/member\/loginOut/,'get',(option)=>{
    let requestToken = option.url.split('token=')[1]
    token = ''
    return Mock.mock({
        state: 0,
        msg: ''
    })
})