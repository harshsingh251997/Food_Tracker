import { exportBackup, importBackup } from '../utils/backupUtils'
import toast from 'react-hot-toast'
import GlassCard from './GlassCard'
import { Download, Upload } from 'lucide-react'

function BackupPanel({ onImportComplete }) {
  async function handleExport() {
    const result = await exportBackup()

    if (result.success) {
      toast.success('Backup exported successfully')
    } else {
      toast.error('Export failed')
    }
  }

  async function handleImport(event) {
    const file = event.target.files[0]

    if (!file) return

    const confirmed = window.confirm(
      'Import backup and merge missing entries? Existing data will remain safe.'
    )

    if (!confirmed) return

    const result = await importBackup(file)

    if (result.success) {
        toast.success(
        `${result.imported} new entries imported • ${result.skipped} duplicates skipped`
        )

      onImportComplete()
    } else {
      toast.error('Import failed')
    }
  }

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            Backup & Restore
          </h3>

          <p className="mt-2 text-white/50">
            Export your food history or restore from backup.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            <Download size={18} />
            Export Backup
          </button>

          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:border-orange-500/30">
            <Upload size={18} />

            Import Backup

            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </GlassCard>
  )
}

export default BackupPanel