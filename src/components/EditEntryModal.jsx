import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'
import { db } from '../data/db'
import toast from 'react-hot-toast'

function EditEntryModal({ entry, onClose, onUpdated }) {
  const [formData, setFormData] = useState(entry)

  useEffect(() => {
    setFormData(entry)
  }, [entry])

  function updateField(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  async function handleSave() {
    await db.foodEntries.update(entry.id, formData)

    toast.success('Entry updated successfully')

    onUpdated()
    onClose()
  }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <GlassCard className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Edit Entry
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white/60 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            placeholder="Dish Name"
            value={formData.dishName}
            onChange={(e) => updateField('dishName', e.target.value)}
          />

          <InputField
            placeholder="Restaurant"
            value={formData.restaurant}
            onChange={(e) => updateField('restaurant', e.target.value)}
          />

          <InputField
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
          />

          <InputField
            placeholder="Category"
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
          />
          <InputField
            placeholder="Subcategory"
            value={formData.subcategory}
            onChange={(e) => updateField('subcategory', e.target.value)}
          />

          <InputField
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) => updateField('rating', e.target.value)}
          />

          <div className="md:col-span-2">
            <InputField
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 p-4 font-bold text-black transition hover:scale-[1.01]"
        >
          Save Changes
        </button>
      </GlassCard>
    </div>
  )
}

function InputField(props) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-orange-500"
    />
  )
}

export default EditEntryModal