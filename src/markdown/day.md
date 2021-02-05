---
wrapperClass: 'day' // wrapperClass will wrapped current md file
title: 'title'
desc: 'desc'
---

# 2020-08-04

### Object.defineProperty(object, propertyName, descriptorObject)

在 ES 中有两种属性,一种是数据属性,一种是访问器属性。

**1. 数据属性**

- **configurable**：表示能否通过 delete 删除属性从而重新定义属性。默认值为 true。
- **enumerable**：表示能否通过 for-in 循环返回属性。默认值为 true。
- **writable**：表示能否修改属性的值。默认值为 true。
- **value**：包含这个属性的数据值。默认值为 undefined。

**2. 访问器属性**

- **configurable**：表示能否通过 delete 删除属性从而重新定义属性。默认值为 true。
- **enumerable**：表示能否通过 for-in 循环返回属性。默认值为 true。
- **get**：在读取属性时调用的函数。默认值为 undefined。
- **set**：在写入属性时调用的函数。默认值为 undefined。

&emsp;&emsp; 想要修改属性默认的特性都得通过 ES5 的 Object.defineProperty()方法。这个方法接收三个参数：

- **object**：属性所在的对象；
- **propertyName**：属性的名字；
- **descriptorObject**：描述符对象；

```javascript
// 像这样直接在对象上定义属性时,其数据属性的特性除value外都为true,value的值为"Lgowen"
var person = {
    name： "Lgowen"
};

----------------------------------------------------

var obj = {};
Object.defineProperty(obj, "name", {
    configurable:false,   //当设置configuable属性为false时,则无法删除属性name的值,且设置为false之后则无法将其修改为true。
    writable:false,
    value:"Lgowen"
})
delete obj.name;          // 在严格模式下会导致错误
obj.name = "lgowen";
console.log(obj.name)     //依然可以打印出 "Lgowen" 而没有删除掉且没有被修改成lgowen

var obj = {};
Object.defineProperty(obj, "name", {
    enumerable:false,   //当设置enumerable属性为false时,则无法枚举
    value:"Lgowen"
})

----------------------------------------------------

var personOne = {};
Object.defineProperty(personOne, "name", {
    enumerable: false,
    value:"Lgowen"
})
for(var i in personOne){
    console.log(personOne[i]);         //不会有打印
}

var personTwo = {};
Object.defineProperty(personTwo, "name", {
    enumerable: true,
    value:"Lgowen"
})
for(var i in personTwo){
    console.log(personTwo[i]);        // "Lgowen"
}

----------------------------------------------------

// 使用访问器属性的常见方式,即设置一个属性的值会导致其他属性发生变化。
// 如果一个对象的普通数据属性与访问器属性同名时,则会访问器属性则会覆盖这个普通数据属性。

var obj = {
    _year: 2004,
    edition: 2
}

// 为obj对象定义了一个访问器属性year,getter和setter函数不是必要。
// 在读取访问器属性时,会调用其getter函数,这个函数负责返回有效的值。若无定义,则这个访问器属性的值为undefined。
// 在写入访问器属性时,会调用其setter函数,这个函数负责决定如何处理数据。

Object.defineProperty(obj, "year", {
    get: function () {
        return this._year
    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += 1;
        }
    }
})
console.log(obj.year);     //访问obj对象中的year访问器属性时,在读取该属性时调用了其get方法,返回了obj._year的值,即2004。
obj.year = 2005;           //修改obj对象中的year访问器属性的值时,调用了set方法,修改了year值的同时,将其值赋值给了_year,且edition的值也发生了改变。


```

# 2020-08-05

### function 中的 toString()方法

```javascript
//实现一个累加函数
//add(1)      ->   1
//add(1,2)    ->   3
//add(1)(2)   ->   3
//add(1,2)(3) ->   6
//以此类推
```

&emsp;&emsp; 首先我们应该想到，这一个函数应该是一个不定参的函数，每次可接收的参数不一定，所以我们不应该写死，因此我们容易可以想到利用函数中的 arguments 类数组来实现不定参的累加。

```javascript
function add() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
}
```

&emsp;&emsp; 到这里我们应该可以想到这一个函数的返回值必须也是一个函数，才能在函数调用之后继续调用。返回的这个函数是干嘛的呢，我们应该也容易想到干的事是跟上一次调用是一样的事情。

```javascript
function add() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return function () {
    var _sum = 0;
    for (var j = 0; j < arguments.length; j++) {
      _sum += arguments[j];
    }
  };
}
```

&emsp;&emsp; 那这个函数要怎么出结果呢？我们从第一次调用开始入手，既然这一个函数的返回值也是一个函数，那么我们怎么得到我们想要的第一次 的结果。这时候函数的 toString()方法会自动调用，我们可以通过重写 toString()方法来改变其返回结果。但是由于我们返回的函数是一个匿名函数，无法重写其 toString()方法，因此我们可以有下面操作。

```javascript
function add() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  function _add() {
    var _sum = 0;
    for (var j = 0; j < arguments.length; j++) {
      _sum += arguments[j];
    }
  }
  _add.toString = function () {
    return sum;
  };
  return _add;
}
```

&emsp;&emsp; 上面的方法已经能够得到我们第一次调用想要的结果，接下来我们只需要递归重复实现以上操作则可以实现我们的需求。则在第二次调用的时候返回前两次相加的结果即为 sum + \_sum。反复进行自身调用当最后返回值为函数时停止。

```javascript
function add() {
  // 得到第一次调用的和
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  function _add() {
    // 得到第二次调用的和
    var _sum = 0;
    for (var j = 0; j < arguments.length; j++) {
      _sum += arguments[j];
    }
    return add(sum + _sum); // 递归调用
  }
  // 返回结果
  _add.toString = function () {
    return sum;
  };
  return _add;
}
```

# 2020-08-06

### 京东校招前端笔试

- 正则表达式
- JS 特点
- 双重散列探查法 (hi=(h(key)+di)%m 1≤i≤m-1)
- http 状态码
- http 请求头格式
- && 和 || 运算符
- 二叉树
- http 与 https 的区别
- 连通图
- 时间复杂度
- 顺序查找算法
- 项目工程中的 package.json 文件
- overflow
- setInterval
- linux 中文件权限-rwxr--rw-
- DOM 对象模型(第二层)
- HTML 中的链接
- CSS 样式优先级
- 求和函数
- 最长公共子序列

# 2020-08-07

### 什么是 HTTP

##### 超文本传输协议(Hypertext Transfer Protocol)

**1.超文本(Hypertext)**

&emsp;&emsp; 在以前我们无法和别的电脑进行交互的时候，我们的数据信息只能保存在本地，通常是以**文本**这种简单的形式存在。而文本是一种能够被计算机解析的有意义的**二进制数据包**随着发展，当两台电脑能够进行数据传输交互的时候，人们不满足于简单的文字传输，也就有了后面的图片、音频、视频或者点击文字或者图片会进行**超链接**的跳转，这个时候扩大后语义的文本也就成为了现在的**超文本**。

**2.传输(Transfer)**:包括超文本

&emsp;&emsp;由**传输载体**(例如电话线、光缆)负责把生成的**二进制数据包**由一个计算机终端传输到另一个计算机终端的过程，可以称为**传输**。
&emsp;&emsp;通常我们把传输数据包的一方称为**请求方**，接收数据包的一方称为**应答方**。当然请求方也可以作为应答方接受数据，应答方可以作为请求方发送数据。

**3.协议(Protocol)**:包括传输和超文本

&emsp;&emsp;协议的前提条件必须是一个多人约定，自己跟自己的约定不属于协议。
&emsp;&emsp;那么**网络协议**是什么?
&emsp;&emsp;网络协议就是网络中(包括互联网)传递、管理信息的一些规范。计算机的相互通信需要共同遵守一定的规则，那么这些规则就叫做**网络协议**。

简单总结之后，我们可以理解**HTTP 是计算机里用于两点之间传输超文本数据的约定和协议**

### 与 HTTP 相关的组件

#### 网络模型

&emsp;&emsp;为了给网络协议的设计提供一个结构，网络设计者以**分层(layer)**的方式组织协议。每一层都是向它的上一层**提供服务(service)**，即所谓的**服务模型(service)**。每个分层中所有的协议称为**协议栈(protocol stack)**。**因特网**的**协议栈**由五个部分组成：**物理层**、**链路层**、**网络层**、**运输层**和**应用层**。

##### 应用层

&emsp;&emsp;应用层是网络应用程序和网络协议存放的分层，因特网的应用层包括许多协议，例如我们学 web 离不开的**HTTP**，电子邮件传送协议**SMTP**、端系统文件上传协议**FTP**、还有为我们进行域名解析的**DNS**协议。应用层协议分布在多个端系统上，一个端系统应用程序与另外一个端系统应用程序交换信息分组，我们把位于应用层的信息分组称为**报文(message)**。

##### 运输层

&emsp;&emsp;因特网的运输层在应用程序断电之间传送应用程序报文，在这一层主要有两种传输协议**TCP**和**UDP**，利用这两者中的任何一个都能够传输报文，不过这两种协议有巨大的不同。

&emsp;&emsp;TCP 向它的应用程序提供了**面向连接**的服务，它能够控制并确认报文是否到达，并提供了拥塞机制来控制网络传输，因此当网络拥塞时，会抑制其传输速率。

&emsp;&emsp;UDP 协议向它的应用程序提供了**无连接**服务。它不具备可靠性的特征，没有流量控制，也没有拥塞控制。我们把运输层的分组称为**报文段**(segment)。

##### 网络层

&emsp;&emsp;因特网的网络层负责将称为**数据报**(datagram)的网络分层从一台主机移动到另一台主机。网络层一个非常重要的协议是 IP 协议，所有具有网络层的因特网组件都必须运行 IP 协议，IP 协议是一种网际协议，除了**IP 协议**外，网络层还包括其他一些网际协议和路由选择协议，一般把网络层就称为 IP 层，由此可知 IP 协议的重要性。

##### 链路层

&emsp;&emsp;现在我们有了应用程序通信的协议，有了给应用程序提供运输的协议，还有了用于约定发送位置的 IP 协议，那么如何才能真正的发送数据呢？为了将分组从一个节点(主机或路由器)运输到另一个节点。网络层必须依靠链路层提供服务。**链路层**的例子包括**以太网、WIFI 和电缆**接入的**DOCSIS 协议**，因为数据从源目的地传送通常需要经过几条链路，一个数据包可能被沿途不同的链路层协议处理，我们把链路层的分组称为**帧**(frame)

##### 物理层

&emsp;&emsp;虽然链路层的作用是将帧从一个端系统运输到另一个端系统，而物理层的作用是将帧中的一个个**比特**从一个节点运输到另一个节点，物理层的协议仍然使用链路层协议，这些协议与实习的物理传输介质有关，例如，**以太网**有很多物理层协议：**关于双绞铜线、关于同轴电缆、关于光纤**等等。

**五层网络的示意图如下**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810095133188.jpg#pic_center)

#### OSI 模型

&emsp;&emsp;我们上面讨论的**计算机网络协议模型**不是唯一的协议栈，**ISO(国际标准化组织)**提出来计算机网络应该按照 7 层来组织，那么 7 层网络协议栈与 5 层的区别在哪里？
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810095538778.jpg#pic_center)
&emsp;&emsp;容易看出，OSI 模型要比网络模型多了**表示层**和**会话层**，其他层基本一致。**表示层**主要包括**数据压缩**和**数据加密**以及**数据描述**，数据描述使得应用程序不必担心计算机内部存储格式的问题，而**会话层**提供了**数据交换的定界**和**同步功能**，包括**建立检查点**和**恢复方案**。

#### 浏览器

&emsp;&emsp;就如同**各大邮箱**使用**电子邮件传送协议 SMTP**一样，**浏览器是使用 HTTP 协议的主要载体**。浏览器正式的名字叫做 Web Broser，顾名思义，就是**检索、查看互联网上网页资源的应用程序**，名字里的 Web，实际上指的就是 World Wide Web，也就是万维网。

&emsp;&emsp;我们在**地址栏**输入**URL**(即网址)，**浏览器**会向**DNS**(域名服务器)**提供网址**，由它来**完成 URL 到 IP 地址的映射**。然后将**请求你的请求提交给具体的服务器**，再由**服务器返回我们想要的结果**(以 HTML 编码格式返回给浏览器)，**浏览器执行 HTML 编码，将结果显示在浏览器的正文**。这就是一个**浏览器发送请求**和**接受响应**的过程。

#### Web 服务器

&emsp;&emsp;Web 服务器的正式名称叫做**Web Server**，Web 服务器一般指的是**网站服务器**，上面说到**浏览器是 HTTP 请求的发起方**，那么**Web 服务器就是 HTTP 请求的应答方**，Web 服务器可以向浏览器等 Web 客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的**三个+Web 服务器**是**Apache**、**Nginx**、**IIS**。

#### CDN

&emsp;&emsp;CDN 的全称是**Content Delivery Network**，即**内容分发网络**，它**应用了 HTTP 协议里的缓存和代理技术**，**代替源站响应客户端的请求**。CDN 是**构建在现有网络基础之上的网络**，它**依靠部署在各地的边缘服务器** ，通过**中心平台**的**负载均衡**、**内容分发**、**调度**等功能模块，使用户**就近获取所需内容**，**降低网络阻塞**，**提高用户访问响应速度**和**命中率**。CDN 的关键技术主要有**内容存储**和**分发技术**。

#### WAF

&emsp;&emsp;WAF 是一种**Web 应用程序防护系统**(Web Application Firewall，简称 WAF)，它是一种通过执行一系列针对**HTTP/HTTPS 安全策略**来专门为 Web 应用提供保护的一款产品，它是**应用层面的防火墙**，专门**检测 HTTP 流量**，是防护 Web 应用的**安全技术**。
&emsp;&emsp;WAF 通过位于 Web 服务器之前，可以**阻止如 SQL 注入**、**跨站脚本等攻击**，目前应用较多的一个开源项目是 ModSecurity，它能够完全集成进 Apache 或 Nginx

#### HTML

&emsp;&emsp;HTML 称为**超文本标记语言**，是一种**标识性**的语言，它包括一系列标签，通过这些标签可以将网络上的文档格式统一，使分散的 Internet 资料连接为一个逻辑整体。HTML 文本是由 HTML 命令组成的**描述性文本**，HTML 命令可以说明文字，图形、动画、声音、表格、链接等。

#### Web 页面构成

&emsp;&emsp;Web 页面(Web page)也叫做文档，是由**一个个对象组成**的。**一个对象(Object)只是一个文件**，比如一个 HTML 文件、一个 JPEG 图形、一个 Java 小程序或一个视频片段，它们在网络中可以通过**URL 地址寻址**。多数的 Web 页面含有一个 HTML 基本文件以及几个引用对象。

### 与 HTTP 相关的协议

&emsp;&emsp;在互联网中，任何协议都**不会单独**的完成**信息交换**，HTTP 也一样。虽然 HTTP 属于**应用层的协议**，但是它仍然**需要其他层次协议的配合完成信息的交换**，那么在**完成一次 HTTP 请求和响应**的过程中，需要哪些协议的配合。

#### TCP/IP

&emsp;&emsp;TCP/IP 协议你一定听过，TCP/IP 我们一般称之为**协议簇**，什么意思呢？就是**TCP/IP 协议簇**中不仅仅只有 TCP 协议和 IP 协议，它是**一系列网络通信协议的统称**。而其中最核心的两个协议就是 TCP/IP 协议，其他的还有 UDP、ICMP、ARP 等等，共同构成了一个复杂但有层次的协议栈。

&emsp;&emsp;**TCP 协议**的全称是 Transmission Control Protocol 的缩写，意思是**传输控制协议**，HTTP 使用 TCP 作为通信协议，这是因为 TCP 是一种**可靠的协议**，而可靠能**保证数据不丢失**。

&emsp;&emsp;**IP 协议**的全称 Internet Protocol 的缩写，它主要解决的是**通信双方寻址的问题**。IP 协议使用**IP 地址来标识互联网上的每一台计算机**，可以把 IP 地址想象成为你手机的电话号码，你要与他人通话必须先要知道他人的手机号码，**计算机网络中信息交换必须先要知道对方的 IP 地址**。

#### DNS

&emsp;&emsp;计算机网络中的每个端系统都有一个 IP 地址存在，而把**IP 地址**转换为**便于人类记忆的协议**就是**DNS 协议**。

