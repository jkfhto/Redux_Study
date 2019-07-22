function bindActionCreator(actionCreator, dispatch) {
    return function () {
        //派发动作
        dispatch(actionCreator(arguments));
    }
}

export default function bindActionCreators(actionCreators, dispatch) {
    
    //处理函数
    if (typeof actionCreators ==='function'){
        bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error(
            `bindActionCreators expected an object or a function, instead received ${
            actionCreators === null ? 'null' : typeof actionCreators
            }. ` +
            `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
        )
    }

    //处理对象
    const boundActionCreators = {}
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            //绑定属性为bindActionCreator返回的函数
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    //返回绑定action后的对象
    return boundActionCreators
    
}