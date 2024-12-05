import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, reactive, watch, type Ref } from 'vue'

import { getUserByUsernameAction } from '../actions'
import { userSchema } from '../schemas'

export function useUser(usernameRef: Ref<string>) {
  const { form, errors, meta, canSave, resetForm, handleSubmit } = useUserForm()

  const {
    data: user,
    isError,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['user', usernameRef],
    queryFn: () => getUserByUsernameAction(usernameRef.value),
    retry: false
  })

  function useUserForm() {
    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: userSchema,
      validateOnMount: false
    })
    const [username, usernameAttrs] = defineField('username')
    const [email, emailAttrs] = defineField('email')

    const form = reactive({
      username,
      usernameAttrs,
      email,
      emailAttrs
    })

    return {
      //* Props
      form,
      errors,
      meta,

      //! Getters
      canSave: computed(() => meta.value.valid && meta.value.dirty),

      //? Methods
      handleSubmit,
      resetForm
    }
  }

  watch(usernameRef, () => refetch(), { immediate: true })

  watch(
    user,
    () => {
      if (!user.value) return
      resetForm({ values: user.value })
    },
    { immediate: true }
  )

  return {
    //* Props
    user,
    form,
    errors,
    meta,

    //! Getters
    isError,
    isLoading: computed(() => isLoading.value || isRefetching.value),
    canSave,

    //? Methods
    refetch,
    handleSubmit,
    resetForm
  }
}
