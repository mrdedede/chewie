import React, { useState } from 'react'
import './Login.css'

export default function Login({ history }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    history.push('/user')
  }

  return (
    <div className="form-container">
      <br></br>
      <h1>Log In to Chewie!</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
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