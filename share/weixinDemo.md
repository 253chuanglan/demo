title: 微信小程序
speaker: speaker
url: 
transition: slide3 
files: /css/style.css

[slide]

# 微信小程序


[slide]

# 发展历程
----
* 首次提出：微信应用号，2016年1月11日 [演讲地址 YouTube](https://www.youtube.com/watch?v=bVG-1fI1X5g) [腾讯视频](https://v.qq.com/x/page/f03303snr22.html)	{:&.rollIn}
* 2016年9月21日晚间，微信公众平台开始陆续对外发送小程序内测邀请
* 2016年11月3日晚间，微信团队对外宣布，微信小程序开放公测
* 2017年1月9日凌晨正式上线

* [image](https://pic3.zhimg.com/80/v2-7e0e52abf0a8f77d7ae8515c3aedabee_hd.jpg)


[slide]

# 如何开发

* 注册 {:&.rollIn}
* APPID
* 开发工具
* API

<style>
slides>slide .slide-wrapper{
	max-width: 900px !important;
}
</style>

[slide]
# 注册
----
[微信公众平台](https://mp.weixin.qq.com/){:&.rollIn}

[slide]

# 进入小程序管理后台页面 
----

[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/) 获取小程序 AppID {:&.rollIn}

 


[slide]

# 开发工具介绍
[https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)

[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

[slide]

# 小程序开发
* 目录结构  {:&.rollIn}
* 官方demo
* movieDemo

[slide]

# 项目目录结构

```
|- 代码构成
  |- JSON 配置
  |- WXML 模板
  |- WXSS 样式
  |- JS 逻辑交互
```
[app.json 配置API](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)

[slide]
# 看看demo

* [小程序组件](https://developers.weixin.qq.com/miniprogram/dev/demo.html?t=1477656485442)

[slide]

# 豆瓣电影小程序

[slide]

# 豆瓣API接口

[接口介绍](https://developers.douban.com/wiki/?title=movie_v2)

[slide]
# 使用API

* 会报403错误   {:&.rollIn}
* [解决方法](https://github.com/zce/douban-api-proxy)

[slide]

## 使用nginx 

```
C:/nginx/conf/nginx.con 文件 

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;

  #ssl_certificate /var/www/douban.uieee.com/certs/douban.uieee.com.pem;
  #ssl_certificate_key /var/www/douban.uieee.com/certs/douban.uieee.com.key;

  #server_name douban.uieee.com;

  location / {
    proxy_pass https://api.douban.com;
    proxy_redirect     off;

    proxy_set_header   Referer          "https://www.douban.com";
  }
}
```
[https://github.com/zce/douban-api-proxy](https://github.com/zce/douban-api-proxy)

[slide]
# 使用到的API
```
doubanBase: "http://localhost",       //配 nginx

inTheaters: "/v2/movie/in_theaters",  //正在上映

comingSoon: "/v2/movie/coming_soon",  //即将上映

subject: "/v2/movie/subject/",        //电影条目

celebrity: "/v2/movie/celebrity/",    //影人条目

```
[slide]
# 目录结构

```
|- pages
  |- index
    |- index.js
    |- index.json
    |- index.wxml //入口
    |- index.wxss
  |- movie
    |- movie-index   //首页
      |- movie-gird    //多少人看过
      |- movie-rating  //星星
    |- movie-more    // 更多
      |- movie-list  //列表
    |- movie-detail  //影片详情
      |- celebrity   //影人  
|- app.js
|- app.json
|- app.wxss
|- project.config.json
```

[slide]
跳转
```
1、A -> B -> C   C直接返回A

A -> B  通过 wx.navigateTo 跳转

B -> C 通过 wx.redirectTo 跳转.跳转触发后 B 页面就会被销毁， C 页面再返回 wx.navigateBack 就会直接到 A 了


2、A -> B -> C    返回效果C -> B -> A

正常 A -> B -> C 都是通过 wx.navigateTo 跳转的，所以 wx.navigateBack 只能返回上一界面
```
[slide]
## 小程序和小游戏
----

[两者的区别](https://juejin.im/post/5ad4952851882555677f07a0)

[slide]

[学习资源](https://github.com/justjavac/awesome-wechat-weapp)

[nodePPT](https://github.com/253chuanglan/nodePPT)