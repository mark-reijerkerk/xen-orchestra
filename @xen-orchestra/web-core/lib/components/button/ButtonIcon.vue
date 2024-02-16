<template>
  <button class="button-icon" type="button" :class="[color, { small }]">
    <UiIcon class="icon" :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import UiIcon from '@core/components/icon/UiIcon.vue'
import type { Color } from '@core/types/color.type'
import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

withDefaults(
  defineProps<{
    icon: IconDefinition
    color?: Color
    small?: boolean
  }>(),
  { color: 'info' }
)
</script>

<style scoped lang="postcss">
.button-icon {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: 0.2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  --size: calc(2em - 0.8rem);
  width: var(--size);
  height: var(--size);
  color: var(--color);

  &.small {
    font-size: 1.2rem;
  }

  &:focus-visible {
    outline: none;
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      color: var(--color-focus);
      background-color: var(--background-color-focus);
    }

    &:active {
      color: var(--color-active);
      background-color: var(--background-color-active);
    }
  }

  &:disabled {
    color: var(--color-disabled);
    cursor: not-allowed;
  }
}

.info {
  --color: var(--color-purple-base);
  --color-focus: var(--color-purple-d20);
  --color-active: var(--color-purple-d40);
  --color-disabled: var(--color-grey-400);
  --background-color-focus: var(--background-color-purple-20);
  --background-color-active: var(--background-color-purple-30);
}

.success {
  --color: var(--color-green-base);
  --color-focus: var(--color-green-d20);
  --color-active: var(--color-green-d40);
  --color-disabled: var(--color-green-l60);
  --background-color-focus: var(--background-color-green-20);
  --background-color-active: var(--background-color-green-30);
}

.warning {
  --color: var(--color-orange-base);
  --color-focus: var(--color-orange-d20);
  --color-active: var(--color-orange-d40);
  --color-disabled: var(--color-orange-l60);
  --background-color-focus: var(--background-color-orange-20);
  --background-color-active: var(--background-color-orange-30);
}

.error {
  --color: var(--color-red-base);
  --color-focus: var(--color-red-d20);
  --color-active: var(--color-red-d40);
  --color-disabled: var(--color-red-l60);
  --background-color-focus: var(--background-color-red-20);
  --background-color-active: var(--background-color-red-30);
}
</style>
