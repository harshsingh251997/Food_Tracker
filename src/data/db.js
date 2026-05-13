import Dexie from 'dexie'

export const db = new Dexie('FoodTrackerDB')

db.version(5).stores({
  foodEntries:
    '++id,dishName,restaurant,city,category,subcategory,rating,date,comment',

  customCategories:
    '++id,name',

  suggestions:
    '++id,type,value',
})