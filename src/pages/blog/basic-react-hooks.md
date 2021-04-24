---
title: Basic react Hooks
subtitle: React interview cheatsheet series
date: 2021-24-04
update: 2021-24-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React fundamental topics']
---

Hooks are a new addition in React 16.8. and allows us to write functional programming (with function component) instead of class oriented programming (class components).

The basic hooks are:

* [useState()](https://reactjs.org/docs/hooks-state.html "Using the State Hook"). Which replaces the state of the class component types.
* [useEffects()](https://reactjs.org/docs/hooks-effect.html "Using the Effect Hook"). Which replaces the lifecycle methods like componentDidMount, componentDidUpdate, componentWillUnmount of the class component types.
* [useContext()](https://reactjs.org/docs/hooks-reference.html#usecontext "Using the Context Hook"). Which is used in Context API

The logic behind useState and useEffect is pretty clear and better adding just a code block that will explain how they work:

```javascript
function AddOne() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("Please click on the button.");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTitle(`You clicked ${count} times`);
  });

  return (
    <>
      <p>You clicked {count} times</p>
      Count: {count}
      <button onClick={() => setCount(count++)}>+1</button>
    </>
  );
}
```

####useContext()

About **useContext()**, accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest **<MyContext.Provider>** above the calling component in the tree.

This is the offical example at documentation:

```javascript
const { useState, useContext } = React

const greetings = {
  hi: "Hi there!",
  bye: "Bye bye!"
};
const AppContext = React.createContext(greetings.hi);


function Display() {
  const value = useContext(AppContext);

  return (
    <div>
      <p>{value}</p>   
    </div>
  );
}

const App = () => {
  return (
    <>
      <AppContext.Provider value={greetings.bye}>
        <Display />
      </AppContext.Provider>
      </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
[See codepen](https://codepen.io/albertofortes/pen/eYgxJNj)