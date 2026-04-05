<template>
  <div class="px-4 py-8 sm:px-8 space-y-8 max-w-7xl mx-auto min-h-screen bg-black text-white">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Saldo -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Saldo</span>
          <DollarSign class="w-4 h-4 text-zinc-500" />
        </div>
        <div>
          <h2 class="text-2xl font-black tabular-nums tracking-tighter">Rp {{ formatCurrency(totalBalance) }}</h2>
          <p class="text-[10px] text-zinc-500 font-medium mt-1">Total saldo dari semua akun</p>
        </div>
      </div>

      <!-- Pemasukan Bulan Ini -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pemasukan Bulan Ini</span>
          <TrendingUp class="w-4 h-4 text-zinc-500" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-emerald-400 tabular-nums tracking-tighter">Rp {{ formatCurrency(totalIncome) }}</h2>
          <div class="flex items-center gap-1 mt-1">
            <MoveUpRight class="w-3 h-3 text-emerald-400" />
            <span class="text-[10px] text-emerald-400 font-bold">100% dari bulan lalu</span>
          </div>
        </div>
      </div>

      <!-- Pengeluaran Bulan Ini -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pengeluaran Bulan Ini</span>
          <TrendingDown class="w-4 h-4 text-zinc-500" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-red-500 tabular-nums tracking-tighter">Rp {{ formatCurrency(totalExpense) }}</h2>
          <div class="flex items-center gap-1 mt-1">
            <MoveUpRight class="w-3 h-3 text-red-500" />
            <span class="text-[10px] text-red-500 font-bold">100% dari bulan lalu</span>
          </div>
        </div>
      </div>

      <!-- Saldo Bersih -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Saldo Bersih</span>
          <Target class="w-4 h-4 text-zinc-500" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-emerald-400 tabular-nums tracking-tighter">Rp {{ formatCurrency(netIncome) }}</h2>
          <p class="text-[10px] text-zinc-500 font-medium mt-1">Tingkat tabungan: {{ savingsRate }}%</p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- Akun Anda -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div class="p-6 flex items-center justify-between border-b border-zinc-800">
            <div>
              <h3 class="text-base font-black tracking-tight">Akun Anda</h3>
              <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{{ financials.length }} akun dengan total saldo Rp {{ formatCurrency(totalBalance) }}</p>
            </div>
            <NuxtLink to="/finance">
              <Button variant="outline" size="sm" class="bg-zinc-950 border-zinc-800 text-[10px] font-black uppercase tracking-widest gap-2">
                <Eye class="w-3 h-3" />
                Lihat Semua
              </Button>
            </NuxtLink>
          </div>
          <div class="divide-y divide-zinc-800">
            <div v-if="isLoading" class="p-12 flex justify-center">
              <Loader2 class="w-6 h-6 animate-spin text-zinc-600" />
            </div>
            <div v-else-if="financials.length === 0" class="p-12 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Belum ada akun terdaftar
            </div>
            <div v-for="item in financials.slice(0, 3)" :key="item.id" class="p-6 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-500">
                  <CreditCard class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="text-sm font-black tracking-tight">{{ item.name }}</h4>
                  <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{{ item.financial_category?.name || 'Tabungan' }}</p>
                </div>
              </div>
              <span class="text-sm font-black tabular-nums text-emerald-400">Rp {{ formatCurrency(item.saldo) }}</span>
            </div>
          </div>
        </div>

        <!-- Transaksi Terbaru -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div class="p-6 flex items-center justify-between border-b border-zinc-800">
            <div>
              <h3 class="text-base font-black tracking-tight">Transaksi Terbaru</h3>
              <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{{ transactions.length }} transaksi terakhir Anda</p>
            </div>
            <NuxtLink to="/transactions">
              <Button variant="outline" size="sm" class="bg-zinc-950 border-zinc-800 text-[10px] font-black uppercase tracking-widest gap-2">
                <Eye class="w-3 h-3" />
                Lihat Semua
              </Button>
            </NuxtLink>
          </div>
          <div class="divide-y divide-zinc-800">
            <div v-if="isLoading" class="p-12 flex justify-center">
              <Loader2 class="w-6 h-6 animate-spin text-zinc-600" />
            </div>
            <div v-else-if="transactions.length === 0" class="p-12 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Belum ada transaksi
            </div>
            <div v-for="item in transactions.slice(0, 5)" :key="item.id" class="p-6 space-y-4 hover:bg-zinc-800/50 transition-colors">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <span :class="`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${item.category_types?.name === 'pemasukan' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`">
                    {{ item.category_types?.name }}
                  </span>
                  <h4 class="text-sm font-black tracking-tight">{{ item.description || 'Tanpa deskripsi' }}</h4>
                  <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{{ item.financial?.name }} • {{ item.category?.name }}</p>
                </div>
                <div class="text-right">
                  <p :class="`text-base font-black tabular-nums tracking-tighter ${item.category_types?.name === 'pemasukan' ? 'text-emerald-400' : 'text-red-500'}`">
                    {{ item.category_types?.name === 'pemasukan' ? '+' : '-' }}Rp {{ formatCurrency(item.amount) }}
                  </p>
                  <p class="text-[10px] text-zinc-500 font-bold mt-1">{{ formatDate(item.date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Kesehatan Keuangan -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <h3 class="text-base font-black tracking-tight">Kesehatan Keuangan</h3>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span class="text-zinc-400">Tingkat Tabungan</span>
                <span class="text-white">{{ savingsRate }}%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-500" :style="{ width: `${savingsRate}%` }" />
              </div>
              <p class="text-[10px] font-bold text-emerald-400">{{ getFinancialStatus(savingsRate).message }}</p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span class="text-zinc-400">Rasio Pengeluaran</span>
                <span class="text-white">{{ expenseRatio }}%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-500" :style="{ width: `${expenseRatio}%` }" />
              </div>
              <p class="text-[10px] font-bold text-emerald-400">{{ getExpenseStatus(expenseRatio).message }}</p>
            </div>
          </div>
        </div>

        <!-- Kategori Teratas -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 class="text-base font-black tracking-tight">Kategori Teratas</h3>
            <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Dikelompokkan berdasarkan tipe transaksi bulan ini</p>
          </div>

          <div class="space-y-6">
            <!-- Pengeluaran -->
            <div class="space-y-3">
              <h4 class="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">PENGELUARAN</h4>
              <div class="space-y-2">
                <div v-for="cat in topExpenseCategories" :key="cat.name" class="flex items-center justify-between group">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span class="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{{ cat.name }}</span>
                  </div>
                  <span class="text-xs font-black tabular-nums text-red-500">Rp {{ formatCurrency(cat.total) }}</span>
                </div>
              </div>
            </div>

            <!-- Pemasukan -->
            <div class="space-y-3">
              <h4 class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">PEMASUKAN</h4>
              <div class="space-y-2">
                <div v-for="cat in topIncomeCategories" :key="cat.name" class="flex items-center justify-between group">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span class="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{{ cat.name }}</span>
                  </div>
                  <span class="text-xs font-black tabular-nums text-emerald-400">Rp {{ formatCurrency(cat.total) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistik Cepat -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 class="text-base font-black tracking-tight">Statistik Cepat</h3>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <p class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Transaksi</p>
              <p class="text-lg font-black text-white">{{ transactions.length }}</p>
            </div>
            <div class="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <p class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Rata-rata Transaksi</p>
              <p class="text-lg font-black text-white">Rp {{ formatCurrency(avgTransaction) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  DollarSign, TrendingUp, TrendingDown, Eye, CreditCard, 
  MoveUpRight, Target, Loader2
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { getFinancials, type FinancialItem } from '~/server/api/public/finance'
import { getAccountingRecords, type AccountingItem } from '~/server/api/public/accounting'

definePageMeta({ layout: 'dashboard' })

const financials = ref<FinancialItem[]>([])
const transactions = ref<AccountingItem[]>([])
const isLoading = ref(true)

// Stats
const totalBalance = computed(() => financials.value.reduce((sum, item) => sum + (item.saldo || 0), 0))

const now = new Date()
const currentMonth = now.getMonth() + 1
const currentYear = now.getFullYear()

const totalIncome = computed(() => {
  return transactions.value
    .filter(r => r.category_types?.name === 'pemasukan')
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalExpense = computed(() => {
  return transactions.value
    .filter(r => r.category_types?.name === 'pengeluaran')
    .reduce((sum, item) => sum + item.amount, 0)
})

const netIncome = computed(() => totalIncome.value - totalExpense.value)

const savingsRate = computed(() => {
  if (totalIncome.value === 0) return 0
  const rate = ((totalIncome.value - totalExpense.value) / totalIncome.value) * 100
  return Math.max(0, Math.round(rate))
})

const expenseRatio = computed(() => {
  if (totalIncome.value === 0) return 0
  const ratio = (totalExpense.value / totalIncome.value) * 100
  return Math.min(100, Math.round(ratio))
})

const avgTransaction = computed(() => {
  if (transactions.value.length === 0) return 0
  return Math.round(transactions.value.reduce((sum, t) => sum + t.amount, 0) / transactions.value.length)
})

// Top Categories
const topExpenseCategories = computed(() => {
  const map = new Map<string, number>()
  transactions.value
    .filter(r => r.category_types?.name === 'pengeluaran')
    .forEach(r => {
      const name = r.category?.name || 'Lainnya'
      map.set(name, (map.get(name) || 0) + r.amount)
    })
  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
})

const topIncomeCategories = computed(() => {
  const map = new Map<string, number>()
  transactions.value
    .filter(r => r.category_types?.name === 'pemasukan')
    .forEach(r => {
      const name = r.category?.name || 'Lainnya'
      map.set(name, (map.get(name) || 0) + r.amount)
    })
  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
})

// Helpers
const formatCurrency = (val: number) => val.toLocaleString('id-ID')
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

const getFinancialStatus = (rate: number) => {
  if (rate >= 50) return { message: 'Sangat baik!', color: 'text-emerald-400' }
  if (rate >= 20) return { message: 'Bagus!', color: 'text-emerald-400' }
  return { message: 'Perlu ditingkatkan', color: 'text-red-500' }
}

const getExpenseStatus = (ratio: number) => {
  if (ratio <= 40) return { message: 'Sangat sehat!', color: 'text-emerald-400' }
  if (ratio <= 70) return { message: 'Wajar', color: 'text-zinc-400' }
  return { message: 'Boros!', color: 'text-red-500' }
}

const fetchData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const [finRes, accRes] = await Promise.all([
      getFinancials(token, 1, 10),
      getAccountingRecords(token, 1, 100, '', currentMonth, currentYear)
    ])
    
    const finResult = await finRes.json()
    const accResult = await accRes.json()

    if (finRes.ok) financials.value = finResult.payload || []
    if (accRes.ok) transactions.value = accResult.payload || []
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchData)

useSeoMeta({
  title: 'Dashboard Keuangan',
  robots: 'noindex, nofollow'
})
</script>
