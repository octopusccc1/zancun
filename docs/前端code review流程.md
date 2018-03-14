### 前端code review流程简介
#### 在gitlab上发起code review（Merge Request）
- step1. 在gitlab[cubex项目](https://g.hz.netease.com/ysf/cubex/branches)创建和开发分支名如(dev1.4)加"-wushengzhu"的个人开发分支
- step2. 在个人开发分支（如dev1.4-wushengzhu）编码并提交到个人开发分支上
- step3. 在gitlab[cubex项目](https://g.hz.netease.com/ysf/cubex/branches)上发起Merge Request并选择Source branch和Target branch。
         点击Compare branches并确认代码后进入下一步，填写Title、Description和Assign to（表示提交给谁review）。
- step4. 点击Submit确认以上选择，（gitlab支持自动发送邮件通知）通知review的人及时review

#### 在gitlab上进行code review
- step1. 在gitlab[cubex项目](https://g.hz.netease.com/ysf/cubex/branches)点击Merge Request查看Changes（目前实测gitlab发起code review后，2分钟后才能看到）、Commits、Discussion，添加评论后确认review通过后选择Merge。