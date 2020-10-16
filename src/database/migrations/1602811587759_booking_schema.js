'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
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
        .integer('petshop_id')
        .references('id')
        .inTable('petshops')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('service_id')
        .references('id')
        .inTable('services')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('pet_id')
        .references('id')
        .inTable('pets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
