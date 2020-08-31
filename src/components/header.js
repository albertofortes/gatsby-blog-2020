import React, { useState } from 'react'
import { Link } from "gatsby"


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="header">
      <button onClick={() => setMenuOpen( !menuOpen )} className={menuOpen ? "header__mobilebtn  header__mobilebtn--opened" : "header__mobilebtn"} aria-label="open navigation"></button>
      <nav className={(menuOpen) ? "header__nav header__nav--opened" : "header__nav"}>
        <ul>
          <li><Link to="/" activeClassName="active" title="Front-end senior developer with strong background with Javascript, React, CSS, Responsive design, UI development with aesthetic care.">Home</Link></li>
          <li><Link to="/blog/" activeClassName="active" title="Blog about Front-end development, JavaScript, CSS, React, Gatsby, etc">Blog</Link></li>
          <li><Link to="/uses/" activeClassName="active" title="What I use as front-end JavaScript senior developer">Uses</Link></li>
          <li><Link to="/contact/" activeClassName="active" title="Contact with me">Contact me</Link></li>
        </ul>
      </nav>
    </header>
  )
};

export default Header
