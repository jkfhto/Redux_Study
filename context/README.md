# React Context

组件跨层级通信

- 组件跨层级通信 - Context上下文 提供一种不需要每层设置props就能跨多级组件传递数据的方式
- 这种模式下有两个角色，Provider和Consumer
- Provider为外层组件，用来提供数据；内部需要数据时用Consumer来读取

## 基本实现

- 创建上下文
  
   ```javascript
      const MyContext = React.createContext();
   ```

- 提供上下文

   ```javascript
      const { Provider } = MyContext;
      export default function App() {  
          return (
              <div>
                  <Provider value={{foo: "bar"}}>
                      <Child />
                  </Provider>
              </div>  
          );
      }
   ```

- 消费上下文

  ```javascript
      function Child2(props) {
          return <div>{props.foo}</div>
      }

      export default function App() {
          return (
              <div>
                  <Provider value={{ foo: "bar" }}>
                      <Consumer>
                          {value => <Child2 {...value} />}
                      </Consumer>
                  </Provider>
              </div>
          );
      }
  ```
