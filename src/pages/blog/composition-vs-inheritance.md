---
title: Composition vs Inheritance
subtitle: React interview cheatsheet series
date: 2021-24-04
update: 2021-24-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React fundamental topics']
---

React has a powerful composition model, and the React Team **recommends to use composition instead of inheritance to reuse code between components**.
However, there can be cases where inheritance is preferred to composition like reusing a particular functionality of a component than the component itself.

As you know, in OOP inheritance emans that classes and objects inherit properties and behaviors from their parent.

Many times, a parent component doesn't know about its children, think in a sidebar or an alert box component, so we can use composition as a powerful tool to reuse code and share props between components.

Composition uses the children prop to pass the all the elements, see:

```javascript
const AlertBox = (props) => (
  <div className={'alertbox alertbox__' + props.type}>
    {props.children} // will renders: <p>This is just a dummy message!</p>
  </div>
);

const loreIpsum = () => (
  <AlertBox type="error">
    <p>This is just a dummy message!</p>
  </AlertBox>
);

```

Also, using composition is a simple way to avoid props drilling when we have just a few nesting components.