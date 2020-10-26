import React, { useState } from 'react'
import axios from 'axios'

import './Signup.css'

export default function Signup(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [usertype, setUsertype] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  let userId = ''
  let authToken = {}

  function handleSubmit(e) {
    e.preventDefault()
    if(!usertype) {
      setUsertype('client')
    }
    let userData = {
      'username': username,
      'email': email,
      'password': password,
      'type': usertype
    }
    axios.post('https://chewie-api.herokuapp.com/register', userData)
      .then(result => {
        userId = result.data.id
        axios.post('https://chewie-api.herokuapp.com/authenticate',
          {'email': email,'password': password}).then(response => {
            authToken = response.data
            handleRegistration()
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleRegistration() {
    let userData = {user_id: userId,name: name, phone: phone}
    axios.post('https://chewie-api.herokuapp.com/clients', userData, {
      headers: {
        'Authorization': `${authToken.token.type} ${authToken.token.token}`
      }
    }).then(result => {
        if(usertype === "client") {
          props.history.push(`user?id=${authToken.user.id}&token=${authToken.token.token}`)
        } else {
          props.history.push(`shop?id=${authToken.user.id}&token=${authToken.token.token}`)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="form-container">
      <h1>Sign Up to Chewie!</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
          className="login-field"/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="login-field"/>
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}
          className="login-field"/>
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}
          className="login-field"/>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
          className="login-field"/>
        <select value={usertype} onChange={e => setUsertype(e.target.value)}
          className="login-field">
          <option value="" disabled defaultValue>User Type</option>
          <option value="client">Client</option>
          <option value="petshop">Shop</option>
          <option value="vet">Vet</option>
        </select>
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}