&emsp;&emsp;**DNS**的全称是**域名系统**(Domain Name System，缩写：DNS)，它作为将域名和 IP 地址相互映射的一个**分布式数据库**，能够使人更方便地访问互联网。

#### URI / URL

&emsp;&emsp;例如我们可以通过输出百度地址来访问百度，那么这个地址我们是可以随便输入吗？还是说有什么规定。我们输入的**地址格式**必须要满足**URI**的规范。

&emsp;&emsp;**URI**的全称是(Uniform Resource Identifier)，中文名称是统一资源标识符，使用它就能够唯一地标记互联网上资源。

&emsp;&emsp;**URL**的全称是(Uniform Resource Locator)，中文名称是统一资源定位符，也就是我们俗称的网址，它实际上是 URI 的一个子集。

&emsp;&emsp;URI 不仅包括 URL，还包括 URN(统一资源名称)，它们之间的关系如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810161646134.jpg#pic_center)

#### HTTPS

HTTP 一般是明文传输，很容易被攻击者窃取重要信息，鉴于此，就有了 HTTPS。HTTPS 的全称为(Hyper Text Transfer Protocol over SecureSocket Layer)，它和 HTTP 有很大的不同在于**HTTPS 是以安全为目标的 HTTP 通道**，在 HTTP 的基础上通过**传输加密**和**身份认证**保证了传输过程的**安全性**。HTTPS 在 HTTP 的基础上增加了**SSL 层**，也就是说**HTTPS = HTTP + SSL**。

# 2020-08-08

### 跟谁学、网易校招笔试

- HTML5 不支持哪个元素
- table 表格中的 rowspan colspan
- TCP 和 UDP
- 获取元素属性值
- 二叉树 最大高度 之类的
- BFC
- nth-of-type
- 修改哪些属性会导致回流
- 元素节点的获取
- 前端性能优化 合并文件 雪碧图 将样式表写在头部
- 查看本地所有分支的命令 （git branch
- 五层网络模型
- http 状态码
- 浏览器缓存的两种方式
- 浏览器的重绘和重排 改变元素背景颜色会造成什么
- '' a.b.c'' .replace(/(.)\.(.)\.(.)/, '2.2.1.\$0') 的执行结果
- 优雅降级和渐进增强
- 计算 css 选择器权重
- ++ 和 - -
- es5 实现深克隆
- arr:[2,7,11,5] target:9 return [0, 1] 力扣算法第一题

```javascript
// 如果某个单词出现在单词总数中概率大于1%的话,则为合格,求合格单词数量
// 第一行表示单词总数 接下来的每一行为一个单词
// 输入
// 5
// I
// I
// am
// a
// boy

// 输出
// 4
```

```javascript
// 问最多有多少种方法可以排出E M H的组合
// E EM M MH H
// 输入 2 2 1 2 2 (表示有2个E,2个EM,1个M ~~)
// 输出 3          (表示最多有三种情况)
// E + EM + H
// EM + M + MH
// E + MH + H
```

```javascript
// 若A -> B，B -> C,则会有A -> C的关系 求存在多少种相互关系例如(A -> B B -> A) 那么A B 之间就有相互关系
// 第一行的5代表人的个数例如A B C D E, 6代表 存在6种单向关系
// 第二行开始为单向关系
// 输入
// 5 6
// 1 3
// 3 2
// 2 1
// 3 5
// 5 4
// 4 5

// 输出
// 4

// 一共有(1和3 1和2 2和3 4和5)
```

```javascript
// 有一块2 * n的地砖 和足够多的1 * 2 和 2 * 3可以旋转的地毯 不能重叠空隙贴满 有多少种不同的的放案
// 4  T组数据 接下来的每一行为当前的n
// 1
// 2
// 3
// 5

// 1  从上面的第二行开始对应
// 2
// 4
// 13
```

# 2020-08-09

### 浅谈 this 指向

1.函数是否在 new 中调用,如果是的话 this 指向的是新创建的对象。

```javascript
var obj = new foo();  this -> obj
```

2.函数是否通过 call、apply 绑定,或者通过 bind 硬绑定调用，如果是的话，this 绑定的是制定的对象。

```javascript
foo.call(obj1);   this -> obj1
```

3.函数是否在某个上下文对象中调用，如果是的话，this 指向的是那个上下文对象。

```javascript
bar.foo()     this -> bar
```

4.如果都不是的话，使用默认绑定。在严格模式下，就绑定到 undefined，否则绑定到全局。

```javascript
foo();
'use strict': this -> undefined
否则： this-> window
```

# 2020-08-10

### 聊聊创建对象的几种方式

##### 1.Object 构造函数

```javascript
var obj = new Object();
obj.name = "Lgowen";
obj.age = 21;
console.log(obj);
// { name: "Lgowen", age: 21 }
```

##### 2.对象字面量

```javascript
var person = {
  name: "Lgowen",
  age: 21,
};
console.log(person);
// { name: "Lgowen", age: 21 }
```

##### 3.工厂模式

```javascript
function createPerson(name, age) {
  var person = new Object();
  person.name = name;
  person.age = age;
  return person;
}
console.log(createPerson("Lgowen", 21));
// { name: "Lgowen", age: 21 }
```

##### 4.自定义构造函数

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log(this.name);
  };
}
var person = new Person("Lgowen", 21);
console.log(person);
// { name: 'Lgowen', age: 21, sayName: [Function] }
```

##### 5.原型模式

```javascript
function Person() {}
Person.prototype.name = "Lgowen";
Person.prototype.age = 21;

var person = new Person();
console.log(person); //   {}
console.log(person.name); //   "Lgowen"
console.log(person.age); //   21
```

##### 6.组合使用构造函数和原型模式

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
var person1 = new Person("Lgowen", 21);
var person2 = new Person("Clares", 88);

console.log(person1.name, person2.name); // "Lgowen" "Chares"
console.log(person1.age, person2.age); // 21 88
console.log(person1.sayName(), person2.sayName()); // "Lgowen" "Chares"
```

##### 7.动态原型模式

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;

  // 当这个实例身上没有 sayName()方法时 , 给其构造函数的原型上添加 sayName()方法
  if (typeof (this.sayName !== "function")) {
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
  }
}
var person = new Person("Lgowen", 21);
console.log(person); // { name: "Lgowen", age: 21}
console.log(person.sayName()); //  "Lgowen"
```

##### 8.寄生构造函数模式

```javascript
function Person(name, age) {
  var person = new Object();
  person.name = name;
  person.age = age;
  return person; //通过重写构造函数的返回值
}
var person = new Person("Lgowen", 21);
console.log(person); //  { name: "Lgowen", age: 21}
```

##### 9.稳妥构造函数模式

```javascript
function Person(name, age) {
  var person = new Object();

  person.sayName = function () {
    console.log(name);
  };

  return person;
}
//返回的person对象除了通过sayName()方法去访问name外,没有别的访问可以访问或修改.
var person = Person("Lgowen");
person.sayName(); // "Lgowen"
```

# 2020-08-11

### vuex

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

- state(相当于组件中的 data)

- getters(相当于组件中的 computed)

- mutations(相当于组件中的 methods)

- actions(需要进行异步操作的 method)

- modules(模块)

你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

### Vue 生命周期中的 created 和 mounted

##### created:

这个时候实例已经创建完成,数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。但是\$el 属性还没有挂载，即用不到具体的 DOM。

##### mounted：

这个时候实例已经被挂载了，这时 el 被新创建的 vm.el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.el 也在文档内,数据和 DOM 都已被渲染出来.
注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.\$nextTick。

**nextTick()**：
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```javascript
var vm = new Vue({
  el: "#example",
  data: {
    message: "123",
  },
});
vm.message = "new message"; // 更改数据
vm.$el.textContent === "new message"; // false
Vue.nextTick(function () {
  vm.$el.textContent === "new message"; // true
});
```

为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

### Vue 中 v-for 中的 key

我们在使用 v-for，都推荐给使用的元素或者组件加上一个:key，但是为什么需要加这一个属性呢，简单的来说就是为了高效的更新虚拟 DOM。(涉及到 diff 算法以及数据结构中的链表)

我们绑定的这个 key 是需要跟我们当前元素是一一对应的，要是将这个 key 值绑定为当前元素下标时即 index，当我们 v-for 遍历的列表中元素发生改变时，相对应的 index 也会发生改变，则没有一一对应了。

没有绑定 key 时的数据，比如：

```javascript
v-for遍历的是["A","B","C","D","E"]
// 在没有key值的情况下(从头开始对应)
比如说：
0 -> A
1 -> B
2 -> C
3 -> D
4 -> E
```

当我们想在 B 跟 C 之间加入一个 F 时,我们理想中的操作是直接在之前一一对应的情况下找到 B 跟 C 然后在其中间加入一个 F，在绑定 key 值的情况下就会直接这么操作了。

```javascript
0 -> A
1 -> B
5 -> F
2 -> C
3 -> D
4 -> E
```

但实际上

```javascript
0 -> A
1 -> B
2 -> F
3 -> C
4 -> D
5 -> E
```

也就是说会先把放置 C 的位置替换成 F，D 的位置替换成 C，然后再添加一个 E，性能就没有这么好。如果将 key 值绑定为 index 索引的话，那么在数据源改变时，它们将不会像没有改变的时候那样一一对应。

# 2020-08-12

### 京东校招前端一面(秒挂)

- 自我介绍(简单的提了一下自己的项目及学习过程)
- 从项目开始聊起
- 提到小程序用户的登录验证，跳转页面，数据更新(这些没有没有回去巩固一遍项目啥都不记得了害)
- h5 c3 讲一下有什么新特性 有用过什么
- flex 布局
- cookie session Web Storage
- 自己项目中为什么选择用 Web Storage 而不用 cookie
- 浏览器缓存机制(啥也不会，寻思着网络是硬伤)
- 有没有用过 git 常用命令

# 2020-08-13

### promise 经典题

```javascript
let p = new Promise((resolve) => {
  console.log(4); // 首先执行创建promise实例中的除回调外的代码
  resolve(5); // 成功的回调
});
function fn1() {
  console.log(1);
}
function fn2() {
  setTimeout(() => {
    console.log(2); //
  }, 0);
  fn1(); // 执行fn1函数 打印1
  console.log(3); // 打印3
  p.then((res) => {
    console.log(res); // 在这里打印成功回调的值5
  }).then(() => {
    console.log(6); //  打印6
  });
}
fn2(); //执行fn2函数
// 4 1 3 5 6 2
```

# 2020-08-14

### flex 布局

如下有这样的布局，我们可以给外层盒子添加 display:flex 属性。

```html
<div class="box">
  <div class="a">1</div>
  <div class="b">2</div>
  <div class="c">3</div>
  <div class="d">4</div>
</div>
```

```css
.box {
  width: 100%;
  background-color: lightblue;
  display: flex; /* 将父元素设置为弹性布局*/
  flex-direction: row;
}
.box div {
  width: 200px;
  height: 200px;
  font-size: 32px;
  text-align: center;
  line-height: 200px;
}
.a {
  background-color: #f00;
}
.b {
  background-color: #0f0;
}
.c {
  background-color: #00f;
}
.d {
  background-color: #ff0;
}
```

##### flex-direction

- row：默认值。设置子元素按顺序从左到右水平排列，相当于元素左浮动，但不影响文档流。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816165410853.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

- row-reverse：设置子元素按顺序从右到左水平排列，相当于元素右浮动，但不影响文档流。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081616555398.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

- column：设置子元素按顺序从上到下垂直排列。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816165736861.png#pic_center)

- column-reverse：设置子元素按顺序从下到上垂直排列。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816165826792.png#pic_center)

##### flex-wrap

```html
<div class="box">
  <div class="a">1</div>
  <div class="b">2</div>
  <div class="c">3</div>
  <div class="d">4</div>
  <div class="a">5</div>
  <div class="b">6</div>
  <div class="c">7</div>
  <div class="d">8</div>
</div>
```

```css
.box {
  width: 75%;
  background-color: lightblue;
  display: flex; /* 将父元素设置为弹性布局*/
  flex-wrap: nowrap;
}
.box div {
  width: 200px;
  height: 200px;
  font-size: 32px;
  text-align: center;
  line-height: 200px;
}
.a {
  background-color: #f00;
}
.b {
  background-color: #0f0;
}
.c {
  background-color: #00f;
}
.d {
  background-color: #ff0;
}
```

- nowrap：默认值。设置子元素不换行显示，当子元素总宽度大于父元素宽度时，则会以父元素宽度平分给每一个子元素，从而覆盖掉子元素本身的宽度。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816170418524.png#pic_center)

- wrap：设置子元素换行显示，当子元素总宽度大于父元素宽度时,则会将子元素换行显示。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816170720766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

- wrap-reverse：设置子元素换行显示，且以将第一行从下方开始显示。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816170915358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

##### flex-flow : flex-direction 和 flex-wrap 的复合属性简写形式，第一个值为 flex-direction 属性，第二个值为 flex-wrap 属性

例如 flex-flow：row-reverse wrap
设置子元素从右到左水平排列，且换行显示。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816171224794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

##### justify-content：

子元素如果是水平方向排列的话，它作用于水平方向。
子元素如果是垂直方向排列的话，它作用于垂直方向。

```html
<div class="box">
  <div class="a">1</div>
  <div class="b">2</div>
