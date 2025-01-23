import { useNotification } from '@/modules/shared'
import { getReportAction } from '@/modules/shared/actions'
import { DownloadFilesUtil } from '@/modules/shared/utils/download-files.util'
import { useMutation } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useCustomerReports = () => {
  const { t } = useI18n()
  const { showError } = useNotification()

  const {
    mutate: customerReportMutation,
    isError,
    isPending: isGeneratingReport
  } = useMutation({
    mutationKey: ['report:customers'],
    mutationFn: async () => getReportAction('/report/customers'),
    onSuccess: DownloadFilesUtil.downloadExcelBlob
  })

  // Show error notification
  watch(isError, (error) => {
    if (error) showError({ detail: t('shared.messages.reportFailed') })
  })

  return {
    customerReportMutation,
    isGeneratingReport
  }
}
