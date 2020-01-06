import React from "react"
import { Link } from "gatsby";

class Header extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {};
  }

  componentDidMount () {
    this.menuTrigger =  document.getElementById("menuTrigger");
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
    const { siteTitle } = this.props

    return (
      <header className="header">
        <h1 className="header__logo">Hola, I'm <Link to="/">{siteTitle}.</Link></h1>
        <button className="header__mobilebtn" id="menuTrigger" aria-label="Abrir menú"></button>
        <nav className="header__nav">
          <ul>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/blog/" activeClassName="active">Blog</Link></li>
          </ul>
        </nav>
        {/*<div className="header__container">
          <h2><strong>Front-end senior developer</strong> from 2006, UX/UI Engineer, working in remote, globally with companies, startups and agencies.</h2>
        </div>*/}
      </header>
    )
  }
}

export default Header
