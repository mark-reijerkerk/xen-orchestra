import { buildCollection } from '@core/composables/collection/build-collection'
import type { CollectionContext, Definition, Item } from '@core/composables/collection/types'
import { computed, type MaybeRefOrGetter, reactive, type Ref, ref, toValue } from 'vue'

export function useCollection<TDefinition extends Definition>(
  definitions: MaybeRefOrGetter<TDefinition[]>,
  options?: { allowMultiSelect?: boolean; expand?: boolean }
) {
  const selected = ref(new Map()) as Ref<Map<string, Item>>
  const expanded = ref(new Map()) as Ref<Map<string, Item>>
  const active = ref() as Ref<Item | undefined>

  const context = reactive({
    allowMultiSelect: options?.allowMultiSelect ?? false,
    selected,
    expanded,
    active,
  }) as CollectionContext

  const rawItems = computed(() => buildCollection(toValue(definitions), context))
  const items = computed(() => rawItems.value.filter(item => item.isVisible))

  if (options?.expand !== false) {
    items.value.forEach(item => item.isGroup && item.toggleExpand(true, true))
  }

  return {
    items,
    activeItem: computed(() => context.active),
    selectedItems: computed(() => Array.from(context.selected.values())),
    expandedItems: computed(() => Array.from(context.expanded.values())),
  }
}
