import React from 'react'
import './Footer.css'

export default function MainNavbar() {
  return (
    <div className="footer">
      <p className="logo-footer">
        <a>Chewie</a>
      </p>
      <p className="footer-names">
        Feito por <a target="_blank" href="https://github.com/LuisBarbosa99"
            rel="noopener noreferrer">
          Luiz Barbosa
        </a> e <a target="_blank" href="https://github.com/mrdedede" rel="noopener noreferrer">
          André Filho
        </a>
      </p>
    </div>
  )
}