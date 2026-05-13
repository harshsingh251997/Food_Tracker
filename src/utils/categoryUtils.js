import { db } from '../data/db'
import { categories as defaultCategories } from '../data/categories'

export async function getAllCategories() {
  const customCategories =
    await db.customCategories.toArray()

  const customNames = customCategories.map(
    (item) => item.name
  )

  return [
    ...new Set([
      ...defaultCategories,
      ...customNames,
    ]),
  ].sort((a, b) => a.localeCompare(b))
}

export async function saveCustomCategory(
  category
) {
  if (!category?.trim()) return

  const normalized =
    category.trim()

  const existing =
    await db.customCategories
      .where('name')
      .equalsIgnoreCase(normalized)
      .first()

  if (existing) return

  const alreadyDefault =
    defaultCategories.some(
      (item) =>
        item.toLowerCase() ===
        normalized.toLowerCase()
    )

  if (alreadyDefault) return

  await db.customCategories.add({
    name: normalized,
  })
}