---
title: React Refs in a glance
subtitle: React interview cheatsheet series
date: 2021-24-04
update: 2021-24-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React intermediare topics']
---

React Refs provide a way to access DOM nodes or React elements created in the render method.

In the regular dataflow, props are the way that parent components interact with their children, and modifying a child component, you re-render it with new props. But sometimes, you don't want to modify a child inside the flow, but an instance of a component, or the DOM. of a component For these cases are used the Refs.

For example, using Refswhen you need to find out the DOM given by a component in order to  make oprations in the UI with it, for example absolute positioning it into the screen, or make an animation or forcing a focus state, *in these case, having a direct reference to that node element to modify it imperatively, is really useful*.

The ref attibute is String type.



React 16.3 introduced **React.createRef()** but also, we can use the hook **useRef()**

#### React.createRef() in a Class Component

Given this example:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.myTextInputRef = React.createRef();
    this.myHighlightTextRef = React.createRef();
  }

  forceFocus = () => {
    this.myTextInputRef.current.focus();
    this.myHighlightTextRef.current.className = "highlight";
  }

  render() {
    return (
      <div>
        <p>
          <span ref={this.myHighlightTextRef}>Click to focus the button and highlight this text using Refs:</span>
        </p>
        <p>
          <input type="text" ref={this.myTextInputRef} />
        </p>
        <p>
          <button onClick={this.forceFocus}>Click me!</button>
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

See at this [codepen](https://codepen.io/albertofortes/pen/PoWVpJp).

The logic is the following:

1. In the constructor we assign the Ref with **React.createRef()**: ```this.myTextInputRef = React.createRef();```
2. In the render method we set the ref with the **ref** atribute: ```<input type="text" ref={this.myTextInputRef} />```
3. And finally, when a ref has been passed to an element in the render, the reference to the node becomes accessible at the **current** attribute of the ref: ```this.myTextInputRef.current.focus();```

#### useRef() Hook

Of course we can use React Refs in functional programming using the *useRef* hook.

The previous code would be equivalent to:

```javascript
const { useRef } = React

function App() {
  const myTextInputRef = useRef();
  const myHighlightTextRef = useRef();
  
  forceFocus = () => {
    myTextInputRef.current.focus();
    myHighlightTextRef.current.className = "highlight";
  }
  
  return (
    <div>
      <p>
        <span ref={myHighlightTextRef}>Click to focus the button and highlight this text using Refs:</span>
      </p>
      <p>
        <input type="text" ref={myTextInputRef} />
      </p>
      <p>
        <button onClick={forceFocus}>Click me!</button>
      </p>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

##### But... What happen if we want to access to a ref from another component?

To do taht, we need to wrap the component with **React.forwardRef**  which allows to the wrapped component getting a reference and pass to its children, so the example above would be:

```javascript
const { useRef } = React

function App() {
  const myTextInputRef = useRef();
  const myHighlightTextRef = useRef();
  const ExternalHighlightTextRef = useRef();
  
  forceFocus = () => {
    myTextInputRef.current.focus();
    myHighlightTextRef.current.className = "highlight";
    ExternalHighlightTextRef.current.className = "highlight";
  }
  
  return (
    <div>
      <p>
        <span ref={myHighlightTextRef}>Click to focus the button and highlight this text using Refs:</span>
      </p>
      <p>
        <input type="text" ref={myTextInputRef} />
      </p>
      <p>
        <button onClick={forceFocus}>Click me!</button>
      </p>
      
      <JustAComponent ref={ExternalHighlightTextRef} />
    </div>
  );
};

const JustAComponent = React.forwardRef((props, ref) => 
  <p><span ref={ref}>External component</span></p>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

See [codepen](https://codepen.io/albertofortes/pen/NWdopLY)