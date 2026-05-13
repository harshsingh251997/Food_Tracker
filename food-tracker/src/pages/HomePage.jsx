import { useEffect, useMemo, useState } from 'react'
import { db } from '../data/db'
import {
  UtensilsCrossed,
  Star,
  Building2,
  MapPin,
} from 'lucide-react'

import StatsCard from '../components/StatsCard'
import GlassCard from '../components/GlassCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import EntryCard from '../components/EntryCard'
import EditEntryModal from '../components/EditEntryModal'
import toast, { Toaster } from 'react-hot-toast'

function HomePage() {
  const [entries, setEntries] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const [editingEntry, setEditingEntry] = useState(null)

  const [stats, setStats] = useState({
    totalEntries: 0,
    avgRating: 0,
    restaurants: 0,
    cities: 0,
  })

  useEffect(() => {
    loadEntries()
  }, [])

    async function loadEntries() {
    const data = await db.foodEntries.toArray()

    setEntries(data)

    const avgRating =
      data.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
      (data.length || 1)

    const restaurants = new Set(data.map((item) => item.restaurant))
    const cities = new Set(data.map((item) => item.city))

    setStats({
      totalEntries: data.length,
      avgRating: avgRating.toFixed(1),
      restaurants: restaurants.size,
      cities: cities.size,
    })
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Delete this food entry?'
    )

    if (!confirmed) return

    await db.foodEntries.delete(id)

    toast.success('Entry deleted successfully')

    loadEntries()
  }

    const filteredEntries = useMemo(() => {
    let filtered = [...entries]

    if (searchTerm) {
      filtered = filtered.filter((entry) => {
        const search = searchTerm.toLowerCase()

        return (
          entry.dishName?.toLowerCase().includes(search) ||
          entry.restaurant?.toLowerCase().includes(search) ||
          entry.city?.toLowerCase().includes(search) ||
          entry.category?.toLowerCase().includes(search)
        )
      })
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (entry) => entry.category === selectedCategory
      )
    }

    if (selectedCity) {
      filtered = filtered.filter(
        (entry) => entry.city === selectedCity
      )
    }
    switch (sortBy) {
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating)
        break

      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating)
        break

      case 'oldest':
        filtered.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )
        break

      default:
        filtered.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
    }

    return filtered
  }, [
    entries,
    searchTerm,
    selectedCategory,
    selectedCity,
    sortBy,
  ])

  const categories = [...new Set(entries.map((e) => e.category))]
  const cities = [...new Set(entries.map((e) => e.city))]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <Toaster position="top-right" />

      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Dashboard
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Your Food Journey
          </h2>

          <p className="mt-4 max-w-2xl text-base text-white/50 md:text-lg">
            Search, filter, and manage your food memories.
          </p>
        </div>
      </div>

      <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Entries"
          value={stats.totalEntries}
          icon={UtensilsCrossed}
        />

        <StatsCard
          title="Average Rating"
          value={stats.avgRating}
          icon={Star}
        />

        <StatsCard
          title="Restaurants"
          value={stats.restaurants}
          icon={Building2}
        />

        <StatsCard
          title="Cities"
          value={stats.cities}
          icon={MapPin}
        />
      </div>

      <GlassCard className="mb-8 p-5 md:p-6">
        <div className="space-y-5">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <FilterPanel
            category={selectedCategory}
            setCategory={setSelectedCategory}
            city={selectedCity}
            setCity={setSelectedCity}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            cities={cities}
          />
        </div>
      </GlassCard>

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          Food Entries
        </h3>

        <div className="text-sm text-white/40">
          {filteredEntries.length} results
        </div>
      </div>

      <div className="grid gap-5">
        {filteredEntries.length === 0 && (
          <GlassCard className="p-12 text-center text-white/50">
            No matching food entries found.
          </GlassCard>
        )}

        {filteredEntries.map((entry, index) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            index={index}
            onEdit={setEditingEntry}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editingEntry && (
        <EditEntryModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onUpdated={loadEntries}
        />
      )}
    </div>
  )
}

export default HomePage