import { describe, it, expect } from 'vitest'
import { getApiError, getErrorMessage, hasFieldErrors, FORM_ERROR_KEY } from '../apiError'

const axiosError = (status, data) => ({ response: { status, data } })

describe('getApiError', () => {
  it('debe extraer el código y el mensaje del contrato del backend', () => {
    const result = getApiError(
      axiosError(409, {
        status: 409,
        error: 'CONFLICT',
        message: 'Ese email ya está registrado',
        path: '/api/auth/register',
        fields: null,
      }),
    )

    expect(result.status).toBe(409)
    expect(result.code).toBe('CONFLICT')
    expect(result.message).toBe('Ese email ya está registrado')
  })

  it('debe separar los errores de campo del error de formulario', () => {
    const result = getApiError(
      axiosError(400, {
        error: 'VALIDATION_ERROR',
        fields: {
          title: 'El título es obligatorio',
          [FORM_ERROR_KEY]: 'La fecha de fin no puede ser anterior a la de inicio',
        },
      }),
    )

    expect(result.fieldErrors).toEqual({ title: 'El título es obligatorio' })
    expect(result.formError).toBe('La fecha de fin no puede ser anterior a la de inicio')
  })

  it('debe devolver fieldErrors vacío cuando la respuesta no trae fields', () => {
    const result = getApiError(axiosError(404, { error: 'NOT_FOUND', message: 'No existe' }))

    expect(result.fieldErrors).toEqual({})
    expect(result.formError).toBeNull()
  })

  it('debe tolerar un error sin respuesta, como una caída de red', () => {
    const result = getApiError(new Error('Network Error'))

    expect(result.status).toBeNull()
    expect(result.message).toBeNull()
    expect(result.fieldErrors).toEqual({})
  })
})

describe('getErrorMessage', () => {
  it('debe usar el mensaje del backend cuando existe', () => {
    const err = axiosError(403, { error: 'FORBIDDEN', message: 'No tienes permisos' })
    expect(getErrorMessage(err, 'Respaldo')).toBe('No tienes permisos')
  })

  it('debe usar el texto de respaldo cuando no hay respuesta del backend', () => {
    expect(getErrorMessage(new Error('Network Error'), 'Respaldo')).toBe('Respaldo')
  })
})

describe('hasFieldErrors', () => {
  it('debe ser false cuando fields solo contiene el error de formulario', () => {
    const apiError = getApiError(
      axiosError(400, { fields: { [FORM_ERROR_KEY]: 'Rango de fechas inválido' } }),
    )
    expect(hasFieldErrors(apiError)).toBe(false)
  })

  it('debe ser false cuando fields llega vacío', () => {
    expect(hasFieldErrors(getApiError(axiosError(400, { fields: {} })))).toBe(false)
  })

  it('debe ser true cuando hay al menos un error de campo', () => {
    const apiError = getApiError(axiosError(400, { fields: { email: 'Obligatorio' } }))
    expect(hasFieldErrors(apiError)).toBe(true)
  })
})
