# media_manager

## 开发说明

### 环境

Node.js + WebPack + Vue.js

安装依赖：`npm install`

运行服务器：`npm run dev`

打开 http://localhost:8080/

推荐使用Chrome，安装Vue插件：https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd，使用`开发者工具`调试。

### Vue

Vue以组件为单位。一个组件是HTML+JS+CSS的组合。组件之间相互组合形成组件树，形成一个完整的页面。

组件放在`src/components`中。

### 怎么开始写

按照Vue的特点，理想的分工应该是每个人写不同的组件，最后组合在一起。

但考虑到你可能不是很熟悉 js，所以你可以先只写HTML。

你可以浏览一下已有的页面，然后研究一下它们对应的HTML是怎么写的。有兴趣也看看旁边的ts文件，其实很简单~

我在首页放了一个test组件，源码位于`src/components/test/`

打开其中的HTML，你可以在这里写一些东西，保存后网页会自动刷新（热加载），就可以实时看到效果。

每写完一个组件后，就复制test文件夹再改个名，剩下的交给我。



你可以从以下地方找到组件并直接使用。

Bootstrap：http://v3.bootcss.com/components/

BootstrapVue：https://bootstrap-vue.js.org/docs/components/alert



辛苦了！Happy Coding！

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# run the tests on Teamcity
npm run ci:teamcity

# run the tests on Jenkins
npm run ci:jenkins

# build for production with minification
npm run build

# clean the production build
npm run clean
```
