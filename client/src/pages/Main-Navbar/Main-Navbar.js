import React from 'react'
import './Main-Navbar.css'

export default function MainNavbar({ history }) {

  function toHome() {
    history.push('/home')
  }

  function toLogin() {
    history.push('/login')
  }

  return (
    <nav>
      <ul className="nav">
        <li className="button logo" onClick={toHome}><h1><a>Chewie</a></h1></li>
        <li><a></a></li>
        <li className="button item" onClick={toLogin}><h2><a>Login</a></h2></li>
      </ul>
    </nav>
  )
}