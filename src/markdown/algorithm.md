---
wrapperClass: 'algorithm' // wrapperClass will wrapped current md file
title: 'title'
desc: 'desc'
---

# 排序算法

## 冒泡排序
```javascript
function bubbleSort(arr){
   for(let i = 0; i < arr.length; i++){
       let complete = true
       for(let j = 0; j < arr.length - i - 1; j++){
           if(arr[j] > arr[j + 1]){
               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
               complete = false
           }
       }
       if(complete) break
   }
   return arr
}
```
## 快速排序
```javascript
function quickSort(arr, start, end){
    if(end - start < 1) return 

    let target = arr[start]
    let l = start
    let r = end
    while(l < r){
        while(l < r && arr[r] >= target){
           r--
        }
        arr[l] = arr[r]
        while(l < r && arr[l] < target){
            l++
        }
        arr[r] = arr[l]
    }
    arr[l] = target
    quickSort(arr, start, l - 1)
    quickSort(arr, l + 1, end)
    return arr
}
```

## 归并排序
```javascript
function mergeSort(arr, left, right, temp){
    if(left < right){
        const mid = Math.floor((left + right) / 2)
        mergeSort(arr, left, mid, temp)
        mergeSort(arr, mid + 1, right, temp)
        merge(arr, left, right, temp)
    }
}

function merge(arr, left, right, temp){
   const mid = Math.floor((left + right) / 2)

   let leftIndex = left
   let rightIndex = mid + 1
   let tempIndex = 0

   while(leftIndex <= mid && rightIndex <= right){
       temp[tempIndex++] = arr[leftIndex] < arr[rightIndex] ? arr[leftIndex++] : arr[rightIndex++]
   }
   while(leftIndex <= mid){
       temp[tempIndex++] = arr[leftIndex++]
   }
   while(rightIndex <= right){
       temp[tempIndex++] = arr[rightIndex++]
   }

   tempIndex = 0
   for(let i = left; i <= right; i++){
       arr[i] = temp[tempIndex++]
   }
}
```

## 插入排序
```javascript
function insertSort(arr){
    for(let i = 1; i < arr.length; i++){
        let target = i
        for(let j = i - 1; j >= 0; j--){
            if(arr[j] > arr[target]){
                [arr[j], arr[target]] = [arr[target], arr[j]]
                target = j
            }else{
                break
            }
        }
    }
    return arr
}
```
## 选择排序
```javascript
function selectionSort(arr){
   for(let i = 0; i < arr.length - 1; i++){
       let minIndex = i
       for(let j = 1; j < arr.length; j++){
           if(arr[j] < arr[minIndex]){
               minIndex = j
           }
       }
       [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
   }
}
```
# 查找算法

## 二分查找
```javascript
function binarySearch(arr, target, left, right){
    if(left > right) return -1

    const mid = Math.floor((left + right) / 2)

    if(arr[mid] === target) return mid
    return arr[mid] < target ? binarySearch(arr, target, left, mid - 1) : binarySearch(arr, target, mid + 1, right)
}
```

## 统计一个数字在排序数组中出现的次数。
```javascript
function findNumCount(arr, target){
    if(arr && arr.length > 0 && target != null){
       const firstIndex = getFirstIndex(arr, target, 0, arr.length - 1)
       const lastIndex = getFirstIndex(arr, target, 0, arr.length - 1)
       if(firstIndex != -1 && lastIndex != -1){
           return lastIndex - firstIndex + 1
       }
    }
    return 0
}

function getFirstIndex(arr, target, first, last){
    if(first > last) return -1

    const mid = Math.floor((first + last) / 2)
    if(arr[mid] === target){
        arr[mid - 1] !== target ? mid : getFirstIndex(arr, target, first, mid - 1)
    }
    return arr[mid] > target ? getFirstIndex(arr, target, first, mid - 1) : getFirstIndex(arr, target, mid + 1, last)
}

function getLastIndex(arr, target, first, last){
    if(first > last) return -1

    const mid = Math.floor((first + last) / 2)
    if(arr[mid] === target){
        arr[mid + 1] !== target ? mid : getFirstIndex(arr, target, first, mid + 1)
    }
    return arr[mid] > target ? getFirstIndex(arr, target, first, mid - 1) : getFirstIndex(arr, target, mid + 1, last)
}
```


# 分治法

## 求逆序对:在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。
```javascript
function InversePairs(arr){
   return mergeSort(arr, 0, arr.length - 1, [])
}

function mergeSort(arr, left, right, temp){
   if(left < right){
       const mid = Math.floor((left + right) / 2)
       let l = mergeSort(arr, left, mid, temp)
       let r = mergeSort(arr, mid + 1, right, temp)
       let m = mergeSort(arr, left, right, temp)
       return l + r + m
   }else{
       return 0
   } 
}

function merge(arr, left, right, temp){
   const mid = Math.floor((left + right) / 2)

   let leftIndex = mid 
   let rightIndex = right
   let tempIndex = right - left
   let count = 0
   while(leftIndex >= left && rightIndex > mid){
       if(arr[leftIndex] > arr[rightIndex]){
           count += (rightIndex - mid)
           temp[tempIndex--] = arr[leftIndex--]
       }else{
           temp[tempIndex--] = arr[rightIndex--]
       }
   }
   while(leftIndex >= left){
       temp[tempIndex--] = arr[leftIndex--]
   }
   while(rightIndex > mid){
       temp[tempIndex--] = arr[rightIndex--]
   }

   tempIndex = 0
   for(let i = left;i <= right; i++){
       arr[i] = temp[tempIndex++]
   }
}
```



