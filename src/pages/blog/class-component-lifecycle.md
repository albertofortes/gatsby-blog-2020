---
title: Class component's lifecycle
subtitle: React interview cheatsheet series
date: 2021-23-04
update: 2021-23-04
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'ReactJS', 'Interview Question series']
---

The React lifecycle (based on v16.4.2) is divided in three main areas: mounting, updating, and unmounting.

### Mounting.

The mounting phase includes the constructor and runs once when the component is created.
These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

* [constructor()](https://reactjs.org/docs/react-component.html) called before the component is mounted
* [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) invoked right before calling the render method. It should return an object to update the state, or null to update nothing.
* [render()](https://reactjs.org/docs/react-component.html#render) which is a 'pure' function, so it does not modify component state, it returns the same result each time it’s invoked given the same params.
* [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount) which is invoked immediately after a component is mounted. This method is considered legacy and should be avoid using it in new developments.

### Updating.

When a change in props or state happens, the component updates, and call these methids in this same order: 

* static getDerivedStateFromProps() (see above)
* [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) Defaults is true, and returns false if props or states didn't change. Used to let React know if a component’s output is not affected by the current change in state or props. This method is not called for the initial render or when forceUpdate() is used.
* render() (see above)
* [getSnapshotBeforeUpdate()](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) This method is not common to be used, is invoked right before the most recently rendered output is committed and enables your component to capture some information from the DOM, for example, capture the scroll position of an UI.
* [componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidupdate) invoked immediately after updating occurs.

### Unmounting

The method called when a component is being removed from the DOM.

* [componentWillUnmount()] (https://reactjs.org/docs/react-component.html#componentwillunmount) which is invoked immediately before a component is unmounted and destroyed. The place to perform cleanup, or cleaning up any subscriptions that were created in componentDidMount().

See official doc: [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html "State and Lifecycle").


