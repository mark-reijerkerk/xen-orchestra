import type { Group } from '@core/composables/collection/group'
import type { CollectionContext, ItemOptions } from '@core/composables/collection/types'

export abstract class Base<T = any, TDiscriminator = any> {
  abstract readonly isGroup: boolean
  abstract passesFilterDownwards: boolean
  abstract isVisible: boolean
  abstract labelClasses: Record<string, boolean>

  readonly id: string
  readonly data: T
  readonly depth: number
  readonly discriminator: TDiscriminator | undefined

  readonly parent: Group | undefined
  readonly context: CollectionContext
  readonly predicate: undefined | ((data: T) => boolean | undefined)

  constructor(
    id: string,
    data: T,
    parent: Group | undefined,
    context: CollectionContext,
    depth: number,
    options?: ItemOptions<T, TDiscriminator>
  ) {
    this.id = id
    this.data = data
    this.parent = parent
    this.context = context
    this.depth = depth
    this.discriminator = options?.discriminator
    this.predicate = options?.predicate
  }

  get passesFilter() {
    return this.predicate?.(this.data)
  }

  get isSelected() {
    return this.context.selected.has(this.id)
  }

  get isActive() {
    return this.context.active?.id === this.id
  }

  get passesFilterUpwards(): boolean {
    return this.passesFilter || (this.parent?.passesFilterUpwards ?? false)
  }

  activate() {
    this.context.active = this
  }

  toggleSelect(force?: boolean) {
    const shouldSelect = force ?? !this.isSelected

    if (shouldSelect) {
      if (!this.context.allowMultiSelect) {
        this.context.selected.clear()
      }

      this.context.selected.set(this.id, this)
    } else {
      this.context.selected.delete(this.id)
    }
  }
}
