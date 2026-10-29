import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Navbar, AnimatedTitle, PuzzleIcon, CREAM, BLACK, chelsea, archivo, LETTER_COLORS } from '../components/Shared'

/* ══════════════════════════════════════════════
   DESKTOP 1 — HERO
   Nav + PORTFOLIO + lace card (bookstore photo layered in front of tarot frame)
   ══════════════════════════════════════════════ */

function LaceCard() {
  const cardRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const lastPos = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())
  const rafRef = useRef(null)

  // Physics-based swing after release
  useEffect(() => {
    if (!dragging) {
      const decay = () => {
        setVelocity(v => {
          const newVx = v.x * 0.92
          const newVy = v.y * 0.88
          setPos(p => ({
            x: p.x + newVx,
            y: Math.max(0, p.y + newVy), // can't go above origin
          }))
          if (Math.abs(newVx) < 0.1 && Math.abs(newVy) < 0.1) {
            // Spring back to center
            setPos(p => ({ x: p.x * 0.85, y: p.y * 0.85 }))
          }
          return { x: newVx, y: newVy }
        })
        rafRef.current = requestAnimationFrame(decay)
      }
      rafRef.current = requestAnimationFrame(decay)
      return () => cancelAnimationFrame(rafRef.current)
    }
  }, [dragging])

  const onMouseDown = (e) => {
    setDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
    lastTime.current = Date.now()
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dt = Date.now() - lastTime.current || 1
      setVelocity({ x: dx / dt * 16, y: dy / dt * 16 })
      lastPos.current = { x: e.clientX, y: e.clientY }
      lastTime.current = Date.now()
      setPos(p => ({ x: p.x + dx, y: Math.max(0, p.y + dy) }))
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging])

  return (
    <div className="flex flex-col items-center select-none" style={{ userSelect: 'none' }}>
      {/* lace thread */}
      <div
        className="lace-thread"
        style={{
          height: '150px',
          transformOrigin: 'top center',
          transform: `rotate(${pos.x * 0.01}deg)`,
          transition: dragging ? 'none' : 'transform 0.3s ease',
        }}
      />

      {/* card: tarot frame behind, photo in front — draggable */}
      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        style={{
          position: 'relative',
          width: '230px',
          height: '330px',
          cursor: dragging ? 'grabbing' : 'grab',
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x * 0.08}deg)`,
          transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* back layer: tarot/card frame (no background) */}
        <img
          src="/assets/download__19_-removebg-preview.png"
          alt="card frame"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* front layer: photo (bookstore - profile_bookstore.jpg matches Figma) */}
        <img
          src="/assets/profile_bookstore.jpg"
          alt="Kenneth"
          style={{
            position: 'absolute',
            left: '30px',
            top: '36px',
            width: 'calc(100% - 62px)',
            height: 'calc(100% - 82px)',
            objectFit: 'cover',
            borderRadius: '4px',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

function Desktop1() {
  return (
    <section className="snap-section flex flex-col" style={{ background: BLACK }}>
      <Navbar />

      {/* PORTFOLIO letters - centered horizontally */}
      <div style={{ position: 'absolute', left: '320px', top: '250px' }}>
        <AnimatedTitle text="PORTFOLIO" size="150px" />
      </div>

      {/* lace + card — right side matching Figma position */}
      <div style={{ position: 'absolute', left: '1200px', top: '0px' }}>
        <LaceCard />
      </div>

      {/* Scroll Down arrow - bottom right */}
      <div
        className="bounce-arrow"
        style={{ position: 'absolute', right: '148px', bottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        onClick={() => document.querySelector('.snap-section:nth-child(2)')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <p style={{ ...archivo, color: CREAM, fontSize: '0.85rem', letterSpacing: '0.15em' }}>Scroll Down</p>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="1.5">
          <path d="M12 5v14M5 13l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 2 — KENNETH C. MONTIANO name + subtitle
   ══════════════════════════════════════════════ */
function Desktop2() {
  return (
    <section className="snap-section" style={{ background: BLACK }}>
      {/* KENNETH C. */}
      <div style={{ position: 'absolute', left: '97px', top: '150px', display: 'flex', gap: '0' }}>
        <AnimatedTitle text="KENNETH C." size="122px" />
      </div>
      {/* MONTIANO */}
      <div style={{ position: 'absolute', left: '110px', top: '288px' }}>
        <AnimatedTitle text="MONTIANO" size="122px" />
      </div>

      {/* IT Student subtitle - right side */}
      <p style={{
        ...archivo, color: CREAM, fontSize: '2rem', letterSpacing: '0.1em', lineHeight: 1.7,
        position: 'absolute', right: '97px', top: '185px', maxWidth: '352px', textAlign: 'right'
      }}>
        IT Student | UI/UX Designer &amp; Aspiring Frontend Dev
      </p>

      {/* Web Developer & UI/UX Designer - cream box, bottom left */}
      <div style={{
        position: 'absolute', left: '97px', bottom: '220px',
        background: CREAM, padding: '10px 39px'
      }}>
        <p style={{ ...archivo, color: BLACK, fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          Web Developer &amp; UI/UX Designer
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 3 — CARD NAVIGATION
   5 cards: About Me, Skills, Projects, Experience, Contacts
   Front = face card art. Idle = spin. Back = red card
   ══════════════════════════════════════════════ */
const navCards = [
  { label: 'ABOUT ME',   face: '/assets/about_me.jpg',  path: '#about',      spin: 8 },
  { label: 'SKILLS',     face: '/assets/card_jack.jpg', path: '#skills',     spin: 9 },
  { label: 'PROJECTS',   face: '/assets/card_king.jpg',  path: '#projects',   spin: 7 },
  { label: 'EXPERIENCE', face: '/assets/skills_img.jpg',  path: '#experience', spin: 10 },
  { label: 'CONTACTS',   face: '/assets/queenofheart.jpg', path: '#contact',    spin: 8.5 },
]

function NavCard({ card, delay }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    if (card.path.startsWith('#')) {
      const id = card.path.slice(1)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(card.path)
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="perspective" style={{ width: '150px', height: '222px' }}>
        <motion.div
          className="preserve-3d"
          style={{ width: '150px', height: '222px', position: 'relative' }}
          animate={hovered
            ? { rotateY: 0, scale: 1.1 }
            : { rotateY: [0, 360] }
          }
          transition={hovered
            ? { duration: 0.35, ease: 'easeOut' }
            : { rotateY: { duration: card.spin, ease: 'linear', repeat: Infinity } }
          }
        >
          {/* front: face of card (jack/king/queen/ace/joker art) */}
          <div className="backface-hidden" style={{
            position: 'absolute', inset: 0, borderRadius: '12px', overflow: 'hidden',
            border: `1px solid ${CREAM}44`,
            boxShadow: '0 4px 20px rgba(235,213,171,0.2)'
          }}>
            <img src={card.face} alt={card.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* back: red ornate card back */}
          <div className="backface-hidden rotate-y-180" style={{
            position: 'absolute', inset: 0, borderRadius: '12px', overflow: 'hidden',
            border: `1px solid ${CREAM}44`,
          }}>
            <img src="/assets/card_red_back.jpg" alt="card back" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>

      <motion.p
        style={{ ...chelsea, color: CREAM, fontSize: '1rem', textAlign: 'center' }}
        animate={hovered ? { scale: 1.15, color: '#fff' } : { scale: 1, color: CREAM }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {card.label}
      </motion.p>
    </motion.div>
  )
}

function Desktop3() {
  return (
    <section className="snap-section flex items-center justify-center" style={{ background: BLACK }}>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center', padding: '0 40px' }}>
        {navCards.map((card, i) => (
          <NavCard key={card.label} card={card} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 4 — ABOUT
   ══════════════════════════════════════════════ */
function Desktop4() {
  return (
    <section id="about" className="snap-section" style={{ background: BLACK }}>
      {/* ABOUT title */}
      <div style={{ position: 'absolute', left: '185px', top: '180px' }}>
        <AnimatedTitle text="ABOUT" size="5rem" />
      </div>

      {/* body text */}
      <p style={{
        ...archivo, color: CREAM, fontSize: '1rem', letterSpacing: '0.08em', lineHeight: 1.85,
        position: 'absolute', left: '182px', top: '285px', maxWidth: '448px'
      }}>
        Currently a student at Bulacan State University and employed at McDonald's, he aspires to become a front web developer and UI/UX designer, wanting to work as a professional in the IT sector.
      </p>

      {/* signature */}
      <p style={{ ...archivo, color: CREAM, fontSize: '0.9rem', fontStyle: 'italic', position: 'absolute', left: '555px', top: '528px', opacity: 0.7 }}>
        — monti
      </p>

      {/* Instagram icon */}
      <div style={{ position: 'absolute', left: '498px', top: '521px' }}>
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '50px', height: '50px', border: `1px solid ${CREAM}`,
            borderRadius: '8px', textDecoration: 'none'
          }}
          whileHover={{ scale: 1.1, backgroundColor: CREAM + '22' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill={CREAM} stroke="none"/>
          </svg>
        </motion.a>
      </div>

      {/* About photo - right side, matching Figma rectangle position */}
      <motion.div style={{
        position: 'absolute', right: '182px', top: '206px',
        width: '336px', height: '365px',
        borderRadius: '16px', overflow: 'hidden',
        border: `2px solid ${CREAM}44`,
        boxShadow: '0 0 30px rgba(235,213,171,0.15)'
      }}
        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(235,213,171,0.25)' }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.img
          src="/assets/nyay.jpg"
          alt="About Kenneth"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 5 — SKILLS
   4 puzzle icons. Each navigates to its own skill page.
   White floating puzzles in background.
   ══════════════════════════════════════════════ */

// White puzzle pieces that avoid the mouse
function AvoidPuzzle({ initX, initY, size = 60, delay = 0 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 80, damping: 14 })
  const sy = useSpring(y, { stiffness: 80, damping: 14 })

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      const radius = 140
      if (dist < radius) {
        const force = (radius - dist) / radius
        x.set(-(e.clientX - cx) * force * 2)
        y.set(-(e.clientY - cy) * force * 2)
      } else {
        x.set(0); y.set(0)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute', left: initX, top: initY,
        opacity: 0.08, pointerEvents: 'none',
        x: sx, y: sy,
        animationDelay: `${delay}s`,
      }}
      className="puzzle-float"
    >
      <PuzzleIcon color="white" size={size} />
    </motion.div>
  )
}

const skillCards = [
  { label: 'UI/UX DESIGN',             color: '#FF6B6B', path: '/skills/uiux', pos: { left: '637px', top: '300px' } },
  { label: 'WEB DEVELOPER',            color: '#FFD93D', path: '/skills/web',  pos: { left: '763px', top: '300px' } },
  { label: 'GAME DEVELOPMENT',         color: '#6BCB77', path: '/skills/game', pos: { left: '637px', top: '419px' } },
  { label: 'TRADITIONAL/PIXEL DRAWING',color: '#4D96FF', path: '/skills/art',  pos: { left: '763px', top: '411px' } },
]

const whitePuzzlePositions = [
  { x: '88px',  y: '275px', size: 94,  delay: 0 },
  { x: '202px', y: '391px', size: 127, delay: 0.5 },
  { x: '184px', y: '521px', size: 96,  delay: 1 },
  { x: '184px', y: '372px', size: 94,  delay: 1.5 },
  { x: '523px', y: '403px', size: 70,  delay: 0.3 },
  { x: '488px', y: '526px', size: 71,  delay: 0.8 },
  { x: '443px', y: '360px', size: 94,  delay: 1.2 },
  { x: '483px', y: '268px', size: 70,  delay: 0.6 },
  { x: '953px', y: '349px', size: 143, delay: 0.2 },
  { x: '846px', y: '358px', size: 102, delay: 0.7 },
  { x: '1212px', y: '403px', size: 70,  delay: 0.3 },
  { x: '1129px', y: '526px', size: 71,  delay: 0.8 },
  { x: '1243px', y: '460px', size: 94,  delay: 1.2 },
  { x: '1383px', y: '368px', size: 70,  delay: 0.6 },
  { x: '1353px', y: '209px', size: 143, delay: 0.2 },
  { x: '1226px', y: '258px', size: 102, delay: 0.7 },
]

function Desktop5() {
  const navigate = useNavigate()

  return (
    <section id="skills" className="snap-section" style={{ background: BLACK, position: 'relative', overflow: 'hidden' }}>
      {/* SKILLS title */}
      <div style={{ position: 'absolute', left: '149px', top: '55px' }}>
        <AnimatedTitle text="SKILLS" size="5rem" />
      </div>

      {/* White avoiding puzzle decorations */}
      {whitePuzzlePositions.map((p, i) => (
        <AvoidPuzzle key={i} initX={p.x} initY={p.y} size={p.size} delay={p.delay} />
      ))}

      {/* 4 colored puzzle icons in 2x2 grid */}
      {skillCards.map((card) => (
        <motion.div
          key={card.label}
          style={{ position: 'absolute', ...card.pos, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(card.path)}
        >
          <div className="puzzle-float" style={{ filter: `drop-shadow(0 0 12px ${card.color}88)` }}>
            <PuzzleIcon color={card.color} size={125} />
          </div>
        </motion.div>
      ))}

      {/* Skill labels below icons */}
      <div style={{ position: 'absolute', left: '450px', bottom: '80px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {skillCards.map((card) => (
          <motion.p
            key={card.label + 'label'}
            style={{ ...chelsea, color: card.color, fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(card.path)}
          >
            {card.label}
          </motion.p>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 6 — PROJECTS
   3 flip cards: Somnus (large), Daily Mood, LecVenture
   Each navigates to its own project page on click
   ══════════════════════════════════════════════ */
const projectCards = [
  { label: 'DAILY MOOD',  path: '/projects/dailymood',  face: '/assets/front_red.jpg',  w: 200, h: 334 },
  { label: 'SOMNUS',      path: '/projects/somnus',      face: '/assets/front_red.jpg',  w: 270, h: 451 },
  { label: 'LEC VENTURE', path: '/projects/lecventure',  face: '/assets/front_red.jpg', w: 200, h: 334 },
]

function ProjectFlipCard({ card }) {
  const [flipped, setFlipped] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.div
      className="perspective cursor-pointer"
      style={{ width: `${card.w}px`, height: `${card.h}px` }}
      whileHover={{ scale: 1.04 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => navigate(card.path)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="preserve-3d"
        style={{ width: '100%', height: '100%', position: 'relative' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* front: card face art */}
        <div className="backface-hidden" style={{
          position: 'absolute', inset: 0, borderRadius: '14px', overflow: 'hidden',
          border: `1px solid ${CREAM}33`, boxShadow: '4px 4px 20px rgba(235,213,171,0.2)'
        }}>
          <img src={card.face} alt={card.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            padding: '16px'
          }}>
            <p style={{ ...chelsea, color: CREAM, fontSize: '1.1rem' }}>{card.label}</p>
          </div>
        </div>
        {/* back: red card back */}
        <div className="backface-hidden rotate-y-180" style={{
          position: 'absolute', inset: 0, borderRadius: '14px', overflow: 'hidden',
          border: `1px solid ${CREAM}`, boxShadow: '4px 4px 20px rgba(235,213,171,0.3)'
        }}>
          <img src="/assets/card_red_back.jpg" alt="back" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <p style={{ ...archivo, color: CREAM, fontSize: '0.75rem', letterSpacing: '0.15em' }}>Click to view →</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Desktop6() {
  return (
    <section id="projects" className="snap-section" style={{ background: BLACK }}>
      {/* PROJECT title */}
      <div style={{ position: 'absolute', left: '113px', top: '20px' }}>
        <AnimatedTitle text="PROJECT" size="5rem" />
      </div>

      {/* 3 cards: Daily Mood (left), Somnus (center large), LecVenture (right) */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -40%)',
        display: 'flex', alignItems: 'flex-end', gap: '24px'
      }}>
        {projectCards.map(card => (
          <ProjectFlipCard key={card.label} card={card} />
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP 7 — EXPERIENCE + CONTACT / FOOTER
   ══════════════════════════════════════════════ */
function Desktop7() {
  return (
    <section id="experience" className="snap-section" style={{ background: BLACK }}>
      {/* EXPERIENCE title */}
      <div style={{ position: 'absolute', left: '145px', top: '50px' }}>
        <AnimatedTitle text="EXPERIENCE" size="4.5rem" />
      </div>

      {/* McDonald's info */}
      <motion.div style={{
        position: 'absolute', left: '145px', top: '200px',
        width: '200px', height: '200px', borderRadius: '12px', overflow: 'hidden',
        border: `2px solid ${CREAM}44`
      }}
        whileHover={{ scale: 1.04, borderColor: CREAM }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.img
          src="/assets/profile_mcdo.jpg"
          alt="McDonald's"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <p style={{ ...chelsea, color: CREAM, fontSize: '1.6rem', position: 'absolute', left: '438px', top: '228px' }}>
        MCDONALD'S
      </p>
      <p style={{ ...chelsea, color: CREAM, fontSize: '1.1rem', position: 'absolute', left: '434px', top: '300px' }}>
        POSITION: SERVICE CREW
      </p>
      <p style={{ ...chelsea, color: CREAM, fontSize: '1.1rem', position: 'absolute', left: '434px', top: '352px' }}>
        YEAR: 2024 - PRESENT
      </p>

      {/* ── CONTACTS / FOOTER ── */}
      <div id="contact" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${CREAM}22`, padding: '40px 79px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
          {/* left: name + role */}
          <div>
            <AnimatedTitle text="KENNETH MONTIANO" size="2rem" />
            <div style={{ marginTop: '12px', background: CREAM, display: 'inline-block', padding: '10px 16px' }}>
              <p style={{ ...archivo, color: BLACK, fontSize: '1rem', fontWeight: 500 }}>
                Web Developer &amp; UI/UX Designer
              </p>
            </div>
          </div>

          {/* center: socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'email', label: 'montiano.kennethjoe@gmail.com', href: 'mailto:montiano.kennethjoe@gmail.com' },
              { icon: 'fb',    label: 'facebook.com/kenneth.montyy',    href: 'https://www.facebook.com/kenneth.montyy' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', border: `1px solid ${CREAM}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon === 'email'
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  }
                </div>
                <a href={item.href} target="_blank" rel="noreferrer" style={{ ...archivo, color: CREAM, fontSize: '0.9rem', textDecoration: 'none' }}>
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          {/* right: github + phone + Download CV */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ ...archivo, color: CREAM, fontSize: '0.85rem', opacity: 0.6 }}>gh:</p>
              <a href="https://github.com/monti-ty" target="_blank" rel="noreferrer" style={{ ...archivo, color: CREAM, fontSize: '0.85rem', textDecoration: 'none' }}>github.com/monti-ty</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ ...archivo, color: CREAM, fontSize: '0.85rem', opacity: 0.6 }}>CN:</p>
              <p style={{ ...archivo, color: CREAM, fontSize: '0.85rem' }}>+639-511-163-589</p>
            </div>

            {/* Download CV — right side, matching Figma Frame 122 position */}
            <motion.a
              href="/assets/resume.pdf"
              download="Montiano_Kenneth_Resume.pdf"
              style={{
                ...archivo, color: CREAM, fontSize: '1rem', letterSpacing: '0.15em',
                border: `1px solid ${CREAM}`, padding: '11px 16px',
                textDecoration: 'none', display: 'inline-block', marginTop: '8px',
                borderRadius: '4px'
              }}
              whileHover={{ background: CREAM, color: BLACK, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Download CV
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   HOME — combines all 7 desktop frames
   ══════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: BLACK }}>
      <Desktop1 />
      <Desktop2 />
      <Desktop3 />
      <Desktop4 />
      <Desktop5 />
      <Desktop6 />
      <Desktop7 />
    </div>
  )
}
