import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'

describe('App favorites', () => {
  afterEach(() => vi.useRealTimers())

  it('adds and removes a favorite through the child callback', () => {
    render(<App />)
    const favorite = screen.getByRole('button', { name: 'Agregar a favoritas: La última linterna' })
    fireEvent.click(favorite)
    expect(screen.getByRole('button', { name: 'Quitar de favoritas: La última linterna' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('1 favoritas')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Quitar de favoritas: La última linterna' }))
    expect(screen.getByRole('button', { name: 'Agregar a favoritas: La última linterna' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByLabelText('0 favoritas')).toBeInTheDocument()
  })

  it('opens and closes the mobile menu with Escape', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 })
    render(<App />)
    const menuButton = screen.getByRole('button', { name: 'Abrir menú' })
    const navigation = document.getElementById('site-navigation')
    expect(navigation).toHaveAttribute('hidden')
    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')
    expect(navigation).not.toHaveAttribute('hidden')
    fireEvent.keyDown(screen.getByRole('button', { name: 'Cerrar menú' }), { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
    expect(navigation).toHaveAttribute('hidden')
  })

  it('clears the controlled query and restores the list after debounce', () => {
    vi.useFakeTimers()
    render(<App />)
    const search = screen.getByRole('searchbox', { name: 'Buscar película' })
    fireEvent.change(search, { target: { value: 'orbita' } })
    act(() => vi.advanceTimersByTime(300))
    expect(screen.getAllByRole('article')).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar filtro' }))
    expect(search).toHaveValue('')
    act(() => vi.advanceTimersByTime(300))
    expect(screen.getAllByRole('article')).toHaveLength(8)
  })
})
