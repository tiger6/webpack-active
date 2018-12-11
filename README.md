# webpack-active

> 使用webpack4.5搭建的一套轻量级活动脚手架

## 安装步骤

```bash
# 安装依赖
npm install

# 默认端口号8888 访问地址： http://localhost:8888/demo.html
npm run dev

# 打生产包，默认一键zip
npm run build
```
## 如何新增活动模块？

> 直接在src/page目录下面新增活动模块

每个模块包含

 - images文件夹
 - index.ejs模板文件
 - index.js逻辑层
 - index.less css文件

## 有什么亮点？

 - 按模块划分，确保每个模块能独立运行，互不污染。
 - 集成常用的less,es6,css3,zepto,weui等，进行快速开发。 
 - 严格区分本地，生产环境。
 - 可利用git,svn进行版本控制，建议git。
 - 支持vconsole,方便在移动端调式。
 - 支持一键zip打包，版本hash。

> 若对你有帮助，欢迎star!!!


