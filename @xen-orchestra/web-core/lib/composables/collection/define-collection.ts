import { GroupDefinition } from '@core/composables/collection/group-definition'
import { LeafDefinition } from '@core/composables/collection/leaf-definition'
import type { DefineCollectionOptions, Definition } from '@core/composables/collection/types'

// Overload 1: Leaf with no options
export function defineCollection<T, const TDiscriminator>(entries: T[]): LeafDefinition<T, TDiscriminator>[]

// Overload 2: Leaf with options
export function defineCollection<T, const TDiscriminator>(
  entries: T[],
  options: DefineCollectionOptions<T, TDiscriminator>
): LeafDefinition<T, TDiscriminator>[]

// Overload 3: Group with no options
export function defineCollection<T, TChildDefinition extends Definition, const TDiscriminator>(
  entries: T[],
  getChildren: (data: T) => TChildDefinition[]
): GroupDefinition<T, TChildDefinition, TDiscriminator>[]

// Overload 4: Group with options
export function defineCollection<T, TChildDefinition extends Definition, const TDiscriminator>(
  entries: T[],
  options: DefineCollectionOptions<T, TDiscriminator>,
  getChildren: (data: T) => TChildDefinition[]
): GroupDefinition<T, TChildDefinition, TDiscriminator>[]

// Implementation
export function defineCollection<T, TChildDefinition extends Definition, const TDiscriminator>(
  entries: T[],
  optionsOrGetChildren?: DefineCollectionOptions<T, TDiscriminator> | ((data: T) => TChildDefinition[]),
  getChildren?: (data: T) => TChildDefinition[]
) {
  const options = typeof optionsOrGetChildren === 'function' ? {} : optionsOrGetChildren ?? {}
  const getChildrenFn = typeof optionsOrGetChildren === 'function' ? optionsOrGetChildren : getChildren

  const { idField = 'id' as keyof T, ...otherOptions } = options

  if (getChildrenFn !== undefined) {
    return entries.map(data => new GroupDefinition(data[idField] as string, data, otherOptions, getChildrenFn(data)))
  }

  return entries.map(data => new LeafDefinition(data[idField] as string, data, options))
}
