import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../App.css'
import logo from '../../assets/image/favicon.ico'
// COMPONENT FOR CREATING NAVBAR HEADER=========
function NavBar(props) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light  bg-sureify">
         <a className="navbar-brand f-w-500">SureifyTest<img  className="w-30 h-30" src={logo}/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
       </nav>
    )
}
export default NavBar;
