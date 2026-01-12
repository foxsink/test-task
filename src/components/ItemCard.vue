<template>
  <div
    class="item-card"
    :class="{
      'item-card--selected': selected,
      'item-card--interactive': interactive,
      'item-card--large': size === 'large',
    }"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    :aria-pressed="interactive ? selected : undefined"
    :data-text="item.name"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    {{ item.name }}
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/item'

interface Props {
  // Данные вещи
  item: Item
  // Выбрана ли вещь
  selected?: boolean
  // Можно ли кликать на вещь
  interactive?: boolean
  // Размер карточки
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  interactive: true,
  size: 'small',
})

const emit = defineEmits<{
  // Событие клика по карточке
  click: [item: Item]
}>()

const handleClick = () => {
  if (props.interactive) {
    emit('click', props.item)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.interactive && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    emit('click', props.item)
  }
}
</script>

<style lang="scss" scoped>
.item-card {
  border: 2px solid #000;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  user-select: none;
  background: #fff;
  color: #000;

  // Резервирование места под жирный текст
  &::after {
    content: attr(data-text);
    display: block;
    font-weight: 600;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  &--interactive {
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    &:focus {
      outline: 2px solid #000;
      outline-offset: 2px;
    }
  }

  &--selected {
    background-color: #e0e0e0;
    font-weight: 600;
  }

  &--large {
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
