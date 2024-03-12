export interface ApiSuccessResponse<T> {
  status: 'success'
  data: T
  message: string
}

export interface ApiErrorResponse<T> {
  status: 'error'
  message: string
  errors: T
}