</div>
```

```css
.box {
  width: 100%;
  background-color: lightblue;
  height: 600px;
  display: flex; /* 将父元素设置为弹性布局*/
  flex-direction: row;
  justify-content: flex-start;
}
.box div {
  width: 200px;
  height: 200px;
  font-size: 32px;
  text-align: center;
  line-height: 200px;
}
.a {
  background-color: #f00;
}
.b {
  background-color: #0f0;
}
```

- flex-start：默认值。设置子元素位于父元素水平(垂直)方向上的左边(上边)。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816172407415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081617262431.png#pic_center)

- flex-end：设置子元素位于父元素水平(垂直)方向上的的右边(下边)。
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816172652729.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816172826839.png#pic_center)

- center：设置子元素要是水平方向则为水平居中，垂直方向则为垂直居中。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816173134590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816173151913.png#pic_center)

- space-between：设置子元素之间的间距相同。且两边与父元素没有间距。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816173400820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

- space-around：设置子元素之间的间距相同，且两边与父元素有相同的间距。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816173436229.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

##### align-item

子元素如果是水平方向排列的话，它作用于垂直方向
子元素如果是垂直方向排列的话，它作用于水平方向

- flex-start：设置子元素位于子元素位于父元素的垂直方向上方位置。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174326359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174403207.png#pic_center)

- flex-end：
  设置子元素位于父元素的垂直方向下方位置(水平排列)。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174506204.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
  设置子元素位于父元素的水平方向右方位置(垂直排列)。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174537686.png#pic_center)

- center：
  设置子元素居中显示，如果水平排列则垂直居中显示。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174737308.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

设置子元素居中显示，如果垂直排列则水平居中显示。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816174722722.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

##### 三栏布局

```html
<div class="box">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```

```css
.box {
  margin: 0 auto;
  width: 300px;
  height: 50px;
  display: flex;
}
.left,
.right {
  width: 60px;
  background-color: blue;
}
.center {
  background-color: red;
  flex: 1; /* 给子元素设置flex属性为1表示剩余空间给其撑满 */
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816175336450.png#pic_center)

# 2020-08-15

### 多益网络、科大讯飞笔试

- promise
- function \*
- 定时器
- 对象中的 ValueOf()和 toString()
- ==
- 实现渲染模板
- 解决 span 标签之间有空格的方法
- 说一下前端路由
- 找出字符串中出现次数最多且记录出现的位置
- 闭包、立即实行函数、作用域
- 字符串左移
- 一个数的 2 进制里有多少个 1
- n \* m 矩阵里不同行的最大相乘数
- 反正考了很多很多基础啦 我都忘了 基础扎实很重要

# 2020-08-16

### valueOf()和 toString()

```javascript
var arr = [];
var obj = {};
console.log(arr.toString()); //  ""   返回值是空字符串
console.log(arr.valueOf()); //  []   返回值是数组本身
console.log(obj.toString()); //  "[object Object]"
console.log(obj.valueOf()); //  {}   返回值是对象本身
```

# 2020-08-17

### 前端跨域

一次 http 请求对应一个页面
浏览器的同源策略。默认情况下，js 在发送 ajax 请求的时候，url 的域名必须和当前页面完全一致。
域名要相同：www.example.com和example.com不同
协议要相同：http 协议和 https 协议不同
端口号要相同：:80 和:8080 不同

前端跨域 flash 发送 http 请求，可以绕过浏览器的安全限制，必须安装 flash，并且和 flash 交互。

在同源域名下设置一个代理服务器，通过 js 发送请求给这个代理服务器，再从这个代理服务器上拿到相应结果。麻烦之处需要在服务器端额外做开发。

jsonp，只能用 get 请求，并且要求返回 js。这个方式利用了浏览器允许跨域引用 js 资源

cors：如果浏览器支持 h5，cross-origin resource sharing
Origin 表示本域，当 js 向外域发起请求后，浏览器收到响应后，首先检查 Access-Control-Allow-Origin 是否包含本域，如果有，则跨域请求成功，如果没有，则请求失败。

跨域能否成功，取决于对方服务器是否愿意给我设置一个正确的 Access-Control-Allow-Origin

简单请求： GET POST（Content-Type 类型仅限 application/x-www-form-urlencoded、multipart/foem-data 和 text/plain）HEAD ，并且不能出现任何自定义头。

在引用外域资源时，除了 js 和 css 外，都要验证 cors。例如引入三方 CDN 字体文件。

# 2020-08-18

### 从浏览器输入 url 地址到渲染页面

1.  首先输入你要访问的 url 地址。
2.  浏览器会根据你访问的地址判断是否有该地址的浏览器缓存,如果有则直接显示缓存内容,如果没有则需要请求获取资源。
3.  解析域名网址的时候，在发送请求最开始的时候，dns 解析会把www.baidu.com解析出一个ip地址。
4.  解析完成后，浏览器向这个 ip 地址对应的服务器建立 tcp 链接,链接的时候先通过三次握手，保证本次链接的安全性，这一次与服务器建立可靠的链接。
5.  建立完链接之后向服务器发送 http 请求,服务器会根据你的请求，响应给你一些资源。
6.  拿到资源之后有四次挥手，断开这个链接。然后拿回这个资源到浏览器，然后浏览器可以根据这些资源渲染出页面。

为什么要四次挥手：资源请求完成，链接没有用，连接一直保持着不安全，有可能会受到别的请求的攻击，所以请求完资源最好断开。

# 2020-08-19

### Promise

参考阮一峰 ES6 教程[https://es6.ruanyifeng.com/#docs/promise](https://es6.ruanyifeng.com/#docs/promise)

所谓 Promise，简单说就是一个**容器**，里面**保存**着某个**未来**才会**结束的事件（通常是一个异步操作）的结果**。

Promise 对象的**状态不受外界影响**。代表一个异步操作，它有三种状态：**pending**(进行中)、**fulfilled**(已成功)和**rejected**(已失败)。

只有异步操作的结果才可以决定当前的状态。而且状态一旦改变，就不会再变。从 pending 变为 fulfilled 或 pending 变为 fulfilled。

Promise 对象可以**将异步操作以同步操作的流程表达**出来，但是它也有缺点。

1.  无法取消,一旦新建它就会立即执行，无法中途取消。
2.  如果不设置回调函数，内部抛出的错误不会反应到外部。
3.  当处于 pending 状态时，无法知道当前进展到哪一个阶段。

一般怎么用呢。ES6 规定 Promise 是一个构造函数，用来生成 Promise 实例。

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done");
    // 这里第一个参数以promise的成功回调函数作为回调函数
    // 第二个参数以timeout形参的方式进行传值，表示这个时间过后执行(前提是等js主线程同步任务执行完)
    // 第三个参数'done'是作为回调函数的参数,在这里也就是resolve函数的参数,相当于resolve('done'),将Promise对象的状态从'未完成'变为'完成'
  });
}
timeout(100).then((value) => {
  //then方法这里使用了第一个回调函数:即Promise对象的状态变为resolved时执行的函数
  // 打印的结果即为上面传的'done'
  console.log(value); //    'done'
});
```

# 2020-08-20

### 4399 笔试

- 二叉树
- CDN
- XHR 对象
- 重绘重排及优化
- 三栏布局
- HTTP 缺点及改善方法
- 编程抽奖函数挺复杂的
- 函数声明和函数表达式
- jq 选择器
- vue3.0 与 vue2.0 的区别，及其各自特点
- html5 废除的标签
- css 选择器
- 具体想不起来了哈哈哈真的忘了太多了 没有及时记下来
- 闭包
- 作用域
- 原型
- 主要还是前端基础知识多
- 最后还有聊自己人生的论述题。惊呆了。

# 2020-08-21

### 滴滴笔试

- 进程
- IPV4 和 IPV6
- 内存管理
- 贝叶斯算法
- 欧几里得算法
- H5 写摇一摇的方法
- 栈
- 益智类题目
- H5 废除标签
- jq 选择器
- 两数求和编程( 一个正整数 n（100<n<2000,第一行输出有多少对满足要求的数字,接下来每一行输出一对 abc 和 acc，以空格分隔。如果没有一对 abc 和 acc 的话，则直接输出 0 即可。如果有多对，请按照 abc 升序的次序输出。)

```javascript
// 我自己暴力求解的100%通过
var arr = [];
arr.push([123, 456], [985, 211], [365, 654]);
console.log(arr[0][0]);
console.log(arr[0][1]);

console.log(
  arr.sort(function (a, b) {
    return a[0] - b[0];
  })
);
console.log(arr);

const n = readInt();
var arr = [];
var count = 0;
for (var a = 1; a <= 9; a++) {
  for (var b = 0; b <= 9; b++) {
    for (var c = 0; c <= 9; c++) {
      if (a !== b && a !== c && b !== c) {
        var abc = a * 100 + b * 10 + c;
        var acc = a * 100 + c * 10 + c;
        if (abc + acc === n) {
          arr.push([abc, acc]);
          count++;
        }
      }
    }
  }
}
if (count === 0) {
  print(count);
} else {
  arr.sort(function (a, b) {
    return a[0] - b[0];
  });
  print(count);
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i][0] + " " + arr[i][1]);
  }
  for (var j = 0; j < newArr.length; j++) {
    print(newArr[j]);
  }
}
```

- 求排名(一年一度的 X 星人田径运动会隆重开幕。小小 X 报名参加了跳跃比赛，这可是小小 X 最擅长的项目！
  跳跃比赛分为两轮，一轮是跳高，一轮是跳远。
  最终成绩将综合两轮比赛的成绩来确定，并且两轮比赛成绩在最终成绩的计算中各占一半权重。
  现在已经知道小小 X 在跳高和跳远两轮比赛中分别的排名情况，
  现在请你编写一个程序帮小小 X 计算一下在最终成绩排名中小小 X 可以获得的最好名次和最差名次。)

```javascript
// 没有写完 现在回想起来还是感觉会有bug
var heightArr = ["A", "B", "C", "D", "E", "F", "X", "H", "I", "J"];
var hIndex = heightArr.findIndex(function (i) {
  return i === "X";
});
// console.log(hIndex);
var longArr = ["A", "C", "I", "X", "E", "F", "J", "H", "D", "B"];
var lIndex = longArr.findIndex(function (i) {
  return i == "X";
});
var arr = [];
for (let i = 0; i < hIndex; i++) {
  for (let j = 0; j < lIndex; j++) {
    if (heightArr[i] === longArr[j]) {
      arr.push(heightArr[i]);
    }
  }
}
var arr1 = [];
for (let i = hIndex + 1; i < heightArr.length; i++) {
  for (let j = lIndex + 1; j < longArr.length; j++) {
    if (heightArr[i] === longArr[j]) {
      arr1.push(heightArr[i]);
    }
  }
}
console.log(arr);
// console.log(heightArr.findIndex( i => {
//     return arr[arr.length - 1] === i
// }));
var p =
  heightArr.findIndex((i) => {
    return arr[arr.length - 1] === i;
  }) + 1;
console.log(arr1);
```

# 2020-08-22

### js 中的同步任务和异步任务的执行机制

说到 js 我们可以容易想到 js 是单线程的，也就是说一般情况下按代码顺序来执行代码，所以是在执行同步任务。但是我们在页面渲染的时候，要是整段代码都是在同步执行的话，那么可能会出现页面加载到某个资源的时候卡的死死的，因为要等到这个资源被拿请求下来，才会继续下面的渲染，这样大大的影响了用户的体验。
因此我们有了异步编程。
常见的异步任务有定时器，发送 ajax 请求，promise。
首先上一段代码吧。

```javascript
console.log(1);
setTimeout( funciton() {
     console.log(2);
},0)
console.log(3);
```

按照我们正常的理解，js 是单线程语言，所以执行顺序就应该是按照代码执行正常输出 1 2 3 。但事实上却是 1 3 2。并且我们设置定时器的时间为 0ms，为什么还是会先执行后面的代码呢?

是因为在 js 的执行机制中，存在着同步任务与异步任务的不同执行场所，同步任务在主线程中按顺序执行，异步任务先将任务放入 Event table 事件列表，并将其回调函数注册进 Event Queue 事件队列中，等待主线程执行完毕调用。当主线程中的同步任务执行完毕后，由于 js 引擎中存在 monitoring process 进程，会持续的不断检查主线程执行栈是否为空，一旦为空就会去事件队列中去检查是否有等待被调用的函数(即异步任务中的回调函数)。然后会重复上述过程，即 Event Loop 事件循环。

除了同步任务和异步任务。对于任务还有更加细致的划分。
宏任务和微任务。
宏任务一般包括整体代码 script、setTImeout、setInterval。
微任务一般包括 Promise，process.nextTick(callback)。
在从整体代码 script 进入每一次的事件循环中，在执行完主线程所有的同步任务后，会首先从事件队列中寻找微任务队列，在所有微任务队列执行完毕后，再去顺序执行每一个宏任务，但是在宏任务中又可能存在着另外的事件循环，因此会重复上述的步骤，直到所有的宏任务执行完毕。

# 2020-08-23

### 腾讯笔试

- 字符串截取(42%)
- 次数最少得到合适水温(没思路)
- 操作 dom(有思路没写出来)
- 实现栈(100%)
- 正则匹配合法的颜色值

# 2020-08-24

### toString()和 praseInt()

我们平常所理解的 toString 方法和 parseInt 方法常用于转换为字符串格式和转换为整型数字类型。

```javascript
var num = 123;
console.log(num.toString()); // "123"
```

上述代码是将一个普通的 Number 类型的数字转换为 String 类型的数字

```javascript
var num = 123.123;
var num2 = "123a";
parseInt(num); // 123
parseInt(num2); // 123
```

即会截断非数字前的部分并转换为 Number 类型输出。
但我们可能还忽略了它们还会有别的用法，而且有时候还挺实用。

```javascript
parseInt(101, 2); // 将101看作2进制的数字转换成10进制的数字
var num = 123;
num.toString(2); // 将num看作10进制的数字转换成2进制的字符串类型数字
```

# 2020-08-25

### 完美世界笔试

- 异步
- HTML 元元素
- 块级元素
- 跨域
- CSS 层级
- CSS 继承属性
- Ajax

```javascript
// 0:请求未初始化(还没有调用open())
// 1:请求已经建立,但是还没有发送(还没有调用send())
// 2:请求已经发送(已经调用了send())
// 3:请求正在处理中,正在接收服务器响应的数据
// 4:响应已经完成,可以获取并使用服务器的响应了
```

- CSS 样式优先级
- 对象
- 定时器
- 预编译
- HTML 元素全局属性
- 合法变量名
- 优先级选择器
- 闭包
- HTTP
- CSS 简写属性
- 本地存储
- 媒体查询
- BFC
- 伪类
- React 生命周期
- HTTP 协议请求方法
- 浏览器 userAgent
- 隐藏元素
- 找出数组中出现次数最多的元素
- 页面中动态显示当前年所剩余时间(xxxx 年还剩 xx 天 xx 时 xx 秒)

# 2020-08-26

### 本地存储

对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。

减少网络流量：一旦数据保存在本地后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器间不必要地来回传递。快速显示数据

性能好，从本地读数据比通过网络从服务器获得数据快得多，本地数据可以即时获得。再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示。

临时存储：很多时候数据只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用 sessionStorage 非常方便

essionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大

作用域不同，sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的

# 2020-08-27

### 浏览器缓存

浏览器在第一次发送 HTTP 请求的时候会现在浏览器缓存中寻找是否有缓存结果和缓存标识，如果有，则从缓存中获取资源。如果没有，则发送 HTTP 请求给服务器，服务器响应结果和缓存规则，浏览器收到响应结果后将请求结果和缓存标识存入浏览器缓存中。

1. 彻底缓存

- Expires:设置缓存过期时间 http1.0
- Cache-Control:控制网页缓存(可以设置多个属性例如 max-age=300 表示在这个请求正确返回时间 5 分钟内再次加载资源的话,会命中此缓存) 可以在请求头或响应头中设置 http1.1
- 同时存在的话 Cache-Control 的优先级高

2. 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况:

- 协商缓存生效，返回 304 和 Not Modified
  发送 http 请求时,该请求的浏览器缓存结果失败,则返回缓存标识。
  然后浏览器携带该资源的缓存标识发起 http 请求,服务器返回 304 表示该资源没有更新。
  浏览器向浏览器缓存获取该请求的缓存结果,然后返回该请求的缓存结果到浏览器上。

- 协商缓存失效，返回 200 和请求结果
  第一次发送 http 请求,浏览器缓存返回告知没有该请求的缓存结果和缓存标识。
  则向服务器发起 http 请求,返回请求结果和缓存标识。
  然后浏览器将此请求结果和缓存标识存入浏览器缓存

协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag

- Last-Modified 和 If-Modified-Since

  浏览器在第一次访问资源时,服务器返回数据的同时在 response header 中添加 Last-Modified 的 header,值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和 header

  当浏览器在下一次请求这个资源时,浏览器检测到有 Last-Modified 这个 header,于是添加 If-Modified-Since 这个 header,值则为 Last-Modified 中的值;服务器再次收到这个资源请求，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回 304 和空的响应体，直接从缓存读取，如果 If-Modified-Since 的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和 200。

- ETag 和 If-None-Match
  Etag 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag 就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 Etag 值放到 request header 里的 If-None-Match 里，服务器只需要比较客户端传来的 If-None-Match 跟自己服务器上该资源的 ETag 是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现 ETag 匹配不上，那么直接以常规 GET 200 回包形式将新的资源（当然也包括了新的 ETag）发给客户端；如果 ETag 是一致的，则直接返回 304 知会客户端直接使用本地缓存即可。

3. 缓存机制

强制缓存优先于协商缓存进行，若强制缓存(Expires 和 Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since 和 Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回 200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回 304，继续使用缓存。

4. 应用缓存策略

   - 频繁变动的资源: Cache-Control: no-cache
   - 不常变化的资源: Cache-Control: max-age=31536000

# 2020-08-28

### 异步相关

ES6 将异步场景分为**两个阶段**和**三种状态**

两个阶段：unsettled（未决） 和 settled（已决）
三种状态：pending（挂起）、resolved（完成）、rejected（失败）

他们的关系图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200901003212868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
当任务处于**未决阶段**时，它一定是 **pending 挂起状态**，表示任务从开始到拿到结果之间的过程。比如：网络完成了各种配置，也发送了请求，但是请求结果还没有拿到。

当任务处于 **已决阶段**时，它只能是 **resolved** 和 **rejected**两种状态的一种，表示任务有了一个结果。比如：从服务器拿到了数据（resolved）、网络不好没有拿到数据（rejected）

任务开始时，始终是未决阶段，那任务如何才能走向已决阶段呢？

ES6 认为，任务在未决阶段的时候，有能力将其**推向**已决。比如，当从服务器拿到数据后，我们就从未决阶段推向已决的 resolved 状态，如果网络不好，导致出错了，我们就从未决阶段推向已决的 rejected 状态

我们把**从未决推向已决的 resolved 状态的过程，叫做 resolve**，**从未决推向已决的 rejected 状态的过程，叫做 reject**，如下图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200901003236741.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
这种状态和阶段的变化是不可逆的，也就是说，一旦推向了已决，就无法重新改变状态

任务从未决到已决时，可能附带一些数据，比如：跑步完成后的用时、网络请求后从服务器拿到的数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200901003259253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)
任务已决后（有了结果），可能需要进一步做后续处理，如果任务成功了（resolved），有后续处理，如果任务失败了（rejected），仍然可能有后续处理

我们把针对 resolved 的后续处理，称之为 thenable，针对 rejected 的后续处理，称之为 catchable
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200901003314582.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xnb3dlbg==,size_16,color_FFFFFF,t_70#pic_center)

## Promise 的基本使用

ES 官方制定了一个全新的 API 来适配上面提到的异步模型，这个 API 即 Promise

Promise 是一个构造函数，通过`new Promise()`可以创建一个任务对象，构造函数的参数是一个函数，用于处理未决阶段的事务，该函数的执行是立即同步执行的。在函数中，可以通过两个参数自主的在合适的时候将任务推向已决阶段

```js
var pro = new Promise((resolve, reject) => {
  //未决阶段的代码，这些代码将立即执行
  //...
  //在合适的时候，将任务推向已决
  //resolve(数据)：将任务推向resovled状态，并附加一些数据
  //reject(数据)：将任务推向rejected状态，并附加一些数据
});
```

**注意**

1. 任务一旦进入已决后，所有企图改变任务状态的代码都将失效
2. 以下代码可以让任务到达 rejected 状态
   1. 调用 reject
   2. 代码执行报错
   3. 抛出错误

拿到 Promise 对象后，可以通过 then 方法指定后续处理

```js
pro.then(thenable, catchable);
//或
pro.then(thenable);
pro.catch(catchable);
```

无论是 thenable 还是 catchable，均是下面格式的函数

```js
function (data){
    //data为状态数据
}
```

**注意：后续处理函数一定是异步函数，并且放到微队列中**

# 2020-08-29

### 网络相关

## 如何访问服务器

服务器程序可能在本机，也可能在远程，它一定运行在某一台计算机上

要在茫茫互联网中访问到服务器程序，就必须：

1. 精确的定位到服务器所在的计算机
2. 精确定位到计算机中的服务器程序
3. 精确定位到程序中的某个功能

通常，我们使用 url 地址来描述以上 3 个信息

url 地址全称为 Uniform Resource Locator，统一资源定位符，是一个字符串，它的格式如下：

```
protocol://hostname:port/path?query#hash
```

- protocal: 使用的协议，选择不同的协议，会导致和服务器之间消息交互格式、连接方式不同，大部分都服务器支持 http 和 https 两种协议。如果选择了服务器不支持的协议，会导致访问失败。
- hostname：主机名，可以是 ip、域名
  - ip：每台计算机在网络中的唯一编号，127.0.0.1 表示本机
  - 域名：网络中容易记忆的唯一单词，通过 DNS 服务器可以将域名解析成 IP，localhost 会被解析为 127.0.0.1
- port：端口号，0~65535 之间的数字，相当于服务器计算机上的房号，使用不同的端口号相当于敲不同房间的门。计算机上的程序可以监听一个或多个端口号，如果访问的端口号有程序被监听，则计算机会将到达的网络访问交给对应的程序来处理
  - 端口号可以不写，使用默认值
  - http 协议默认值 80
  - https 协议默认值 443
- path: 一个普通的字符串，该字符串会交给 web 服务器处理，主要用于定位服务
  - 如果 path 为`/`，则表示根路径，如`http://www.baidu.com/`的 path 就是`/`
