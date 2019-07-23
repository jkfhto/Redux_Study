import React from 'react';
import PropTypes from 'prop-types';
/**
1. 要从属性对象中取得store
2. 通过上下文传递给下级组件 store={}
 */
export default class extends React.Component{
    static childContextTypes = {
        store:PropTypes.shape({
            getState:PropTypes.func.isRequired,
            subscribe:PropTypes.func.isRequired,
            dispatch:PropTypes.func.isRequired
        })
    }
    getChildContext(){
        return {store:this.props.store};//返回一个对象，这个对象将会成为子上下文对象
    }
    render(){
        return this.props.children;
    }
}