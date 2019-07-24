/**
 * reduce有四个参数
 * previousValue: 上一次调用callback时返回的值
 * currentValue: 正在处理的数组元素
 * index: 正在处理的数组元素下标
 * array: 被处理的数组
 */
export default function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }
    //将 funcs 中的所有匿名函数，[f1, f2, ... , fx, ..., fn]，组装成一个新的函数，当新的函数执行时，[f1, f2, ... , fx, ..., fn]，从右到左依次执行（ 所以顺序很重要）
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}