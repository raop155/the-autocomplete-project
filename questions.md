# Questions

1. What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between `PureComponent` and a `Component` is that the `PureComponent` performs a shallow comparison on internal primitives states and properties passed from parent to child.
The `PureComponent` version of a `Functional Component` is to wrap the latter in `React.memo`
An example where `PureComponent` can save you from breaking your application, is when the parent executes many states so it is re-rendered many times causing the children or `Components` to also have to re-render, so if we use a `PureComponent` as a child of this parent component we could avoid many re-renders that are not necessary if we meet the conditions mentioned above.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Probably `ShouldComponentUpdate` will conflict with any `React Context API` values and will not update/re-render the component in a good way or simply ignore it, and if we use a `PureComponent` could make it worse.

3. Describe 3 ways to pass information from a component to its PARENT.
   
- Pass some `function`(**prop**) from the parent component to the child component, then the child component call this function.
- Use the built-in `React Context` Provider and then use the context to send data from the child component and receive it in the parent component.
- Use third-party `State Manager` like `Redux, Recoil, Jotai, etc`, same as `React Context` we can **hook** the child component then calls some function and then receive the data in the parent component.


4. Give 2 ways to prevent components from re-rendering.
   
- `PureComponent` or `React.memo` with `Functional Component`, makes a shallow comparison on primitives states/props and prevents unnecessary re-renders.
- `useCallback`, `useMemo`, the first **memoize** the function and only change if one of his deps array[] change, this prevent re-creating the same function and passing to the child, so the child does not re-render again. the second one **memoize** the value, and same as the first one only change if one of his deps array[] change, this is useful is the value is from an expensive calculation, helps performance too.


5. What is a fragment and why do we need it? Give an example where it might break my app.

A `Fragment` is a way to encapsulate your components into one, keeping in mind that you can only return a `JXS` from a single node to be valid, the `Fragment` helps this to don't generate an unnecessary `div` in order to wrap multiple components where you don't want to add a new `div`.

The ways to create a `Fragment` are as follows:
- `<React.Fragment></React.Fragment>`
- `<Fragment></Fragment>`
- `<></>`

I have not found a case where a `Fragment` causes me to break my application, I believe it can only happen if you use ways 1 or 2 of how to create a `Fragment` and you forget to import it from the `react` library and this causes an error.

6. Give 3 examples of the HOC pattern.

`HOC` or `High-Order Components` are components that takes a component as a param and return other component.

Examples:
- When you want to pass fixed styles to `any` component:
  
```typescript
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

- When you want to add **extra** functionality to `any` component
  
```typescript
function withLogger(Component) {
  return props => {
    const log = (message:string) => {
      console.log(message)
    }
    return <Component log={log} {...props} />
  }
}

const App = () = <div>This is my app</div>
const AppLogger = withLogger(App)
```

- Redux
```typescript
  import { connect } from 'react-redux';
  function App() {
      return (props) => {
          ...
      };
  }

  const mapStateToProps = (state) => {
      return {
          isAuth: state.isAuth,
      };
  };

  const mapDispatchToProps = (dispatch) => {
      return {
          setAuth: (status) => dispatch(setAuth(status)),
      };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(App);
```



7. What's the difference in handling exceptions in promises, callbacks and async...await.
- Promise:
For **callback chaining** we need to use a `.then().catch()` mechanism to catch any error that could be thrown by the **callback chaining** promise that could not be resolved. We are also able to chain with `.then()` after the `.catch()` to do some clean up if we want to.

```typescript
  asyncFunction()
    .then(...)
    .catch(console.error)
```

- Async Await:
For **async/await** we need to use a `try{} catch{}` mechanism to catch any error that could be thrown by the **async/await** promise that could not be resolved. We also have a `finally{}` handler after `catch{}` to do some cleanup if we want to.

```typescript
  async function run() {
      try {
        await asyncFunction();
      } catch (e) {
        console.error(e);
      }
  }
```


8. How many arguments does setState take and why is it async.
The `setState` function takes one argument that can be:

```typescript
  this.setState ({ value: 0 }); // an object
  this.setState((state) => ({ value: state.value + 1})); // a function
```

`setState` is async because of **reconciliation** where the component re-renders, the states does not gets update inmediately, they wait for the **reconciliation** algorithm.
`reconciliation` is where the **V-DOM** compares to the **DOM** and checks if any updates needs to be done.


9. List the steps needed to migrate a Class to Function Component.
- Change `Class` Component to a `Functional Component`.
- Delete the **constructor**.
- Remove the **render** method. 
- Functions should have proper syntax as `const foo = () => {}`
- Remove `this` and `this.state` and replace with `useState` hook and initialize it.
- Use `useState set` function instead of `this.setState`.
- Replace `componentDidMount` and `componentDidUpdate` with `useEffect` hook.
- Replace `componentWillUnmount` with the **return** function from  `useEffect` hook
  
```typescript
  useEffect(() => {
    // componentDidMount
    // componentDidUpdate
    return () => {
      //componentWillUnmount
    }
  }, [])
```


10.  List a few ways styles can be used with components.
- Inline style
```typescript
  function App() {
    return <div style={{
      color: 'blue',
      backgroundImage: 'url(' + imgUrl + ')',
    }}>
    Hello World!
    </div>;
  }
```

- Class style
```css
  .list{
    border: 2px solid green;
    width: 40%:
    list-style-type: none;
  }
 
  .item{
    color: blue;
    font-size: 23px;
  }
```
```typescript
  function App() {
    <ul className='list'>
      <li className='item'>Name : {name}</li>
      <li className='item'>Class: {classNo}</li>
    </ul>
  }
```
- CSS in JS (Styled-components) third-party library

```typescript
  import styled from "styled-components";

  export const StyledApp = styled.div`
    display: block;
    width: 100%;
  `;

  function App() {
    return <StyledApp>Styled App with Styled-Components!</StyledApp>
  }
```



11. How to render an HTML string coming from the server.

As I used in the **Autocomplete Project**
You have to use this: `dangerouslySetInnerHTML={{ __html: data }}`
It is not a good practice to use this but in some cases is necessary.

```typescript
  <li
   className="suggestion"
    key={originalWord}
    tabIndex={0}
    dangerouslySetInnerHTML={{ __html: word }}
    onClick={() => handleSelectedWord(originalWord)}
    onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
      if (e.key === "Enter") {
        handleSelectedWord(originalWord);
      }
    }}
  ></li>
```