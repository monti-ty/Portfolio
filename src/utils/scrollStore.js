/**
 * Saves and restores the scroll position of the snap-scroll page.
 */
export function saveScroll() {
  const top = document.documentElement.scrollTop || window.scrollY
  sessionStorage.setItem('homeScrollTop', String(top))
}

export function restoreScroll() {
  const saved = sessionStorage.getItem('homeScrollTop')
  if (saved !== null) {
    const top = parseInt(saved, 10)
    document.documentElement.scrollTop = top
    window.scrollTo({ top, behavior: 'instant' })
  }
}
