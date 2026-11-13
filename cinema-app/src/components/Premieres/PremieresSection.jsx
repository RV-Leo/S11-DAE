import { Button } from '../Button/Button.jsx'
import { usePremieres } from '../../hooks/usePremieres.js'
import { PremieresCarousel } from './PremieresCarousel.jsx'
import { Skeleton } from './Skeleton.jsx'
import './Premieres.css'

export function PremieresSection({ shouldFail = false }) {
  const { status, premieres, error, reload } = usePremieres({ shouldFail })

  return (
    <section className="premieres-section section-space" id="estrenos" aria-labelledby="premieres-title">
      <div className="container"><p className="eyebrow">Lo que viene</p><h2 id="premieres-title">Próximos estrenos</h2>
        {status === 'loading' && <div className="premieres-loading" role="status" aria-label="Cargando próximos estrenos"><span>Buscando nuevas historias…</span><div className="premieres-skeletons"><Skeleton /><Skeleton /><Skeleton /></div></div>}
        {status === 'error' && <div className="premieres-error" role="alert"><p>{error.message}</p><Button variant="secondary" onClick={reload}>Reintentar</Button></div>}
        {status === 'success' && <PremieresCarousel movies={premieres} />}
      </div>
    </section>
  )
}
