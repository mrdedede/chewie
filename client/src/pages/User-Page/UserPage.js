import React, { useState } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import './UserPage.css'

import MockPhoto from './mock-person-photo.jpeg'
import MockShihtzu from '../Homepage/shihtzu.jpeg'


export default class UserPage extends React.Component {
  state = {
    loading: true
  }
  keyWord = undefined
  pets = []
  queryData = queryString.parse(window.location.search)
  userData = {}
  newPet = {
    client_id: this.queryData.id,
    name: undefined,
    age: undefined,
    breed: undefined,
    type: undefined
  }

  componentDidMount() {
    axios.get('https://chewie-api.herokuapp.com/clients', {
      headers: {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      for(let user of result.data) {
        if(user.user_id == this.queryData.id) {
          this.userData ={
            profilePicture: user.photo,
            name: user.name,
            bio: user.bio
          }
          if(!this.userData.profilePicture) {
            this.userData.profilePicture = MockPhoto
          }
          if(!this.userData.bio) {
            this.userData.bio = "Proud owner of pets!"
          }
        }
      }
    })
    axios.get('https://chewie-api.herokuapp.com/pets', {
      headers: {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(fetchedPet => {
      for(let pet of fetchedPet.data) {
        if(pet.client.user_id == this.queryData.id) {
          this.pets.push({
            petName: pet.name,
            petPic: MockShihtzu,
            petData: pet.pet_type,
            petAge: pet.age,
            petBio: pet.breed
          })
        }
      }
      this.setState({loading: false})
    })
  }

  search(e) {
    e.preventDefault()
    this.props.history.push(
      `/search?id=${this.queryData.id}&token=${this.queryData.token}&searchedShops=${this.keyWord}`)
  }

  addPet(e) {
    e.preventDefault()
    axios.post('https://chewie-api.herokuapp.com/pets', this.newPet, { headers: {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      window.location.reload()
    })
  }

  setKeyWord(e) {
    this.keyWord = e.target.value
  }

  setPet_type(e) {
    this.newPet.type = e.target.value
  }

  setAge(e) {
    this.newPet.age = e.target.value
  }

  setBreed(e) {
    this.newPet.breed = e.target.value
  }

  setName(e) {
    this.newPet.name = e.target.value
  }

  render() {
    return (
      <div>
        {
          this.state.loading ? 
          (<h2>Loading...</h2>) : 
          (<div>
            <nav className="search-tab align-right">
              <form onSubmit={e => this.search(e)}>
                <input placeholder="&#128269; Search" value={this.keyWord}
                  className="right-item search-box" onChange={e => this.setKeyWord(e)}/>
              </form>
            </nav>
            <br />
            <div className="container-user-data">
            <div>
              <img src={this.userData.profilePicture} width='250' height='250' alt="user"/>
            </div>
            <div>
              <h1>{this.userData.name}</h1>
              <span>{this.userData.bio}</span>
            </div>
          </div>
          <br />
          {
          this.pets.length ? (
            <div className="center-align">
            <h1>My pets!</h1>
            {this.pets.map((pet) => { return (
              <div className="container-user-data">
                <img src={pet.petPic} width='250' height='250' alt="pet"/>
                <div>
                  <h1>{pet.petName}</h1>
                  <p>{pet.petData}</p>
                  <p>{pet.petAge}</p>
                  <p>{pet.petBio}</p>
                </div>
                <br />
              </div>
            )})}
            </div>
          ) : <br />
          }
          <div className="darker-background">
            <h2>Add a new pet!</h2>
            <form onSubmit={e => this.addPet(e)}>
              <input placeholder="Pet name" value={this.newPet.name} onChange={e => this.setName(e)}
                className="right-item search-box"/>
              <input placeholder="Species" value={this.newPet.pet_type}
                className="right-item search-box" onChange={e => this.setPet_type(e)}/>
              <input placeholder="Breed" value={this.newPet.breed} onChange={e => this.setBreed(e)}
                className="right-item search-box"/>
              <input placeholder="Age" value={this.newPet.age} onChange={e => this.setAge(e)}
                className="right-item search-box"/>
              <button type="submit" className="submit-button add-button">Add pet!</button>
            </form>
          </div>
          <br />
        </div>)
        }
      </div>
    )
  }
}