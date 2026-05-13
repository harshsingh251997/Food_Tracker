import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  PlusCircle,
  PieChart,
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
  ]

  return (
    <>
      <div className="sticky top-0 z-40 hidden border-b border-white/10 bg-black/20 backdrop-blur-2xl md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-3xl font-extrabold text-transparent">
              Food Tracker
            </h1>

            <p className="mt-1 text-sm text-white/40">
              Personal food memory system
            </p>
          </div>

          <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
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

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#111318]/90 backdrop-blur-2xl md:hidden">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition ${
                  isActive
                    ? 'text-orange-400'
                    : 'text-white/50'
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