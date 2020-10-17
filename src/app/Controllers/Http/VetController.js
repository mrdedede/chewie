'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Vet = use('App/Models/Vet');

/**
 * Resourceful controller for interacting with vets
 */
class VetController {
  /**
   * Show a list of all vets.
   * GET vets
   */
  async index () {
    const vets = await Vet.query().with('user').fetch();

    return vets;
  }

  /**
   * Create/save a new vet.
   * POST vets
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const {name, address, phone} = request.body;

    const vet = await Vet.create({
      name,
      address,
      phone,
      user_id: auth.user.id
    });

    return vet;
  }

  /**
   * Display a single vet.
   * GET vets/:id
   *
   * @param {object} ctx
   *
   */
  async show ({ params }) {
    const vet = await Vet.findOrFail(params.id);

    return vet;
  }

  /**
   * Update vet details.
   * PUT or PATCH vets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const data = request.only(['name', 'address', 'phone']);
    const vet = await Vet.find(params.id);

    vet.merge(data);
    await vet.save();

    return vet;
  }

  /**
   * Delete a vet with id.
   * DELETE vets/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const vet = await Vet.findOrFail(params.id);

    if(vet.user_id !== auth.user.id) return response.status(401);

    vet.delete();
  }
}

module.exports = VetController
