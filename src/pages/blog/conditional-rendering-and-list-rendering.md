---
title: Conditional rendering and List rendering
subtitle: React interview cheatsheet series
date: 2021-23-04
update: 2021-23-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React fundamental topics']
---

A quick answer in a interview would be something like:

In ReactJS you can create components that renders different code depends on the state of the app, so for example:

```javascript
function ConditionalRenderingComponent(props) {
  const isTrue = props.isTrue;
  return ( <p>It's { isTrue ? 'true' : 'false' }</p> );
}

ReactDOM.render(
  <ConditionalRenderingComponent isTrue={true} />,
  document.getElementById('root')
);
```

So our component is listening a state var or a prop and depends on its value, the component renders a block of code or other.

### Lists and keys

Each time you render a list, you have to set a unique key to that list so react knows which elements (list items) are changed and which not, avoiding render more than the needed.

Important to mention **ReactJS's key prop**, which gives you the ability to control component instances.
Each time React renders your components, it's calling your functions to retrieve the new React elements that it uses to update the DOM. If you return the same element types, it keeps the same DOM, even if the props changed.
The exception to this is the key prop. This allows you to return the exact same element type, but force React to unmount the previous instance, and mount a new one.

Also to mention that using [index as a key is an anti-pattern](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318). If the prop 'key' is used to identify DOM elements which are unmounted and mounted again, if the key prop is the same again and again, Reacts think that the DOM is exactly the same than before, which is not the case.

So instead of doing this:

```javascript
todos.map((todo, index) => (
    <Todo {...todo} key={index} />
  ));
}
```

Do this:
```javascript
todos.map((todo) => (
    <Todo {...todo} key={todo.id} />
  ));
}
```
The only exception is when the list of elemets are static, they are not filtered or reorders,, or they don't have an id either. 

See official doc: [https://reactjs.org/docs/conditional-rendering.html](https://reactjs.org/docs/conditional-rendering.html "Conditional Rendering").