- query: 一种特殊格式的字符串，该字符串会交给 web 服务器处理，主要用于向服务器某个服务传递一些信息
  - 格式为：`属性名=属性值&属性名=属性值`
- hash：一个普通的字符串，在浏览器的地址栏中，如果 url 其他位置的信息保持不变，仅变动 hash，浏览器不会重新访问服务器，因此通常用于不刷新的页面内跳转

可以看出：

- hostname 是用于精准定位计算机的
- port 是用于精准定位服务器的
- protocal 是用于告诉服务器使用哪种协议进行传输数据
- path 是用于精准定位服务器上的服务的
- query 是在使用服务的时候传递的额外信息，具体看服务器要求
- hash 是一些额外信息，服务器要不要用具体看服务器要求

示例：分析出下面 url 地址的各部分内容

```
https://baike.baidu.com/item/HTML?a=1#1
```

注意：url 仅支持 ASCII 字符，如果是包含非 ASCII 字符，会被现代浏览器自动进行编码

例如：

`https://www.baidu.com/s?wd=王思聪`

会被编码为

`https://www.baidu.com/s?wd=%E7%8E%8B%E6%80%9D%E8%81%AA`

> url 地址不能过长，因为很多浏览器对 url 地址长度是有限制的，chrome 对 url 的长度限制为 8182 个 ASCII 字符

## http 协议

我们可以通过 url 地址访问服务器，但是，浏览器和服务器之间的数据到底是怎么交互的，数据的格式是什么，这取决于使用什么协议

最常见的协议，就是 http 协议

http 协议将和服务器的一次交互看作是两段简单的过程组成：**请求 request**和**响应 response**

- 请求：客户端通过 url 地址发送数据到服务器的过程
- 响应：服务器收到请求数据后回馈数据给客户端的过程

[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-LIupsywO-1598891725010)(assets/2019-12-26-18-21-28.png)]

当 请求-响应 完成后，本次交互结束，如果需要得到额外的服务，则需要重新发送新的请求

同时，http 协议约定了请求的消息格式和响应的消息格式

### 请求消息格式

请求消息格式有两部分组成：**请求头 request headers** 和 **请求体 request body**

#### 请求头

请求头是一个多行文本的字符串

比如我们请求 http://www.baidu.com/s?wd=html, 得到的请求头可能如下：

```
GET /s?wd=html HTTP/1.1
Host: www.baidu.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36
...
```

可以看出，该字符串有两个部分组成

1. 请求行：请求方法 path 协议
   1. 请求方法：一个普通的字符串，会被服务器读取到。常见的请求方法：**GET**、**POST**
   2. path：即 url 中的 path + search + hash，服务器可能会用到 path 中的信息
   3. 协议：协议以及版本号，目前固定为 HTTP/1.1
2. 键值对：大量的属性名和属性值组合，可以自定义。
   1. Host：url 地址中的 hostname
   2. User-Agent：客户端信息描述
   3. 其他键值对

请求头描述了请求的**元数据**信息，这里的元数据信息是指与业务无关的额外信息

当我们在浏览器地址栏输入一个 url 按下回车后，浏览器会自动构建一个请求头，请求方法为 GET，然后向服务器发送请求

#### 请求体

包含业务数据的字符串

理论上，请求体可以是任意格式的字符串，但习惯上，服务器普遍能识别以下格式：

- application/x-www-form-urlencoded：`属性名=属性值&属性名=属性值...`
- application/json：`{"属性名":"属性值", "属性名":"属性值"}`
- multipart/form-data：使用某个随机字符串作为属性之间的分隔符，通常用于文件上传

由于请求体格式的多样性，服务器在分析请求体时可能无法知晓具体的格式，从而不知道如何解析请求体，因此，服务器往往要求在请求头中附带一个属性`Content-Type`来描述请求体使用的格式

例如

```
Content-Type: application/x-www-form-urlencoded
Content-Type: application/json
Content-Type: multipart/form-data
```

#### GET 和 POST

虽然 http 协议并没有规定请求方法必须是什么，但随意的请求方法服务器可能无法识别

服务器一般都能识别 GET 和 POST 请求，并做出以下的差异化处理

1. 如果是 GET 请求，不读取请求体，业务数据从 path 的 search 或 hash 中读取
2. 如果是 POST 请求，读取请求体，业务数据从请求体中获取，关于请求体的格式，不同的服务器、同一个服务器的不同服务要求不同

> 在浏览器地址栏中输入 url 地址是不能产生 POST 请求的，可以使用表单提交产生 POST 请求

由于服务器对 GET 和 POST 处理的差异，造成了 GET 和 POST 请求的差异：

1. GET 请求一般没有请求体，POST 请求有
2. GET 请求的业务数据放在地址中，安全性较差（误分享、被偷窥）
3. GET 请求传递的业务数据量是有限的，POST 是无限的（除非服务器限制）
4. GET 请求利于分享页面结果，POST 不行
5. 在浏览器中刷新或回退页面时，会按照该页面之前的请求方式重新发送请求，如果是 GET 请求，浏览器会重新发送 GET 请求；如果是 POST 请求，浏览器会重新构建之前的消息体数据，通常会弹出提示

### 响应消息格式

和请求类似，响应消息也分为**响应头**(response headers)和响应体(response body)

#### 响应头

比如我们请求 http://www.baidu.com/s?wd=html, 得到的响应头可能如下：

```
HTTP/1.1 200 OK
Content-Type: text/html;charset=utf-8
Server: BWS/1.1
...
```

可以看出，该字符串有两个部分组成

1. 响应行：协议 状态码 状态文本
   1. 协议：协议以及版本号，目前固定为 HTTP/1.1
   2. 状态码和状态文本：一个数字和数字对应的单词，来描述服务器的响应状态，浏览器会根据该状态码做不同的处理。
      1. 200 OK：一切正常。你好，`我好，大家好。`
      2. 301 Moved Permanently：资源已被永久重定向。`你的请求我收到了，但是呢，你要的东西不在这个地址了，我已经永远的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了请求头的Location中了`
      3. 302 Found：资源已被临时重定向。`你的请求我收到了，但是呢，你要的东西不在这个地址了，我临时的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了请求头的Location中了`
      4. 304 Not Modified：文档内容未被修改。`你的请求我收到了，你要的东西跟之前是一样的，没有任何的变化，所以我就不给你结果了，你自己就用以前的吧。啥？你没有缓存以前的内容，关我啥事`
      5. 400 Bad Request：语义有误，当前请求无法被服务器理解。`你给我发的是个啥啊，我听都听不懂`
      6. 403 Forbidden：服务器拒绝执行。`你的请求我已收到，但是我就是不给你东西`
      7. 404 Not Found：资源不存在。`你的请求我收到了，但我没有你要的东西`
      8. 500 Internal Server Error：服务器内部错误。`你的请求我已收到，但这道题我不会，解不出来，先睡了`
      9. 通常认为，0~399 之间的状态码都是正常的，其他是不正常的
2. 键值对：大量的属性名和属性值组合，可以在服务器响应的时候自定义。
   1. Content-Type：响应体中的数据格式，常见格式如下
      1. text/plain: 普通的纯文本，浏览器通常会将响应体原封不动的显示到页面上
      2. text/html：html 文档，浏览器通常会将响应体作为页面进行渲染
      3. text/javascript：js 代码，浏览器通常会使用 JS 执行引擎将它解析执行
      4. text/css：css 代码，浏览器会将它视为样式
      5. image/jpeg：浏览器会将它视为 jpg 图片
      6. attachment：附件，浏览器看到这个类型，通常会触发下载功能
      7. 其他 MIME 类型
   2. Server：web 服务器类型

#### 响应体

响应消息的正文

## 在浏览器地址栏中输入一个页面地址，按下回车键后发生了什么？

1. 浏览器将 url 地址补充完整：没有书写协议，添加上协议
2. 浏览器对 url 地址进行 url 编码：如果 url 地址中出现非 ASCII 字符，则浏览器会对其进行编码
3. 浏览器构造一个没有消息体的 GET 请求，发送至服务器，等待服务器的响应，此时浏览器标签页往往会出现一个等待的图标
4. 服务器接收到请求，将一个 HTML 页面代码组装到消息体中，响应给浏览器
5. 浏览器拿到服务器的响应后，丢弃掉当前页面，开始渲染消息体的 html 代码。浏览器之所以直到这是一个 html 代码，是因为服务器的响应头指定了消息类型为 text/html
6. 浏览器在渲染页面的过程中，发现有其他的嵌入资源，如 CSS、JS、图片等
7. 浏览器使用不阻塞渲染的方式，重新向服务器发送对该资源的请求，拿到响应结果后根据 Content-Type 做相应处理
8. 当所有的资源都已下载并处理后，浏览器触发 window.onload 事件

## ajax

不仅仅是浏览器可以发出请求并获得响应，任何具有网络通信能力的程序均可以这样做。

过去，在浏览器中，只有浏览器本身有发送请求的能力，直到 ajax 的出现。

ajax 是一种技术，让 JS 语言在浏览器环境中获得了新的 API，通过该 API，JS 代码拥有了和服务器通信的能力

传统的 ajax 代码如下

```javascript
var xhr = new XMLHttpRequest(); //创建发送请求的对象
xhr.onreadystatechange = function () {
  //当请求状态发生改变时运行的函数
  // xhr.readyState： 一个数字，用于判断请求到了哪个阶段
  // 0: 刚刚创建好了请求对象，但还未配置请求（未调用open方法）
  // 1: open方法已被调用
  // 2: send方法已被调用
  // 3: 正在接收服务器的响应消息体
  // 4: 服务器响应的所有内容均已接收完毕
  // xhr.responseText： 获取服务器响应的消息体文本
  // xhr.getResponseHeader("Content-Type") 获取响应头Content-Type
};
xhr.setRequestHeader("Content-Type", "application/json"); //设置请求头
xhr.open("请求方法", "url地址"); //配置请求
xhr.send("请求体内容"); //构建请求体，发送到服务器
```

# 2020-08-30

### 前端基础问题

##### 盒模型

标准盒子:width/height + padding + border + margin
怪异盒模型: width/height(包括内边距和边框) + margin

##### 水平垂直居中

1.  父元素相对定位，子元素绝对定位，已知宽高情况下 top:50%,left:50%,margin-top:-(自身高度的一半),margin-left:-(自身宽度的一半)
2.  父元素相对定位，子元素绝对定位，不知道宽高情况下 top:50%，left:50%,transform:translate(-50%,-50%)
3.  父元素设置属性 display:flex,子元素设置 justify-content:center,align-items:center

# 2020-08-31

### 58 同城笔试

- 隐世类型转换 "123abc" - 123
- 行内元素
- 跨域
- 函数声明和函数表达式
- HTML5 标签
- CSS 选择器
- HTTP 状态码
- cookie
- 预编译
- 可见元素 display overflow z-index visibility
- 原型
- 对象
- 定时器(块级作用域)
- js 特点
- js 任务执行机制
- 对象的遍历
- arr.fill
- 垂直居中
- 数组去重

# 2020-09-01

### HTTP 缓存

# 2020-09-02

### 前端跨域

##### JSONP

利用了浏览器允许跨域引用 javaScript 资源,只能用于 GET 请求,通常以函数回调的形式返回

```html
<div id="divCustomers"></div>
```

```javascript
// 在我们本地准备一个 callbackFunction 参数则为请求外部js文件返回调用携带的参数 由此可以解决跨域请求问题
function callbackFunction(result, methodName) {
  var html = "<ul>";
  for (var i = 0; i < result.length; i++) {
    html += "<li>" + result[i] + "</li>";
  }
  html += "</ul>";
  document.getElementById("divCustomers").innerHTML = html;
  console.log(result);
}

// 该外部引用返回的是一个函数调用 callbackFunction({data})
<script
  type="text/javascript"
  src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"
></script>;
```

##### CORS

CORS 全称 Cross-Origin Resource Sharing，是 HTML5 规范定义的如何跨域访问资源。

假如我有一个向`http://localhost:3000/api/list`发送的请求,那么浏览器接收到相应后,首先检查 Access-Control-Allow-Origin 是否包含本域`(http://localhost:8080/api/list)`,如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript 将无法获取到响应的任何数据。

可见这里本域是`http://localhost:8080`,外域是`http://localhost:3000`,只要响应头 Access-Control-Allow-Origin 为`http://localhost:8080`或\*,本次请求就可以成功。

跨域是否成功,取决于对方服务器是否给你设置一个正确的 Access-Control-Allow-Origin。

##### proxy

在 vue-cli 项目中,可以通过 config 文件夹下 index.js 文件中 proxyTable 属性中设置代理

```javascript
proxyTable: {
  '/api':{
     target:'http://localhost:3000',   //代理的服务器地址(实际上请求访问的地址)
     checkOrigin:true,
     pathRewrite:{
       '^api':'/'                      //在使用时直接用/api+接口就可以调用了
     }
  }
},

// 这时候我表面上是向http://localhost:8080/api/list发送请求,但实际上是向http://localhost:3000/api/list发送请求。
```

# 2020-09-03

### 百度笔试

- 渗透测试
- 同步互斥
- 分区利用率
- css 选择器
- typeof 操作符
- canvas
- 排序算法
- 复杂度
- min/max-height
- IP、子网掩码
- sourcemap
- return
- promise.all/promise.race
- 内存泄漏
- 数组去重
- 优质奶牛(数组交集)

# 2020-09-04

### 项目总结 

##### flappy-bird

