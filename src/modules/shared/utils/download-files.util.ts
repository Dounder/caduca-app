import type { BlobResponse } from '../interfaces'

export class DownloadFilesUtil {
  static downloadExcelBlob({ blob, headers }: BlobResponse) {
    console.log('🚀 ~ DownloadFilesUtil ~ downloadExcelBlob ~ headers:', headers)
    // Extract the filename from the Content-Disposition header
    const contentDisposition = headers['content-disposition']
    let filename = 'report.xlsx' // Default filename

    if (contentDisposition && contentDisposition.includes('filename='))
      filename = contentDisposition.split('filename=')[1].replace(/['"]/g, '') // Remove quotes

    // Create a Blob URL and trigger the download
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
