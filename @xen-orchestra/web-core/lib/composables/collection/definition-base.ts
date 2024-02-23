import type { ItemOptions } from '@core/composables/collection/types'

export abstract class DefinitionBase<T, TDiscriminator> {
  id: string
  data: T
  options: ItemOptions<T, TDiscriminator>

  constructor(id: string, data: T, options: ItemOptions<T, TDiscriminator> = {}) {
    this.data = data
    this.options = options
    this.id = id
  }
}
