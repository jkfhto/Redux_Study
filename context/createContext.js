import React from "react";

function createContext() {
    class Provider extends React.Component {
        static value;
        constructor(props) {
            super(props);
            Provider.value = props.value;//通过props.value获取共享的状态
            this.state = { value: props.value };
        }

        //每当此组件接收到新的属性的时候，都会执行这个方法，这个方法会返回新的状态对象
        static getDerivedStateFromProps(nextProps, prevState) {
            Provider.value = nextProps.value;
            return prevState;
        }

        render() {
            //直接返回子组件
            return this.props.children;
        }
    }


    class Consumer extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            //子组件是一个函数 直接执行函数
            return this.props.children(Provider.value)
        }
    }
    return { Provider, Consumer }
}

module.exports = createContext;