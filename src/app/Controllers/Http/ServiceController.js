'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Service = use('App/Models/Service');
const Petshop = use('App/Models/Petshop');
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
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response}) {
    const {name, value, duration, employee, description} = request.body;
  
    if(auth.user.user_type !== 'petshop') return response.status(403);

    const petshop = await Petshop.findBy('user_id', auth.user.id);

    const service = await Service.create({
      name,
      value,
      duration,
      employee,
      description,
      petshop_id: petshop.id
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
   */
  async update ({ params, request }) {
      const data = request.only(['name', 'value', 'duration', 'employee', 'description']);
      const service = await Service.find(params.id);

      service.merge(data);
      await service.save();

      return service;
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
