import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddressesSchema extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uf').notNullable()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('complement').nullable()
      table.string('zip_code').notNullable()
      table.string('country').notNullable()
      table.boolean('is_primary').defaultTo(false)
      table.integer('customer_id').unsigned().references('id').inTable('customers')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
