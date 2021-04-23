---
title: Diferences between function based and class based components in React JS
subtitle: State and Lifecycle in React. Container and presentational components. React interview cheatsheet series
date: 2020-02-07
update: 2021-23-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'React', 'reactjs']
---

According to the official [ReactJS documentation](https://reactjs.org/docs/components-and-props.html) we can define React components in two ways:

- As a function
- or as a EC6 Class


A **function components** is the simpliest way to define a React JS component, and should be like:

```javascript
function MyComponent(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
It is simple function that accepts *props* as arguments and returns a React element.

A **class component** uses the ES6 class syntax to be written. The same component that above should looks like:

```javascript
class MyComponent extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

But, beyond syntax differences, which is the main difference between function and class components?
Basically, and first at all, the states.

You can find more details again in official documentation about [class components states and lyfecycle](https://reactjs.org/docs/state-and-lifecycle.html).

But to summarize, I would say that the main purpose to use ES6 class components instead of function components is just the use of states.

If you don't have states, and just use props, you can use function, you don't need to use a class based component. Even more when React 16.8 introduced the hooks, and you can use [useState hook](https://reactjs.org/docs/hooks-state.htm) and [useEffect hook](https://reactjs.org/docs/hooks-effect.html) which is similar to componentDidMount, componentDidUpdate and componentWillUnmount combined.


According to React Team, functional components are:

- Easier to read and test because they are plain JavaScript functions without state or lifecycle-hooks.
- Force you adopting good practices, separating container and presentational components forcing you to think better about states. **You should use functional components if you are writing a presentational component**.
- Performance benefits on functional components rather than class based components.

