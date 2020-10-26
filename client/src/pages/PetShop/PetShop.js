import React from 'react'
import './PetShop.css'

import MockShop from '../Search-Tab/fachada-pet.png'
import MockCalendar from './Calendar.jpg'

export default function PetShop({ history }) {
  let shopName = 'Mock Shop'
  let shopImage = MockShop
  let shopBio = 'Something about the shop'
  let shopRating = 'How much out of 5?'
  let businessHours = 'Everyday, 7 ~ 17'
  let calendars = [1 , 2]

  return (
    <div>
      <div className="petshop-container">
        <img src={shopImage} height="300" alt="Shop Image"/>
        <div>
          <h2 className="text-centralized">{shopName}</h2>
          <div className="petshop-bio-container">
            <p>{shopBio}</p>
            <p>{shopRating}</p>
            <p>{businessHours}</p>
          </div>
        </div>
      </div>
      <div className="petshop-bio-container">
        {
          calendars.map(calendar => { return (
            <div className="text-center">
              <img src={MockCalendar} alt="Calendar" height="200"/>
            </div>
          )})
        }
      </div>
    </div>
  )
}