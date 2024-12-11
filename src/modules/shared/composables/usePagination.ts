import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const usePagination = () => {
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

  const setLastPage = (value: number) => (lastPage.value = value)

  return {
    //* props
    page,
    lastPage: computed(() => lastPage.value),

    //? methods
    setLastPage
  }
}
