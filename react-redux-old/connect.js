import React from 'react';
import { bindActionCreators } from '../redux';
import PropTypes from 'prop-types';
/**
此方法负责把组件和仓库进行关联，或者说进行连接
 */
export default function (mapStateToProps, actions) {
    return function (WrappedComponent) {
        return class extends React.Component {
            static contextTypes = {
                store: PropTypes.shape({
                    getState: PropTypes.func.isRequired,
                    subscribe: PropTypes.func.isRequired,
                    dispatch: PropTypes.func.isRequired
                })
            }
            constructor(props, context) {
                super(props);
                //通过上下文对象获取store 并将状态映射到Props 同时过滤不需要的状态
                //mapStateToProps:
                //1.使用起来更简单了 
                //2.过滤不需要的状态 可以避免shouldComponentUpdate 状态比较出现不可预期的效果 因为如果其他组件派发了动作会导致reducer生成新的store状态对象 如果没有过滤不需要的状态 shouldComponentUpdate会比较store整个对象对应的状态 此时当前状态发生了更新会触发组件重新渲染 如果过滤了不需要的状态 shouldComponentUpdate会比较store中对应的子状态 只有派发了动作的子状态才更新了 相应组件才会重新渲染 未派发动作的组件状态没有更新 不会重新渲染 从而减少了无用的渲染
                this.state = mapStateToProps(context.store.getState());
                //处理actions
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