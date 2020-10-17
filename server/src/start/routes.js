'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//AUTHENTICATION
Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');

//CLIENT
Route.group(()=> {
  Route.resource('clients', 'ClientController').apiOnly();
}).middleware('auth');

//APPOINTMENT
Route.group(()=>{
  Route.resource('appointments', 'AppointmentController').apiOnly();
}).middleware('auth');

//BOOKING
Route.group(()=>{
  Route.resource('bookings', 'BookingController').apiOnly();
}).middleware('auth');

//PET
Route.group(()=>{
  Route.resource('pets', 'PetController').apiOnly();
}).middleware('auth');

//PETSHOP
Route.group(()=>{
  Route.resource('petshops', 'PetshopController').apiOnly();
}).middleware('auth');

//SERVICE
Route.group(()=> {
  Route.resource('petshop/services', 'ServiceController').apiOnly();
}).middleware('auth');

//VET
Route.group(()=>{
  Route.resource('vets', 'VetController').apiOnly();
}).middleware('auth');

//VET SERVICE
Route.group(()=>{
  Route.resource('vet/services', 'VetServiceController').apiOnly();
}).middleware('auth');