import GlassCard from './GlassCard'

function StatsCard({ title, value, icon: Icon }) {
  return (
    <GlassCard className="p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold">
            {value}
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-500/10 p-4 text-orange-400">
          <Icon size={24} />
        </div>
      </div>
    </GlassCard>
  )
}

export default StatsCard