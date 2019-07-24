import compose from './compose';
export default function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (...args) {
            let store = createStore(...args);//创建store
            let dispatch;
            //中间件api
            let middlewareAPI = {
                getState: store.getState,//获取仓库中的状态
                //dispatch指向箭头函数会指向包装后的dispatch 即compose(...chain)(store.dispatch) 这样就可以解决多层嵌套派发action的问题
                dispatch: (...args) => dispatch(...args)//派发动作
            };
            const chain = middlewares.map(middleware => middleware(middlewareAPI));
            //compose 是函数式编程中的组合，compose 将 chain 中的所有匿名函数，[f1, f2, ... , fx, ..., fn]，组装成一个新的函数，即新的 dispatch，当新 dispatch 执行时，[f1, f2, ... , fx, ..., fn]，从右到左依次执行（ 所以顺序很重要）
            dispatch = compose(...chain)(store.dispatch);
            //返回重写dispatch方法后的store
            return {
                ...store,
                dispatch
            };
        }
    }
}