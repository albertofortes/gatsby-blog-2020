---
title: Showing the before pseudo-class of a hidden div.
subtitle: A CSS trick to show before or after pseudoclass in a hidden div
date: 2020-02-21
update: 2020-02-21
banner: ../../images/blog/css-html.jpg
tags: ['CSS', 'snippets', 'codepen']
---

Today I had to do figure out a way to show an automatic message on a hidden div (which had *display: hidden*), so the idea was that the user would see a message and after clicking on a button, the message would be removed and in its place the hidden div would be shown.


A found a tricky solution:

> instead of using display: hidden, in which case, the before pseudoclass would be hidden as well, why not use a negative text-indent approach?
> And it worked!

You can take a look to my codepen below, but the trick is more or less simply:

```CSS
.container-box {
  text-indent: -9999px;
}

.container-box:before {
  text-indent: 0;
}
```


<iframe height="800" style="width: 100%;" scrolling="no" title="Showing the before pseudo-class of a hidden div " src="https://codepen.io/albertofortes/embed/oNXYgOy?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/albertofortes/pen/oNXYgOy'>Showing the before pseudo-class of a hidden div </a> by Alberto Fortes
  (<a href='https://codepen.io/albertofortes'>@albertofortes</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>