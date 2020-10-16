'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.increments()
      table.string('name').notNullable();
      table.string('breed');
      table.integer('age');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetSchema
