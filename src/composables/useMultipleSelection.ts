import { ref, computed, type Ref, type ComputedRef } from 'vue'

interface Identifiable {
  id: number
}

interface UseMultipleSelectionOptions {
  // Максимальное количество выбранных элементов
  maxSelections: number
}

interface UseMultipleSelectionReturn<T extends Identifiable> {
  // Массив выбранных элементов
  selectedItems: Ref<T[]>
  // Проверка, выбран ли элемент
  isSelected: (item: T) => boolean
  // Переключить выбор элемента
  toggle: (item: T) => void
  // Очистить все выбранные элементы
  clear: () => void
  // Количество выбранных элементов
  count: ComputedRef<number>
  // Достигнут ли лимит выбора
  isLimitReached: ComputedRef<boolean>
}

// Composable для управления множественным выбором с лимитом
export function useMultipleSelection<T extends Identifiable>(
  options: UseMultipleSelectionOptions
): UseMultipleSelectionReturn<T> {
  const { maxSelections } = options
  const selectedItems = ref<T[]>([]) as Ref<T[]>

  const count = computed(() => selectedItems.value.length)
  const isLimitReached = computed(() => selectedItems.value.length >= maxSelections)

  const isSelected = (item: T): boolean => {
    return selectedItems.value.some((i) => i.id === item.id)
  }

  const toggle = (item: T): void => {
    const index = selectedItems.value.findIndex((i) => i.id === item.id)

    if (index !== -1) {
      // Если элемент уже выбран — убираем
      selectedItems.value.splice(index, 1)
    } else if (!isLimitReached.value) {
      // Если лимит не достигнут — добавляем
      selectedItems.value.push(item)
    }
  }

  const clear = (): void => {
    selectedItems.value = []
  }

  return {
    selectedItems,
    isSelected,
    toggle,
    clear,
    count,
    isLimitReached,
  }
}
