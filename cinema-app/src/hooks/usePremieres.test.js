import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePremieres } from './usePremieres.js'

describe('usePremieres', () => {
  afterEach(() => vi.useRealTimers())

  it('transitions from loading to adapted data', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => usePremieres())
    expect(result.current.status).toBe('loading')
    await act(() => vi.advanceTimersByTimeAsync(1200))
    expect(result.current.status).toBe('success')
    expect(result.current.premieres[0].rating).toBeTypeOf('number')
  })

  it('exposes an error and retries on request', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => usePremieres({ shouldFail: true }))
    await act(() => vi.advanceTimersByTimeAsync(1200))
    expect(result.current.status).toBe('error')
    expect(result.current.error.message).toMatch(/estrenos/)
    act(() => result.current.reload())
    expect(result.current.status).toBe('loading')
  })
})
