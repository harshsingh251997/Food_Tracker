function FilterPanel({
  category,
  setCategory,
  city,
  setCity,
  sortBy,
  setSortBy,
  categories,
  cities,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none"
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none"
      >
        <option value="">All Cities</option>

        {cities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Rated</option>
        <option value="lowest">Lowest Rated</option>
      </select>
    </div>
  )
}

export default FilterPanel