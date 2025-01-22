import { useMutation } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotification } from '@/modules/shared'
import { getReportAction } from '@/modules/shared/actions'
import { DownloadFilesUtil } from '@/modules/shared/utils/download-files.util'

export const useSalespersonReports = () => {
  const { t } = useI18n()
  const { showError } = useNotification()

  const {
    mutate: salespersonReportMutation,
    isError,
    isPending: isGeneratingReport
  } = useMutation({
    mutationKey: ['report:salespersons'],
    mutationFn: async () => getReportAction('/report/salespersons'),
    onSuccess: DownloadFilesUtil.downloadExcelBlob
  })

  watch(isError, (error) => {
    if (error) showError({ detail: t('shared.messages.reportFailed') })
  })

  return {
    salespersonReportMutation,
    isGeneratingReport
  }
}
