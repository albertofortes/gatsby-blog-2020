(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{198:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return o});var n=a(0),r=a.n(n),l=a(204);t.default=function(e){var t=e.data;return console.log(t),r.a.createElement(l.a,null,r.a.createElement("div",null,r.a.createElement("h1",null,"My Site's Files"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"relativePath"),r.a.createElement("th",null,"prettySize"),r.a.createElement("th",null,"extension"),r.a.createElement("th",null,"birthTime"))),r.a.createElement("tbody",null,t.allFile.edges.map(function(e,t){var a=e.node;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,a.relativePath),r.a.createElement("td",null,a.prettySize),r.a.createElement("td",null,a.extension),r.a.createElement("td",null,a.birthTime))})))))};var o="4013183056"},200:function(e,t,a){var n;e.exports=(n=a(202))&&n.default||n},201:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(66),o=a.n(l);a.d(t,"a",function(){return o.a});a(200),a(9).default.enqueue,r.a.createContext({})},202:function(e,t,a){"use strict";a.r(t);a(22);var n=a(0),r=a.n(n),l=a(91);t.default=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json)):null}},203:function(e){e.exports={data:{site:{siteMetadata:{title:"Alberto Fortes",role:"Front-end developer building cool websites and apps for Avallain and Warner Music Spain.",description:"<p>Along side more than 14 years I've doing fast and SEO on page optimized HTML5 and CSS website and I develop JavaScript front-end code in my day a day, applying the latest techniques to achieve page load optimization time and clear and easy to read code. As front-end HTML, CSS and JavaScript and with a past background as UX and web designer I've coded along these years for great end customers (mine or white-label for agencies).</p>\n                  <p>Currently I'm Front-end team lead at Avallain, working for the top Press companies at the Globe. Also I'm lead developer at my own small studio working with side projects and important customers like Warner Music Spain</p>"}}}}},204:function(e,t,a){"use strict";var n=a(203),r=a(0),l=a.n(r),o=a(201);var i=function(e){var t,a;function n(){var t;return(t=e.call(this)||this).state={},t}a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r=n.prototype;return r.componentDidMount=function(){console.log("ComponentDidMount --\x3e")},r.render=function(){var e=this.props,t=e.siteTitle;e.siteRole,e.siteDescription;return l.a.createElement("header",{className:"header"},l.a.createElement("h1",{className:"header__logo"},"Hola, I'm ",l.a.createElement(o.a,{to:"/"},t,".")),l.a.createElement("nav",{className:"header__nav"},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(o.a,{to:"/about",activeClassName:"active"},"About")),l.a.createElement("li",null,l.a.createElement(o.a,{to:"/blog/",activeClassName:"active"},"Blog")))))},n}(l.a.Component);a(192),t.a=function(e){var t=e.children,a=n.data;return l.a.createElement(l.a.Fragment,null,l.a.createElement(i,{className:"header",siteTitle:a.site.siteMetadata.title,siteRole:a.site.siteMetadata.role,siteDescription:a.site.siteMetadata.description}),l.a.createElement("div",{className:"container"},t),l.a.createElement("footer",{className:"footer"},"© ",(new Date).getFullYear(),", Built with"," ",l.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))}}}]);
//# sourceMappingURL=component---src-pages-sitemap-js-d6478571cd59c424860d.js.map