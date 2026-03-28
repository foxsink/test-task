<template>
  <div class="app">
    <!-- Верхняя часть: выбранные элементы -->
    <section class="top-section" aria-label="Выбранные вещи">
      <!-- Верхний левый блок: выбранные вещи пользователя -->
      <SelectionPanel
        :items="selectedUserItems"
        :count="userSelectionCount"
        :max-count="MAX_USER_SELECTIONS"
        show-counter
        @clear="clearUserSelection"
      />

      <!-- Верхний правый блок: выбранная вещь из правого списка -->
      <SelectionPanel
        :items="selectedAvailableItem ? [selectedAvailableItem] : []"
        placeholder="SELECTED ITEM"
        @clear="clearAvailableSelection"
      />
    </section>

    <!-- Нижняя часть: списки для выбора -->
    <section class="bottom-section" aria-label="Списки вещей">
      <!-- Нижний левый блок: вещи пользователя -->
      <ItemsPanel
        :items="userItems"
        :is-selected="isUserItemSelected"
        @select="toggleUserItem"
      />

      <!-- Нижний правый блок: вещи на выбор -->
      <ItemsPanel
        :items="availableItems"
        :is-selected="isAvailableItemSelected"
        @select="selectAvailableItem"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/item'
import { userItems, availableItems } from '@/data/items'
import { useMultipleSelection } from '@/composables/useMultipleSelection'
import { useSingleSelection } from '@/composables/useSingleSelection'
import SelectionPanel from '@/components/SelectionPanel.vue'
import ItemsPanel from '@/components/ItemsPanel.vue'

// Максимальное количество выбранных вещей пользователя
const MAX_USER_SELECTIONS = 6

// Выбор вещей пользователя (от 1 до 6)
const {
  selectedItems: selectedUserItems,
  isSelected: isUserItemSelected,
  toggle: toggleUserItem,
  count: userSelectionCount,
  clear: clearUserSelection,
} = useMultipleSelection<Item>({ maxSelections: MAX_USER_SELECTIONS })

// Выбор вещи из правого блока (только 1)
const {
  selectedItem: selectedAvailableItem,
  isSelected: isAvailableItemSelected,
  select: selectAvailableItem,
  clear: clearAvailableSelection,
} = useSingleSelection<Item>()
</script>

<style lang="scss" scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.top-section {
  display: flex;
  gap: 2rem;
}

.bottom-section {
  display: flex;
  gap: 1.5rem;
}
</style>
