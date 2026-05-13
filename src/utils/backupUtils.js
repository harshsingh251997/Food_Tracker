import { db } from '../data/db'

export async function exportBackup() {
  try {
    const entries = await db.foodEntries.toArray()

    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      entries,
    }

    const blob = new Blob(
      [JSON.stringify(backupData, null, 2)],
      {
        type: 'application/json',
      }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    const date = new Date().toISOString().split('T')[0]

    link.href = url
    link.download = `food-backup-${date}.json`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)

    return {
      success: true,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      error,
    }
  }
}

export async function importBackup(file) {
  try {
    const text = await file.text()

    const backupData = JSON.parse(text)

    if (!backupData.entries) {
      throw new Error('Invalid backup file')
    }

    // Get existing entries
    const currentEntries = await db.foodEntries.toArray()

    // Create duplicate detection keys
    const existingKeys = new Set(
      currentEntries.map((entry) =>
        createEntryKey(entry)
      )
    )

    // Filter only unique entries
    const uniqueEntries = backupData.entries.filter(
      (entry) => {
        const key = createEntryKey(entry)

        return !existingKeys.has(key)
      }
    )

    // Add only new entries
    if (uniqueEntries.length > 0) {
      await db.foodEntries.bulkAdd(uniqueEntries)
    }

    return {
      success: true,
      imported: uniqueEntries.length,
      skipped:
        backupData.entries.length -
        uniqueEntries.length,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      error,
    }
  }
}

// Duplicate detection helper
function createEntryKey(entry) {
  return [
    entry.dishName?.trim().toLowerCase(),
    entry.restaurant?.trim().toLowerCase(),
    entry.city?.trim().toLowerCase(),
    entry.date,
  ].join('|')
}