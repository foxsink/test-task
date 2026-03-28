<template>
  <div class="items-panel" role="group" aria-label="Список вещей">
    <div class="items-panel__header">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        :selected="isSelected(item)"
        @click="emit('select', item)"
      />
    </div>
    <div class="items-panel__content"></div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/item'
import ItemCard from '@/components/ItemCard.vue'

interface Props {
  // Список вещей для отображения
  items: Item[]
  // Функция проверки, выбрана ли вещь
  isSelected: (item: Item) => boolean
}

defineProps<Props>()

const emit = defineEmits<{
  // Событие выбора вещи
  select: [item: Item]
}>()
</script>

<style lang="scss" scoped>
.items-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 3px solid #000;
  background: #fff;

  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem;
    border-bottom: 2px solid #000;
  }

  &__content {
    flex: 1;
    min-height: 300px;
  }
}
</style>
