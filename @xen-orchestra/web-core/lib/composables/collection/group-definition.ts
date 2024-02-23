import { DefinitionBase } from '@core/composables/collection/definition-base'
import type { Definition, ItemOptions } from '@core/composables/collection/types'

export class GroupDefinition<
  T = any,
  TChildDefinition extends Definition = Definition,
  const TDiscriminator = any,
> extends DefinitionBase<T, TDiscriminator> {
  children: TChildDefinition[]

  constructor(id: string, data: T, children: TChildDefinition[])
  constructor(id: string, data: T, options: ItemOptions<T, TDiscriminator>, children: TChildDefinition[])
  constructor(
    id: string,
    data: T,
    optionsOrChildren: ItemOptions<T, TDiscriminator> | TChildDefinition[],
    children?: TChildDefinition[]
  ) {
    super(id, data, Array.isArray(optionsOrChildren) ? {} : optionsOrChildren)

    this.children = Array.isArray(optionsOrChildren) ? optionsOrChildren : children!
  }
}
