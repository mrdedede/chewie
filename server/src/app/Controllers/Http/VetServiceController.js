'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const VetService = use('App/Models/VetService');
const Vet = use('App/Models/Vet');

/**
 * Resourceful controller for interacting with vetservices
 */
class VetServiceController {
  /**
   * Show a list of all vetservices.
   * GET vetservices
   *
   */
  async index () {
    const vetServices = await VetService.query().with('vet').fetch();

    return vetServices;
  }

  /**
   * Create/save a new vetservice.
   * POST vetservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const {name, value, duration, employee, description} = request.body;
    
    if(auth.user.user_type !== 'vet') return response.status(403);

    const vet = await Vet.findBy('user_id', auth.user.id)

    const vetService = await VetService.create({
      name,
      value,
      duration,
      employee,
      description,
      vet_id: vet.id
    });

    return vetService;
  }

  /**
   * Display a single vetservice.
   * GET vetservices/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const vetService = await VetService.findOrFail(params.id);

    return vetService;
  }

  /**
   * Update vetservice details.
   * PUT or PATCH vetservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
      const data = request.only(['name', 'value', 'duration', 'employee', 'description']);
      const vetService = await VetService.find(params.id);

      vetService.merge(data);
      await vetService.save();

      return vetService;
  }

  /**
   * Delete a vetservice with id.
   * DELETE vetservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const vetService = await VetService.findOrFail(params.id);

    if(vetService.vet_id !== auth.user.id) return response.status(401);

    vetService.delete();
  }
}

module.exports = VetServiceController
