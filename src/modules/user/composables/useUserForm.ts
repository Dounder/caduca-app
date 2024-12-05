import { useForm } from 'vee-validate'
import { computed, reactive } from 'vue'

import { userSchema } from '../schemas'

export const useUserForm = () => {
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
