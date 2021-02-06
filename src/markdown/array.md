---
title: 数组
---

This is a student from the beginning of this year to learn front end, was beaten by society and then recorded every day of learning. Have you come to see yourself studying today? If my article is lucky enough to be seen by you, I hope you can keep studying with me.
# 数组的方法

## map

map接收两个参数(callback(currentValue, index, array), thisArg)
第一个参数是一个回调函数,回调函数接收三个参数
1. currentValue: 遍历数组时每一次的值,简单来说是数组的每一项
2. index: currentValue的在数组中的位置(索引值)
3. arr: 调用map方法的数组

`callback 函数只会在有值的索引上被调用，那些从来没被赋过值或者使用 delete 删除的索引则不会被调用`
`callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。`

```javascript
   const arr = ['1', '2', '3']
   const answer = arr.map(parseInt)
   console.log(answer)  // [1, NaN, NaN]
   
   // 在这里callback函数传入了parseInt
   // parseInt接收两个参数(toIntValue, base)
   // toIntValue: 要被转换的值
   // base: 要转换为多少进制
   // 自然而然我们的callback函数将currentValue和index传入给了parseInt函数作为参数
   // 所以结果为 [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)]
```

## entries


```javascript
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}

console.log(a);                         // 遍历完毕，输出next.value的数组
```