import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import './PetShop.css'
import 'react-calendar/dist/Calendar.css'

import MockShop from '../Search-Tab/fachada-pet.png'

export default class PetShop extends React.Component {
  queryData = queryString.parse(window.location.search)
  shopData = {}
  state = {loading: true, unSeletedDate: true}
  bookedServices = []
  selectedDate = ''
  selectedTime = ''
  petName = undefined
  disabled = true
  selectedCalendar

  componentDidMount() {
    axios.get(`https://chewie-api.herokuapp.com/petshops/${this.queryData.shopId}`, {
      headers : {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      this.shopData = result.data[0]
      this.setState({loading: false, unSeletedDate: true})
    })
  }

  verifyCalendar(date, calendarId) {
    axios.get(`https://chewie-api.herokuapp.com/${this.shopData.username}/services/${calendarId}`, {
      headers : {
        'Authorization': `bearer ${this.queryData.token}`
      }
    }).then(result => {
      this.bookedServices = result.data
      this.selectedDate = date
      this.selectedCalendar = calendarId
      this.setState({loading: false, unSeletedDate: false})
    })
  }

  verifyTime(time) {
    let pass = true
    this.bookedServices.forEach(service => {
      if(Date(service).match(this.selectedDate)) {
        if(Date(service).match(time)) {
          pass = false
        }
      }
    })
    if(pass) {
      this.selectedTime = time
      this.setState({loading: false, unSeletedDate: false})
    }
    this.disabled = pass
  }

  postTime(date, time, selectedCalendar, petName) {
    date = Date(date).split(' ')
    date[4] = time
    let selected = {
      name: '',
      date: date,
      petshop_id: this.queryData.shopId,
      service_id: selectedCalendar,
      pet_id: petName
    }
    axios.post(`https://chewie-api.herokuapp.com/bookings`, selected,  {headers : {
        'Authorization': `bearer ${this.queryData.token}`
      }
    })
    .then(result => {
      console.log(result)
    })
  }

  setPetName(e) {
    this.petName = e.target.value
  }

  render(){
    return (
      <div>
        {
          this.state.loading ?
          (<h2>Loading...</h2>) : (
          <div>
            <div className="petshop-container">
              <img src={MockShop} height="300" alt="Shop Image"/>
              <div>
                <h2 className="text-centralized">{this.shopData.name}</h2>
                <div className="petshop-bio-container">
                  <p>{this.shopData.address}</p>
                  <p>{this.shopData.phone}</p>
                  <h2>{this.shopData.rating} / 10</h2>
                </div>
              </div>
            </div>
            <div className="petshop-bio-container">
              {
                this.shopData.services.map(calendar => { return (
                  <div className="text-center">
                    <h2>{calendar.description}</h2>
                    <Calendar className="left-margin" value={this.selectedDate}
                      onChange={date => this.verifyCalendar(date, calendar.id)}/>
                  </div>
                )})
              }
              {
                this.state.unSeletedDate ?
                (<h2>Loading...</h2>) : (
                  <div className="center-align">
                    <TimePicker onChange={data => this.verifyTime(data)}
                      value={this.selectedTime}/>
                    <br />
                    <input placeholder="Who's the pet?" value={this.petName} 
                        onChange={e => this.setPetName(e)}/>
                    <button onClick={e => this.postTime(this.selectedDate, this.selectedTime,
                        this.selectedCalendar, this.petName)}>
                      Send
                    </button>
                    {
                      this.bookedServices.length ? 
                      (
                        <div>
                          <h3>Unavailable times:</h3>
                          {
                            this.bookedServices.forEach(service => { return (
                              <span>
                                {service.date}
                              </span>
                            )})
                          }
                        </div>
                      ) : 
                      (<h2>All the times are available!</h2>)
                    }
                  </div>
                )
              }
            </div>
            <br />
          </div>
          )
        }
      </div>
    )
  }
}