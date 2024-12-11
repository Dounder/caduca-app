import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const usePaginationStore = defineStore('pagination', () => {
  const route = useRoute()
  const page = ref(Number(route.query.page) || 1)
  const lastPage = ref(1)

  watch(
    () => route.query.page,
    (newPage) => {
      if (!newPage) return

      const pageNumber = Number(newPage) || 1

      if (pageNumber > lastPage.value) page.value = lastPage.value

      page.value = Math.max(1, pageNumber)
    }
  )

  // Optional computed if you want derived state, not necessary
  const isOnLastPage = computed(() => page.value === lastPage.value)

  const setPage = (newPage: number) => {
    page.value = Math.max(1, Math.min(newPage, lastPage.value))
  }

  const setLastPage = (newLastPage: number) => {
    lastPage.value = newLastPage

    if (page.value > lastPage.value) page.value = lastPage.value
  }

  return {
    //? Props
    page,
    lastPage,

    //* Getters
    isOnLastPage,

    //! Actions
    setPage,
    setLastPage
  }
})
