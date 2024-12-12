import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const usePaginationStore = defineStore('pagination', () => {
  const route = useRoute()
  const page = ref<number>(1)
  const lastPage = ref<number>(1)

  // Watch for URL query changes
  watch(
    () => route.query.page,
    (newPage) => {
      const pageNumber = Number(newPage)

      if (!newPage || isNaN(pageNumber)) {
        page.value = 1
        return
      }

      page.value = clampPageNumber(pageNumber)
    },
    { immediate: true }
  )

  // Derived states
  const isOnLastPage = computed(() => page.value === lastPage.value)
  const isOnFirstPage = computed(() => page.value === 1)
  const hasNextPage = computed(() => page.value < lastPage.value)
  const hasPreviousPage = computed(() => page.value > 1)

  // Helper function to ensure page number is within valid range
  const clampPageNumber = (num: number): number => {
    return Math.max(1, Math.min(num, lastPage.value))
  }

  const setPage = (newPage: number): void => {
    if (newPage <= 0) throw new Error('Page number must be positive')
    page.value = clampPageNumber(newPage)
  }

  const setLastPage = (newLastPage: number): void => {
    if (newLastPage <= 0) throw new Error('Last page must be positive')
    lastPage.value = newLastPage
    page.value = clampPageNumber(page.value)
  }

  return {
    // State
    page,
    lastPage,

    // Getters
    isOnLastPage,
    isOnFirstPage,
    hasNextPage,
    hasPreviousPage,

    // Actions
    setPage,
    setLastPage
  }
})
