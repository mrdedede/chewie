import React, { useState } from 'react'
import './UserPage.css'

import MockPhoto from './mock-person-photo.jpeg'
import MockPuppies from '../Homepage/two-yellow-labrador-retriever.jpeg'
import MockShihtzu from '../Homepage/shihtzu.jpeg'

export default function UserPage({ history }) {
  const [keyWord, setKeyWord] = useState('')

  let userData = {
    profilePicture: MockPhoto,
    name: "John Doe",
    bio: "Proud owner of a shih-tzu and two puppies"
  }

  let pets = [
    {
      petPic: MockPuppies,
      petName: "Chewie and Scooby",
      petData: "Dog, Labrador Retriever",
      petAge: "1 month",
      petBio: "Likes milk and beef"
    },
    {
      petPic: MockShihtzu,
      petName: "Nina",
      petData: "Dog, Shihtzu",
      petAge: "2 Years",
      petBio: "Likes bones and plastic cups"
    }
  ]

  function search(e) {
    e.preventDefault()
    history.push('/search')
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
          <img src={userData.profilePicture} width='250' height='250'/>
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
            <img src={pet.petPic} width='250' height='250' />
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