# 简单

## 1.两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

> 示例:
> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。


```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    const hashMap = new Map()  // 构建哈希表
    const len = nums.length    // 取数组长度
    for(let i = 0; i < len; i++) {
        // 判断数组的每一项在哈希表(差值表)中存不存在
        if(hashMap.has(nums[i])) {
           // 存在的话返回[差值的索引值, 当前索引值]
           return [hashMap.get(nums[i]), i]
        }else {
            // 否则往哈希表里存(差值, 差值的索引值)
            hashMap.set(target - nums[i], i)
        }
    }
};
```


## 7.整数反转

给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 ，就返回 0。


```javascript
/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
    const sign = x > 0 ? 1 : -1  // 对数字做符号判断
    const res = (Math.abs(x) + '').split('').reverse().join('') * sign // 取绝对值 —> 转数组 -> 反转数组 -> 转字符串 -> 加符号
    if(res > Math.pow(2, 31) - 1 || res < Math.pow(2, 31) * -1) return 0 // 溢出判断
    return res
};
```


## 9.回文数

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。


```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
    return (x + '').split('').reverse().join('') == x // 转字符串 -> 转数组 —> 反转数组 -> 转字符串 -> 与原来的数作比较
};
```

## 13.罗马数字转整数

```javascript
/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function(s) {
    const romanList = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
        IV: 4,
        IX: 9,
        XL: 40,
        XC: 90,
        CD: 400,
        CM: 900
    }
    let res = 0
    const len = s.length
    for(let i = 0; i < len;) {
       if( i + 1 < len && romanList[s.substring(i, i + 2)] ) {
          res += romanList[s.substring(i, i + 2)]
          i += 2
       }else {
           res += romanList[s.substring(i, i + 1)]
           i++
       }
    }
    return res
};
```


## 14.最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    const str = strs[0]  // 取第一位作为判断基础
    if(!str) return ''    // 空数组处理
    let res = ''          // 结果
    for(let i = 0; i < str.length; i++) {
        // 判断strs中的每一位的字母是否相等 
        let sign = strs.every(item => item[i] == str[i])
        if(sign) {
            res += str[i]
        }else{
            return res
        }
    }
    return res
};
```

## 14.最长公共前缀


```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    const str = strs[0]
    if(!str) return ''
    let res = ''
    for(let i = 0; i < str.length; i++) {
        let sign = strs.every(item => item[i] == str[i])
        if(sign) {
            res += str[i]
        }else{
            return res
        }
    }
    return res
};
```
## 20.有效的括号

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c == '{' || c == '[' || c == '(') { // 是左括号，入栈
      stack.push(c);
    } else {                                // 是右括号
      if (stack.length == 0) {              // 此时栈空，无法匹配
        return false;
      }
      const top = stack[stack.length - 1];  // 获取栈顶
      if (top == '(' && c == ')' || top == '[' && c == ']' || top == '{' && c == '}') {
        stack.pop();                        // 如果栈顶是对应的左括号，被匹配，出栈
      } else {                              // 不是对应的左括号，无法匹配
        return false;
      }
    }
  }
  return stack.length == 0; // 栈空，则所有左括号找到匹配；栈中还剩有左括号，则没被匹配
};
```

## 21.合并两个有序链表

```javascript
   /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2
    if(l2 === null) return l1
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    }else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}
```


## 26. 删除排序数组中的重复项

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let p1 = 0
    let p2 = 0
    while(p2 < nums.length) {
        if(nums[p1] != nums[p2]){
            p1++
            nums[p1] = nums[p2]
        }
        p2++
    }
    return p1 + 1
};
```

## 27. 移除元素

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let ans = 0 
    for(const num of nums) {
        if(num != val){
            nums[ans] = num
            ans++
        }
    }
    return ans
};
```

# 剑指offer

## 二维数组的查找
```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var findNumberIn2DArray = function(matrix, target) {
    if(matrix.length == 0 || matrix[0].length == 0) return false
    let x = 0
    let y = matrix[0].length - 1
    while(x < matrix.length && y >= 0){
        const key = matrix[x][y]
        if(key == target) {
            return true
        }else if(key < target){
            x++
        }else {
            y--
        }
    }
    return false
};
```

## 数组中重复的数字

```javascript
   /**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const hash = {}
    for(const num of nums){
        if(!hash[num]){
            hash[num] = true
        }else {
            return num
        }
    }
};
```

## 替换空格

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/g, '%20')
};
```


## 旋转链表
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    if(head === null) return []
    const stack = []
    while(head){
       stack.push(head.val)
       head = head.next
    }
    return stack.reverse()
};
```

## 前序、中序重建二叉树
```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(!preorder.length || !inorder.length) return null
    const firstNum = preorder[0]
    const head = new TreeNode(firstNum)
    const index = inorder.indexOf(firstNum)
    head.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
    head.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return head
};
```
