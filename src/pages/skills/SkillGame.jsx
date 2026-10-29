import { motion } from 'framer-motion'
import { Navbar, BackButton, AnimatedTitle, PuzzleIcon, CREAM, BLACK, archivo } from '../../components/Shared'

const screenshots = [
  '/assets/game1.png',
  '/assets/unity3d.jpg',
  '/assets/game3.png',
]

export default function SkillGame() {
  return (
    <div style={{ background: BLACK, minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 60px 80px' }}>
        <BackButton />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <div>
            <AnimatedTitle text="GAME DEVELOPMENT" size="3rem" />
            <p style={{ ...archivo, color: CREAM, fontSize: '1rem', letterSpacing: '0.08em', lineHeight: 1.85, maxWidth: '448px', marginTop: '24px', opacity: 0.85 }}>
              I create 2D/3D game experiences using Unity, handling everything from scene design to scripting core mechanics. I enjoy the challenge of turning ideas into interactive worlds.
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 20px #6BCB7788)', flexShrink: 0 }}
          >
            <PuzzleIcon color="#6BCB77" size={200} />
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {screenshots.map((img, i) => (
            <motion.div
              key={i}
              style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${CREAM}22`, aspectRatio: '16/10' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, borderColor: CREAM, boxShadow: '0 0 20px rgba(107,203,119,0.3)' }}
            >
              <motion.img
                src={img}
                alt={`Game screenshot ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.4 }}
                onError={e => { e.target.style.background = '#111' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
