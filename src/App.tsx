import { useState } from 'react'
import { AppLayout } from './layouts/AppLayout'
import { rolePermissions, volunteers } from './mocks/volunteers'
import { MembersPage } from './pages/volunteers/MembersPage'
import { VolunteerProfilePage } from './pages/volunteers/VolunteerProfilePage'
import type { AccessRole } from './types/volunteer'

function App() {
  const [role, setRole] = useState<AccessRole>('Dirección GTH')
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string | null>(() => new URLSearchParams(window.location.search).get('volunteer'))
  const permissions = rolePermissions[role]
  const selectedVolunteer = volunteers.find(({ id }) => id === selectedVolunteerId)

  const openVolunteer = (id: string) => {
    setSelectedVolunteerId(id)
    window.history.replaceState(null, '', `?volunteer=${encodeURIComponent(id)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showMembers = () => {
    setSelectedVolunteerId(null)
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeRole = (nextRole: AccessRole) => {
    setRole(nextRole)
    const nextPermissions = rolePermissions[nextRole]
    if (selectedVolunteer && nextPermissions.areaScope && selectedVolunteer.area !== nextPermissions.areaScope) {
      setSelectedVolunteerId(null)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <AppLayout
      currentPage={selectedVolunteer ? 'profile' : 'members'}
      onNavigateMembers={showMembers}
      role={role}
      onRoleChange={changeRole}
    >
      {selectedVolunteer ? (
        <VolunteerProfilePage volunteer={selectedVolunteer} permissions={permissions} onBack={showMembers} />
      ) : (
        <MembersPage permissions={permissions} onViewVolunteer={openVolunteer} />
      )}
    </AppLayout>
  )
}

export default App
