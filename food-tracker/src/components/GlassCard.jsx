import clsx from 'clsx'

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl',
        'shadow-[0_8px_30px_rgba(0,0,0,0.3)]',
        className
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard