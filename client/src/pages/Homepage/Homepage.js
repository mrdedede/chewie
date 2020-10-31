import React from 'react'

import './Homepage.css'

export default class Homepage extends React.Component{
  navigateLogIn() {
    this.props.history.push('/login')
  }

  navigateSignUp() {
    this.props.history.push('signup')
  }

  render() {
    return (
      <div>
        <div className="homepage-puppies homepage-panel">
          <h1 className="puppies-title">Get the best for your pets in a click!</h1>
          <h2 className="puppies-subtitle">Our community has special deals for you</h2>
          <p className="puppies-text">
            You may have special deals and early access to sales from your preferred local petshop.
            Your pets and your pockets will love it.
          </p>
        </div>
        <div className="homepage-shihtzu homepage-panel">
          <h1 className="shihtzu-title">No more worries with your appointments!</h1>
          <h2 className="shihtzu-subtitle">Your pets now will have a nice schedule.</h2>
          <p className="puppies-text">
            Now, you won't need to keep in constant touch with your vet or your petshop for most
            services! Just make your own appointment your preferred time and be notified by them
            whenever your pet is good to go!
          </p>
        </div>
        <div className="homepage-panel text-center">
          <h1>What are you waiting for? Join our community now!</h1>
          <div className="bit-margin">
            <span></span>
            <button className="circle-button" onClick={this.navigateSignUp}>Sign Up!</button>
            <span></span>
            <button className="circle-button" onClick={this.navigateLogIn}>Log In!</button>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
}