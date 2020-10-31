import React, { useState }  from 'react'
import axios from 'axios'
import queryString from 'query-string'
import './SearchTab.css'

import MockShop from './fachada-pet.png'

export default class SearchTab extends React.Component {
  queryData = queryString.parse(window.location.search)
  shops = []
  state = {
    loading: true
  }

  componentDidMount() {
    axios.get('https://chewie-api.herokuapp.com/petshops', {
      headers : {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      result.data.forEach(shop => {
        this.shops.push({
          shopId: shop.id,
          shopName: shop.name,
          petshopImg: MockShop,
          differentials: [shop.address, shop.phone]
        })
      })
    })
    axios.get('https://chewie-api.herokuapp.com/vets', {
      headers : {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      result.data.forEach(shop => {
        this.shops.push({
          shopId: shop.id,
          shopName: shop.name,
          petshopImg: MockShop,
          differentials: [shop.address, shop.phone]
        })
      })
      this.setState({loading: false})
    })
  }

  redirect(e, shopId) {
    e.preventDefault()
    this.props.history.push(
      `/shop?id=${this.queryData.id}&token=${this.queryData.token}&shopId=${shopId}`)
  }

  render() {
    return (
      <div>
        {
          this.state.loading ?
          (<h2>Loading...</h2>) :
          (
            this.shops.map(shop => { return (
              <div className="shoplist-item">
                <img src={shop.petshopImg} height="250" width="auto" className="img-margin" 
                  alt="Shop" onClick={e => this.redirect(e)}/>
                <div>
                  <h2 className="text-centralized" onClick={e => this.redirect(e, shop.shopId)}>
                    {shop.shopName}
                  </h2>
                  <div className="divided-data">
                    {
                      shop.differentials.map(differential => { return(
                        <p>{differential}</p>
                      )})
                    }
                  </div>
                </div>
              </div>
            )})
          )
        }
      </div>
    )
  }
}