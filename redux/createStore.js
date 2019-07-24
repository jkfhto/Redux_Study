export default function createStore(reducer, enhancer) {
    //处理middleware 中间件
    //enhancer：applyMiddleware(...middleware)的执行结果
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let state;
    let listeners = [];//事件订阅

    //返回当前的状态
    function getState(){
        return state;
    }

    //订阅事件，用于状态变更，触发view渲染。返回一个取消订阅的方法
    function subscribe(listener){
        listeners.push(listener);

        //取消事件订阅
        return function(){
            listeners = listeners.filter(function (item){
                return item !== listener;
            })
        }
    }

    function dispatch(action){
        state = reducer(state, action);//获取新的状态
        //发布事件  触发view更新
        listeners.forEach(function(listener){
            listener();
        })
    }

    dispatch({ type: "@@TYEP/REDUX_INIT" });//初始化数据 state赋值为reducer中的默认值

    return {
        dispatch,
        subscribe,
        getState,
    }
}