import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

function SmartAutocomplete({
    value,
    onChange,
    suggestions = [],
    placeholder,
}) {
    const [isOpen, setIsOpen] =
        useState(false)

    const containerRef = useRef(null)

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

    const filteredSuggestions =
        useMemo(() => {
            if (!value) {
                return suggestions.slice(0, 10)
            }

            return suggestions.filter(
                (item) =>
                    item
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        )
            )
        }, [value, suggestions])

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    setIsOpen(true)
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-orange-500"
            />

            {isOpen &&
                filteredSuggestions.length >
                0 && (
                    <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#151821] shadow-2xl">
                        {filteredSuggestions.map(
                            (item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        onChange(item)
                                        setIsOpen(false)
                                    }}
                                    className="w-full border-b border-white/5 px-4 py-3 text-left text-sm transition hover:bg-orange-500/10 hover:text-orange-400"
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                )}
        </div>
    )
}

export default SmartAutocomplete