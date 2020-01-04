(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{199:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(238),i=n(239),s=(n(192),function(e){e.children;var t=o.data;return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.a,{siteTitle:t.site.siteMetadata.title,siteRole:t.site.siteMetadata.role,siteDescription:t.site.siteMetadata.description}))}),c=n(229);t.default=function(){return a.a.createElement(s,null,a.a.createElement(c.a,{title:"Alberto Fortes. Front-end developer working remotely for the best companies"}))}},200:function(e,t,n){var r;e.exports=(r=n(202))&&r.default||r},201:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(66),i=n.n(o);n.d(t,"a",function(){return i.a});n(200),n(9).default.enqueue,a.a.createContext({})},202:function(e,t,n){"use strict";n.r(t);n(22);var r=n(0),a=n.n(r),o=n(91);t.default=function(e){var t=e.location,n=e.pageResources;return n?a.a.createElement(o.a,Object.assign({location:t,pageResources:n},n.json)):null}},229:function(e,t,n){"use strict";var r=n(230),a=n(0),o=n.n(a),i=n(231),s=n.n(i);function c(e){var t=e.description,n=e.lang,a=e.meta,i=e.title,c=r.data.site,u=t||c.siteMetadata.description;return o.a.createElement(s.a,{htmlAttributes:{lang:n},title:i,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:i},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:u}].concat(a)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},230:function(e){e.exports={data:{site:{siteMetadata:{title:"Alberto Fortes",description:"<p>Along side more than 14 years I've doing fast and SEO on page optimized HTML5 and CSS website and I develop JavaScript front-end code in my day a day, applying the latest techniques to achieve page load optimization time and clear and easy to read code. As front-end HTML, CSS and JavaScript and with a past background as UX and web designer I've coded along these years for great end customers (mine or white-label for agencies).</p>\n                  <p>Currently I'm Front-end team lead at Avallain, working for the top Press companies at the Globe. Also I'm lead developer at my own small studio working with side projects and important customers like Warner Music Spain</p>",author:"@albertofortes"}}}}},238:function(e){e.exports={data:{site:{siteMetadata:{title:"Alberto Fortes",role:"Front-end developer building cool websites and apps for Avallain and Warner Music Spain.",description:"<p>Along side more than 14 years I've doing fast and SEO on page optimized HTML5 and CSS website and I develop JavaScript front-end code in my day a day, applying the latest techniques to achieve page load optimization time and clear and easy to read code. As front-end HTML, CSS and JavaScript and with a past background as UX and web designer I've coded along these years for great end customers (mine or white-label for agencies).</p>\n                  <p>Currently I'm Front-end team lead at Avallain, working for the top Press companies at the Globe. Also I'm lead developer at my own small studio working with side projects and important customers like Warner Music Spain</p>"}}}}},239:function(e,t,n){"use strict";(function(e){n(240),n(29),n(30),n(13),n(49),n(22);var r=n(201),a=n(0),o=n.n(a);var i=function(t){var n,a;function i(){var e;return(e=t.call(this)||this).state={headerWidth:0,headerHeight:0,points:0},e}a=t,(n=i).prototype=Object.create(a.prototype),n.prototype.constructor=n,n.__proto__=a;var s=i.prototype;return s.componentDidMount=function(){console.log("ComponentDidMount --\x3e"),window.addEventListener("scroll",function(e){var t=this.scrollY;console.log(t)}),window.addEventListener("resize",function(e){this.canvasSize()}.bind(this)),this.canvasSize(),this.snakeGame()},s.canvasSize=function(){var e=document.getElementById("wrap"),t=document.getElementsByClassName("who");e&&this.setState({headerWidth:e.offsetWidth,headerHeight:e.offsetHeight-t[0].offsetHeight})},s.snakeGame=function(){var t=function(e){return e.slice(1)},n=function(e){return e.slice(0,e.length-1)},r=function(e){return function(t){return e}},a=function(e){return function(t){return t.map(e)}},o=function(e){return function(t){return t.map(function(t,n){return e(t)(n)})}},i=function(e){return function(t){return Object.assign({},e,t)}},s=function(e){return function(t){return(t%e+e)%e}},c=function(e){return function(t){var n;return(n={})[e]=t,n}},u=function(e){return function(t){return t[e]}},l=function(e){return function(t){return Array.apply(null,Array(t-e)).map(function(t,n){return e+n})}},d=function(e){return function(t){return Math.floor(Math.random()*t)+e}},f=function(e){return function(t){return Object.keys(e).map(function(n){return c(n)(e[n](t))}).reduce(function(e,t){return Object.assign(e,t)})}},p={adjust:function(e){return function(t){return function(n){return o(function(n){return function(r){return r===e?t(n):n}})(n)}}},dropFirst:t,dropLast:n,id:function(e){return e},k:r,map:a,merge:i,mod:s,objOf:c,pipe:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return[].concat(t).reduce(function(e,t){return t(e)},e)}},prop:u,range:l,rep:function(e){return function(t){return a(r(e))(l(0)(t))}},rnd:d,spec:f};Object.getOwnPropertyNames(p).map(function(t){return e[t]=p[t]});var m={x:0,y:-1},h={x:0,y:1},w={x:1,y:0},g={x:-1,y:0},v=function(e){return function(t){return e.x===t.x&&e.y===t.y}},y=function(e){return v(b(e))(e.apple)},b=function(e){return 0===e.snake.length?{x:2,y:2}:{x:s(e.cols)(e.snake[0].x+e.moves[0].x),y:s(e.rows)(e.snake[0].y+e.moves[0].y)}},k=function(e){return this.setState({points:this.state.points+1}),{x:d(0)(e.cols-1),y:d(0)(e.rows-1)}}.bind(this),E=f({rows:u("rows"),cols:u("cols"),moves:function(e){return e.moves.length>1?t(e.moves):e.moves},snake:function(e){return function(e){return e.snake.find(v(b(e)))}(e)?[]:y(e)?[b(e)].concat(e.snake):[b(e)].concat(n(e.snake))},apple:function(e){return y(e)?k(e):e.apple}}),S=function(e,t){return function(e){return function(t){return t.moves[0].x+e.x!==0||t.moves[0].y+e.y!==0}}(t)(e)?i(e)({moves:e.moves.concat([t])}):e},A=document.getElementById("snake-canvas"),x=A.getContext("2d"),M={cols:160,rows:80,moves:[w],snake:[],apple:{x:20,y:20}},F=function(e){return Math.round(e*A.width/M.cols)},I=function(e){return Math.round(e*A.height/M.rows)},j=function(){x.fillStyle="#2D303C",x.fillRect(0,0,A.width,A.height),x.fillStyle="#ffe600",M.snake.map(function(e){return x.fillRect(F(e.x),I(e.y),F(1),I(1))}),x.fillStyle="rgb(255,255,255)",x.fillRect(F(M.apple.x),I(M.apple.y),F(1),I(1)),0===M.snake.length&&(x.fillStyle="#B4582F",x.fillRect(0,0,A.width,A.height))};window.addEventListener("keydown",function(e){switch(e.key){case"w":case"h":case"ArrowUp":M=S(M,m);break;case"a":case"j":case"ArrowLeft":M=S(M,g);break;case"s":case"k":case"ArrowDown":M=S(M,h);break;case"d":case"l":case"ArrowRight":M=S(M,w)}}),j(),window.requestAnimationFrame(function e(t){return function(n){n-t>100?(M=E(M),j(),window.requestAnimationFrame(e(n))):window.requestAnimationFrame(e(t))}}(0))},s.render=function(){var e=this.props,t=e.siteTitle,n=e.siteRole,a=e.siteDescription;return o.a.createElement("header",{id:"headerHome",className:"header-home"},o.a.createElement("div",{id:"wrap",className:"wrapper"},o.a.createElement("div",{className:"who"},o.a.createElement("h1",null,"Hola, I'm ",o.a.createElement("strong",null,t),","),o.a.createElement("h2",null,n),o.a.createElement("div",{className:"who__desc",dangerouslySetInnerHTML:{__html:a}}),o.a.createElement("p",{className:"who__links"},o.a.createElement("a",{href:"https://www.linkedin.com/in/albertofortes"},"Linkedin"),o.a.createElement("a",{href:"https://dribbble.com/albertofortes"},"Dribble"),o.a.createElement("a",{href:"https://twitter.com/albertofs"},"Twitter"),o.a.createElement(r.a,{to:"/blog/"},"Go to Blog"),o.a.createElement("a",{href:"mailto:albertofortes@gmail.com"},"Email"))),o.a.createElement("canvas",{id:"snake-canvas",width:this.state.headerWidth,height:this.state.headerHeight}),o.a.createElement("div",{className:"score-board"},this.state.points)))},i}(o.a.Component);t.a=i}).call(this,n(208))},240:function(e,t,n){"use strict";var r=n(1),a=n(32)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),r(r.P+r.F*o,"Array",{find:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),n(96)("find")}}]);
//# sourceMappingURL=component---src-pages-index-js-22408bfab1a9e36ac1c2.js.map