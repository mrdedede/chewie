'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppointmentSchema extends Schema {
  up () {
    this.create('appointments', (table) => {
      table.increments()
      table.string('name').notNullable();
      table.date('date').notNullable();
      table
        .integer('client_id')
        .notNullable()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('vet_id')
        .notNullable()
        .references('id')
        .inTable('vets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('vet_service_id')
        .notNullable()
        .references('id')
        .inTable('vet_services')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('pet_id')
        .notNullable()
        .references('id')
        .inTable('pets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('appointments')
  }
}

module.exports = AppointmentSchema
