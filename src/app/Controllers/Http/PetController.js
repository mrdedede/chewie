'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pet = use('App/Models/Pet');
const Client = use('App/Models/Client')

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
    const {name, pet_type, breed, age} = request.body;

    const client = await Client.findBy('user_id', auth.user.id);

    const pet = await Pet.create({
      name,
      pet_type,
      breed,
      age,
      client_id: client.id
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
    const data = request.only(['name', 'pet_type', 'breed', 'age']);
    const pet = await Pet.find(params.id);

    pet.merge(data);
    await pet.save();

    return pet;
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

    if(pet.client_id !== auth.user.id) return response.status(401);

    pet.delete();
  }
}

module.exports = PetController