- js 对象收编变量与函数初始化
- 游戏运行与本地化存储
- 利用定时器实现动画运行，完成碰撞检测等功能

- 朦层 这个是绝对定位 通过四个方向的值 top left right bottom 都为 0 铺满了父级 则不用设置宽高 运用到 opacity 设置透明度(这里扩充相关知识)

- 天空移动：控制背景图片的位置变化 背景图片默认重复 利用水平方向背景图片向右移动

- 小鸟上下跳动：利用定位的 top 值 设定两个值 在定时器的作用下来回切换 再用 transition 实现控制过渡效果 实现连贯 linear 匀速 all 0.3s linear

- 小鸟翅膀扇动：动态更改图片实现

- 文字变化 ：通过动态改变类名的方式，改变文字的颜色和大小 cursor：pointer(可以延伸 c3)

- 动态生成柱子：柱子图片高度是 50px 整个游戏页面设置的高度为 600px 柱子之间的空间为 150px 剩下的 450px 留给上下柱子动态生成
  柱子高度应该在 50 ~ 225 之间 最短是 50px
  var topHeight = 50 + Math.floor(Math.random() + 175); //实际上柱子高度
  var downHeight = 600 - 150 - topHeight //实际下柱子高度
  然后插入 dom 结构上

##### 云开发记账小程序

- 首先要在 app.json 里面添加页面"pages"数组里添加路径

- "tabBar"对象里 list 添加每个页面的详情信息,例如该页的名称和图标路径
  color 添加字体颜色
  selectedColor 添加选中的字体颜色

- 修改 data 中的数据后,还要通过 setData()函数去做响应式修改

- 调用云函数 wx.cloud.callFunction(
  {
  name:'自己创建的云函数名字',
  data:'你所要传的数据'
  })

- wx.switchTab()
- wx.navigateTo() 跳转页面

- 通过成功跳页面的回调函数中 res.eventChannel.emit()传参

- 子页面通过监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据

- wx.navigateBack() 返回到上一个页面

- cosnt db = cloud.database() -> db.collection() 由此实现数据库的增删改查

- wx.showLoading() 加载动画 wx.hideLoading()

- wx.showToast() 显示成功或失败的组件

- wx.getSystemInfoSync().screenWidth 可以获取手机屏幕宽度来响应对应的 charts 图表

- wx.getSetting() 获取当前用户的授权状态

- wx.getUserInfo() 获取用户信息

- onLoad 监听页面加载(首次加载)

- onShow 监听页面显示(可以通过是否首次加载来减少请求)

##### 电商后台管理系统

- axios 请求拦截器在每次请求时加上 token,响应拦截器在接收到响应后进行后续操作,例如登录状态失效时,需要重新登录跳转到登录页。

```javascript
axios.interceptors.request.use((config) => {
  // 为config做预处理
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
```

- sessionStorage 会话存储

```javascript
// 登录成功后保存token到sessionStorage
window.sessionStorage.setItem("token", res.data.token);
```

- 路由导航守卫控制访问权限

```javascript
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页面 则可以直接访问
  if (to.path === "/login") {
    return next();
  }

  // 获取会话期间储存的token
  const token = window.sessionStorage.getItem("token");

  // 如果token不存在的话 则访问登录页面
  if (!token) {
    return next("/login");
  }

  next();
});
```

- 解决重复点击导航路由报错问题(百度解决)

```javascript
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
```

- 路由懒加载

```javascript
   resolve=>(require(['需要加载的路由的地址'])，resolve)
```

# 杭州端点电话面试 09-05

- vue-router 原理

- vue 双向数据绑定原理

- js v8 引擎

- webpack

- 微信后台

- 手撕 promise

# vue 双向数据绑定 09-06

- vue2 通过数据劫持和设计模式中的发布订阅模式完成的双向数据绑定

1.  Object.difineProperty()实现一个监听者的模式,将 data 中的属性遍历劫持绑定 getter(订阅)/setter(发布)属性,最开始在初始化的时候是对 data 里面的数据就开始劫持监听了。初始化的时候就调用了 observe()方法。
2.  当数据发生变化时,会通知观察者列表 Dep,会收集所有的 watcher,并且把数据发生变化的消息告诉 watcher,实现发布者的作用。
3.  watcher 是订阅者,订阅每一个属性中的 Dep,当 Dep 发出消息传递时,watcher 会根据订阅的数据内容去执行相关更新函数,从而实现更新视图的操作

# 汇量科技笔面试 + cvte 笔试  09-07

1. 汇量科技

- 20 题选择题考的很多知识点吧其实

- js 脚本与 load 事件跟什么监听 load 的 listen 执行顺序

- BFC

- 清除浮动

- 只改变一个 css 属性实现 HTML 元素重叠

- 作用域

- 实现 for 循环中打印对应 i 的方法

- return continue break 的区别

- && 和 ||

2. cvte

- CSRF 和 XSS
- 构造函数
- 原型(原型链)
- 作用域
- 预编译
- this 指向
- 闭包
- 哪个模块是属于 node.js
- 哪个 node.js 库可以搭建服务器
- 选取 dom
- HTTP
- BOM
- 跨域设置哪个属性携带 cookie
- 隐式类型转换
- constructor
- typeof
- 数据类型
- 叶子节点
- addEventListener 的第三个参数
- 拉图片到页面输入框用了 H5 的那个 api
- 精灵图特点
- load 和 jq 中的那个啥封装的 load 事件的区别
- 怎么避免 CSRF 漏洞
- rgba(255,255,255,0.4) -> ['#ffffff','0.4']
- 寻找相同字符串 ABCD DABC CDAB BCDA -> DAB return true 否则 return false

# 杭州端点网络电话二面 + 小米笔试  09-08

1. 端点网络

   - 为什么会做这样一个项目

   - 碰到跨域怎么解决的(除了这个之外还知道哪些相关解决方案)

   - 自己写过 promise 吗？了解实现原理吗，可以大概讲一下你知道的。promise 的方法有哪些？

   - 讲一下箭头函数

   - bind 函数的实现原理

   - 项目优化

   - 性能优化

   - 会用 React 吗

2. 小米

   - flex
   - 闭包
   - linux 指令
   - typeof
   - cookie 和 session
   - a 标签伪类
   - vue 和 react
   - HTTP
   - HTTPS
   - 改变原数组的方法
   - CPU
   - HTML 语义化
   - promise
   - 回流
   - git 指令
   - 从主机名到 IP 地址的映射关系文件
   - 声明数字
   - 动态规划
   - 实现解决小数精度不准的方法

# 乐信笔试 09.09

- 小驼峰转大驼峰
  要求把字符串按照小驼峰命名规则转换
  忽略多余的空格和-
  示例
  hello-world
  --hello --LE-XIN
- 给定一个前序遍历字符串和一个后序遍历字符串 如果这两个字符串还原是同一颗树就返回树的高度 否则返回 0
- 就给定字符串如果字符串的括号都互相匹配那么就返回 true,否则返回 false
  ({ [ ] })

# 深信服笔试 + 朋友网易实习面试 09-10

1.

- M \* N 二维数组寻找完整路径能从[0,0]走到[M-1,N-1]
- rgb 颜色转 16 进制
- 寻找字符串中含子路径的父路径 比如/x/y/a,/x/x/z 输出 false /a,/a/b,/a/b/c 输出/a,/a/b

2.

- 原型链
- 变量提升
- 箭头函数
- css 盒模型
- 响应式媒体查询
- vue 双向数据绑定原理
- 深拷贝浅拷贝
- vue 生命周期
- http 状态码(400 和 502)
- cookie 和 session 的区别

# 有赞 + 网易互娱笔试 09-11

1. 有赞

- H5 元素
- css 优先级
- 数组方法
- 进程通信(进程、线程)
- 指令系统
- 中左，右括号是否配对算法
- 树
- 栈、队列
- HTTPS
- DNS
- cookie
- TCP
- 加密
- 安全问题
- 浏览器渲染
- XSS
- 对应端渲染变慢
- 重排/重绘
- 定位
- js 执行机制
- 遍历原型链属性的方法
- js 中的真值
- url 地址匹配

2.

- 字符串换位比较大小
- 动态规划法
-

# XSS

1. XSS(跨站脚本攻击)

   XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

   攻击者一般对客户端网页进行攻击的方式不仅包括 js 脚本,有可能也有 HTML 和 flash。一般是将客户端的隐私数据如 cookie 和 session 发送到攻击者,然后将客户端所浏览的网页重定向到受攻击者控制的网页中去,以便达到攻击者操控客户端网页的目的。

   XSS 攻击可以分为 3 类：反射型（非持久型）、存储型（持久型）、基于 DOM。

   - 反射型:简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。

   - 存储型:把用户输入的数据 "存储" 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。(比较常见的一个场景是攻击者在社区或论坛上写下一篇包含恶意 JavaScript 代码的文章或评论，文章或评论发表后，所有访问该文章或评论的用户，都会在他们的浏览器中执行这段恶意的 JavaScript 代码。)

   - 基于 DOM:通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

   - XSS 攻击的防范:
     - **HttpOnly 防止劫取 Cookie**：严格来说，HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。
     - **输入检查**: 输入检查一般是检查用户输入的数据中是否包含 <，> 等特殊字符，如果存在，则对特殊字符进行过滤或编码，这种方式也称为 XSS Filter
     - **输出检查**: 用户的输入会存在问题，服务端的输出也会存在问题。一般来说，除富文本的输出外，在变量输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击。例如利用 sanitize-html 对输出内容进行有规则的过滤之后再输出到页面中。

# 延迟脚本和异步脚本 09-12

1. 延迟脚本
   HTML4.01 为 script 标签定义了 defer 属性。这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说,脚本会被延迟到整个页面都解析完毕后再运行。因此,在 script 元素中设置 defer 属性,相当于告诉浏览器**立即下载**,但**延迟执行**。

```html
<html>
  <head>
    <title></title>
    <script defer src="demo1.js"></script>
    <script defer src="demo2.js"></script>
  </head>
</html>
```

在这个例子中,虽然我们把 script 标签放在了文档的 head 元素中,但其中包含的脚本将延迟到浏览器遇到`</html>`标签后再执行。HTML5 规范要求脚本按照它们出现的先后顺序执行,因此第一个延迟脚本会先于第二个延迟脚本再执行,而这两个脚本会**先于 DOMContentLoaded**事件执行。在现实当中,延迟脚本不一定会按顺序执行,也不一定会在 DOMContentLoaded 事件触发前执行,因此最好只包含一个延迟脚本。

2. 异步脚本

HTML5 为 script 提供了 async 属性。这个属性与 defer 属性类似,都用于改变处理脚本的行为。同样与 defer 类似,async 只适用于外部脚本文件,并告诉浏览器立即下载文件。但与 defer 不同的是,标记为 async 的脚本并不保证按照指定它们的先后顺序执行。例如:

```html
<html>
  <head>
    <title></title>
    <script async src="demo1.js"></script>
    <script async src="demo2.js"></script>
  </head>
</html>
```

在以上代码,第二个脚本文件可能会在第一个脚本文件执行之前执行。因此确保两者之间互不依赖非常重要。指定 async 属性的目的是不让页面等待两个脚本下载和执行,从而异步加载页面其他内容。为此,建议异步脚本不要在加载期间修改 DOM。

异步脚本**一定**会在页面的**load 事件前**执行,但**可能**会在**DOMContentLoaded 事件触发之前**或者**之后**执行。

# ES5 中的五种基本数据类型和一种复杂数据类型

1. 基本数据类型

   - Undefined 类型 值为 undefined 即声明了但是为初始化值的值
   - Null 类型 值为 null 表示一个空对象指针
   - Boolean 类型 值为 true/false if 语句中的判断是将参数调用 Boolean()函数进行判断
     - 数据类型 转换为 true 的值 转换为 false 的值
     - Boolean true false
     - String 任何非空字符串 ""(空字符串)
     - Number 任何非 0 数值(包括无穷大) 0 和 NaN
     - Object Object null
     - Undefined 不适用 undefined
   - String 类型 值为字符串的值例如 "I am a boy"
   - Number 类型 值为数字例如 1 2 3 4 5 6 7 8

2. 复杂数据类型

   - Object 类型: 本质上是由一种无序的名值对组成的

3. typeof 操作符
   - 如果这个值未定义则返回"undefined"
   - 如果这个值是布尔值则返回"boolean"
   - 如果这个值是字符串则返回"string"
   - 如果这个值是数值则返回"number"
   - 如果这个值是对象或 null 则返回"object"
   - 如果这个值是函数则返回"function"

# 汇量科技校招笔试 09-13

- 当使用了 web 不识别的 HTML 元素时浏览器发生什么
- 有两个连在一起的 div 有以下样式,然后他们的效果是什么{clear:right; float:right; width:25%}
- css 的 inherit
- 当有几段文字,分别有主标题,副标题需要用到哪些标签
- js 脚本执行顺序
- 进程和程序
- for 循环后 i 的值
- &&
- css 小型大写的属性
- label 的用处
- 设置了 display:none 的 DOM 元素设置了背景图片,那么会加载吗
- 锚点
- display:none 和 visibility:hidden 的区别
- 请描述浏览器输入网址到页面显示的全过程
- 实现求平均函数实现以下
  - avr(1,2,3,4,5) return 3
  - avr(-5,null,5) return 0
  - avr('1.0',false,1,true,1,'A',1,'B',1,'C',1,'D',1,'E',1,'F',1,'G',1,'Z') return 0.5
  - avr(0.1 0.2) return 0.15 not 0.1500000000002

# 字符串数组 -> 数组 09-14

```javascript
let str = "[1,2,3,4,5,6]";
let subStr = str.slice(1, str.length - 1); // 将字符串从第一位到第七位剪出来即1,2,3,4,5,6
let arr = subStr.split(",").map((item) => Number(item)); // 然后将新字符串用","分隔形成数组后再将每一项转为Number类型
console.log(arr); // [1,2,3,4,5,6]
```

补充:js 字符串方法

```javascript
// 字符串方法
var str = "Eeson Chan";

// 1.字符方法 -> charAt()和charCodeAt()
//  - charAt()
// charAt方法以单字字符串的形式返回给定位置的那个字符
console.log(str.charAt(1)); // "e"

// - charCodeAt()
//  charCodeAt方法以单字字符串的形式返回给定位置的那个字符的字符编码
console.log(str.charCodeAt(1)); // "101"

// 2.字符串操作方法
//  - concat()
//  用于将一或多个字符串拼接起来,返回拼接得到的新字符串

// 3.基于字符串创建新字符串的方法
//  - slice()
var sliceStr = str.slice(2, 3); // 从第二位开始截取即s 截取到第三位 则截取出来s   返回值为s
//  - substr()
var strSubstr = str.substr(2, 3); //从第二位开始截取即s 截取三位 则截取出来son      返回值为son
//  - substring()
var strSubstring = str.substring(2, 3); //从第二位开始截取即s 截取到第三位 则截取出来s    返回值为s

// 4.字符串位置方法  从一个字符串中搜索给定的字符串,返回字符串的位置(如果没有找到该字符串,则返回-1)
//  -indexOf()  从字符串的开头向后搜索子字符串
var strIndexOf = str.indexOf("a"); //寻找参数在字符串中第一次出现的索引位    // 1
//  -lastIndexOf()
var strLastIndexOf = str.lastIndexOf("a"); //寻找参数在倒序字符串中第一次出现的索引位    // 8

// 5.trim()方法
//  - trim() 该方法会创建一个字符串副本,删除前置和后置的所有空格,然后返回结果
let str = "  Hello JavaScript  ";
console.log(str.trim()); //  "Hello JavaScript"

// 6.字符串大小写转换方法
//  - toLowerCase()         转小写
//  - toLocaleLowerCase()   转小写
//  - toUpperCase()         转大写
//  - toLocaleUpperCase()   转大写
var strSplit = str.split(" "); //根据所给参数分割字符串  返回一个数组    ["Eason","Chan"]

// 7.字符串的模式匹配方法
//  - match()  接受一个正则表达式或RegExp对象 返回一个数组
let text = "cat, bat, sat, fat";
let pattern = /.at/;
console.log(text.match(pattern)); // ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]

//  - search()  接受一个正则表达式或RegExp对象 返回第一次出现的位置(如果没有返回-1)
let text = "cat, bat, sat, fat";
let pattern = /at/;
console.log(text.search(pattern));

//  - replace()  第一个参数为字符串或RegExp对象 第二个参数为要替换的字符串或一个函数

//  - split()  可以将指定分隔符分割成多个子字符串并放在一个数组中

// 8.localeCompare()方法

//  - localeCompare() 比较两个字符串
```

