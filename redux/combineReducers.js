export default function combineReducers(reducers) {
    return function (state = {}, action) {
        let hasChanged = false;//标记state是否更新
        const nextState = {};
        for (const key in reducers) {
            //获取单个reducer 注意：每个reducer中的action type不要重名 否则会触发其他reducer计算新的state 出现非预期的状态更新
            const reducer = reducers[key];
            const previousStateForKey = state[key];//获取旧状态
            const nextStateForKey = reducer(previousStateForKey, action);//计算新状态 action命中会返回新的状态否则返回旧状态
            //赋值给nextState对象 合并成一个对象
            nextState[key] = nextStateForKey;
            //判断state是否修改
            hasChanged = hasChanged || previousStateForKey !== nextStateForKey
        }
        //如果状态没有更新返回旧的状态state  否则返回新的状态
        //可以在组件shouldComponentUpdate生命周期 进行状态，属性的是否更新比较 避免不必要的渲染
        return hasChanged ? nextState : state;
    }
}