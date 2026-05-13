import Dexie from 'dexie'

export const db = new Dexie('FoodTrackerDB')

db.version(1).stores({
  foodEntries:
    '++id,dishName,restaurant,city,category,subcategory,rating,date',
})