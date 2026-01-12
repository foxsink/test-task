import { ref, computed, type Ref, type ComputedRef } from 'vue'

interface Identifiable {
  id: number
}

interface UseSingleSelectionReturn<T extends Identifiable> {
  // Выбранный элемент
  selectedItem: Ref<T | null>
  // Проверка, выбран ли элемент
  isSelected: (item: T) => boolean
  // Выбрать элемент (или снять выбор при повторном клике)
  select: (item: T) => void
  // Очистить выбор
  clear: () => void
  // Есть ли выбранный элемент
  hasSelection: ComputedRef<boolean>
}

// Composable для управления единичным выбором
export function useSingleSelection<T extends Identifiable>(): UseSingleSelectionReturn<T> {
  const selectedItem = ref<T | null>(null) as Ref<T | null>

  const hasSelection = computed(() => selectedItem.value !== null)

  const isSelected = (item: T): boolean => {
    return selectedItem.value?.id === item.id
  }

  const select = (item: T): void => {
    if (selectedItem.value?.id === item.id) {
      // Если кликнули на уже выбранный — снимаем выбор
      selectedItem.value = null
    } else {
      // Иначе выбираем новый
      selectedItem.value = item
    }
  }

  const clear = (): void => {
    selectedItem.value = null
  }

  return {
    selectedItem,
    isSelected,
    select,
    clear,
    hasSelection,
  }
}
