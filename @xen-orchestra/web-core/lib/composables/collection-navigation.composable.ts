import { Group } from '@core/composables/collection/group'
import type { Item } from '@core/composables/collection/types'
import { computed, type ComputedRef } from 'vue'

export function useCollectionNavigation<TItem extends Item>(
  items: ComputedRef<TItem[]>,
  activeItem: ComputedRef<TItem | undefined>
) {
  const flatItems = computed(() => {
    const result = [] as any[]

    function add(item: Item) {
      result.push(item)

      if (item instanceof Group) {
        item.children.forEach(child => add(child))
      }
    }

    items.value.forEach(item => add(item))

    return result
  }) as ComputedRef<TItem[]>

  const activeIndex = computed(() => {
    const id = activeItem.value?.id

    return id === undefined ? -1 : flatItems.value.findIndex(item => item.id === id)
  })

  const moveDown = () => {
    flatItems.value[activeIndex.value === -1 ? 0 : activeIndex.value + 1]?.activate()
  }

  const moveUp = () => {
    flatItems.value[activeIndex.value - 1]?.activate()
  }

  const moveLeft = () => {
    if (activeItem.value instanceof Group && activeItem.value.isExpanded) {
      return activeItem.value.toggleExpand(false, true)
    }

    activeItem.value?.parent?.activate()
  }

  const moveRight = () => {
    if (activeItem.value instanceof Group && !activeItem.value.isExpanded) {
      return activeItem.value.toggleExpand(true)
    }

    moveDown()
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault()
    }

    switch (event.key) {
      case 'ArrowDown':
        return moveDown()
      case 'ArrowUp':
        return moveUp()
      case 'ArrowLeft':
        return moveLeft()
      case 'ArrowRight':
        return moveRight()
    }
  }

  return { moveUp, moveDown, moveLeft, moveRight, handleKeydown }
}
