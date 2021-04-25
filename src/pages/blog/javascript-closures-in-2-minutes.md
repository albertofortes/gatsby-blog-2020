---
title: JavaScript Closures in 2 minutes
subtitle: React interview cheatsheet series
date: 2021-04-24
update: 2021-04-24
banner: ../../images/blog/reactjs.jpg
tags: ['JavaScript', 'Interview Question series', 'JavaScript fundamental topics']
---

A variable in javascript can be global or local. A global variable can be done private using a closure.

Closure can seems a difficult concept at the beginning, but if you did some code in JavaScript or you are a React developer, you already used closures thousand of times.

An example of a closure in a Immediately-invoked Function Expression (IIFE):

```javascript
const counter = (function() {
  const resultBox = document.getElementById('result');
  let _counter = 0;
  resultBox.innerHTML = _counter;
  
  function addOne() {
    _counter++
    resultBox.innerHTML = _counter;
    return _counter;
  }
  
  function subtractOne() {
    _counter--
    resultBox.innerHTML = _counter;
    return _counter;
  }
  
  return {
    addOne,
    subtractOne
  }

})();

console.log( counter.addOne() ); // 1
console.log( counter.addOne() ); // 2
console.log( counter.subtractOne() ); // 1
```
See code above at [codepen](https://codepen.io/albertofortes/pen/bGgzBOy).

At the code above we have a IIFE with some nested function, all these nested functions have access to the private function ```_counter```.
The const **counter** is assigned to the return value of a self-invoking function.
The *self-invoking function only runs once*. It sets the counter to zero (0), and returns a function expression.
This is called a **JavaScript closure**. It makes it possible for a function to have ***private*** variables.
The *_counter* is protected by the scope of the anonymous function, and can only be changed using the add function.
So, *A closure is a function having access to the parent scope, even after the parent function has closed*.