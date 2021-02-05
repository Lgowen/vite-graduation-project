---
wrapperClass: 'data_structure' // wrapperClass will wrapped current md file
title: 'title'
desc: 'desc'
---

# 数据结构

## 线性数据结构

### 数组

数组是将相同类型的元素存储于连续内存空间的数据结构，其长度不可变。
如下图所示，构建此数组需要在初始化时给定长度，并对数组每个索引元素赋值，代码如下：
```javascript
   let array = new Array(5)
   array[0] = 2
   array[1] = 3
   array[2] = 1
   array[3] = 0
   array[4] = 2
```
或者可以使用直接赋值的初始化方式，代码如下：
```javascript
   let array = [2, 3, 1, 0, 2]
   array[index]  // index为索引 访问数组
   array.push(value)    // value为添加的新值 添加元素(数组结尾)
   array.pop()          // 删除元素(数组结尾)
   array.unshift(value) // value为添加的新值 添加元素(数组开头)
   array.unshift(value) // 删除元素(数组开头)
```
以上数组的四种方法的返回值都为执行该操作后数组的长度

### 链表

链表以节点为单位，每个元素都是一个独立对象，在内存空间的存储是非连续的。链表的节点对象具有两个成员变量：「值 val」，「后继节点引用 next」 。

```javascript
   function ListNode (val) {
     this.val = val
     this.next = null
   }
```

实例化节点
```javascript
   let node1 = new ListNode(4)
   let node2 = new ListNode(5)
   let node3 = new ListNode(6)
   node1.next = node2
   node2.next = node3
```

来源leetcode:https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/50e446/

![Picture3.png](https://pic.leetcode-cn.com/1599578767-zgLjYw-Picture3.png)



### 栈

栈是一种具有 「先入后出」 特点的抽象数据结构，可使用数组或链表实现。 

如下图所示，通过常用操作「入栈 push()」,「出栈 pop()」，展示了栈的先入后出特性。

在这里我们用javascript中的数组模拟实现
```javascript
   let array = []
   array.push(1)   // [1]     添加元素
   array.push(2)   // [1,2]   添加元素
   array.pop()     // [1]     删除元素
   // 以上能够简单的实现栈的先入后出:元素1先入栈，元素2后入栈，元素2先出栈
```

![Picture4.png](https://pic.leetcode-cn.com/1599578767-ZifMEX-Picture4.png)


### 队列

队列是一种具有 「先入先出」 特点的抽象数据结构，可使用链表实现。

在这里我们用javascript中的数组模拟实现
```javascript
   let array = []
   array.push(1)   // [1]     添加元素
   array.push(2)   // [1,2]   添加元素
   array.shift()     // [2]     删除元素
   // 以上能够简单的实现栈的先入先出:元素1先入队，元素2后入队，元素1先出队
```

![Picture5.png](https://pic.leetcode-cn.com/1599588416-Majmwh-Picture5.png)


## 非线性数据结构

### 树

树是一种非线性数据结构，根据子节点数量可分为 「二叉树」 和 「多叉树」，最顶层的节点称为「根节点 root」。以二叉树为例，每个节点包含三个成员变量：「值 val」、「左子节点 left」、「右子节点 right」 。

```javascript
   function TreeNode(val) {
       this.val = val
       this.left = null
       this.right = null
   }
```

如下图所示，建立此二叉树需要实例化每个节点，并构建各节点的引用指向。

```javascript
// 初始化节点
   let node1 = new TreeNode(3)  // 根节点root
   let node2 = new TreeNode(4)
   let node3 = new TreeNode(5)
   let node4 = new TreeNode(1)
   let node5 = new TreeNode(2)

// 构建引用指向
   node1.left = node2
   node1.right = node3
   node2.left = node4
   node2.right = node5
```

![Picture6.png](https://pic.leetcode-cn.com/1599579136-bBARpC-Picture6.png)

### 图
图是一种非线性数据结构，由「节点（顶点）vertex」和「边 edge」组成，每条边连接一对顶点。根据边的方向有无，图可分为「有向图」和「无向图」。本文 以无向图为例 开展介绍。

如下图所示，此无向图的 顶点 和 边 集合分别为:
  - 顶点集合： vertices = {1, 2, 3, 4, 5}
  - 边集合： edges = {(1, 2), (1, 3), (1, 4), (1, 5), (2, 4), (3, 5), (4, 5)}

![Picture7.png](https://pic.leetcode-cn.com/1599579136-Fxseew-Picture7.png)

表示图的方法通常有两种：
1. 邻接矩阵： 使用数组 vertices 存储顶点，邻接矩阵 edges 存储边； edges[i][j] 代表节点 i + 1 和 节点 j + 1 之间是否有边。

```javascript
   let vertices = [1, 2, 3, 4, 5]
   let edges = [[0, 1, 1, 1, 1],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 0, 0, 1],
                [1, 0, 1, 1, 0]]
```

2. 邻接表： 使用数组 vertices 存储顶点，邻接表 edges 存储边。 edges 为一个二维容器，第一维 i 代表顶点索引，第二维 edges[i] 存储此顶点对应的边集和；例如 edges[0] = [1, 2, 3, 4] 代表 vertices[0] 的边集合为 [1, 2, 3, 4]

```javascript
   let vertices = [1, 2, 3, 4, 5]
   let edges = [[1, 2, 3, 4],
                [0, 3],
                [0, 4],
                [0, 1, 4],
                [0, 2, 3]]
```

![image-20210126114845513](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210126114845513.png)

### 散列表

散列表是一种非线性数据结构，通过利用 Hash 函数将指定的「键 key」映射至对应的「值 value」，以实现高效的元素查找。

`设想一个简单场景：小王、小吴、小丽的学号分别为 10001, 10002, 10003 。
现需求从「姓名」查找「学号」。`

自行设计 Hash 函数：
此时，我们构造一个简单的 Hash 函数（ \%% 为取余符号 ），公式和封装函数如下所示：hash(key)=(key−1)%10000
```JavaScript
   const names = ['小王', '小吴', '小丽']
   function hash(id) {
       return (id - 1) % 10000
   }
```
则我们构建了以学号为 key 、姓名对应的数组索引为 value 的散列表。利用此 Hash 函数，则可在 O(1) 时间复杂度下通过学号查找到对应姓名，即：
```javascript
   names[hash(10001)] // 小王
   names[hash(10002)] // 小吴
   names[hash(10003)] // 小丽
```

### 堆

堆是一种基于「完全二叉树」的数据结构，可使用数组实现。以堆为原理的排序算法称为「堆排序」，基于堆实现的数据结构为「优先队列」。堆分为「大顶堆」和「小顶堆」，大（小）顶堆：任意节点的值不大于（小于）其父节点的值。

![image-20210126140430386](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210126140430386.png)

如下图所示，为包含 1, 4, 2, 6, 8 元素的小顶堆。将堆（完全二叉树）中的结点按层编号，即可映射到右边的数组存储形式。

![Picture9.png](https://pic.leetcode-cn.com/1599584901-xoiGEQ-Picture9.png)

通过使用「优先队列」的「压入 push()」和「弹出 pop()」操作，即可完成堆排序，实现代码如下:
```javascript
   // 初始化小顶堆
   let heap = []
   // 元素入堆
   heap.push(1)
   heap.push(4)
   heap.push(2)
   heap.push(6)
   heap.push(8)
   // 元素出堆（从小到大）
   heap.shift(); // -> 1
   heap.shift(); // -> 2
   heap.shift(); // -> 4
   heap.shift(); // -> 6
   heap.shift(); // -> 8
```


以上资料图来源：https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/50e446/


