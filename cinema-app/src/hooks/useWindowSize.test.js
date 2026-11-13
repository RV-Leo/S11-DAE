import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useWindowSize } from './useWindowSize.js'

describe('useWindowSize', () => {
  it('updates dimensions when the browser resizes', () => {
    const { result } = renderHook(() => useWindowSize())
    act(() => {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 })
      Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toEqual({ width: 390, height: 800 })
  })
})
