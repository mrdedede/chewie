import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MainNavbar from './pages/Main-Navbar/Main-Navbar'
import Footer from './pages/Footer/Footer'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Log-In/Login'
import Signup from './pages/Sign-Up/Signup'
import UserPage from './pages/User-Page/UserPage'
import SearchTab from './pages/Search-Tab/SearchTab'
import PetShop from './pages/PetShop/PetShop'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route component={MainNavbar} />
      <Switch>
        <Route path="/" exact={true} component={Homepage}/>
        <Route path="/home" exact={true} component={Homepage}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/signup" exact={true} component={Signup} />
        <Route path="/user" component={UserPage}/>
        <Route path="/search" exact={true} component={SearchTab}/>
        <Route path="/shop" component={PetShop}/>
      </Switch>
      <Route component={Footer} />
    </BrowserRouter>
  )
}