import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import Sale from './sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare description: string

  @column()
  declare name: string

  @column()
  declare stock: number

  @column()
  declare price: number

  @column.dateTime()
  declare deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>
}
