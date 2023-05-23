import type { FetchError } from 'ofetch'

export interface ErrorResponse {
  code: number
  message: string
  fields?: Record<string, Record<string, string>>
}

export interface ValidationError {
  message?: string
  fields?: Record<string, string>
}

export function parseError(err: unknown) {
  const { data } = err as FetchError<ErrorResponse>

  const r: ValidationError = {
    message: data?.message ?? 'Internal server error',
  }

  if (!data || !data.fields)
    return r

  r.fields = {}
  for (const key in data.fields)
    r.fields[key] = Object.values(data.fields[key]).join(', ')

  return r
}
