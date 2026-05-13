import { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { db } from '../data/db'

const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#eab308']

function AnalyticsPage() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    loadAnalytics()
  }, [])

  async function loadAnalytics() {
    const entries = await db.foodEntries.toArray()

    const categoryCount = {}

    entries.forEach((entry) => {
      if (!categoryCount[entry.category]) {
        categoryCount[entry.category] = 0
      }

      categoryCount[entry.category] += 1
    })

    const formatted = Object.keys(categoryCount).map((key) => ({
      name: key,
      value: categoryCount[key],
    }))

    setChartData(formatted)
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">Analytics Dashboard</h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-6 text-2xl font-semibold">
          Category Breakdown
        </h3>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={140}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage