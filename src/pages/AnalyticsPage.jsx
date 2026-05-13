import { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { db } from '../data/db'
import GlassCard from '../components/GlassCard'

const COLORS = [
    '#FFFFFF',
    '#D1D5DB',
    '#9CA3AF',
    '#6B7280',
    '#4B5563',
]

function AnalyticsPage() {
    const [chartData, setChartData] = useState([])
    const [stats, setStats] = useState({
        totalEntries: 0,
        topCategory: '-',
        avgRating: 0,
    })

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

        const topCategory =
          [...formatted]
            .sort((a, b) => b.value - a.value)[0]

        const avgRating =
            entries.reduce(
                (sum, item) =>
                    sum + Number(item.rating || 0),
                0
            ) / (entries.length || 1)

        setStats({
            totalEntries: entries.length,
            topCategory:
                topCategory?.name || '-',
            avgRating: avgRating.toFixed(1),
        })

        setChartData(formatted)
    }

    return (
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
            <div className="mb-14">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/35">
                    Insights
                </p>

                <h2 className="text-5xl font-[900] leading-[0.95] tracking-tight md:text-6xl">
                    Analytics Dashboard
                </h2>

                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/35 md:text-lg">
                    Understand your food habits, preferences,
                    and ordering patterns.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
                <GlassCard className="p-7">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/30">
                        Total Entries
                    </p>

                    <h3 className="mt-4 text-5xl font-[900]">
                        {stats.totalEntries}
                    </h3>
                </GlassCard>

                <GlassCard className="p-7">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/30">
                        Top Category
                    </p>

                    <h3 className="mt-4 text-3xl font-[900]">
                        {stats.topCategory}
                    </h3>
                </GlassCard>

                <GlassCard className="p-7">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/30">
                        Average Rating
                    </p>

                    <h3 className="mt-4 text-5xl font-[900]">
                        {stats.avgRating}
                    </h3>
                </GlassCard>
            </div>

            {/* Chart */}
            <GlassCard className="p-8 md:p-10">
                <div className="mb-8">
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/30">
                        Visualization
                    </p>

                    <h3 className="text-3xl font-[900] tracking-tight">
                        Category Breakdown
                    </h3>
                </div>

                <div className="h-[420px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData || []}
                                dataKey="value"
                                outerRadius={150}
                                innerRadius={85}
                                paddingAngle={3}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index % COLORS.length
                                            ]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    background: '#131720',
                                    border:
                                        '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '20px',
                                    color: 'white',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>
    )
  }
    export default AnalyticsPage