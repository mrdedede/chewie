import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

export default function Login({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    let userData = {
      'email': email,
      'password': password,
    }
    axios.post('https://chewie-api.herokuapp.com/authenticate', userData)
      .then(result => {
        console.log(result)
        let authToken = result.data.token
        let userData = result.data.user
        if(userData.type === "client") {
          history.push(`user?id=${userData.id}&token=${authToken.token}`)
        } else {
          history.push(`shop?id=${userData.id}&token=${authToken.token}`)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="form-container">
      <br></br>
      <h1>Log In to Chewie!</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={email} onChange={e => setEmail(e.target.value)}
          className="login-field"/>
        <br></br>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="login-field"/>
        <br></br>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}