'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Petshop = use('App/Models/Petshop');

/**
 * Resourceful controller for interacting with petshops
 */
class PetshopController {
  /**
   * Show a list of all petshops.
   * GET petshops
   */
  async index () {
    const petshops = await Petshop.query().with('user').fetch();

    return petshops;
  }

  /**
   * Create/save a new petshop.
   * POST petshops
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const {name, address, phone} = request.body;

    const petshop = await Petshop.create({
      name,
      address,
      phone,
      user_id: auth.user.id
    });

    return petshop;
  }

  /**
   * Display a single petshop.
   * GET petshops/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const petshop = await Petshop.query(params.id).with('services').fetch();

    return petshop;
  }

  /**
   * Update petshop details.
   * PUT or PATCH petshops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['name', 'address', 'phone']);
    const petshop = await Petshop.find(params.id);

    petshop.merge(data);
    await petshop.save();

    return petshop;    
  }

  /**
   * Delete a petshop with id.
   * DELETE petshops/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const petshop = await Petshop.findOrFail(params.id);

    if(petshop.user_id !== auth.user.id) return response.status(401);

    petshop.delete();
  }
}

module.exports = PetshopController
