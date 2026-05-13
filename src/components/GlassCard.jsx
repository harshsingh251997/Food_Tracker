function GlassCard({
  children,
  className = '',
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/[0.05]
        bg-[#131720]/95
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-3xl
        transition-all
        duration-500
        hover:bg-[#171C27]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        ${className}
      `}
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_35%)]" />

      {/* Subtle Inner Highlight */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[35px] border border-white/[0.025]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default GlassCard