import { describe, it, expect } from 'vitest'
import {
  COMPENSATION_LABEL,
  CATEGORY_CONFIG,
  CATEGORIES,
  LOCATION_LABEL,
  LOCATION_OPTIONS,
  getLocationLabel,
  STORAGE_KEYS,
  STATUS_CONFIG,
  STATUS_OPTIONS,
  APPLICATION_STATUS_CONFIG,
} from '../constants'

describe('COMPENSATION_LABEL', () => {
  it('debe tener las claves PAID y COLLABORATION con sus labels', () => {
    expect(COMPENSATION_LABEL).toEqual({
      PAID: 'Remunerado',
      COLLABORATION: 'Colaboración',
    })
  })
})

describe('CATEGORY_CONFIG', () => {
  it('debe tener las 4 categorías con label y className', () => {
    expect(CATEGORY_CONFIG).toHaveProperty('MAKEUP')
    expect(CATEGORY_CONFIG).toHaveProperty('PHOTOGRAPHY_VIDEO')
    expect(CATEGORY_CONFIG).toHaveProperty('MODEL_TALENT')
    expect(CATEGORY_CONFIG).toHaveProperty('PRODUCTION')

    expect(CATEGORY_CONFIG.MAKEUP).toEqual({ label: 'Makeup', className: 'specialty-sfx' })
    expect(CATEGORY_CONFIG.PHOTOGRAPHY_VIDEO).toEqual({ label: 'Foto / Vídeo', className: 'specialty-photo' })
    expect(CATEGORY_CONFIG.MODEL_TALENT).toEqual({ label: 'Modelo / Talento', className: 'specialty-model' })
    expect(CATEGORY_CONFIG.PRODUCTION).toEqual({ label: 'Producción', className: 'specialty-prod' })
  })
})

describe('CATEGORIES', () => {
  it('debe ser un array con 5 elementos incluyendo "Todos"', () => {
    expect(CATEGORIES).toHaveLength(5)
    expect(CATEGORIES[0]).toEqual({ value: null, label: 'Todos' })
  })

  it('cada categoría debe tener value y label', () => {
    CATEGORIES.forEach(cat => {
      expect(cat).toHaveProperty('value')
      expect(cat).toHaveProperty('label')
    })
  })
})

describe('STORAGE_KEYS', () => {
  it('debe tener TOKEN y USER con los valores correctos', () => {
    expect(STORAGE_KEYS).toEqual({
      TOKEN: 'collapp_token',
      USER: 'collapp_user',
    })
  })
})

describe('LOCATION_LABEL', () => {
  it('debe mapear las 52 provincias al nombre del enum del backend', () => {
    expect(Object.keys(LOCATION_LABEL)).toHaveLength(52)
    expect(LOCATION_LABEL.BARCELONA).toBe('Barcelona')
    expect(LOCATION_LABEL.A_CORUNA).toBe('A Coruña')
    expect(LOCATION_LABEL.SANTA_CRUZ_DE_TENERIFE).toBe('Santa Cruz de Tenerife')
  })
})

describe('LOCATION_OPTIONS', () => {
  it('debe derivar una opción por cada provincia', () => {
    expect(LOCATION_OPTIONS).toHaveLength(52)
    expect(LOCATION_OPTIONS).toContainEqual({ value: 'MADRID', label: 'Madrid' })
  })
})

describe('getLocationLabel', () => {
  it('debe devolver la etiqueta legible de un valor del enum', () => {
    expect(getLocationLabel('BARCELONA')).toBe('Barcelona')
  })

  it('debe respetar el texto libre de datos antiguos', () => {
    expect(getLocationLabel('Plató independiente')).toBe('Plató independiente')
  })
})

describe('STATUS_CONFIG', () => {
  it('debe tener OPEN, PAUSED y COVERED con label y className', () => {
    expect(STATUS_CONFIG.OPEN).toEqual({ label: 'Abierta', className: 'status-open' })
    expect(STATUS_CONFIG.PAUSED).toEqual({ label: 'Pausada', className: 'status-paused' })
    expect(STATUS_CONFIG.COVERED).toEqual({ label: 'Cerrada', className: 'status-closed' })
  })
})

describe('STATUS_OPTIONS', () => {
  it('debe ser un array con 3 opciones derivadas de STATUS_CONFIG', () => {
    expect(STATUS_OPTIONS).toHaveLength(3)
    expect(STATUS_OPTIONS).toContainEqual({ value: 'OPEN', label: 'Abierta' })
    expect(STATUS_OPTIONS).toContainEqual({ value: 'PAUSED', label: 'Pausada' })
    expect(STATUS_OPTIONS).toContainEqual({ value: 'COVERED', label: 'Cerrada' })
  })
})

describe('APPLICATION_STATUS_CONFIG', () => {
  it('debe tener PENDING, ACCEPTED y REJECTED con label y color', () => {
    expect(APPLICATION_STATUS_CONFIG.PENDING).toEqual({ label: 'Pendiente de revisión', color: 'blue' })
    expect(APPLICATION_STATUS_CONFIG.ACCEPTED).toEqual({ label: 'Inscripción aceptada', color: 'green' })
    expect(APPLICATION_STATUS_CONFIG.REJECTED).toEqual({ label: 'Inscripción rechazada', color: 'red' })
  })
})
