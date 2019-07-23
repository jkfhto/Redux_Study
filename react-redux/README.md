# React-redux

React-redux 学习总结

## 需要解决的问题

前端中应用的状态存在的问题：一个状态可能被多个组件依赖或者影响，而 React.js 并没有提供好的解决方案，我们只能把状态提升到依赖或者影响这个状态的所有组件的公共父组件上，我们把这种行为叫做状态提升。但是需求不停变化，共享状态没完没了地提升也不是办法。

后来我们在 React.js 的 context 中提出，我们可用把共享状态放到父组件的 context 上，这个父组件下所有的组件都可以从 context 中直接获取到状态而不需要一层层地进行传递了。但是直接从 context 里面存放、获取数据增强了组件的耦合性；并且所有组件都可以修改 context 里面的状态就像谁都可以修改共享状态一样，导致程序运行的不可预料。

## 解决的方法

把 context 和 store 结合起来？毕竟 store 的数据不是谁都能修改，而是约定只能通过 dispatch 来进行修改，这样的话每个组件既可以去 context 里面获取 store 从而获取状态，又不用担心它们乱改数据了。

## 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

Redux 的 React 绑定库是基于 [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的开发思想。

|               | 展示组件                     | 容器组件                        |
| --------------| --------------------------  | --------------------------      |
| 作用           | 描述如何展现（骨架、样式）    | 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux |否                           | 是                              |
| 数据来源       | props                       | 监听 Redux state                |
| 数据修改       | 从 props 调用回调函数        | 向 Redux 派发 actions            |
| 调用方式       | 手动                        | 通常由 React Redux 生成           |

## react-redux Api

- connect: 容器组件（容器组价），处理store与context结合，仓库的取值和订阅，派发action等重复的逻辑。
- Provider：通过上下文对象向下层组件提供store，让所有容器组件都可以访问 store，而不必显式地传递它。只需要在渲染根组件时使用即可。
