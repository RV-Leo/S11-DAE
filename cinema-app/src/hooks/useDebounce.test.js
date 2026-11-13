import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce.js'

describe('useDebounce', () => {
  afterEach(() => vi.useRealTimers())

  it('publishes the latest value after the delay and cancels previous timers', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: '' } })
    rerender({ value: 'lu' })
    act(() => vi.advanceTimersByTime(200))
    rerender({ value: 'luna' })
    act(() => vi.advanceTimersByTime(299))
    expect(result.current).toBe('')
    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('luna')
  })
})
