import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const CREAM = '#EBD5AB'
export const BLACK = '#000000'
export const chelsea = { fontFamily: '"Chelsea Market", cursive' }
export const archivo = { fontFamily: 'Archivo, sans-serif' }

export const LETTER_COLORS = [
  '#FF6B6B','#FFD93D','#6BCB77','#4D96FF',
  '#FF6FC8','#C77DFF','#FF9A3C','#00D9FF','#A8FF78'
]

/* Animated title - each letter has its own hover color */
export function AnimatedTitle({ text, size = '9rem' }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{
            ...chelsea,
            color: CREAM,
            fontSize: size,
            lineHeight: 1,
            display: 'inline-block',
            cursor: 'default',
          }}
          whileHover={{
            color: LETTER_COLORS[i % LETTER_COLORS.length],
            y: -8,
            transition: { type: 'spring', stiffness: 500, damping: 12 },
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </div>
  )
}

/* Back button used on all sub-pages */
export function BackButton() {
  const navigate = useNavigate()
  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 cursor-pointer bg-transparent border-none mb-10"
      style={{ ...archivo, color: CREAM, fontSize: '0.85rem', letterSpacing: '0.15em' }}
      whileHover={{ x: -5, opacity: 0.7 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="2">
        <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      BACK
    </motion.button>
  )
}

/* Navbar */
export function Navbar() {
  const navigate = useNavigate()

  const scrollTo = (id) => {
    navigate('/')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-5 py-4"
      style={{ background: 'transparent' }}
    >
      {[
        { label: 'Home',     action: () => navigate('/') },
        { label: 'About Me', action: () => scrollTo('about') },
        { label: 'Contact',  action: () => scrollTo('contact') },
      ].map(({ label, action }) => (
        <motion.button
          key={label}
          onClick={action}
          className="relative cursor-pointer bg-transparent border-none px-3 py-2"
          style={{ ...archivo, color: CREAM, fontSize: '1.1rem', letterSpacing: '0.15em', fontWeight: 500 }}
          whileHover={{ scale: 1.08, color: '#ffffff' }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {label}
          <motion.span
            className="absolute bottom-0 left-0 h-[1.5px]"
            style={{ background: CREAM }}
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.25 }}
          />
        </motion.button>
      ))}
    </nav>
  )
}

/* Puzzle SVG icon - authentic interlocking puzzle shape */
export function PuzzleIcon({ color = '#EBD5AB', size = 80, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={style}
    >
      {/* puzzle piece with nub connectors on top and right */}
      <path
        d="
          M20,20
          H42 C42,12 58,12 58,20
          H80
          V42 C88,42 88,58 80,58
          V80
          H58 C58,88 42,88 42,80
          H20
          V58 C12,58 12,42 20,42
          Z
        "
        fill={color}
      />
    </svg>
  )
}
