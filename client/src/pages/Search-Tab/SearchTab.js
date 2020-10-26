import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import './SearchTab.css'

import MockShop from './fachada-pet.png'

export default function SearchTab({history}) {
  let queryData = queryString.parse(window.location.search)
  axios.get('https://chewie-api.herokuapp.com/petshops', {
    headers : {
      'Authorization': `bearer ${queryData.token}`
    }
  }).then(result => {
    console.log(result)
  })
  let queryResults = [
    {
      shopName: "Casa de Banho",
      petshopImg: MockShop,
      services: ["Vet Available", "Bath", "Shop Inside"],
      workingHours: "Mon - Sat, 10 ~ 19",
      differentials: ["Bilingual Staff", "10% Off for paying with cash"]
    },
    {
      shopName: "Casa do Pet",
      petshopImg: MockShop,
      services: ["Vaccines", "Bath", "Shop Inside"],
      workingHours: "Tue - Sun, 10 ~ 20",
      differentials: ["Self-Service Coffee"]
    }
  ]

  function redirect() {
    history.push('/shop')
  }

  return (
    <div>
      {
        queryResults.map(shop => { return (
          <div className="shoplist-item">
            <img src={shop.petshopImg} height="250" width="auto" className="img-margin" alt="Shop"
              onClick={redirect}/>
            <div>
              <h2 className="text-centralized" onClick={redirect}>{shop.shopName}</h2>
              <div className="divided-data">
                {
                  shop.services.map(service => { return (
                    <p>{service}</p>
                  ) } )
                }
                <p>{shop.workingHours}</p>
                {
                  shop.differentials.map(differential => { return (
                    <p>{differential}</p>
                  )})
                }
              </div>
            </div>
          </div>
        )})
      }
    </div>
  );
}