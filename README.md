#mall-vue

## 2020/2/4 日更新

1. 登录相关的mock接口和登录登出逻辑完成
2. 多语言配置完成
3. 相应式布局相关的css等代码结构，进行中



## 快速部署

* 本地运行
```
npm install
npm run dev
```

## npm 问题

* node-sass无法下载问题
```
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
```
```
npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
```

* 单独安装fsevents
```
npm install fsevents
```
