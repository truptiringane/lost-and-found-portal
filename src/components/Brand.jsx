import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand({ dark }) {
  return (
    <Link to="/" className="brand" style={dark ? { color: 'white' } : undefined}>
      <span className="brand-icon"><MapPin size={18} /></span>
      Lost &amp; Found
    </Link>
  )
}
