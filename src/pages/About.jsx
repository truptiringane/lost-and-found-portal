import { HeartHandshake, ShieldCheck, Users } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'

const values = [
  { icon: HeartHandshake, title: 'Community first', text: 'Built for neighbors, campuses and cities to help each other.' },
  { icon: ShieldCheck, title: 'Trusted & safe', text: 'Verified reports and secure messaging keep exchanges honest.' },
  { icon: Users, title: 'Free for everyone', text: 'No fees, no ads — just a simple way to reunite people with their things.' },
]

export default function About() {
  return (
    <div>
      <PublicNavbar />
      <section className="section" style={{ maxWidth: 900 }}>
        <p className="hero-eyebrow">Our mission</p>
        <h1 style={{ fontSize: 36, marginTop: 8, marginBottom: 14 }}>About Lost &amp; Found</h1>
        <p className="lead" style={{ maxWidth: 640, marginBottom: 40 }}>
          Every year, millions of items go missing — wallets on trains, keys in cafés, bags at the park.
          We built Lost &amp; Found to make reporting and recovering these items simple, fast and free.
        </p>
        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {values.map(({ icon: Icon, title, text }) => (
            <div className="category-card" key={title} style={{ textAlign: 'left', padding: 22 }}>
              <div className="category-icon"><Icon size={20} /></div>
              <h4 style={{ fontSize: 15, marginBottom: 6 }}>{title}</h4>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <p className="footer-note">© {new Date().getFullYear()} Lost &amp; Found. Built to reunite people with what matters.</p>
    </div>
  )
}
