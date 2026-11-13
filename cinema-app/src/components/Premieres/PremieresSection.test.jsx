import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PremieresSection } from './PremieresSection.jsx'

describe('PremieresSection', () => {
  afterEach(() => vi.useRealTimers())

  it('shows accessible loading and then premiere cards', async () => {
    vi.useFakeTimers()
    render(<PremieresSection />)
    expect(screen.getByRole('status', { name: 'Cargando próximos estrenos' })).toBeInTheDocument()
    await act(() => vi.advanceTimersByTimeAsync(1200))
    expect(screen.getByText('El atlas de la niebla')).toBeInTheDocument()
  })

  it('explains failures and retries', async () => {
    vi.useFakeTimers()
    render(<PremieresSection shouldFail />)
    await act(() => vi.advanceTimersByTimeAsync(1200))
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudieron cargar los estrenos simulados.')
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(screen.getByRole('status', { name: 'Cargando próximos estrenos' })).toBeInTheDocument()
  })
})
