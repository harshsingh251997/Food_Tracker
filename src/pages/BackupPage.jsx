import BackupPanel from '../components/BackupPanel'

function BackupPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="mb-14">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/35">
          Data Management
        </p>

        <h2 className="text-5xl font-[900] leading-[0.95] tracking-tight md:text-6xl">
          Backup & Restore
        </h2>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/35 md:text-lg">
          Export your food history, restore backups,
          and safely manage your personal data.
        </p>
      </div>

      <BackupPanel onImportComplete={() => {}} />
    </div>
  )
}

export default BackupPage