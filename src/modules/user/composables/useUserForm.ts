import { computed, reactive } from 'vue'
import { useFieldArray, useForm } from 'vee-validate'

import { RoleId } from '../interfaces'
import { userSchema } from '../schemas'

export const useUserForm = () => {
  const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
    validationSchema: userSchema,
    validateOnMount: false
  })
  const [username, usernameAttrs] = defineField('username')
  const [email, emailAttrs] = defineField('email')
  const { fields: roles, remove: removeRole, push: pushRoles } = useFieldArray<string>('roles')

  const allRoles: string[] = Object.values(RoleId)
  const toggleRole = (role: string) => {
    const currentRoles = roles.value.map((r) => r.value)
    const hasRole = currentRoles.includes(role)

    hasRole ? removeRole(currentRoles.indexOf(role)) : pushRoles(role)
  }

  const form = reactive({ username, usernameAttrs, email, emailAttrs, roles })

  return {
    //* Props
    form,
    errors,
    meta,

    //! Getters
    allRoles,
    canSave: computed(() => meta.value.valid && meta.value.dirty),
    hasRole: (role: string) => form.roles.map((r) => r.value).includes(role),

    //? Methods
    handleSubmit,
    resetForm,
    toggleRole
  }
}
