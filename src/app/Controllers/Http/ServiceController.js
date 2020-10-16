'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Service = use('App/Models/Service');
/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   */
  async index () {
    const services = await Service.query().with('petshop').fetch();

    return services;
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async store ({ request, auth, response}) {
    const {name, value, duration, employee, description} = request.body;
  
    if(auth.user.user_type !== 'petshop') return response.status(403);

    const service = await Service.create({
      name,
      value,
      duration,
      employee,
      description,
      petshop_id: auth.user.id
    });

    return service;
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const service = await Service.findOrFail(params.id);

    return service;
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const service = await Service.findOrFail(params.id);

    if (service.petshop_id !== auth.user.id) return response.status(401);

    service.delete();
  }
}

module.exports = ServiceController
