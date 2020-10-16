'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//AUTHENTICATION
Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');

//CLIENT
Route.group(()=> {
  Route.resource('clients', 'ClientController').apiOnly();
}).middleware('auth');

//BOOKING
Route.group(()=>{
  Route.resource('bookings', 'BookingController').apiOnly();
}).middleware('auth');

//SERVICE
Route.group(()=> {
  Route.resource('/:username/services', 'ServiceController').apiOnly();
});