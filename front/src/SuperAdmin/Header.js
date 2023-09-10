import React from 'react';

function Header() {
  return (
    <header className="header-section">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="logo">
            <a href="./index.html">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul className="flex space-x-4">
                <li className="active">
                  <a href="./index.html">Home</a>
                </li>
                <li>
                  <a href="./about-us.html">About</a>
                </li>
                <li>
                  <a href="./classes.html">Classes</a>
                </li>
                <li>
                  <a href="./blog.html">Blog</a>
                </li>
                <li>
                  <a href="./gallery.html">Gallery</a>
                </li>
                <li>
                  <a href="./contact.html">Contacts</a>
                </li>
              </ul>
            </nav>
            <a href="#" className="primary-btn signup-btn">
              Sign Up Today
            </a>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
