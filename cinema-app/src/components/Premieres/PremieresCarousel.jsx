import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'
import { useWindowSize } from '../../hooks/useWindowSize.js'
import 'swiper/css'
import 'swiper/css/navigation'
import './Premieres.css'

export function PremieresCarousel({ movies }) {
  const { width } = useWindowSize()
  const slidesPerView = width < 640 ? 1.15 : width < 1024 ? 2 : 3

  return (
    <Swiper className="premieres-carousel" modules={[A11y, Navigation]} navigation keyboard={{ enabled: true }} slidesPerView={slidesPerView} spaceBetween={20} a11y={{ prevSlideMessage: 'Estreno anterior', nextSlideMessage: 'Siguiente estreno' }}>
      {movies.map((movie) => <SwiperSlide key={movie.id}><article className="premiere-card"><img src={movie.posterUrl} alt={`Póster de ${movie.title}`} loading="lazy" /><div><h3>{movie.title}</h3><p>{movie.synopsis}</p><span className="premiere-card__date">Estreno próximo</span></div></article></SwiperSlide>)}
    </Swiper>
  )
}
