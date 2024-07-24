import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare phoneNumber: string

  @belongsTo(() => Client)
  @column()
  declare clientId: BelongsTo<typeof Client>
}
