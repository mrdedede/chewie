'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Petshop extends Model {
    user(){
        return this.belongsTo('App/Models/User');
    }   
    services(){
        return this.hasMany('App/Models/Service');
    }
}

module.exports = Petshop
