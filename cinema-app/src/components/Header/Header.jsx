import { Clapperboard, Menu, X, Heart } from 'lucide-react'
import { useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize.js'
import './Header.css'

export function Header({ favoritesCount = 0 }) {
  const { width } = useWindowSize()
  const isMobile = width < 768
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false) }}>
      <div className="site-header__inner container">
        <a className="site-header__brand" href="#inicio" aria-label="Aurora Cinemas, inicio">
          <Clapperboard aria-hidden="true" />
          <span>Aurora <em>Cinemas</em></span>
        </a>
        <div className="site-header__actions">
          <span className="site-header__favorites" aria-label={`${favoritesCount} favoritas`}><Heart size={16} aria-hidden="true" /><span>{favoritesCount}</span></span>
          {isMobile && <button className="site-header__menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>}
        </div>
        <nav className="site-header__nav" id="site-navigation" aria-label="Navegación principal" hidden={isMobile && !menuOpen}>
          <a href="#cartelera">Cartelera</a>
          <a href="#estrenos">Estrenos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>
  )
}
