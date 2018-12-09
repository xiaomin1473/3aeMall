# 3ae-mall项目介绍

| 修订版本 | 修订内容  | 修订人员 | 文档类型 | 修订日期 |
| :-----: |  :-----:  | :-----: | :-----: | :-----: |
|  v1.0.1.* | 3ae-mall项目介绍 | sid | -- | 2018-12-04 |
| ————— | —————————————————————————— | ————— | ————— | —————— |

版本号说明

* 版本号第四位: 修剪文档语句结构、内容布局，不计入修订版本。
* 版本号第三位: 二级模块内容、结构进行更新，计入修订版本。
* 版本号第二位: 一级模块内容、结构进行更新，计入修订版本。
* 版本号第一位: 不限于整个文档进行升级、包含的内容同时进行版本迭代，计入修订版本并生成新的文档。

修改文档名为：
1.快照版（同布更新）
2.稳定版（只维护，不更新）
3.最终版（不更新、不维护）

---

## 主架构

```utf-8
架构图 3ae-mall

  3ae-mall
    ├── public                                        // 全局静态资源
    ├── script                                        // 脚本资源
    ├── src
    │    ├── assets
    │    │     ├── utils                              // 工具
    │    │     └── static                             // 静态资源
    │    ├── config                                   // 公共配置
    │    ├── docker                                   // docker容器、码头工人; doctor装配文件(Vt. 装配，假造，修改)
    │    │     ├── model
    │    │     │     ├── api                          // 后台api
    │    │     │     └── store                        // vuex
    │    │     ├── views
    │    │     │     ├── components                   // 组件
    │    │     │     ├── pages
    │    │     │     │     ├── caution                // 警示 (报错信息、状态码、数据异常等)
    │    │     │     │     └── filler                 // 填充 (过渡页、流程页、信息页、介绍页)
    │    │     │     └── service                      // 业务
    │    │     └── vitae
    │    │           ├── routes                       // 动态路由
    │    │           ├── index.js                     // 路由配置
    │    │           └── permission.js                // 许可证
    │    ├── app.vue                                  // 应用入口
    │    ├── main.js                                  // 挂载VUE
    │    └── router.js                                // 路由入口
    ├── test                                          // 测试
    ├── .editorconfig                                 // 代码风格配置
    ├── .eslintignore                                 // eslint 忽略目录配置
    ├── .eslintrc                                     // eslint 配置
    ├── generator.json                                // generator.json
    ├── package.json                                  // package.json
    ├── README.md                                     // 项目说明
    └── yarn.lock                                     // 模板版本管理
```

## 架构介绍及实现思考

* MVC结构
* 三级
* 细粒度
* 布局
* 设计模式
* 流程
* 测试

>&emsp;因为我对整个项目的开发流程、项目结构，包括vue的开发环境都处在学习、摸索阶段。所以特意把别人项目按照我自己的想法重新规划了结构和目录。
---
>&emsp;由于我有着一颗躁动和不安现状的心（想造出自己的轮子、脚手架、甚至是框架）。因此我在现有的项目基础上结合这段时间对ant-design-admin的学习与改造，做出了这个项目架构。
---
>&emsp;本着我自己的开发原则：顶层设计，层层拆分，逐步细化，依次打包，整体规划。从而实现由抽象到具体再到抽象的原子细粒度级的项目开发。

```utf-8
  今天周四，天气晴。
  经过一个多星期对vue框架的整合和源码、编码学习。大致理解到了下面这样一个工作流程：
    1.vue本质上是一个挂载到windows（全局对象）下的一个vue全局对象。
    2.vue所有的外置组件vuex,vue-router等挂载到vue对象上，等于是vue对象的属性。
    3.vue所有的组件操作其实就相当于是在改变vue所挂载对象的属性。
    4.vue组件对象的属性大致可以分为以下四个层级：
        (computentName):{
          data:{},    // 静态数据（常量）
          state:{},   // 状态数据（变量）
          atomOp:{},  // 原子操作（单一性，原子性，可见性，有序性。常见的vue内置封装函数）
          action:{},  // 高级操作（对原子操作的高级封装）
        }
    5.vue的生命周期从创建（前、后）、初始化（前、后）、运行监听（数据改变）、销毁（前、后）这几个阶段来完成整个dom树的构建与操作。
    6.理解什么是真正的面向对象。万物皆对象，皆不可逆，皆完备。
    7.按照对象的完备程度我们划分不同层级，给予不同的权限与能力。
    8.根据不同的规则，学习规则，完善规则，改造规则，创造规则。一张张表。
    9.面向对象三大要素：计算性、完备性、因果性。
    10.数据的存，数据的取。即仓库，操作，展示。MVC。
```

```utf-8
  经过对vue-admin框架的学习。独自整理出了下面这样一个网站工作流程：
    1.MVV架构。 model vitae views （数据绑定、模块流程、展示操作）（MVVM）
    2.model三个模块：answer(前端数据POST请求)、api(后台数据GET请求)、store(vuex本地数据) 其他mock(数据模拟)
    3.vitae三个模块：routes(动态路由表)、permit(权限表)、session(会话表)
    4.views两个模块：apply(组件应用)、book(订装页面)
    5.网站流程：
      > main.js程序入口，挂载filter,vue-router,vuex,element,logs组件到vue上。
      > 获取store入口文件
        1.加载store
      > 获取vuex自带日志功能、记录操作者
      > 获取router入口文件
        1.挂载到vue
        2.加载config文件 // 暂无
        3.加载routes
          > 初始化静态路由表，若没有操作则返回
          > 获取store里用户列表，并获取用户roles
          > 获取permission路由表，根据roles动态生成permission表
          > 把之前生成的所有路由表合并成routes
        4.加载router全局守卫
          > 有token,根据store中当前用户token来判断所有路由表->进入routes文件进行动态配置（即改变store）
          > 没有token
            1.查看白名单，如果有，next()
            2.不在,to(登录)
          > 其他全部404
        5.局部守卫
        6.permit权限，页面权限，操作权限，数据权限，会话权限
          > 遵循规则：
            "[WHO]是否可以对[WHAT]进行[HOW]的访问操作，该操作[WHEN]授权结束" === true
            "[WHO]" —》 "[WHEN]" —》 "[HOW]" —》 "[WHAT]"  ===  "[state]"
            "[WHEN]"
            "[admin]" —》 "[handle]" —》 "[bound]"  ===  "[state]"
            "[admin]" —》 "[handle]" —》 "[reveal]"  ===  "[state]"
            "[admin]" —》 "[visit]" —》 "[bound]"  ===  "[state]"
            "[admin]" —》 "[visit]" —》 "[reveal]"  ===  "[state]"
            "[user]" —》 "[handle]" —》 "[bound]"  ===  "[state]"
            "[user]" —》 "[handle]" —》 "[reveal]"  ===  "[state]"
            "[user]" —》 "[visit]" —》 "[bound]"  ===  "[state]"
            "[user]" —》 "[visit]" —》 "[reveal]"  ===  "[state]"
      > views动态渲染sider和navbar
      > 操作发送给answer,验证操作token
      > 三级密码
```

## 依赖包

```JSON
// data-set bizcharts                  图表
// antd                                UI
// babel-plugin-import                 按需加载
// promise-polyfill                    promise兼容
// whatwg-fetch                        跨域请求
// puppeteer                           爬虫（自动测试，抓取网页）
// redux-saga                          完成中间件的异步请求
{
  "dependencies": {
    "register-service-worker": "^1.5.2",
    "vue": "^2.5.17",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
}
```

学习文献
1.Architectural Styles and the Design of Network-based Software Architectures