# React 基础 09-15

```html
<div id="test"></div>
<script
  src="https://unpkg.com/react@16/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  crossorigin
></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<script type="text/babel">
  // function formatName(data) {
  //     return data.first + "" + data.second;
  //   }
  // const data = {
  //   first: "111",
  //   second: "222",
  // };
  // const vDom = <h1>Hello {formatName(data)}</h1>;

  // 三. 元素渲染

  const name = "tyw";
  const element = <div class="app">Hello React</div>;
  // 上面这样创建dom等价于
  const element1 = React.createElement(
    "div", //标签名
    { className: "app" }, //设置的属性
    "Hello React" //标签内容
  );

  // react组件 => 函数组件 返回的是一个react元素
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  // 等同于
  // class Welcome extends React.Compotent{
  //   render() {
  //     return <h1>Hello, {this.props.name}</h1>
  //   }
  // }

  // 渲染组件(自定义组件)
  const element3 = <Welcome name="lgowen" />;

  // function tick() {
  //   const element = (
  //     <div>
  //       <h1>Hello, world!</h1>
  //       <h2>It is {new Date().toLocaleTimeString()}.</h2>
  //     </div>
  //   );
  //   ReactDOM.render(element, document.getElementById("test"));
  // }
  // setInterval(tick, 1000);
  // React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：
  // 注意：这是简化过的结构
  // const element = {
  //   type: 'h1',
  //   props: {
  //     className: 'greeting',
  //     children: 'Hello, world!'
  //   }
  // };
  // 这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。
  ReactDOM.render(element3, document.getElementById("test"));

  // 1.我们调用 ReactDOM.render() 函数，并传入 <Welcome name="Sara" /> 作为参数。
  // 2.React 调用 Welcome 组件，并将 {name: 'lgowen'} 作为 props 传入。
  // 3.Welcome 组件将 <h1>Hello, lgowen</h1> 元素作为返回值。
  // 4.React DOM 将 DOM 高效地更新为 <h1>Hello, lgowen</h1>。

  function App() {
    return (
      <div>
        <Welcome name="小张" />
        <Welcome name="小刘" />
        <Welcome name="小红" />
      </div>
    );
  }
  ReactDOM.render(<App />, document.getElementById("test"));

  // 四. 组件 & props

  // 评论组件
  function Comment(props) {
    return (
      <div className="Comment">
        <div className="userinfo">
          <img
            src={props.author.avatarUrl}
            alt={props.author.name}
            class="Avatar"
          />
          <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    );
  }

  // 抽取头像组件
  function Avatar(props) {
    return (
      <img src={props.user.avatarUrl} alt={props.user.name} class="avatar" />
    );
  }

  // 然后新的评论组件可以变为
  function Comment(props) {
    return (
      <div className="Comment">
        <div className="userinfo">
          <Avatar user={props.author} />
          <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    );
  }

  // 然后提取userInfo组件
  function UserInfo(props) {
    return (
      <div className="userinfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">{props.user.name}</div>
      </div>
    );
  }

  // 然后新的评论组件可以变为
  function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    );
  }
  let data = {
    author: {
      avatarUrl: "../../流程图.png",
      name: "Lgowen",
    },
    text: "你是猪",
    date: "2020-09-14",
  };
  // function formatDate(date){
  //   return date.toString()
  // }
  // ReactDOM.render(
  //   <Comment author={data.author}
  //   text={data.text}
  //   date={data.date} />,
  //   document.getElementById("test"))

  function FormatDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}</h2>;
  }

  // 五.State & 生命周期

  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }

    // 当组件已经被渲染到 DOM 中后运行
    componentDidMount() {
      this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    tick() {
      this.setState({
        date: new Date(),
      });
    }

    render() {
      return (
        <div>
          <h1>Hello React</h1>
          <FormatDate date={this.state.date} />
        </div>
      );
    }
  }

  // ReactDOM.render(
  //   <Clock />,
  //   document.getElementById("test")
  // )

  // 1.当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。
  // 2.之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。
  // 3.当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。
  // 4.浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
  // 5.一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。

  // setInterval(tick, 1000)

  // 六. 事件处理

  // 传统HTML
  // <button onclick="clickButton()">
  //     click
  // </button>

  // React
  // <button onClick={clickButton}>
  //     click
  // </button>

  // 必须显示使用preventDefault()阻止默认事件
  function Cilck() {
    function handleClick(e) {
      e.preventDefault();
      console.log("The link is clicked");
    }

    return (
      <a href="#" onClick={handleClick}>
        click
      </a>
    );
  }

  class Togger extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isTogger: false };

      // 为了在回调中使用 `this`，这个绑定是必不可少的
      // this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      console.log(this);
      this.setState((state) => ({
        isTogger: !state.isTogger,
      }));
    }

    render() {
      // 此语法确保 `handleClick` 内的 `this` 已被绑定 (在回调中使用箭头函数)
      return (
        // 以下两种方法都可以用于向事件处理函数传递参数
        // 如果通过箭头函数的方式，事件对象必须显式的进行传递
        <button onClick={(e) => this.handleClick(id, e)}>
          {this.state.isTogger ? "ON" : "OFF"}
        </button>
        // <button onClick={this.handleClick.bind(this, id)}>
        //   Delete Row
        // </button>
      );
    }
  }

  // ReactDOM.render(
  //   <Togger />,
  //   document.getElementById("test")
  // )

  // 七. 条件渲染
  function NotLogin(props) {
    // console.log(props);
    if (!props.isLogin) {
      return null;
    }
    return <h1>用户未登录</h1>;
  }
  function Login(props) {
    return <h1>用户已登录</h1>;
  }

  // function IsLogin(props) {
  //   const isLogin = props.isLogin;
  //   if(isLogin){
  //     return <Login />
  //   }else{
  //     return <NotLogin />
  //   }
  // }

  class IsLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isLogin: false };
    }

    changeStatus() {
      this.setState((state) => ({
        isLogin: !state.isLogin,
      }));
    }

    render() {
      const isLogin = this.state.isLogin;
      let button = isLogin ? <Login /> : <NotLogin isLogin={isLogin} />;
      // if(isLogin){
      //   button = <Login />
      // }else{
      //   button = <NotLogin />
      // }
      // button = isLogin ? <Login /> : <NotLogin />
      return (
        <div>
          <button onClick={() => this.changeStatus()}>Click Me</button>
          {button}
        </div>
      );
    }
  }

  ReactDOM.render(<IsLogin />, document.getElementById("test"));

  // 八. 列表 & Key
        // const arr = [1,2,3,4,5];

        // // 创建一个数组React元素,里面包含着5个li
        // let list = arr.map( num => <li>{num}</li> )
        
        // // 通过{} 将React元素数组变为元素集合
        // // 然后将list元素集合放入ul元素中渲染到页面上
        // ReactDOM.render(<ul>{list}</ul>,document.getElementById('test'))

        // 重构为一个组件

        // const arr = [1,2,3,4,5];
        
        // 当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性
        // function List(props){
        //     const arr = props.num; // 接收这个参数的num
        //     const list = arr.map( num => <li>{num}</li>); // 创建一个包含5个li的React元素数组,值为arr数组的每一项
        //     // {}将一个数组转为元素集合,然后放入ul元素中形成一个React元素,然后返回这个元素
        //     return (
        //       <ul>{list}</ul>
        //     )
        // }
        
        // 然后有了下面这一段 为每一个li元素添加一个key属性
        // key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。
        // function List(props){
        //     const arr = props.num; // 接收这个参数的num
        //     const list = arr.map( num => <li key={num.toString()}>{num}</li>); // 创建一个包含5个li的React元素数组,值为arr数组的每一项
        //     // {}将一个数组转为元素集合,然后放入ul元素中形成一个React元素,然后返回这个元素
        //     return (
        //       <ul>{list}</ul>
        //     )
        // }
        
         
        // // 向List组件传入了一个对象{num : arr},然后将List组件渲染到id为test的DOM元素上
        // ReactDOM.render(<List num={arr} />,document.getElementById('test'))
        

        // // 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：
        // const lists = arr.map( item => <li key={item.id}>{item.content}</li>);

        // // 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：
        // const lists = arr.map( (item, index) => <li key={index}>{item.content}</li>);


        // 用key提取组件
        // const arr = [{
        //   id:"1",
        //   content:1
        // },{
        //   id:"2",
        //   content:2
        // },{
        //   id:"3",
        //   content:3
        // },{
        //   id:"4",
        //   content:4
        // },{
        //   id:"5",
        //   content:5
        // }];
        
        // // 创建一个列表元素组件
        // function ListItem(props){
        //     return ( <li>{props.value}</li>)
        // }
        
        // // 创建一个列表组件
        // // 一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。
        // function List(props){
        //     const arr = props.arr;  //接收传入的{arr:arr},并拿到值赋值给arr
        //     const lists = arr.map( item => <ListItem key={item.id} value={item.content} />)   // 创建数组(包含5个li的React元素),传入数组每一项的id作为li的key值,content为内容
        //     return ( <ul>{lists}</ul>)
        // }
        
        // //渲染列表组件,传入{arr:arr}作为参数,插入到id为test的dom元素上
        // ReactDOM.render(<List arr={arr} />,document.getElementById("test"))
        

        // 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：
        function TwoArrList(props){
          const arr = props.arr;
          // 创建了两个li元素组成的数组
          const ulList = arr.map( item => <li key={item.id}>{item.content}</li>)
          
          // 创建了两个p元素组成的数组
          const divList = arr.map( item => <p key={item.id}>{item.content}</p>)

          return (
            <div>
                 <ul>
                    {ulList} 
                 </ul>
                 <br/>
                 <div> 
                    {divList}
                 </div>
            </div>
          )
          
          // 以上也可以写为这样的方式 JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果
          // return (
          //   <div>
          //        <ul>
          //           {arr.map( item => <li key={item.id}>{item.content}</li>)} 
          //        </ul>
          //        <br/>
          //        <div> 
          //           {arr.map( item => <li key={item.id}>{item.content}</li>)}
          //        </div>
          //   </div>
          // )
        }

        const datas = [
          {id:1,content:"Welcome to React World"},
          {id:2,content:"Fighting"}
        ]

        ReactDOM.render(<TwoArrList arr={datas} />,document.getElementById("test"))
        
        // 九、表单
        const div = document.getElementById("test");
      //   class NameForm extends React.Component {
      //     constructor(props) {
      //       super(props);
      //       this.state = { value: "" };

      //       this.handleChange = this.handleChange.bind(this);
      //       this.handleSubmit = this.handleSubmit.bind(this);
      //     }

      //     handleChange(event) {
      //       this.setState({ value: event.target.value });
      //       console.log(this.state.value);
      //     }

      //     handleSubmit(event) {
      //       alert("提交的名字: " + this.state.value);
      //       event.preventDefault();
      //     }

      //     render() {
      //       return (
      //         <form onSubmit={this.handleSubmit}>
      //           <label>
      //             名字:
      //             <input
      //               type="text"
      //               value={this.state.value}
      //               onChange={this.handleChange}
      //             />
      //           </label>
      //           <input type="submit" value="提交" />
      //         </form>
      //       );
      //     }
      //   }
      // ReactDOM.render(<NameForm />,document.getElementById("test"));

      // class EssayForm extends React.Component {
      //     constructor(props) {
      //       super(props);
      //       this.state = { value: "这是我的文章" };

      //       this.handleChange = this.handleChange.bind(this);
      //       this.handleSubmit = this.handleSubmit.bind(this);
      //     }

      //     handleChange(event) {
      //       this.setState({ value: event.target.value });
      //       console.log(this.state.value);
      //     }

      //     handleSubmit(event) {
      //       alert("提交的名字: " + this.state.value);
      //       event.preventDefault();
      //     }

      //     render() {
      //       return (
      //         <form onSubmit={this.handleSubmit}>
      //           <label>
      //             文章:
      //             <textarea value={this.state.value} onChange={this.handleChange}></textarea>
      //           </label>
      //           <input type="submit" value="提交" />
      //         </form>
      //       );
      //     }
      //   }
      //   ReactDOM.render(<EssayForm />,document.getElementById("test"));

      // class FlavorForm extends React.Component {
      //     constructor(props) {
      //       super(props);
      //       this.state = { value: "coconut" };

      //       this.handleChange = this.handleChange.bind(this);
      //       this.handleSubmit = this.handleSubmit.bind(this);
      //     }

      //     handleChange(event) {
      //       this.setState({ value: event.target.value });
      //       console.log(this.state.value);
      //     }

      //     handleSubmit(event) {
      //       alert("提交的水果: " + this.state.value);
      //       event.preventDefault();
      //     }

      //     render() {
      //       return (
      //         <form onSubmit={this.handleSubmit}>
      //           <label>
      //             选择你喜欢的风味:
      //             <select value={this.state.value} onChange={this.handleChange}>
      //                 <option value="apple">苹果</option>
      //                 <option value="orange">橙子</option>
      //                 <option value="coconut">椰子</option>
      //                 <option value="mango">芒果</option>
      //             </select>
      //           </label>
      //           <input type="submit" value="提交" />
      //         </form>
      //       );
      //     }
      //   }
      //   ReactDOM.render(<FlavorForm />,document.getElementById("test"));

      // class Reservation extends React.Component {
      //     constructor(props) {
      //       super(props);
      //       this.state = {
      //           isGoing:true,
      //           peopleNumber:2
      //       };

      //       this.handleChange = this.handleChange.bind(this);
      //     }

      //     handleChange(event) {
      //          const target = event.target;
      //          const value = target.name === "isGoing" ? target.checked : target.value;
      //          const name = target.name;

      //          this.setState({
      //             [name]:value
      //          })
      //         console.log(this.state);
      //     }

      //     render() {
      //       return (
      //         <form onSubmit={this.handleSubmit}>
      //           <label>
      //             参与:
      //                <input type="text"
      //                 name="isGoing"
      //                 type="checkbox"
      //                 checked={this.state.isGoing}
      //                 onChange={this.handleChange}
      //                 />
      //           </label>
      //           <br />
      //           <label>
      //             来宾人数:
      //             <input type="text"
      //                 name="peopleNumber"
      //                 type="number"
      //                 value={this.state.peopleNumber}
      //                 onChange={this.handleChange}
      //              />
      //           </label>
      //           <input type="submit" value="提交" />
      //         </form>
      //       );
      //     }
      //   }
      //   ReactDOM.render(<Reservation />,div);

      //   在受控组件上指定 value 的 prop 会阻止用户更改输入
      // ReactDOM.render(<input value={null} />,div);

      //   setTimeout(function () {
      //     ReactDOM.render(<input value={null} />, div);
      //   }, 1000);

      // 十、状态提升
      function BoilingVerdict(props) {
        if (props.celsius >= 100) {
          return <p>The water would boil</p>;
        }
        return <p>The water would not boil.</p>;
      }

      //   class Calculator extends React.Component {
      //     constructor(props) {
      //       super(props);
      //       this.handleChange = this.handleChange.bind(this);
      //       this.state = {
      //         temperature: "",
      //       };
      //     }

      //     handleChange(e) {
      //       this.setState({ temperature: e.target.value });
      //     }

      //     render() {
      //       const temperature = this.state.temperature;
      //       return (
      //         <fieldset>
      //           <legend>Enter temperature in Celsius:</legend>
      //           <input value={temperature} onChange={this.handleChange}/>
      //           <BoilingVerdict celsius={parseFloat(temperature)} />
      //         </fieldset>
      //       );
      //     }
      //   }
      //   ReactDOM.render(<Calculator />,div);

      const scaleNames = {
        c: "Celsius",
        f: "Fahrenheit",
      };
      class TemperatureInput extends React.Component {
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
          //   this.setState({ temperature: e.target.value });
          this.props.onTemperatureChange(e.target.value);
        }

        render() {
          //   const temperature = this.state.temperature;
          const temperature = this.props.temperature;
          const scale = this.props.scale;
          return (
            <fieldset>
              <legend>Enter temperature in {scaleNames[scale]}:</legend>
              <input value={temperature} onChange={this.handleChange} />
            </fieldset>
          );
        }
      }

      class Calculator extends React.Component {
        constructor(props) {
          super(props);
          this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
          this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
          this.state = { temperature: "", scale: "c" };
        }

        handleCelsiusChange(temperature) {
          this.setState({ scale: "c", temperature });
        }

        handleFahrenheitChange(temperature) {
          this.setState({ scale: "f", temperature });
        }

        render() {
          const temperature = this.state.temperature;
          const scale = this.state.scale;
          const celsius =
            scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
          const fahrenheit =
            scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
          return (
            <div>
              <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={this.handleCelsiusChange}
              />
              <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={this.handleFahrenheitChange}
              />
              <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
          );
        }
      }
      // 让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：
      // React 会调用 DOM 中 <input> 的 onChange 方法。在本实例中，它是 TemperatureInput 组件的 handleChange 方法。
      // TemperatureInput 组件中的 handleChange 方法会调用 this.props.onTemperatureChange()，并传入新输入的值作为参数。其 props 诸如 onTemperatureChange 之类，均由父组件 Calculator 提供。
      // 起初渲染时，用于摄氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleCelsiusChange 方法相同，而，用于华氏度输入的子组件 TemperatureInput 中的 onTemperatureChange 方法与 Calculator 组件中的 handleFahrenheitChange 方法相同。因此，无论哪个输入框被编辑都会调用 Calculator 组件中对应的方法。
      // 在这些方法内部，Calculator 组件通过使用新的输入值与当前输入框对应的温度计量单位来调用 this.setState() 进而请求 React 重新渲染自己本身。
      // React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现。温度转换在这时进行，两个输入框中的数值通过当前输入温度和其计量单位来重新计算获得。
      // React 使用 Calculator 组件提供的新 props 分别调用两个 TemperatureInput 子组件的 render 方法来获取子组件的 UI 呈现。
      // React 调用 BoilingVerdict 组件的 render 方法，并将摄氏温度值以组件 props 方式传入。
      // React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值。
      // 得益于每次的更新都经历相同的步骤，两个输入框的内容才能始终保持同步。

      //  华氏度转摄氏度
      function toCelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5) / 9;
      }

      //  摄氏度转华氏度
      function toFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
      }

      // 转换函数
      function tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
          return "";
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000; // 保留三位小数并四舍五入
        return rounded.toString();
      }
      ReactDOM.render(<Calculator />, div);
      // 例如，tryConvert('abc', toCelsius) 返回一个空字符串，而 tryConvert('10.22', toFahrenheit) 返回 '50.396'。

      // 十一、组合vs继承
      function FancyBorder(props) {
        return (
          <div className={"FancyBorder FancyBorder-" + props.color}>
            {props.children}
          </div>
        );
      }

      function WelcomeDialog() {
        return (
          <FancyBorder color="blue">
            <h1 className="title">我是标题</h1>
            <p className="message">我是内容</p>
          </FancyBorder>
        );
      }

      function SplitPane(props) {
        return (
          <div className="splitDemo">
            <div className="left">{props.left}</div>
            <div className="right">{props.right}</div>
          </div>
        );
      }

      function Left() {
        return "我是左边的内容";
      }
      function Right() {
        return "我是右边的内容";
      }
      function App() {
        return <SplitPane left={<Left />} right={<Right />} />;
      }
      ReactDOM.render(<App />, div);

      function Dialog(props) {
        return (
          <FancyBorder color="blue">
            <h1 className="title">{props.title}</h1>
            <p className="message">{props.message}</p>
            {props.children}
          </FancyBorder>
        );
      }

      class SignUpDialog extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            title: "今天星期四",
            message: "今天天气很好",
            username: "",
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleInput = this.handleInput.bind(this);
        }

        handleChange(e) {
          this.setState({ username: e.target.value });
        }

        handleInput() {
          alert(`欢迎${this.state.username}登录`);
        }

        render() {
          const title = this.state.title;
          const message = this.state.message;
          return (
            <Dialog title={title} message={message}>
              <input value={this.state.username} onChange={this.handleChange} />
              <button onClick={this.handleInput}>登录</button>
            </Dialog>
          );
        }
      }

      ReactDOM.render(<SignUpDialog />, div);

      // 十二、React哲学
      const JSON_DATA = [
        {
          category: "Sporting Goods",
          price: "$49.99",
          stocked: true,
          name: "Football",
        },
        {
          category: "Sporting Goods",
          price: "$9.99",
          stocked: true,
          name: "Baseball",
        },
        {
          category: "Sporting Goods",
          price: "$29.99",
          stocked: false,
          name: "Basketball",
        },
        {
          category: "Electronics",
          price: "$99.99",
          stocked: true,
          name: "iPod Touch",
        },
        {
          category: "Electronics",
          price: "$399.99",
          stocked: false,
          name: "iPhone 5",
        },
        {
          category: "Electronics",
          price: "$199.99",
          stocked: true,
          name: "Nexus 7",
        },
      ];

      // ReactDOM.render(<FilterableProductTable products={JOSN_DATA} />, div);

      // FilterableProductTable        搜索列表组件
      //  SearchBar                  搜索栏组件
      //  ProductTable               产品组件
          //  ProductCategoryRow     产品分类组件
          //  ProductRow             产品细节组件

      // 为div元素渲染React组件FilterableProductTable,并且传入一个对象作为props:{products:JSON_DATA}
      // ReactDOM.render(<FilterableProductTable products={JSON_DATA} />, div);

      // 搜索列表组件(包括搜索栏组件和产品组件)
      class FilterableProductTable extends React.Component {
        constructor(props){
            super(props);
            this.state = {
              filterText: '',
              inStockOnly: false
            }

            this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
            this.handleInStockChange = this.handleInStockChange.bind(this);
        }

        handleFilterTextChange(filterText){
          this.setState({filterText: filterText})
        }
        handleInStockChange(inStockOnly){
          this.setState({inStockOnly: inStockOnly})
        }
        render() {
          return (
            <div>
              <SearchBar 
                  filterText = {this.state.filterText}
                  inStockOnly = {this.state.inStockOnly}
                  onFilterTextChange = {this.handleFilterTextChange}
                  onInStockChange = {this.handleInStockChange}
              />
              <ProductTable products={this.props.products} filterText = {this.state.filterText} inStockOnly = {this.state.inStockOnly} />
            </div>
          );
        }
      }
      // 这里this.props.products就是传入的JSON_DATA
      // 在FilterableProductTable组件中渲染了SearchBar组件和ProductTable组件,并且给ProductTable组件传入一个对象作为props:{products:JSON_DATA}

      // 搜索栏组件
      class SearchBar extends React.Component {
        constructor(props){
             super(props);
             this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
             this.handleInStockChange = this.handleInStockChange.bind(this); 
             
        }
        handleFilterTextChange(e){
          this.props.onFilterTextChange(e.target.value);
        }
        handleInStockChange(e){
          this.props.onInStockChange(e.target.checked)
        }
        render() {
          const filterText = this.props.filterText;
          const inStockOnly = this.props.inStockOnly;
          return (
            <form>
              <input type="text" placeholder="Search..." value = {filterText} onChange = {this.handleFilterTextChange} />
              <p>
                <input type="checkbox" checked = {inStockOnly} onChange = {this.handleInStockChange} /> Only show products in stock
              </p>
            </form>
          );
        }
      }

      // 产品组件
      class ProductTable extends React.Component {
        render() {
          let rows = [];
          let isAppear = null;
          const filterText = this.props.filterText;
          const inStockOnly = this.props.inStockOnly;
          const products = this.props.products;

          products.forEach( item => {
            if(item.name.indexOf(filterText) === -1){
              return;
            }
            if(inStockOnly && !item.stocked){
              return;
            }
            if(item.category !== isAppear){
              rows.push(<ProductCategoryRow  category={item.category} key={item.category}/>);
            }
            rows.push(<ProductRow product={item} key={item.name}/>);
            isAppear = item.category;
          })
          return (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          );
        }
      }
      
      // 产品分类组件
      class ProductCategoryRow extends React.Component{
        render(){
          const category = this.props.category;
          return (
            <tr>
              <th colSpan="2">{category}</th>
            </tr>
          )
        }
      }
      
      // 产品细节组件
      class ProductRow extends React.Component{
        render(){
          const product = this.props.product;
          const name = product.stocked ? (product.name) : (<span style={{color:"red"}}>{product.name}</span>);
           return (
            <tr>
              <td>{name}</td>
              <td>{product.price}</td>
            </tr>
           )
        }
      }

      ReactDOM.render(<FilterableProductTable products={JSON_DATA} />, div);

</script>
```

