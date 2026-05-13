import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  getAllCategories,
} from '../utils/categoryUtils'

function CategoryAutocomplete({
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] =
    useState(false)

  const [allCategories, setAllCategories] =
    useState([])

  const containerRef = useRef(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  async function loadCategories() {
    const data =
      await getAllCategories()

    setAllCategories(data)
  }

  const filteredCategories =
    useMemo(() => {
      if (!value) {
        return allCategories.slice(0, 20)
      }

      return allCategories.filter(
        (category) =>
          category
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )
      )
    }, [value, allCategories])

  function handleSelect(category) {
    onChange(category)
    setIsOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <input
        type="text"
        placeholder="Search or type category"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-orange-500"
      />

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#151821] shadow-2xl">
          {filteredCategories.length >
          0 ? (
            filteredCategories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleSelect(category)
                  }
                  className="w-full border-b border-white/5 px-4 py-3 text-left text-sm transition hover:bg-orange-500/10 hover:text-orange-400"
                >
                  {category}
                </button>
              )
            )
          ) : (
            <div className="px-4 py-4 text-sm text-white/50">
              No matching categories found.

              <div className="mt-2 text-orange-400">
                This category will be saved:
                <span className="ml-1 font-semibold">
                  {value}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CategoryAutocomplete