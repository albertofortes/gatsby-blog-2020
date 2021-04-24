---
title: What is Prop drilling? and how to solve it using Context API
subtitle: React interview cheatsheet series
date: 2021-23-04
update: 2021-24-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series', 'React fundamental topics']
---

As we know, the props are the data we pass -or can access- from the top-level components to its child components. And, also we know that React data flow is unidirectional.

**Prop drilling**, also know as *threading*, is the process where the devs pass the props down to an specific child component, but in between, other components, between the origin and the destiny, get the props just to pass it down the chain. 
So *props drilling* issue is when passing this data from the parent component (A) to a children component (Z), but in the middle this data pass through many components in t between A and Z that doesn't need that data (props) excepts to communicate A and Z.

Props drilling is not a problem at all if we have a couple or three levels, but imagine if we have dozens of levels... That's the problem.

There is a good video explaining this [here](https://www.youtube.com/watch?v=AD8m9mphOoo).

To avoid prop drilling, in other words, passing props through intermediate elements, we have some solutions:

1. React Context API.
2. Composition
3. Render props
4. HOC (High Order Components)
5. Redux or MobX

### 1. Avoid Props Drilling with React Context API

[Context](https://reactjs.org/docs/context.html#when-to-use-context "What is prop drilling and how can you solve that using the contect api") is designed to share data that can be considered “global” for a tree of React components, such as the current user, theme, or language.

Context is primarily used when some data needs to be accessible by many components at different nesting levels.
So, if you only want to avoid passing some props through many levels, **component composition** is often a simpler solution than context.

Context API was created as an answer to prop drilling, and an easier alternative to Redux.

There is a great Toptal.com article abut this, I invite to read it, this great an eloquent image is given from there: 

![Toptal.com article Working with the React Context API](https://uploads.toptal.io/blog/image/129071/toptal-blog-image-1549323314875-d6bc9c753a4c9ac2911e8af17732023d.png)
See an interesting article at [https://www.toptal.com/react/react-context-api](https://www.toptal.com/react/react-context-api)


**const MyContext = React.createContext(defaultValue);**

Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

The argument is only used when a component does not have a matching Provider above it in the tree.

**<MyContext.Provider value={ value }>**

Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers.

All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.

```javascript
import React, { Component } from "https://cdn.skypack.dev/react";

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    teamMembers: {
      player001: { name: 'Joaquin', position: 'Forward', number: 7 },
      player002: { name: 'canales', position: 'Midfielder', number: 10 }
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          players: this.state.teamMembers                  
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
};

const TeamList = () => (
  <div>
    <h2>Real Betis Balompié:</h2>
    <Players />
  </div>
);

const Player = props => (
  <tr>    
    <td>{props.number}</td>
    <td>{props.name}</td>
    <td>{props.position}</td>
  </tr>
);

const Players = () => (
  <AppContext.Consumer>
    {context => (
      <div>
        <h4>Players:</h4>
        <table>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Positon</th>
          </tr>

          {Object.keys(context.players).map(key => {
            return <Player key={context.players[key]}
              number={context.players[key].number} 
              name={context.players[key].name} 
              position={context.players[key].position}
            />
          })}
        </table>
      </div>
    )}
  </AppContext.Consumer>
);

class App extends Component {
  render() {
    return (
      <AppProvider>
        <div>
          <TeamList />
        </div>
      </AppProvider>
     );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
See the code working at [codepen](https://codepen.io/albertofortes/pen/WNRPvbY)

### 2. Composition

Composition is an easy but powerful tool to reuse code and share props between components.

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

About composition and props drilling in React, there is an excellent article in Medium written by my old mate Bolu, [Composition: An Alternative to Props Drilling in React](https://javascript.plainenglish.io/composition-in-react-f02afe24bc46 "Before reaching for context or libraries, to manage Props Drilling, think about composition"), better reading it, it's so clear.

See also: [Props Drilling In React.Js](https://medium.com/front-end-weekly/props-drilling-in-react-js-723be80a08e5)
