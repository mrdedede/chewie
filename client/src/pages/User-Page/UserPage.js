import React, { useState } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import './UserPage.css'

import MockPhoto from './mock-person-photo.jpeg'
import MockPuppies from '../Homepage/two-yellow-labrador-retriever.jpeg'
import MockShihtzu from '../Homepage/shihtzu.jpeg'

export default function UserPage(props) {
  let queryData = queryString.parse(window.location.search)
  setTimeout(runOnce(), 3000)
  function runOnce() {
    axios.get('https://chewie-api.herokuapp.com/clients', {
      headers: {
        'Authorization': `bearer ${queryData.token}`
      }
    }).then(result => {
      for(let user of result.data) {
        if(user.user_id == queryData.id) {
          setUserData({
            profilePicture: MockPhoto,
            name: user.name,
            bio: user.bio
          })
        }
      }
    })
    axios.get('https://chewie-api.herokuapp.com/pets', {
      headers: {
        'Authorization': `bearer ${queryData.token}`
      }
    }).then(fetchedPet => {
      let pets = []
      if(fetchedPet.length > 0) {
        for(let pet of fetchedPet) {
          if(pet.client_id == queryData.id) {
            pets.push({
              petPic: MockPuppies,
              petData: pet.pet_type,
              petAge: pet.age,
              petBio: pet.breed
            })
          }
        }
      }
      setPets(pets)
    })
  }

  const [keyWord, setKeyWord] = useState('')
  const [userData, setUserData] = useState({
    profilePicture: MockPhoto,
    name: "John Doe",
    bio: "Proud Owner of Pets!"
  })
  const [pets, setPets] = useState([{
    petPic: MockPuppies,
    petName: "Chewie",
    petData: "",
    petAge: "",
    petBio: ""
  }])

  function search(e) {
    e.preventDefault()
    props.history.push(`/search?id=${queryData.id}&token=${queryData.token}&searchedShops=${keyWord}`)
  }

  return (
    <div>
      <nav className="search-tab align-right">
        <form onSubmit={search}>
          <input placeholder="&#128269; Search" value={keyWord}
            onChange={e => setKeyWord(e.target.value)} className="right-item search-box"/>
        </form>
      </nav>
      <br />
      <div className="container-user-data">
        <div>
          <img src={userData.profilePicture} width='250' height='250' alt="user"/>
        </div>
        <div>
          <h1>{userData.name}</h1>
          <span>{userData.bio}</span>
        </div>
      </div>
      <br />
      <h2 className="text-center">My pets!</h2>
      <br />
      {
        pets.map((pet) => { return (
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
        )})
      }
      <br />
    </div>
  )
}