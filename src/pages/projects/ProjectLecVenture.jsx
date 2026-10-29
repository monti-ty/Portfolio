import { motion } from 'framer-motion'
import { Navbar, BackButton, AnimatedTitle, CREAM, BLACK, archivo } from '../../components/Shared'

export default function ProjectLecVenture() {
  return (
    <div style={{ background: BLACK, minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 60px 80px' }}>
        <BackButton />

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Left: card */}
          <motion.div
            style={{ width: '200px', height: '334px', borderRadius: '14px', overflow: 'hidden', border: `1px solid ${CREAM}44` }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
          >
            <img src="/assets/front_red.jpg" alt="LecVenture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatedTitle text="LEC VENTURE" size="4rem" />
            <p style={{ ...archivo, color: CREAM, fontSize: '0.8rem', letterSpacing: '0.12em', opacity: 0.55, marginTop: '8px', marginBottom: '20px' }}>
              Gamified Learning Management System | Deployed
            </p>
            <p style={{ ...archivo, color: CREAM, fontSize: '1rem', lineHeight: 1.85, maxWidth: '643px', opacity: 0.85 }}>
              LecVentures is a gamified LMS built for the pupils of Maasim Elementary School in San Ildefonso, Bulacan. It turns lessons into something closer to a game, with points, levels, badges, quizzes, and rewards to keep young learners motivated. The system supports three types of users (pupils, teachers, and admins), and it is live and in use. I designed the user experience and built the front end, with a layout that works for young learners.
            </p>
            <p style={{ ...archivo, color: CREAM, fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, marginTop: '28px' }}>
              My role: UI/UX Designer and Front-End Developer
            </p>
          </motion.div>
        </div>

        {/* Screenshots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '48px' }}>
          {['/assets/ms.garcia.png', '/assets/lecventure2.png', '/assets/lecventure3.png'].map((img, i) => (
            <motion.div
              key={i}
              style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${CREAM}22`, aspectRatio: '16/9' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, borderColor: CREAM, boxShadow: '0 0 20px rgba(235,213,171,0.2)' }}
            >
              <motion.img
                src={img}
                alt={`LecVenture screenshot ${i + 1}`}
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