# 图片懒加载 09-16

IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：callback 是可见性变化时的回调函数，option 是配置对象（该参数可选）。

```javascript
var observer = new IntersectionObserver(callback, option);
```

callback 一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```javascript
var callback = function (props) {
  console.log(props);
};
```

回调函数的参数 props 是一个数组,数组中的每一位都是 IntersectionObserverEntry 对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，props 数组就会有两个成员。IntersectionObserverEntry 对象有以下 6 个属性:

- time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- target：被观察的目标元素，是一个 DOM 节点对象
- rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
- boundingClientRect：目标元素的矩形区域的信息
- intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
- ntersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

开始观察

```javascript
observer.observe(document.getElementById("example"));
```

停止观察

```javascript
observer.unobserve(element);
```

关闭观察器

```javascript
observer.disconnect();
```

以下我实现了一个简单的图片懒加载

```html
<div class="app">
  <img data-src="流程图.png" alt="" class="img" />
</div>
```

```css
body {
  height: 1000px;
}
.app {
  width: 300px;
  height: 300px;
  position: relative;
  top: 700px;
  background-color: red;
}
```

```javascript
//获取dom元素
const img = document.getElementsByClassName("img")[0];

// 创建观察器实例
let io = new IntersectionObserver(function (props) {
  // 如果用户滑动界面到图片所在的区域时,则加载图片资源
  if (props[0].isIntersecting) {
    const img = props[0].target;
    img.src = img.dataset.src;
    io.unobserve(img); // 停止观察
  }
});
// 观察img元素
io.observe(img);
```

# 闻泰校招笔试 09-17

- 动态路由参数的获取
- css 盒模型
- js 数组方法
- css3 特性
- 行内元素
- 闭包
- vue 常用方法
- vue 指令
- js 基本数据类型
- 清除浮动
- 数组去重
- vue 生命周期
- cookie、sessionStorage 和 localStorage 的区别
- 父子组件通信
- 水平垂直居中

# 唯品会笔试 09-18

 - 进程线程
 - 操作系统的算法
 - 树
 - 栈和队列
 - http
 - 二进制
 - 递归
 - tcp和udp

```javascript
// 给定字符串s 要求把s中多于一个的连续空压缩成一个空格 并将连续的非空格字符串倒序打印出来
// abc   def ghi
// cba fed ihg

let str = readline().replace(/\s+/g," ");
let arr = str.split(' ');
let len = arr.length;
let answer = "";
for(let i = 0; i < len; i++){
    arr[i] = arr[i].split('').reverse().join(',').replace(/,/g,'');
    answer += arr[i] + " ";
}
print(answer)


// 给定一个无序数组 包含正数 负数 和 0 要求从中找出3个数的乘积 使得乘积最大 要求时间复杂度为O(n) 空间复杂度为O(1)
// 4   数组长度
// 10 -50 20 -1 数组元素 元素为整数 用空格隔开

// 1000

let len = parseInt(readline());
let arr = readline().split(" ").sort((a,b) => a - b);
let answerArr = [];
for(let i = 0; i <= len - 3; i++){
    for(let j = 1; j <= len - 2; j++){
        for(let q = 2; q <= len - 1; q++){
            if(i != j && i != q && j != q){
                answerArr.push(arr[i] * arr[j] * arr[q]);
            }
        }
    }
}
print(Math.max(...answerArr))
```

# 正则表达式 09-19

```javascript
// 转义符号：\
var str = "abc\""
//  \n -> 换行
//  \r -> 行结束
//  \t -> table(一个缩进)制表符

// 正则表达式的作用：匹配特殊字符或有特殊搭配原则的字符的最佳选择

// 两种创建方式
//  直接量(推荐使用)
//  new RegExp()

// var reg = /abc/;      修饰符
// var reg = /abc/i      这里i表示忽视大小写
// var reg = /abc/g      这里g表示全局匹配
// var reg = /abc/m      这里m表示多行匹配

var str = "abc\na";

console.log(str.match(reg));    // 返回所有匹配的字符串数组

var reg = /^a/gm  // ^ -> 表示以什么开头匹配

console.log(str.match(reg));    // 返回所有行以a开头的字符串数组

var reg = new RegExp("abc")  // 第一个参数为匹配规则  第二个参数为如何匹配

console.log(reg.test(str));  // 返回true

// 表达式
var reg = /[1234567890][1234567890][1234567890]/g;   // 一个[]表示一位的范围
var reg = /[^a][^b]/g  // ^ 在表达式里表示的意思是非  表示的是第一位不是a,第二位不是b的匹配
var str = "123456asdas4565";
console.log(str.match(reg));   // ["123","456","456"]

// 元字符
// \w === [0-9A-z_]
// \W === [^\w]
// \d === [0-9]  -> 查找数字
// \D === [^d]
// \s === [\t\n\r\v\f ]  -> 查找空白字符
// \S === [^\s]
// \b === 单词边界
// \B === 非单词边界
// . === [^\r\n]   -> 除了换行和行结束符
```
  
# 度小满笔试 09-20

  - 盒子模型
  - 串
  - prim算法
  - 折半查找法
  - &&
  - 电子邮件发送接收协议
  - H5表单元素
  - H5 server-sent
  - 二叉树
  - 最长回文子串
  - 栈
  - COUNT()
  - 进程
  - 前置摄像头代码
  - P问题和NP问题
  - <<
  - 银行家算法(不安全状态死锁)
  - toLocaleString()

# 前端本地存储对比 09-21

web storage  HTML5新增本地存儲
不同瀏覽器不可以共享 大小為5MB
不與服務器進行通信，減少了交互，節省了網絡流量 獲取數據的速度較快 不會隨著http請求發送到服務器 操作數據比較方便
只能存儲字符串類型

localStorage 本地存儲 除非用戶刪除 否則一直存在 相同瀏覽器不同頁面可以共享
常用於長期登錄判斷用戶是否登陸

sessionStorage 會話存儲 隨著瀏覽器或窗口關閉而消失  常用於敏感性登錄

cookie 長度和數量的限制，每個域最多能有20個cookies，且大小為4kb，否則多餘會被截掉，有安全性問題。
在設置的過期時間內都不會消失，直到過期
# http小结 09-22

http1.1支持长链接，在同一个tcp连接下可以有多次http请求，而在http1.0中需要使用keep-alive参数

http1.1支持只发动header头部信息，而不带body，避免了浏览器传一整个对象,但是只有其中一部分内容用的上，节约了带宽

http1.1请求消息和响应消息都支持host域

缓存上，增加了缓存策略除了Expires外还多了Etag等更多的缓存头来控制缓存

新增了24个错误信息以及状态码

还多了几个请求方式

2.0比1.1多了头部数据压缩，减小了数据体积，网络传输更快了

同一个连接并发处理多个请求，请求的数量也多了很多

引入了server push 允许服务器推送资源给浏览器 在浏览器请求之前 可以从本地加载资源 而不用通过网络

http 是明文传输 https是在SSL/TLS层加密后传输的密文

连接方式不同，默认端口也不同
http为80
https为443

https可以有效的防止运营商劫持，需要申请证书，要收费

# 闻泰科技面试 09-23
 
  - 惯例自我介绍
  - 问我专业开了什么课程
  - 为什么学前端
  - promise
  - async await
  - vue路由守卫
  - vue生命周期
  - MVVM模式
  - 为什么做这个项目
  - vue定义方法的是哪个属性
  - vuex
  - mutation和action的区别
  - computed和watch的区别
  - 自己怎么学的前端
  - 反问

# 遍历对象 09-24

Object.keys() 可以取得对象上所有可枚举的实例属性，返回一个包含所有可枚举属性的字符串数组

for-in可以遍历出实例上的属性，也可以遍历出原型上的属性

Object.getOwnPropertyName()
可以遍历出实例上可枚举和不可枚举的属性，不可以遍历原型上的属性

# vue复制粘贴组件09-25

