import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './assets/book-app-icon.jpg';
import './appBar.styles.css';


const AppBar = () => {
  return ( 
    <div className="app-bar-container">
      <Link to="/" className="logo-container secondary-color-dark">
        <img src={Logo} alt='logo' width='80px'/>
        Readify
      </Link>
      <div className="app-bar-decoration-container">
        <div className="first-decoration primary-bgcolor-dark">
          <div className="second-decoration secodary-bgcolor-dark">
            <div className="third-decoration secodary-bgcolor-light"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AppBar;