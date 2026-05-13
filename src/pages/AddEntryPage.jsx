import { useEffect, useState } from 'react'
import { db } from '../data/db'
import toast, { Toaster } from 'react-hot-toast'
import GlassCard from '../components/GlassCard'
import { motion } from 'framer-motion'
import CategoryAutocomplete from '../components/CategoryAutocomplete'
import { saveCustomCategory } from '../utils/categoryUtils'
import SmartAutocomplete from '../components/SmartAutocomplete'

import {
    saveSuggestion,
    getSuggestions,
} from '../utils/suggestionUtils'

function AddEntryPage() {
    const [formData, setFormData] = useState({
        dishName: '',
        restaurant: '',
        city: '',
        category: '',
        subcategory: '',
        rating: '',
        date: '',
        comment: '',
    })

    const [
        restaurantSuggestions,
        setRestaurantSuggestions,
    ] = useState([])

    const [
        citySuggestions,
        setCitySuggestions,
    ] = useState([])

    const [
        subcategorySuggestions,
        setSubcategorySuggestions,
    ] = useState([])

    useEffect(() => {
        loadSuggestions()
    }, [])

    async function loadSuggestions() {
        setRestaurantSuggestions(
            await getSuggestions('restaurant')
        )

        setCitySuggestions(
            await getSuggestions('city')
        )

        setSubcategorySuggestions(
            await getSuggestions(
                'subcategory'
            )
        )
    }

    function updateField(field, value) {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    async function handleSubmit(e) {
  e.preventDefault()

  try {
    // Save custom category
    await saveCustomCategory(
      formData.category
    )

    // Save smart suggestions
    await saveSuggestion(
      'restaurant',
      formData.restaurant
    )

    await saveSuggestion(
      'city',
      formData.city
    )

    await saveSuggestion(
      'subcategory',
      formData.subcategory
    )

    // Save food entry
    await db.foodEntries.add(formData)

    toast.success(
      'Food entry saved successfully'
    )

    // Reload suggestions
    loadSuggestions()

    // Reset form
    setFormData({
      dishName: '',
      restaurant: '',
      city: '',
      category: '',
      subcategory: '',
      rating: '',
      date: '',
      comment: '',
    })
  } catch (error) {
    console.error(error)

    toast.error(
      'Failed to save entry'
    )
  }
}

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <Toaster position="top-right" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/35">
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

                        <SmartAutocomplete
                            value={formData.restaurant}
                            onChange={(value) =>
                                updateField('restaurant', value)
                            }
                            suggestions={
                                restaurantSuggestions
                            }
                            placeholder="Restaurant"
                        />

                        <SmartAutocomplete
                            value={formData.city}
                            onChange={(value) =>
                                updateField('city', value)
                            }
                            suggestions={citySuggestions}
                            placeholder="City"
                        />
                        <CategoryAutocomplete
                            value={formData.category}
                            onChange={(value) =>
                                updateField('category', value)
                            }
                        />
                        <SmartAutocomplete
                            value={formData.subcategory}
                            onChange={(value) =>
                                updateField('subcategory', value)
                            }
                            suggestions={
                                subcategorySuggestions
                            }
                            placeholder="Subcategory"
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
                            <textarea
                                placeholder="Comments, thoughts, experience..."
                                value={formData.comment}
                                onChange={(e) =>
                                    updateField('comment', e.target.value)
                                }
                                rows={5}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-orange-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full    rounded-[24px]    bg-white   p-5    text-lg    font-bold    text-black    shadow-[0_10px_30px_rgba(255,255,255,0.08)]    transition-all    duration-300    hover:scale-[1.015]    hover:bg-white/92    active:scale-[0.99]"
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