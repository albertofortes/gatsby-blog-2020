---
title: Code block highlights for Gatsby ReactJS blogs
subtitle: Syntax highlighting to the code blocks
date: 2019-05-08
update: 2020-01-03
banner: ./blog/code-highlight.png
tags: ['javascript', 'markdown', 'gatsby']
---

If you are using Gatsby as static website or blog, probably you are a developer. In that case, you will need code syntax highlighting to the code blocks. As usual Gatsby provide us an easy way to achieve it into the markdown.

### Run the next command:
*npm install --save gatsby-remark-prismjs prismjs*

Once installed, open your gatsby-config.js file and add:

```javascript
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

Note: probably you was using already `gatsby-transformer-remark` so, just swap this line for those.

Next, open gatsbybrowser.js_ and add:

```css
require("prismjs/themes/prism-solarizedlight.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
````

To use in markdown, add three followed by language name as:


```text
```javascript
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]```
```


That's all! Remember markdown syntax: add a &lt;pre> tag is done by adding four empty spaces.

And, of course, check official plugin documentation [here](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/ "Gatsby PrismJS plugin").