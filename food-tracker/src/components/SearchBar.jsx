function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search dishes, restaurants, cities..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 pl-5 text-white outline-none transition focus:border-orange-500"
      />
    </div>
  )
}

export default SearchBar