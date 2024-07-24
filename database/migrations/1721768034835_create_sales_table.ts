import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SalesSchema extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').unsigned().references('clients.id').notNullable()
      table.integer('product_id').unsigned().references('products.id').notNullable()
      table.integer('quantity').notNullable()
      table.decimal('unit_price', 12, 2).notNullable()
      table.decimal('total_price', 12, 2).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
