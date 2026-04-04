<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { 
  BarChart3, TrendingUp, TrendingDown, LayoutDashboard, 
  ChevronLeft, Calendar, Filter, Download, PieChart, ArrowUpRight
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { getAccountingLast6Months } from '@/server/api/public/accounting'

definePageMeta({ layout: 'dashboard' })
useSeoMeta({
  title: 'Laporan Transaksi ',
  robots: 'noindex, nofollow'
})

interface AnalyticsItem {
  month: string
  income: number
  expense: number
}

const isLoading = ref(true)
const analyticsData = ref<AnalyticsItem[]>([])

// ─── Data Fetching ────────────────────────────────────────────────────────
const fetchData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getAccountingLast6Months(token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      const rawRecords = result.payload || []
      
      // Initialize last 6 months
      const monthsData: ({ month: string; income: number; expense: number; _d: Date })[] = []
      const today = new Date()
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
        monthsData.push({
          month: d.toLocaleString('id-ID', { month: 'short', year: 'numeric' }),
          income: 0,
          expense: 0,
          _d: d
        })
      }

      // Aggregate raw records into monthly stats
      rawRecords.forEach((item: any) => {
        const itemDate = new Date(item.date)
        const target = monthsData.find(m => 
          m._d.getMonth() === itemDate.getMonth() && 
          m._d.getFullYear() === itemDate.getFullYear()
        )
        
        if (target) {
          const type = item.category_types?.name?.toLowerCase()
          if (type === 'pemasukan') {
            target.income += Number(item.amount)
          } else if (type === 'pengeluaran') {
            target.expense += Number(item.amount)
          }
        }
      })

      analyticsData.value = monthsData.map(({ month, income, expense }) => ({ month, income, expense }))
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
  } finally {
    isLoading.value = false
  }
}


// ─── Chart Calculations ───────────────────────────────────────────────────
const maxAmount = computed(() => {
  if (analyticsData.value.length === 0) return 100000
  const values = analyticsData.value.flatMap(d => [d.income, d.expense])
  return Math.max(...values, 10000) * 1.2
})

const formatCurrency = (val: number) => {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
  if (val >= 1000) return (val / 1000).toFixed(0) + 'K'
  return val.toString()
}

const formatFullCurrency = (val: number) => val.toLocaleString('id-ID')

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-8 transition-colors duration-300">
    
    <!-- Page Header -->
    <div class="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex items-center gap-6 shadow-sm">
      <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
        <BarChart3 class="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-black tracking-tight">Laporan Keuangan</h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium mt-1 italic">Analisis tren pemasukan, pengeluaran, dan portofolio aset Anda.</p>
      </div>
    </div>

    <!-- Main Chart Section -->
    <div class="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 shadow-sm overflow-hidden relative group">
      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center gap-3">
          <ArrowUpRight class="w-5 h-5 text-zinc-400" />
          <h2 class="text-sm sm:text-base font-black uppercase tracking-widest text-zinc-900 dark:text-white">Tren Pemasukan & Pengeluaran (6 Bulan Terakhir)</h2>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="h-[350px] flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
      </div>

      <!-- Chart Content -->
      <div v-else class="relative h-[300px] sm:h-[400px] w-full mt-4 flex flex-col">
        <!-- SVG Chart -->
        <svg viewBox="0 0 1000 400" class="w-full h-full preserve-3d" preserveAspectRatio="none">
          <!-- Grid Lines -->
          <template v-for="i in 5" :key="i">
            <line x1="60" :y1="350 - (i-1)*70" x2="980" :y2="350 - (i-1)*70" stroke="currentColor" stroke-dasharray="4,4" class="text-zinc-100 dark:text-zinc-800/40" />
            <text x="50" :y="350 - (i-1)*70 + 4" text-anchor="end" class="text-[14px] font-bold fill-zinc-400">{{ formatCurrency((maxAmount / 4) * (i-1)) }}</text>
          </template>

          <!-- Bars -->
          <template v-for="(item, idx) in analyticsData" :key="idx">
            <g>
              <!-- Income Bar -->
              <rect 
                :x="100 + idx * 150" 
                :y="350 - (item.income / maxAmount) * 320" 
                width="40" 
                :height="(item.income / maxAmount) * 320" 
                rx="8"
                class="fill-emerald-500 hover:fill-emerald-400 transition-colors cursor-pointer"
              >
                <title>Pemasukan: Rp {{ formatFullCurrency(item.income) }}</title>
              </rect>
              <!-- Expense Bar -->
              <rect 
                :x="145 + idx * 150" 
                :y="350 - (item.expense / maxAmount) * 320" 
                width="40" 
                :height="(item.expense / maxAmount) * 320" 
                rx="8"
                class="fill-rose-500 hover:fill-rose-400 transition-colors cursor-pointer"
              >
                <title>Pengeluaran: Rp {{ formatFullCurrency(item.expense) }}</title>
              </rect>
              <!-- X-Axis Labels -->
              <text :x="142 + idx * 150" y="380" text-anchor="middle" class="text-[14px] font-black fill-zinc-400 dark:fill-zinc-500 uppercase tracking-tighter">{{ item.month }}</text>
            </g>
          </template>
          
          <!-- X-Axis Line -->
          <line x1="60" y1="350" x2="980" y2="350" stroke="currentColor" stroke-width="2" class="text-zinc-200 dark:text-zinc-800" />
        </svg>

        <!-- Legend -->
        <div class="flex items-center justify-center gap-8 mt-10">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-md bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
            <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Pemasukan</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-md bg-rose-500 shadow-lg shadow-rose-500/20"></div>
            <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Pengeluaran</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
</style>
