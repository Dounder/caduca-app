import { useMutation } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification } from '@/modules/shared'
import { getReportAction } from '@/modules/shared/actions'
import { DownloadFilesUtil } from '@/modules/shared/utils/download-files.util'

export const useProductReports = () => {
  const { t } = useI18n()
  const { showError } = useNotification()

  const {
    mutate: productReportMutation,
    isError,
    isPending: isGeneratingReport
  } = useMutation({
    mutationKey: ['report:products'],
    mutationFn: async () => getReportAction('/report/products'),
    onSuccess: DownloadFilesUtil.downloadExcelBlob
  })

  watch(isError, (error) => {
    if (error) showError({ detail: t('shared.messages.reportFailed') })
  })

  return {
    productReportMutation,
    isGeneratingReport
  }
}
