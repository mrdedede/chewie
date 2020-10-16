'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pet = use('App/Models/Pet');

/**
 * Resourceful controller for interacting with pets
 */
class PetController {
  /**
   * Show a list of all pets.
   * GET pets
   *
   */
  async index () {
    const pets = await Pet.query().with('client').fetch();

    return pets;
  }

  /**
   * Create/save a new pet.
   * POST pets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const {name, breed, age} = request.body;

    const pet = await Pet.create({
      name,
      breed,
      age,
      user_id: auth.user.id
    });

    return pet;

  }

  /**
   * Display a single pet.
   * GET pets/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const pet = await Pet.findOrFail(params.id);

    return pet;
  }

  /**
   * Update pet details.
   * PUT or PATCH pets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pet with id.
   * DELETE pets/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const pet = await Pet.findOrFail(params.id);

    if(pet.user_id !== auth.user.id) return response.status(401);

    pet.delete();
  }
}

module.exports = PetController
