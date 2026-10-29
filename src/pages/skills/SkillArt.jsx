import { motion } from 'framer-motion'
import { Navbar, BackButton, AnimatedTitle, PuzzleIcon, CREAM, BLACK, archivo } from '../../components/Shared'

const screenshots = [
  '/assets/drawing_girl.jpg',
  '/assets/drawing_zombie.jpg',
  '/assets/drawing_spiderman.jpg',
  '/assets/car.jpg',
]

export default function SkillArt() {
  return (
    <div style={{ background: BLACK, minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 60px 80px' }}>
        <BackButton />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <div>
            <AnimatedTitle text="TRADITIONAL/ PIXEL DRAWING" size="2.5rem" />
            <p style={{ ...archivo, color: CREAM, fontSize: '1rem', letterSpacing: '0.08em', lineHeight: 1.85, maxWidth: '448px', marginTop: '24px', opacity: 0.85 }}>
              I have a background in traditional and pixel drawing, which sharpens my eye for composition, proportion, and detail — skills that directly influence how I approach visual design.
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 20px #4D96FF88)', flexShrink: 0 }}
          >
            <PuzzleIcon color="#4D96FF" size={200} />
          </motion.div>
        </div>

        {/* Mixed grid - drawings are portrait, pixel art landscape */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {screenshots.map((img, i) => (
            <motion.div
              key={i}
              style={{
                borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${CREAM}22`,
                aspectRatio: i < 4 ? '4/4' : '22/8',
                gridColumn: i === 4 ? '1 / 1' : 'auto',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, borderColor: CREAM, boxShadow: '0 0 20px rgba(77,150,255,0.3)' }}
            >
              <motion.img
                src={img}
                alt={`Art ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
