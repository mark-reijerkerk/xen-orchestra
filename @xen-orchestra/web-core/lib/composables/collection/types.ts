import type { Base } from '@core/composables/collection/base'
import type { Group } from '@core/composables/collection/group'
import type { GroupDefinition } from '@core/composables/collection/group-definition'
import type { Leaf } from '@core/composables/collection/leaf'
import type { LeafDefinition } from '@core/composables/collection/leaf-definition'

export type ItemOptions<T, TDiscriminator> = {
  discriminator?: TDiscriminator
  predicate?: (data: T) => boolean | undefined
}

export type DefineCollectionOptions<T, TDiscriminator> = ItemOptions<T, TDiscriminator> & {
  idField?: keyof T
}

export type Definition = LeafDefinition | GroupDefinition

export type CollectionContext = {
  allowMultiSelect: boolean
  selected: Map<string, Base>
  expanded: Map<string, Base>
  active: Base | undefined
}

export type DefinitionToItem<TDefinition> =
  TDefinition extends GroupDefinition<infer T, infer TChildDefinition, infer TDiscriminator>
    ? Group<T, DefinitionToItem<TChildDefinition>, TDiscriminator>
    : TDefinition extends LeafDefinition<infer T, infer TDiscriminator>
      ? Leaf<T, TDiscriminator>
      : never

export type Item = Leaf | Group
