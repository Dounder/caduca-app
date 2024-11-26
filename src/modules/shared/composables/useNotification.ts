import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined

export const useNotification = () => {
  const toast = useToast()
  const { t } = useI18n()

  // Default messages for each severity level
  const defaultMessages: Record<string, Partial<ToastMessageOptions>> = {
    success: {
      summary: t('shared.toast.success.summary'),
      detail: t('shared.toast.success.detail'),
      life: 1000
    },
    info: {
      summary: t('shared.toast.info.summary'),
      detail: t('shared.toast.info.detail'),
      life: 1000
    },
    warn: {
      summary: t('shared.toast.warn.summary'),
      detail: t('shared.toast.warn.detail'),
      life: 2000
    },
    error: {
      summary: t('shared.toast.error.summary'),
      detail: t('shared.toast.error.detail'),
      life: 3000
    },
    secondary: {
      summary: t('shared.toast.secondary.summary'),
      detail: t('shared.toast.secondary.detail'),
      life: 1000
    },
    contrast: {
      summary: t('shared.toast.contrast.summary'),
      detail: t('shared.toast.contrast.detail'),
      life: 1000
    }
  }

  const showNotification = (
    severity: keyof typeof defaultMessages,
    options: Partial<ToastMessageOptions> = {}
  ) => {
    const messageOptions = {
      ...defaultMessages[severity],
      ...options,
      severity: severity as Severity
    }

    toast.add(messageOptions)
  }

  return {
    showSuccess: (options?: Partial<ToastMessageOptions>) => showNotification('success', options),
    showInfo: (options?: Partial<ToastMessageOptions>) => showNotification('info', options),
    showWarn: (options?: Partial<ToastMessageOptions>) => showNotification('warn', options),
    showError: (options?: Partial<ToastMessageOptions>) => showNotification('error', options),
    showSecondary: (options?: Partial<ToastMessageOptions>) =>
      showNotification('secondary', options),
    showContrast: (options?: Partial<ToastMessageOptions>) => showNotification('contrast', options)
  }
}
