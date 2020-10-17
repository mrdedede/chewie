'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VetService extends Model {
    vet(){
        return this.belongsTo('App/Models/Vet');
    }
}

module.exports = VetService
