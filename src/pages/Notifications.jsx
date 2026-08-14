import { Bell } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { EmptyState } from '../components/Ui.jsx'

export default function Notifications() {
  return (
    <DashboardLayout title="Notifications" subtitle="Stay up to date on your reports and matches.">
      <div className="card">
        <EmptyState
          icon={Bell}
          title="No notifications yet."
          text="You will see updates here."
        />
      </div>
    </DashboardLayout>
  )
}
