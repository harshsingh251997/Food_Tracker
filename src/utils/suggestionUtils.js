import { db } from '../data/db'

export async function saveSuggestion(
    type,
    value
) {
    if (!value?.trim()) return

    const normalized =
        value.trim()

    const existing =
        await db.suggestions
            .filter(
                (item) =>
                    item.type === type &&
                    item.value.toLowerCase() ===
                    normalized.toLowerCase()
            )
            .first()

    if (existing) return

    await db.suggestions.add({
        type,
        value: normalized,
    })
}

export async function getSuggestions(
    type
) {
    const results =
        await db.suggestions
            .filter(
                (item) => item.type === type
            )
            .toArray()

    return results
        .map((item) => item.value)
        .sort((a, b) =>
            a.localeCompare(b)
        )
}