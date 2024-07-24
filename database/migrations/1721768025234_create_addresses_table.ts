import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddressesSchema extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uf').notNullable()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('complement').nullable()
      table.string('zip_code').notNullable()
      table.string('country').notNullable()
      table.boolean('is_primary').defaultTo(false)
      table
        .integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
