import { useNavigate } from 'react-router-dom'
import {
  Search, Backpack, ShoppingBag, Wallet, KeyRound, Watch, MoreHorizontal,
  ClipboardEdit, MapPinned, PhoneCall, PartyPopper, ChevronRight, ArrowRight,
} from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'

const categories = [
  { label: 'Electronics', icon: Watch },
  { label: 'Bags', icon: ShoppingBag },
  { label: 'Wallets', icon: Wallet },
  { label: 'Keys', icon: KeyRound },
  { label: 'Accessories', icon: Backpack },
  { label: 'Others', icon: MoreHorizontal },
]

const steps = [
  { icon: ClipboardEdit, title: '1. Report', text: 'Submit lost or found item details.' },
  { icon: Search, title: '2. Search', text: 'Browse items and find a match.' },
  { icon: PhoneCall, title: '3. Connect', text: 'Contact the owner or finder.' },
  { icon: PartyPopper, title: '4. Return', text: 'Reunite the item and make someone\'s day!' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <PublicNavbar />

      <section className="hero">
        <div>
          <p className="hero-eyebrow">Community powered</p>
          <h1>Find What You Lost.<br /><span>Help Others.</span></h1>
          <p className="lead">
            A simple and trusted platform to report lost or found items and help return them to their owners.
          </p>
          <div className="search-bar">
            <input placeholder="Search items, categories, locations..." />
            <button aria-label="Search"><Search size={18} /></button>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/report-lost')}>
              Report Lost Item
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/report-found')}>
              Report Found Item
            </button>
          </div>
        </div>
        <div className="hero-art">
          <Backpack size={110} strokeWidth={1.2} />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Explore Categories</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="category-grid">
          {categories.map(({ label, icon: Icon }) => (
            <div className="category-card" key={label}>
              <div className="category-icon"><Icon size={20} /></div>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How It Works</h2>
        </div>
        <div className="steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
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
