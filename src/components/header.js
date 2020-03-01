import React from "react"
import { Link } from "gatsby";

class Header extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {};
  }

  componentDidMount () {
    this.menuTrigger =  document.getElementById('menuTrigger');
    this.menuTrigger.addEventListener("click", this.openMobileMenu, false); 
  }

  openMobileMenu (e) {
    const menu = document.getElementsByClassName('header__nav')[0];
    if (menu.classList.contains('header__nav--opened')) {
      e.target.classList.remove('header__mobilebtn--opened');
      menu.classList.remove('header__nav--opened');
    } else {
      e.target.classList.add('header__mobilebtn--opened');
      menu.classList.add('header__nav--opened');
    } 
  }

  render () {
    return (
      <header className="header">
        <h1 className="header__logo">Hola, I'm <Link to="/" title="Front-end senior developer with strong background with Javascript, React, CSS, Responsive design, UI development with aesthetic care.">Alberto Fortes.</Link></h1>
        <button className="header__mobilebtn" id="menuTrigger" aria-label="Abrir menú"></button>
        <nav className="header__nav">
          <ul>
            <li><Link to="/about" activeClassName="active" title="About Alberto Fortes, and how I became from MA. Philosophy to front-end developer available to hire as contractor">About me</Link></li>
            <li><Link to="/blog/" activeClassName="active" title="Blog about Front-end development, JavaScript, CSS, React, Gatsby, etc">Blog</Link></li>
            <li><Link to="/uses/" activeClassName="active" title="What I use as front-end JavaScript senior developer">Uses</Link></li>
            <li><Link to="/contact/" activeClassName="active" title="Contact with me">Contact me</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
