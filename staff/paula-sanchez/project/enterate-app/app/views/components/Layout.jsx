import { Outlet } from 'react-router'

import { Header } from './Header'
import { MobileTabBar } from './MobileTabBar'
import { OnboardingModal } from './OnboardingModal'

// === LAYOUT PRINCIPAL ===
// Header sticky arriba, contenido en el medio, MobileTabBar fija abajo (móvil).
// OnboardingModal se muestra sobre todo si el usuario es invitado y no lo ha descartado.

export function Layout() {
    return <div className="min-h-screen pb-20 md:pb-0">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
            <Outlet />
        </main>

        <MobileTabBar />

        <OnboardingModal />
    </div>
}
