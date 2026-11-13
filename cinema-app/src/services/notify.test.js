import { beforeEach, describe, expect, it, vi } from 'vitest'

const toast = vi.hoisted(() => Object.assign(vi.fn(), { success: vi.fn() }))
vi.mock('react-hot-toast', () => ({ default: toast }))

describe('favorite notifications', () => {
  beforeEach(() => { toast.mockClear(); toast.success.mockClear() })

  it('announces add and remove actions without coupling MovieCard to the library', async () => {
    const { notifyFavoriteChange } = await import('./notify.js')
    notifyFavoriteChange('La hora azul', true)
    expect(toast.success).toHaveBeenLastCalledWith('Agregaste «La hora azul» a tus favoritas', expect.objectContaining({ ariaProps: { role: 'status', 'aria-live': 'polite' } }))
    notifyFavoriteChange('La hora azul', false)
    expect(toast).toHaveBeenLastCalledWith('Quitaste «La hora azul» de tus favoritas', expect.any(Object))
  })
})
