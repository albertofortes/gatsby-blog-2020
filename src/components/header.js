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
    return (
      <header className="header">
        <h1 className="header__logo">Hola, I'm <Link to="/">Alberto Fortes.</Link></h1>
        <button className="header__mobilebtn" id="menuTrigger" aria-label="Abrir menú"></button>
        <nav className="header__nav">
          <ul>
            <li><Link to="/about" activeClassName="active">About me</Link></li>
            <li><Link to="/blog/" activeClassName="active">Blog</Link></li>
            <li><Link to="/uses/" activeClassName="active">Uses</Link></li>
            <li><Link to="/contact/" activeClassName="active">Contact me</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
