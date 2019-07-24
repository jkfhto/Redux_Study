export default function ({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            //action是函数 直接执行函数  传参dispatch 递归处理派发action
            if (typeof action === 'function') {
                return action(dispatch);
            } else {
                next(action);
            }
        }
    }
}