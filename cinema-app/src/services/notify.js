import toast from 'react-hot-toast'

export function notifyFavoriteChange(title, added) {
  const message = added ? `Agregaste «${title}» a tus favoritas` : `Quitaste «${title}» de tus favoritas`
  const options = { ariaProps: { role: 'status', 'aria-live': 'polite' } }
  if (added) toast.success(message, options)
  else toast(message, options)
}
