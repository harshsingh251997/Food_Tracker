import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  PlusCircle,
  PieChart,
  Database,
} from 'lucide-react'

function Navbar() {
  const location = useLocation()

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: Home,
    },
    {
      label: 'Add',
      path: '/add',
      icon: PlusCircle,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: PieChart,
    },
    {
      label: 'Backup',
      path: '/backup',
      icon: Database,
    },
  ]

  return (
    <>
      <div className="sticky top-0 z-40 hidden border-b border-white/[0.04] bg-[#070B14]/70 backdrop-blur-3xl md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-[900] tracking-tight text-white">
              Food Tracker
            </h1>

            <p className="mt-1 text-sm text-white/30">
              Personal food memory system
            </p>
          </div>

          <div className="flex gap-2 rounded-full border border-white/[0.05] bg-[#121722]/90 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white/40 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-[32px] border border-white/[0.06] bg-[#10141D]/95 backdrop-blur-3xl shadow-[0_20px_60px_rg ba(0,0,0,0.55)] md:hidden">
        <div className="flex items-center justify-around px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-[11px] transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white/35 hover:text-white/80'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Navbar