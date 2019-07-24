//判断是不是Promise对象
function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then == 'function';
}
export default function ({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            //action.payload是promise对象 直接执行promise then方法
            return isPromise(action.payload) ? action.payload.then(function (result) {
                //回调函数派发action并返回promise的结果
                dispatch({ ...action, payload: result });
            }).catch(error => {
                dispatch({ ...action, payload: error, error: true });
                return Promise.reject(error);
            }) : next(action);//直接派发action
        }
    }
}