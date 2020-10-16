'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Booking = use('App/Models/Booking');
/**
 * Resourceful controller for interacting with bookings
 */
class BookingController {
  /**
   * Show a list of all bookings.
   * GET bookings
   *
   */
  async index () {
    const bookings = await Booking.query().with('client').fetch();

    return bookings;
  }

  /**
   * Create/save a new booking.
   * POST bookings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const {name, date, petshop_id, service_id, pet_id} = request.body;

    const booking = await Booking.create({
      name,
      date,
      client_id: auth.user.id,
      petshop_id,
      service_id,
      pet_id
    });

    return booking;
  }

  /**
   * Display a single booking.
   * GET bookings/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const booking = await Booking.findOrFail(params.id);

    return booking;
  }

  /**
   * Update booking details.
   * PUT or PATCH bookings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a booking with id.
   * DELETE bookings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const booking = await Booking.findOrFail(params.id);

    if(booking.user_id !== auth.user.id) return response.status(401);

    booking.delete();
  }
}

module.exports = BookingController
