import React from 'react';
import { bindActionCreators } from '../redux';
import ReactReduxContext from './context';
/**
此方法负责把组件和仓库进行关联，或者说进行连接
 */
export default function (mapStateToProps, actions) {
    return function (WrappedComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext;
            constructor(props, context) {
                super(props);
                //通过上下文对象获取store 并将状态映射到Props 同时过滤不需要的状态
                this.state = mapStateToProps(context.store.getState());
                if (typeof actions == 'function') {
                    this.boundActions = actions(context.store.dispatch, props);
                } else {
                    this.boundActions = bindActionCreators(actions, context.store.dispatch);
                }
            }

            //订阅事件  store更新自动触发页面渲染
            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(
                    () => this.setState(mapStateToProps(this.context.store.getState())));
            }

            //移除订阅事件
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {

                return <WrappedComponent {...this.state} {...this.boundActions} />
            }
        }
    }
}