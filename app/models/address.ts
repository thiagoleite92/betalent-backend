import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uf: string

  @column()
  declare city: string

  @column()
  declare neighborhood: string

  @column()
  declare street: string

  @column()
  declare number: string

  @column()
  declare complement: string | null

  @column()
  declare zip_code: string

  @column()
  declare country: string

  @column()
  declare is_primary: boolean | null

  @belongsTo(() => Client)
  @column()
  declare clientId: BelongsTo<typeof Client>
}
