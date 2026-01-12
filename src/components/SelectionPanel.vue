<template>
  <div
    class="selection-panel"
    :class="{ 'selection-panel--single': !showCounter }"
    role="region"
    :aria-label="showCounter ? 'Выбранные вещи' : 'Выбранная вещь'"
  >
    <div class="selection-panel__content">
      <template v-if="items.length > 0">
        <div class="selection-panel__items">
          <ItemCard
            v-for="item in items"
            :key="item.id"
            :item="item"
            :interactive="false"
            :size="showCounter ? 'small' : 'large'"
          />
        </div>
      </template>
      <template v-else>
        <div class="selection-panel__placeholder">
          {{ placeholder }}
        </div>
      </template>
    </div>

    <div class="selection-panel__footer">
      <span v-if="showCounter" class="selection-panel__counter">
        selected: {{ count }} / {{ maxCount }}
      </span>
      <button
        v-if="items.length > 0"
        class="selection-panel__clear-btn"
        type="button"
        @click="emit('clear')"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/item'
import ItemCard from '@/components/ItemCard.vue'

interface Props {
  // Выбранные вещи
  items: Item[]
  // Текущее количество выбранных
  count?: number
  // Максимальное количество
  maxCount?: number
  // Показывать ли счётчик
  showCounter?: boolean
  // Текст-заглушка, когда нет выбранных элементов
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  count: 0,
  maxCount: 0,
  showCounter: false,
  placeholder: '',
})

const emit = defineEmits<{
  // Событие очистки выбора
  clear: []
}>()
</script>

<style lang="scss" scoped>
.selection-panel {
  border: 3px solid #000;
  background: #fff;
  color: #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 120px;
  box-sizing: border-box;

  &--single {
    flex: 0 0 200px;
    width: 200px;
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &--single &__content {
    align-items: center;
    justify-content: center;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-content: flex-start;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    flex-shrink: 0;
    height: 28px;
  }

  &__counter {
    font-size: 0.875rem;
    color: #666;
    margin-right: auto;
  }

  &__clear-btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    background: #000;
    color: #fff;
    border: 2px solid #000;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #fff;
      color: #000;
    }

    &:focus {
      outline: 2px solid #000;
      outline-offset: 2px;
    }
  }

  &__placeholder {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
  }
}
</style>
