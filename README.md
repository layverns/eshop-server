## 项目介绍

基于 react 仿[网易严选](https://you.163.com/)桌面端网页应用的相关服务器接口

对应的前端仓库: [https://github.com/layverns/react-eshop](https://github.com/layverns/react-eshop)

### 相关技术

所用到的技术主要有：eggjs, sequelize, mysql, jsonwebtoken

开发使用node版本：v12.16.1

mysql版本：8.0.19

eggjs版本： 2.15.1

### 运行项目

1.安装mysql客户端。安装时加密方式要选Use Legacy Authentication Method。

2.进入项目目录，修改.env文件用户和密码，修改database/config.json文件中的development用户和密码。

3.执行以下命令：

`npm install`

`npm run init_dev` 初始化数据库，导入测试数据

`npm run dev`

### 其他

本项目主要用于学习与交流。
