# Git 中 SSH Key 生成步骤
$ ssh-keygen -t rsa -C "youremail@example.com"

然后系统会自动在.ssh文件夹下生成两个文件，id_rsa和id_rsa.pub，用记事本打开id_rsa.pub

将全部的内容复制

打开https://github.com/，登陆你的账户，进入设置

点击add ssh key，

ok！

在git中输入命令：

ssh -T git@github.com

然后会跳出一堆话。。

输入命令：yes

回车

然后就会提示你成功了~~

最后退出git重新进入路径提交一下就可以了~~


# 技术框架介绍

## NodeJS

基础核心开发语言

## Express

node.js web应用框架，提供一系列强大的特性帮助我们创建各种web应用

## Mongodb

数据库

# 技术框架介绍

## 第三方模块 & 中间件

body-parser:解析post请求数据

cookies:读/写cookie

swig:模板解析引擎

mongoose:操作mongodb数据库

markdown:markdown语法解析生成模块
