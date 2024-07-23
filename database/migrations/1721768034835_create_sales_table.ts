import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SalesSchema extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity').notNullable()
      table.decimal('unit_price', 12, 2).notNullable()
      table.decimal('total_price', 12, 2).notNullable()
      table.timestamp('created_at').defaultTo(this.now())

      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
