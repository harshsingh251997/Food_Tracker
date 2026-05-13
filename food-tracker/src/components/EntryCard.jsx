import GlassCard from './GlassCard'
import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'

function EntryCard({
  entry,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <GlassCard className="p-6 transition duration-300 hover:border-orange-500/30 hover:bg-white/[0.07]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <div className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-400">
                {entry.category}
              </div>

              <div className="text-sm text-white/40">
                {entry.date}
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight">
              {entry.dishName}
            </h3>

            <p className="mt-2 text-lg text-white/50">
              {entry.restaurant} • {entry.city}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 px-6 py-4 text-center">
              <div className="text-3xl font-black text-orange-400">
                {entry.rating}
              </div>

              <div className="text-xs uppercase tracking-widest text-white/40">
                Rating
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(entry)}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/60 transition hover:border-orange-500/30 hover:text-orange-400"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onDelete(entry.id)}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/60 transition hover:border-red-500/30 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default EntryCard