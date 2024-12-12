import axios from 'axios'

export const exceptionHandlerHelper = (error: any, context: string) => {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message
    console.log('Axios error: ', error.response?.data || error.message)
    throw new Error(`Error in ${context}: ${msg}`)
  }

  console.log('Error: ', error)
  throw new Error('Unexpected error')
}
