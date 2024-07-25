// app/Models/Sale.ts
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import Product from './product.js'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quantity: number

  @column()
  declare unitPrice: number

  @column()
  declare totalPrice: number

  @belongsTo(() => Client)
  @column()
  declare clientId: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  @column()
  declare productId: BelongsTo<typeof Product>
}
