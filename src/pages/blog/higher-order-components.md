---
title: Higher-Order Components
subtitle: React interview cheatsheet series
date: 2021-04-25
update: 2021-04-25
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React intermediare topics']
---

A Higher-Order Components is a technique to reuse components, it's just a pattern to do a normal component but specificaly made to reuse code. In summary is just **a function that takes a component and returns a new component which que want to reuse across the app**.

If you sometimes had to copy&paste code from components to other, you found a perfect use case of HOCs.
Let's se a very practical example of Higher-Order component:

*Imagine we have a blog with comments on every post. There is a comment box following of a list of the comments.
We want that the comment list is visible for all the visitors of the site, but the ability to comment, edit, or remove the own comments requires user authentification.*

So in that case, we need to component that ask for the user autentification, so this is a perfect case to creame a Higher-Order Component that we could call *RequireAuthentification*.

If the RequireAuthentification component returns false, won't be possible to access to CommentBox controller. This HOC will act sort of a middleware of the final component, so:

```
APP -> CommentList
APP -> RequireAuthentification (HOC) -> CommentBox
App -> RequireAuthentification (HOC) -> Edit screen
```

#### Steps to create an Higher-Order component.

We can follow some steps in order to create a HOOC:

1. Write the logic we wan to use in a regular component.
2. Create a HOC file and adding the HOC scaffold (in other words, the HOC bolierplate).
3. Move the reusable logic into the HOC created at point 2.
4. Pass props, config, or behavior through to child component.


As we said, an HOC is a function that takes a component as an argument and returns a component. So this Higher-Order component always will have a patter similar to this:

```javascript
import React from 'react';

const HigherOrderComponent = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent />;
    }
  }
    
  return HOC;
};

// Invoke the HOC like:
const SimpleHOC = HigherOrderComponent(MyComponent);
```

So in our RequireAuthentification example we should invoke in this way:

```javascript
RequireAuthentification(CommentBox);
```

Let's go to create our HOC in these steps.

##### Step 1: Write the logic we wan to use in a regular component

We have a dummy APP which contains two components: CommentBox and the propper App:

```javascript
const { useState } = React;

function CommentBox() {
  const [comment, setComment] = useState('');
  
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(comment);
    setComment(''); // clear the textarea
  };
  
  return (
    <div>
      <form onSubmit ={handleSubmit}>
        <h4>Add a Comment</h4>
        <textarea onChange={handleChange} value={comment} />
        <div>
          <button className="submit-comment">Submit Comment</button>
        </div>
      </form>
    </div>
  );
}

function App(props) {
  const [auth, setAuth] = useState(false);
  
  const renderButton = () => {
   if(auth) {
      return <button onClick={() =>setAuth(false)}>Sign Out</button>; // calling the action
    } else {
      return <button onClick={() => setAuth(true)}>Sign In</button>
    }
  };
  
  return (
    <div>
      {renderButton()}
      <CommentBox />
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

When the user is not logged, the button shows "log in", and viceversa. Now the code just show that button at App.renderButton() and the comment box bellow. 
If the user clicks on Log in, the state *auth* becomes true and viceversa (obviously no more logic is needed for this dummy example).

Let's go with next step.

##### Step 2: Create a HOC file and adding the HOC boilerplate

```javascript
const RequireAuth = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      return <OriginalComponent {...this.props} />
    }
  }
  
  return NewComponent;
}
```

##### Step 3: Move / Create the reusable logic into the HOC created at point 2.

```javascript
const RequireAuth = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      if (!this.props.auth) {
         return false;
      } else {
        return <OriginalComponent {...this.props} /> 
      }
    }
  }
  
  return NewComponent;
}
```

##### Step 4: Pass props, config, or behavior through to child component.

To call a HOC we use this syntax:


So instead of calling to ```<CommentBox />``` at App Controller render method, we create a const like:

```javascript
const CommentBoxWithAuth = RequireAuth(CommentBox);
```
So the HOC wraps the original CommentBox component and it will return the result that is another Component...


And the final code would be:

```javascript
const { Component, useState, useEffect } = React;

const RequireAuth = OriginalComponent => {
  class NewComponent extends React.Component {   
    render() {
      if (!this.props.auth) {
         return false;
      } else {
        return <OriginalComponent {...this.props} /> 
      }
    }
  }
  
  return NewComponent;
}

const CommentBox = (props) => {
  const [comment, setComment] = useState('');
  
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(comment);
    setComment(''); // clear the textarea
  };
  
  return (
    <div>
      <form onSubmit ={handleSubmit}>
        <h4>Add a Comment</h4>
        <textarea onChange={handleChange} value={comment} />
        <div>
          <button className="submit-comment">Submit Comment</button>
        </div>
      </form>
    </div>
  );
}

function App(props) {
  const [auth, setAuth] = useState(false);
  
  const renderButton = () => {
   if(auth) {
      return <button onClick={() =>setAuth(false)}>Sign Out</button>; // calling the action
    } else {
      return <button onClick={() => setAuth(true)}>Sign In</button>
    }
  };
  
  return (
    <div>
      {renderButton()}
      <CommentBoxWithAuth auth={auth} />
    </div>
  );
}

const CommentBoxWithAuth = RequireAuth(CommentBox);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

See the code in [codepen](https://codepen.io/albertofortes/pen/qBRgMgd "Making a simple Auth Higher-Order Component")

##### Useful links:

* [Official react documentation](https://reactjs.org/languages)
* [Understanding React Higher-Order Components by Example](https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006)
* [ReactJS Tutorial - 33 - Higher Order Components, video](https://www.youtube.com/watch?v=B6aNv8nkUSw)
* [Advanced React and Redux: section3. HOC, Udemy](https://www.udemy.com/course/react-redux-tutorial/learn/lecture/10476344)