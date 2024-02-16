<template>
  <span :class="[classProp, size]" class="ui-counter">
    <span class="value" :class="{ overflow: value > 99 }">
      {{ value }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { useContext } from '@core/composables/context.composable'
import { ColorContext } from '@core/context'
import type { Color } from '@core/types/color.type'
import { computed } from 'vue'

const props = defineProps<{
  value: number
  color?: Color | 'black'
  size?: 'small' | 'medium'
}>()

const { name: contextColor } = useContext(ColorContext, () => props.color as Color)

const classProp = computed(() => `color-${contextColor.value}`)
</script>

<style lang="postcss" scoped>
.ui-counter {
  font-weight: 500;
  font-size: 1.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--size);
  color: var(--color-grey-600);
  border-radius: calc(var(--size) / 2);
  background-color: var(--background-color);
  --background-color: var(--color-grey-300);
  --size: 2.4rem;

  &.small {
    --size: 1.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .value {
    padding: 0 0.4rem;
  }

  .overflow {
    font-size: 0.8em;
  }

  &.color-info {
    --background-color: var(--color-purple-base);
  }

  &.color-success {
    --background-color: var(--color-green-base);
  }

  &.color-warning {
    --background-color: var(--color-orange-base);
  }

  &.color-error {
    --background-color: var(--color-red-base);
  }

  &.color-black {
    --background-color: var(--color-grey-000);
  }
}
</style>
