import React from 'react'

import './Homepage.css'

export default function Homepage({history}) {

  function navigateLogIn() {
    history.push('/login')
  }

  return (
    <div>
      <div className="homepage-puppies homepage-panel">
        <h1 className="puppies-title">AAAAAAAAAAAAA</h1>
        <h2 className="puppies-subtitle">AAAAAAAAAAAAA</h2>
        <p className="puppies-text">
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </p>
      </div>
      <div className="homepage-shihtzu homepage-panel">
        <h1 className="shihtzu-title">BBBBBBBBBBB</h1>
        <h2 className="shihtzu-subtitle">BBBBBBBBBBBBB</h2>
        <p className="shihtzu-text">
          BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
        </p>
      </div>
      <div className="homepage-panel text-center">
        <h1>What are you waiting for? Join our community now!</h1>
        <div className="bit-margin">
          <span></span>
          <button className="circle-button">Sign Up!</button>
          <span></span>
          <button className="circle-button" onClick={navigateLogIn}>Log In!</button>
          <span></span>
        </div>
      </div>
    </div>
  )
}