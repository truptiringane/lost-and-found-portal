import { ClipboardEdit, Search, PhoneCall, PartyPopper } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'

const steps = [
  { icon: ClipboardEdit, title: '1. Report', text: 'Submit lost or found item details including photos, location and date.' },
  { icon: Search, title: '2. Search', text: 'Browse items reported by others and find a match for what you lost or found.' },
  { icon: PhoneCall, title: '3. Connect', text: 'Reach out to the owner or finder directly through the platform.' },
  { icon: PartyPopper, title: '4. Return', text: 'Arrange a handoff, reunite the item, and make someone\'s day.' },
]

export default function HowItWorks() {
  return (
    <div>
      <PublicNavbar />
      <section className="section" style={{ maxWidth: 900 }}>
        <p className="hero-eyebrow">The process</p>
        <h1 style={{ fontSize: 36, marginTop: 8, marginBottom: 14 }}>How Lost &amp; Found Works</h1>
        <p className="lead" style={{ maxWidth: 640, marginBottom: 40 }}>
          Four simple steps stand between a lost item and getting it back to its owner.
        </p>
        <div className="steps" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {steps.map(({ icon: Icon, title, text }) => (
            <div className="step" key={title}>
              <div className="step-num"><Icon size={19} /></div>
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <p className="footer-note">© {new Date().getFullYear()} Lost &amp; Found. Built to reunite people with what matters.</p>
    </div>
  )
}
