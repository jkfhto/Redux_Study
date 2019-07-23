import React, { Component } from "react";
import ReactReduxContext from './context';

/**
1. 要从属性对象中取得store
2. 通过上下文传递给下级组件
 */
export default class Provider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactReduxContext.Provider value={{ store: this.props.store }}>
                {this.props.children}
            </ReactReduxContext.Provider>
        )
    }
}