import { useState } from 'react'
import { db } from '../data/db'
import toast, { Toaster } from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import { motion } from 'framer-motion'

const categories = [
  'Biryani',
  'Pizza',
  'Burger',
  'Momos',
  'South Indian',
  'Chinese',
  'Dessert',
  'Street Food',
]

function AddEntryPage() {
  const [formData, setFormData] = useState({
    dishName: '',
    restaurant: '',
    city: '',
    category: '',
    subcategory: '',
    rating: '',
    date: '',
  })

  function updateField(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    await db.foodEntries.add(formData)

    toast.success('Food entry saved successfully')

    setFormData({
      dishName: '',
      restaurant: '',
      city: '',
      category: '',
      subcategory: '',
      rating: '',
      date: '',
    })
  }

    return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Add Entry
          </p>

          <h2 className="text-5xl font-black">New Food Memory</h2>

          <p className="mt-4 text-white/50">
            Save dishes, restaurants, and experiences.
          </p>
        </div>

        <GlassCard className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <InputField
              placeholder="Dish Name"
              value={formData.dishName}
              onChange={(e) => updateField('dishName', e.target.value)}
            />

            <InputField
              placeholder="Restaurant Name"
              value={formData.restaurant}
              onChange={(e) => updateField('restaurant', e.target.value)}
            />

            <InputField
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
            />
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-orange-500"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <InputField
              placeholder="Subcategory"
              value={formData.subcategory}
              onChange={(e) => updateField('subcategory', e.target.value)}
            />

            <InputField
              type="number"
              placeholder="Rating out of 10"
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

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 p-5 text-lg font-bold text-black transition duration-300 hover:scale-[1.02]"
              >
                Save Food Entry
              </button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
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

export default AddEntryPage