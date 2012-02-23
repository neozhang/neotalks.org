---
title: (How to) Keep Shipping
layout: post
category: cn
---

Keep Shipping 是前两天在公司内部的经验交流会上 Piggest 同学分享的。我当时心不在焉的错过了很多她的精彩解释，但是却对这个短语反应强烈。的确，没有什么比这两个字更加准确的表达科技创业公司在产品管理上应该恪守的信条。在交流会结束前，我语气强烈的讲道：

> It is a shame that we cannot keep shipping and at the same time call ourselves a start-up.

这是我参与创业以来感触最深的一个观念。

在过去的快要两年的时间里，我参与或领导了几个风格迥异的创业产品。包括街旁这样的用户产品，也包括果合这样的商业产品，这两个产品中也包括了 Web 和 App 两种不同的形式。和不同的产品团队合作，我感到在产品的节奏感上的正确把握是创业团队的产品能否以正确的姿态面对市场变化的重要因素。

对于 Native App 或者 SDK 而言，因为 App Store 往往需要 review，而且产品本身的形态是编译好的二进制包，因此版本更新的速度不可能很快。那么，每一个 release 都需要慎重考虑。一个以互联网的节奏进行产品管理的团队将会遇到严重的质量问题，对于用户产品而言，伤害的是用户口碑，对于商业产品而言，可能伤害的是客户的商业利益。

对于 Web App 或者 Website 而言，代码可以快速提交部署，用户无需下载新的软件包就可以使用到新的功能，节奏应该更快，但是同样应该建立问题的处理机制。

一个经常碰到的问题是，一个完整的产品通常需要 Native App / SDK 和 Web 端同时配合才有意义。如何给这两个端“松绑”呢？这可能没有统一的答案。但最近在使用的一个项目管理软件 [Trello](http://trello.com) 本身的开发流程引起了我的注意：

* 首先，这个产品大部分的使用是在 Web 上，这样就有一个比较明确的产品的重心
* Web 端的需求流采取[快速迭代的方式](https://trello.com/board/trello-development/4d5ea62fd76aa1136000000c)，尽早的解决各种 bug 和优先级高的需求
* iOS 端的功能随着版本的小升级而进行迭代，可以看到最近的一次更新是在逐步完成较为次要的功能

除了产品的重心之外，还有其它的原因值得考虑：

* 对团队而言，哪个平台上的开发成本最低？
* 对用户而言，哪个平台上功能改进或者问题修复的边际收益

LinkedIn Mobile 团队经过精心的考量最后选择了一种[混合式的开发模式](http://functionsource.com/post/nativeweb-the-new-linkedin-apps-come-with-backbone-node-and-more)：在 Native App 中融入了 HTML5 的部分，从而可以在小范围内跨移动平台的快速迭代，甚至进行 A/B Testing。就最近知乎上的[回答](http://www.zhihu.com/question/20053803)看，豌豆荚也是采用类似的方式，从而可以在桌面软件上实现快速迭代。这是一个好的技术框架能够给产品管理带来的最大益处。