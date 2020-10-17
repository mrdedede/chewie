'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VetServiceSchema extends Schema {
  up () {
    this.create('vet_services', (table) => {
      table.increments()
      table.string('name').notNullable();
      table.decimal('value');
      table.string('duration');
      table.string('employee');
      table.string('description');
      table
        .integer('vet_id')
        .notNullable()
        .references('id')
        .inTable('vets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('vet_services')
  }
}

module.exports = VetServiceSchema
