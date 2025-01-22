import { useMutation } from '@tanstack/vue-query'
import { getReportAction } from '../../shared/actions'
import { DownloadFilesUtil } from '../../shared/utils/download-files.util'
import { useNotification } from '@/modules/shared'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useUserReports = () => {
  const { t } = useI18n()
  const { showError } = useNotification()

  const {
    mutate: userReportMutation,
    isPending: isGeneratingReport,
    isError
  } = useMutation({
    mutationKey: ['report:users'],
    mutationFn: async () => await getReportAction('/report/users'),
    onSuccess: DownloadFilesUtil.downloadExcelBlob
  })

  watch(isError, (error) => {
    if (error) showError({ detail: t('shared.messages.reportFailed') })
  })

  return {
    userReportMutation,
    isGeneratingReport
  }
}
