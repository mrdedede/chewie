'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vet extends Model {
    user(){
        return this.belongsTo('App/Models/User');
    }
    vetServices(){
        return this.hasMany('App/Models/VetService');
    }
}

module.exports = Vet
