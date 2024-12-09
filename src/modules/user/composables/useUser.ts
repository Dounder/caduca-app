import { useQuery } from '@tanstack/vue-query'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, reactive, watch, type Ref } from 'vue'

import { useI18n } from 'vue-i18n'
import { RoleId, type UserAuditInfo } from '../interfaces'
import { userSchema } from '../schemas'
import { getUserAction } from '../actions'

export function useUser(id: Ref<string>) {
  const { t } = useI18n()
  const { form, errors, meta, canSave, allRoles, resetForm, handleSubmit, toggleRole } =
    useUserForm()

  const {
    data: user,
    isError,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserAction(id.value),
    retry: false
  })

  function useUserForm() {
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

      //? Methods
      handleSubmit,
      resetForm,
      toggleRole
    }
  }

  watch(id, () => refetch(), { immediate: true })

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
    allRoles,
    isError,
    isLoading: computed(() => isLoading.value || isRefetching.value),
    canSave,
    getAuditData: computed<UserAuditInfo[]>(() => {
      if (!user.value || user.value.id === '') return []

      return [
        {
          title: t('user.table.createdBy'),
          user: user.value.createdBy,
          date: user.value.createdAt
        },
        {
          title: t('user.table.updatedBy'),
          user: user.value.updatedBy,
          date: user.value.updatedAt
        },
        { title: t('user.table.deletedBy'), user: user.value.deletedBy, date: user.value.deletedAt }
      ]
    }),
    hasRole: (role: string) => form.roles.map((r) => r.value).includes(role),

    //? Methods
    refetch,
    handleSubmit,
    resetForm,
    toggleRole
  }
}
