import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ProductsSchema extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.text('description').nullable()
      table.decimal('price', 12, 2).notNullable()
      table.integer('stock').notNullable().unsigned()
      table.timestamp('deleted_at').nullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
