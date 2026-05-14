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
            <GlassCard className="p-6 md:p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                            <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                                {entry.category}
                            </div>

                            <div className="text-sm text-white/25">
                                {entry.date}
                            </div>
                        </div>

                        <h3 className="text-[34px] font-[900] leading-none tracking-tight text-white">
                            {entry.dishName}
                        </h3>

                        <p className="mt-3 text-[15px] font-medium text-white/35">
                            {entry.restaurant} • {entry.city}
                        </p>
                        {entry.comment && (
                            <div className="mt-5 rounded-[24px] border border-white/[0.04] bg-black/20 p-5 backdrop-blur-xl">
                                <p className="text-[14px] leading-relaxed text-white/55">
                                    {entry.comment}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-inner">
                            <div className="text-3xl font-[900] leading-none text-white">
                                {entry.rating}
                            </div>

                            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                                /10
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => onEdit(entry)}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-white/35 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                            >
                                <Pencil size={18} />
                            </button>

                            <button
                                onClick={() => onDelete(entry.id)}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-white/35 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
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