# 360笔试 09-26
  
  - 线性规划
  - 背包价值
  - UDP特点
  - video标签
  - 预编译
  - svg定义元素轮廓颜色的属性
  - 文字灰色去下划线css
  - body父节点
  - 闭包
  - Symbol('a') === Symbol('a') 考察 '==='
  - Object.defineProperty  Object.keys
  - String()
  - DOM添加子节点
  - H5拖拽(如果将一个DOM元素拖到一个盒子里,那么这个盒子需要有什么方法)
  - Window系统上的IIS不包含什么服务
  - setInterval
  - ">" 选择器
  - vue框架模式
  - 没有用贪心策略的算法
  - 串S="babab"的Next数值为
  - 求解递归方程的三种方法
  - 网段
  - 自然连接
  - parseInt
  - 运算符(也考察了闭包)
  - socket描述符需要哪三个参数
  - 跨域
  - 正则
  - contenteditable
  - 队
  - 双端栈
  - 什么规定了输入域的选项列表
  - border-width属性值
  - IPVL地址缩写
  - H5组合标题元素
  - 弹性布局 flex
  - 前端存储
  - overflow
  - jq在元素后添加元素的方法

# 微众银行笔试 09-27

  - 立即执行函数
  - 预编译
  - 作用域
  - svg优势
  - 行块级元素
  - 3D渲染透视效果
  - 怎么获取scrollTop的值
  - 前端存储
  - Media queries外部文件引入方法
  - innerHTML
  - jq添加删除样式
  - js对象复制
  - readonly和disabled
  - 数组去重(包括引用值)
  - 数组结构转树
  - 求两个日期之间的所有日期

# 数组去重(包括引用值)、数组结构转树 

```javascript

// 原型链编程去重
Array.prototype.unique = function(){
    return this.reduce((acc, value) => {
        const arr = acc.map( item => JSON.stringify(item));
        return arr.includes(JSON.stringify(value)) ? acc : [...acc, value]
    }, [])
}
const arr1 = [
    1,
    "aaa",
    1,
    "aaa",
    { a: 1 },
    { a: 1 },
    [1, 2, 3],
    [1, 2, 3]
]
console.log(arr1.unique());
/**
 * 
 * @param {Array} arr 需要转树形结构的数组
 * @param {*} parId 父节点id
 * @return {arr} 树形数组
 */
function toTree(arr, parId){
    let len = arr.length;    // 获取数组长度用于遍历

    // 编写子函数用于递归寻找子节点,参数为父节点id
    function loop(parId){
        let newArr = [];     // 创建一个空数组
        // 遍历数组
        for(let i = 0;i < len; i ++){
            let item = arr[i]          // 取需要转树数组的每一项
            // 首先找出最外层父节点(判断id是否为传入的id),然后递归寻找子节点,然后将节点放入新数组
            if(item.parentId === parId){
                item.children = loop(item.id);
                newArr.push(item)
            }
        }
        
        return newArr      // 返回新数组
    }

    return loop(parId)
}
let arr =[
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:1,name:'部门A',parentId:2},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
console.log(toTree(arr,0));

```



# webpack从0搭建vue项目

1. 新建一个文件夹取名为lgowenBlog
2. vscode打开这个文件夹,在终端输入npm init -y初始化npm
3. 然后在本地安装webpack,在终端输入指令npm install webpack webpack-cli --save-dev或npm install webpack webpack-cli -D
4. 在终端继续输入npm i -D html-webpack-plugin,这个插件自动帮我们在html文件内引入js文件,避免了我们每次要自行引入的麻烦
5. 新建一个public文件夹,在里面新建一个index.html文件,自动生成结构随便写点东西就好
6. 新建一个build文件夹,在里面新建一个webpack.config.js,输入以下代码
```javascript
   const path = require('path');   // 引入path模块
   const HtmlWebpackPlugin = require('html-webpack-plugin')   //这里引入插件npm i -D html-webpack-plugin
   module.exports = {
       mode:'development', // 开发模式
       entry: path.resolve(__dirname,'../src/index.js'),    // 入口文件
       output: {
         filename: '[name].[hash].js',      // 打包后的文件名称
         path: path.resolve(__dirname,'../dist')  // 打包后的目录
       },
       //插件注入
       plugins:[
         new HtmlWebpackPlugin({
           template:path.resolve(__dirname,'../public/index.html')
         })
       ]
   }
```
7. 然后我们可以尝试用npm run build打包项目,成功的话我们能在dist文件夹下看见一个index.html文件,且自动引入了我们的index.js文件
8. 由于hash每次生成的不同，导致每次打包都会将新的main.js打包到dist文件夹，所以我们需要一个插件来打包前删除dist文件
9. 安装插件npm i -D clean-webpack-plugin
```javascript
   const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin') //这里引入插件npm i -D html-webpack-plugin
   const {CleanWebpackPlugin} = require('clean-webpack-plugin')   //这里引入插件npm i -D clean-webpack-plugin
   module.exports = {
     mode: 'development', // 开发模式
     entry: path.resolve(__dirname, '../src/index.js'), // 入口文件
     output: {
       filename: '[name].[hash].js', // 打包后的文件名称
       path: path.resolve(__dirname, '../dist') // 出口的文件夹
     },
     //插件注入
     plugins: [
       new HtmlWebpackPlugin({
         template: path.resolve(__dirname, '../public/index.html')
       }),
       new CleanWebpackPlugin()
     ]
   }
```


# vue3.0与vue2.0的对比

## diff算法

在vue2.0中,diff算法会一个个进行比较每一个虚拟dom,从而去替换渲染成新的dom tree
在vue3.0中,新增了*静态标记(PatchFlag)*,在与虚拟dom比较时,只对比带有静态标记的节点,并且可以通过静态标记知道当前节点要对比的具体内容

 - TEXT = 1 动态文本节点
 - CLASS = 2 动态class
 - STYLE = 4 动态style
 - PROPS = 8 动态属性，但不包含类名和样式
 - FULL_PROPS = 16 具体动态key属性 当key改变时 需要进行完整的diff对比
 - HYDRATE_EVENTS = 32 带有监听事件的节点
 - STABLE_FLAGMENT = 64 一个不会改变子节点顺序的FLAGMENT
 - KEYED_FLAGMENT = 128 带有key属性的Flagment 或 部分子节点有key
 - UNKEYED_FLAGMENT = 256 子节点没有key的Flagment
 - NEED_PATCH = 512 一个节点只会进行非props比较
 
## 静态提升(hoistStatic)

在vue2.0中,无论元素是否参与更新,每次都会重新创建重新渲染
在vue3.0中,对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时复用

提升前:
```html
<div>
  <p>我是静态的</p>
  <p>{{msg}}</p>
</div>
```

```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "我是静态的"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

提升后:
```javascript
const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "我是静态的", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

## 事件侦听器缓存(cacheHandlers)

默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化
但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可

缓存前:
```html
<div>
  <div @click="showBtn">Click</div>
</div>
```

```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", { onClick: _ctx.showBtn }, "Click", 8 /* PROPS */, ["onClick"])
  ]))
}
```

提升后:
```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.showBtn && _ctx.showBtn(...args)))
    }, "Click")
  ]))
}
```

## Vite

- Vite是Vue作者开发的一款意图取代webpack的工具
- 其实现原理是利用ES6的import会发送请求去加载文件的特性
- 拦截这些请求，做一些预编译，省去webpack长时间的打包

- 安装Vite
   npm install -g create-vite-app
- 利用Vite创建vue3项目
   create-vite-app projectName
- 安装依赖运行项目
   cd projectName
   npm install
   npm run dev

## Composition API

  - ref函数只适用于简单数据类型
  - reactive适用于复杂数据类型


# 圣杯布局

## 浮动实现圣杯布局
```css
   .header,.footer{
            width: 100%;
            height: 300px;
        }
        .header{
            background-color: red;
        }
        .footer {
            background-color: blue;
        }
        .main {
            padding-left: 200px;
            padding-right: 150px;
        }
        .center,.left,.right {
            float: left;
            position: relative;
        }
        .main .center{
            width: 100%;
            background-color: blueviolet;
        }
        .left{
            width: 200px;
            margin-left: -100%;
            left: -200px;
            background-color: antiquewhite;
        }
        .right {
            width: 150px;
            margin-right: -150px;
            background-color: aqua;
        }
```
```html
    <div class="header"></div>
        <div class="main">
            <div class="center">我在中间</div>
            <div class="left">我是左边</div>
            <div class="right">我是右边</div>
        </div>
    <div class="footer"></div>
```

## flex实现圣杯布局
```css
   .header,.footer{
            width: 100%;
            height: 300px;
        }
        .header{
            background-color: red;
        }
        .footer {
            background-color: blue;
        }
        .main {
            display: flex;
        }
        .main .center{
            flex: 1;
            background-color: blueviolet;
        }
        .left{
            width: 200px;
            background-color: antiquewhite;
        }
        .right {
            width: 150px;
            background-color: aqua;
        }
```
```html
    <div class="header"></div>
        <div class="main">
            <div class="center">我在中间</div>
            <div class="left">我是左边</div>
            <div class="right">我是右边</div>
        </div>
    <div class="footer"></div>
```


# vue3.0

## setup函数
 
 - setup: 里面this直接是undefined
 - beforeCreated: 这时候的组件创建好了,但是还不能获取到data和methods
 - created: 这时候的组件创建好了,data中的数据和methods中的方法也可以访问到了
 - 只能是同步的,不能是异步的

## ref
1. 什么是ref
   - ref和reactive一样，也是用来实现响应式数据的方法
   - 由于reactive必须传递一个对象，所以导致在企业开发中
     如果我们只想让某个变量实现响应式的时候会非常麻烦
     所以vue3就给我们提供了ref方法，实现对简单值的监听
2. ref本质
   - ref底层的本质其实还是reactive
     系统会自动根据我们给ref传入的值将它转换成ref(xxx) -> reactive({value:xx})
3. ref注意点
   - 在Vue中使用ref的值不用通过value获取
   - 在Js中使用ref的值必须通过value获取

## reactive
1. 什么是reactive
 - reactive是Vue3中提供的实现响应式数据的方法
 - 在vue2中响应式数据是通过defineProperty来实现的
 - 而在vue3中响应式数据是通过ES6的Proxy来实现的
  
2. reactive注意点
 -  reactive的参数必须是对象(json/数组)
 -  如果给reactive传递了其他对象
   + 默认情况下修改对象, 界面不会自动更新
   + 如果想更新,可以通过重新赋值的方式

## ref和reactive的区别
  - 如果在template使用的数据类型是ref的话,则vue会自动帮我们添加.value
  - 如果在template使用的数据类型是reactive的话,则vue不会帮我们自动添加.value
  
## Vue是如何决定是否需要自动添加.value
  - Vue在解析数据之前,会判断这个数据是否是ref类型的
  - 如果是就自动添加.value,不是就不自动添加.value

## Vue是如何判断当前的数据是否是ref
  - ref数据身上有一个_v_ref属性,值为true
  - reactive数据是一个Proxy对象
  - isRef方法和isReactive方法可以判断
  
## 递归监听实现响应式数据(ref和reactive)
  
  - 将每一个数据包装成一个Proxy对象
  - 如果数据量较大,非常消耗性能
  
## 非递归监听数据(shallowRef和shallowReactive)

  - 如果是通过shallowRef创建数据,那么Vue监听的是.value的变化,并不是第一层的变化
  - 如果是通过shallowRef创建数据,并且想直接修改内部层级的数据且重新渲染到页面上可以使用triggerRef方法
  - 如果是通过shallowReactive创建数据,那么Vue监听的是第一层的变化,并会重新将数据渲染到页面
  - 同理shallowRef的原理也是通过shallowReactive实现的

## toRaw
  
```javascript
   let obj = {age: 18}
   let state = reactive(obj)
   let obj2 = toRaw(state)
   // 在这里obj是state的引用, state是一个Proxy对象,引用了obj
   // 如果想实现某些操作不需要追踪，UI界面不需要刷新更改，不想消耗更多的性能时
   // 可以通过toRaw方法获取原始数据,能够实现更改数据不刷新页面,性能也就好了
   // obj === obj2
```


## markRaw

```javascript
   let obj = {age: 18}
   obj = markRaw(obj)
   let state = reactive(obj)
   state.age = 20
   // 这时候state就不会被追踪,因此修改不会改变ui
```

## toRef

   - ref(obj.name) -> ref(18) -> reactive({value:18})
   - ref -> 复制 修改响应式数据原始数据不会改变,会重新渲染UI
   - toRef -> 引用 修改响应式数据原始数据会改变,不会重新渲染UI
   - 应用场景: 如果想让响应式数据和以前的数据关联起来,并且更新响应式数据后不想更新UI,则可以使用

## toRefs
```javascript
   let obj = {name:'lgowen',age:18}
   /*
       let state = toRefs(obj) ->
       let name = toRef(obj,'name')
       let age = toRef(obj,'age')
   */
```

## customRef

 - 自定义响应式数据

```javascript
import {customRef} from 'vue'
export default {
  name: 'App',
  setup() {
      let state = myRef('../public/hero.json')
      return {state}
  }
}

function myRef(value){
  return customRef((track, trigger) => {
    fetch('../public/hero.json')
           .then((res) => {
              return res.json()
           }).then(data => {
              console.log(data);
              value = data  // 将请求回来的数据赋值给value
              trigger()   // 告诉Vue触发更新ui界面
           }).catch(err => {
              console.log(err);
           })
    return {
      get(){
        track() // 告诉Vue这个数据是需要追踪变化的
        console.log('get', value);
        return value
      },
      set(newVal){
        console.log('set', newVal);
        value = newVal
        trigger()  // 告诉Vue触发更新ui界面
      }
    }
  })
}
```


## ref获取元素

## readonly家族

  - readonly用于创建只读递归数据
  - shallowReadonly用于创建只读数据
  - isReadonly用于判断该数据是否为只读数据

## proxy实现响应式数据
```javascript
    let obj = { name: 'lgowen', age: 18}
    let state = new Proxy(obj, {
        get(obj, key){
           return obj[key]
        },
        set(obj, key, value){
            obj[key] = value
        }
    })
    console.log(state.name);
    state.age = 19
console.log(state.age);
```

```javascript
    let arr = [1, 3, 5]
    let state = new Proxy(arr, {
        get(obj, key){
           return obj[key]
        },
        set(obj, key, value){
            obj[key] = value
            return true
        }
    })
    state.push(7)
    console.log(state)
```


## 手写Composition API

1. reactive -> 用于定义响应式数据(复杂数据类型:对象/数组)

```javascript
  function reactive(obj){
     if(typeof obj === 'object'){
       if(obj instanceof Array){
          obj.forEach((item, index) => {
            if(item === 'object'){
              obj[index] = reactive(item)
            }
          })
       }else{
         for(key in obj){
           let item = obj[key]
           if(item === 'object'){
             obj[key] = reactive(item)
           }
         }
       }

       return new Proxy(obj, {
          get(obj, key){
             return obj[key]
       },
          set(obj, key, val){
             obj[key] = val
             return true
       }
     })
    }else{
      console.warn(`${obj}不是数组或对象`)
    }
  }
```

2. ref -> 用于定义响应式数据(基本数据类型)

```javascript
   function ref(value){
      // 基于reactive
      // ref(1) -> reactive({value:1})
      return reactive({value})
   } 
```

3. shallowReactive -> 只能响应式第一层
   
```javascript
   function shallowReactive(obj){
      return new Proxy(obj, {
       get(obj, key){
          return obj[key]
       },
       set(obj, key, val){
          obj[key] = val
          return true
       }
     })
   }
```

4. shallowRef 

```javascript
   function shallowRef(value){
       return shallowReactive({value})
   }
```

5. readonly

```javascript
   function readonly(obj){
     if(typeof obj === 'object'){
       if(obj instanceof Array){
          obj.forEach((item, index) => {
            if(typeof item === 'object'){
              obj[index] = readonly(item)
            }
          })
       }else{
          for(key in obj){
            let item = obj[key]
            if(typeof item === 'object'){
               obj[key] = readonly(item)
            }
          }
       }
        return new Proxy(obj, {
        get(obj, key){
          return obj[key]
        },
        set(obj, key, val){
          console.warn(`${key}是只读数据,不可修改`)       
        }
      })
     }else{
       console.log(`${obj}不是数组或对象`)
     }
   }
```

6. shallowReadonly -> 不可遍历的只读响应式数据

```javascript
   function shallowReadonly(obj){
      return new Proxy(obj, {
        get(obj, key){
          return obj[key]
        },
        set(obj, key, val){
          console.warn(`${key}是只读数据,不可修改`)       
        }
      })
   }
```

7. isReactive

8. isRef

9. isReadonly