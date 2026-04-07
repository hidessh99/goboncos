<template>
  <div class="px-4 py-8 sm:px-8 space-y-8 max-w-7xl mx-auto min-h-screen bg-background text-foreground transition-colors duration-500">
    <!-- Header Section for Mobile -->
    <div class="flex flex-col gap-1 md:hidden mb-6">
      <h1 class="text-2xl font-black tracking-tight">Ringkasan Dashboard</h1>
      <p class="text-xs text-muted-foreground font-medium">Pantau aktivitas keuangan Anda secara real-time.</p>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <!-- Total Saldo -->
      <div class="group relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div class="relative space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Total Saldo</span>
            <div class="p-2 bg-secondary rounded-lg">
              <DollarSign class="w-4 h-4 text-primary" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl md:text-3xl font-black tabular-nums tracking-tighter">Rp {{ formatCurrency(totalBalance) }}</h2>
            <p class="text-[10px] text-muted-foreground font-bold mt-1 uppercase">Total dari {{ financials.length }} akun</p>
          </div>
        </div>
      </div>

      <!-- Pemasukan Bulan Ini -->
      <div class="group relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div class="relative space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Pemasukan</span>
            <div class="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp class="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tighter">Rp {{ formatCurrency(totalIncome) }}</h2>
            <div class="flex items-center gap-1 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase">Transaksi Aktif</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pengeluaran Bulan Ini -->
      <div class="group relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div class="relative space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Pengeluaran</span>
            <div class="p-2 bg-red-500/10 rounded-lg">
              <TrendingDown class="w-4 h-4 text-red-500" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 tabular-nums tracking-tighter">Rp {{ formatCurrency(totalExpense) }}</h2>
            <div class="flex items-center gap-1 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span class="text-[10px] text-red-600 dark:text-red-500 font-black uppercase">Pengeluaran Berjalan</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Saldo Bersih -->
      <div class="group relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div class="relative space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Saldo Bersih</span>
            <div class="p-2 bg-blue-500/10 rounded-lg">
              <Target class="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums tracking-tighter">Rp {{ formatCurrency(netIncome) }}</h2>
            <p class="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Tabungan: {{ savingsRate }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- Akun Anda -->
        <div class="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-muted/30">
            <div>
              <h3 class="text-lg font-black tracking-tight">Akun Keuangan</h3>
              <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{{ financials.length }} akun terdaftar aktif</p>
            </div>
            <NuxtLink to="/finance">
              <Button variant="outline" size="sm" class="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest gap-2 h-9 rounded-xl border-border px-4 transition-all hover:bg-primary hover:text-primary-foreground">
                <Eye class="w-3.5 h-3.5" />
                Semua Akun
              </Button>
            </NuxtLink>
          </div>
          <div class="divide-y divide-border">
            <div v-if="isLoading" class="p-12 flex justify-center">
              <Loader2 class="w-8 h-8 animate-spin text-primary/50" />
            </div>
            <div v-else-if="financials.length === 0" class="p-12 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
              Belum ada data akun
            </div>
            <div v-for="item in financials.slice(0, 3)" :key="item.id" class="p-6 flex items-center justify-between hover:bg-muted/50 transition-all cursor-pointer group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary border border-border transition-transform group-hover:scale-110">
                  <CreditCard class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-sm font-black tracking-tight group-hover:text-primary transition-colors text-foreground">{{ item.name }}</h4>
                  <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{{ item.financial_category?.name || 'Tabungan' }}</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-sm font-black tabular-nums text-foreground group-hover:text-primary transition-colors">Rp {{ formatCurrency(item.saldo) }}</span>
                <p class="text-[8px] text-muted-foreground font-bold uppercase tracking-tighter mt-0.5">Saldo Tersedia</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaksi Terbaru -->
        <div class="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-muted/30">
            <div>
              <h3 class="text-lg font-black tracking-tight">Transaksi Terakhir</h3>
              <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Daftar aktivitas terbaru dari semua akun</p>
            </div>
            <NuxtLink to="/transactions">
              <Button variant="outline" size="sm" class="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest gap-2 h-9 rounded-xl border-border px-4 transition-all hover:bg-primary hover:text-primary-foreground">
                <Eye class="w-3.5 h-3.5" />
                Lihat Riwayat
              </Button>
            </NuxtLink>
          </div>
          <div class="divide-y divide-border">
            <div v-if="isLoading" class="p-12 flex justify-center">
              <Loader2 class="w-8 h-8 animate-spin text-primary/50" />
            </div>
            <div v-else-if="transactions.length === 0" class="p-12 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
              Tidak ada transaksi tercatat
            </div>
            <div v-for="item in transactions.slice(0, 5)" :key="item.id" class="p-4 sm:p-6 space-y-4 hover:bg-muted/50 transition-all cursor-pointer group">
              <div class="flex items-start justify-between">
                <div class="flex gap-4">
                  <div :class="`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${item.category_types?.name === 'pemasukan' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-500'}`">
                    <TrendingUp v-if="item.category_types?.name === 'pemasukan'" class="w-5 h-5" />
                    <TrendingDown v-else class="w-5 h-5" />
                  </div>
                  <div class="space-y-1">
                    <div class="flex flex-wrap items-center gap-2">
                       <span :class="`inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${item.category_types?.name === 'pemasukan' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-500'}`">
                        {{ item.category_types?.name }}
                      </span>
                      <span class="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{{ item.category?.name }}</span>
                    </div>
                    <h4 class="text-sm font-black tracking-tight text-foreground">{{ item.description || 'Tanpa deskripsi' }}</h4>
                    <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{{ item.financial?.name }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p :class="`text-sm sm:text-base font-black tabular-nums tracking-tighter ${item.category_types?.name === 'pemasukan' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-500'}`">
                    {{ item.category_types?.name === 'pemasukan' ? '+' : '-' }}Rp {{ formatCurrency(item.amount) }}
                  </p>
                  <p class="text-[9px] text-muted-foreground font-black mt-1 uppercase">{{ formatDate(item.date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Kesehatan Keuangan -->
        <div class="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target class="w-12 h-12 text-primary" />
          </div>
          <h3 class="text-lg font-black tracking-tight relative z-10 text-foreground">Kesehatan Keuangan</h3>
          
          <div class="space-y-6 relative z-10">
            <div class="space-y-3">
              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <span class="text-muted-foreground">Tingkat Tabungan</span>
                <span class="text-foreground bg-secondary px-2 py-0.5 rounded">{{ savingsRate }}%</span>
              </div>
              <div class="h-2.5 bg-secondary rounded-full overflow-hidden p-0.5">
                <div class="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]" :style="{ width: `${savingsRate}%` }" />
              </div>
              <p class="text-[10px] font-black uppercase tracking-wide px-1" :class="getFinancialStatus(savingsRate).color">
                // {{ getFinancialStatus(savingsRate).message }}
              </p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <span class="text-muted-foreground">Rasio Pengeluaran</span>
                <span class="text-foreground bg-secondary px-2 py-0.5 rounded">{{ expenseRatio }}%</span>
              </div>
              <div class="h-2.5 bg-secondary rounded-full overflow-hidden p-0.5">
                <div :class="`h-full rounded-full transition-all duration-1000 ${expenseRatio > 70 ? 'bg-red-500' : 'bg-blue-500'}`" :style="{ width: `${expenseRatio}%` }" />
              </div>
              <p class="text-[10px] font-black uppercase tracking-wide px-1" :class="getExpenseStatus(expenseRatio).color">
                // {{ getExpenseStatus(expenseRatio).message }}
              </p>
            </div>
          </div>
        </div>

        <!-- Kategori Teratas -->
        <div class="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 class="text-lg font-black tracking-tight text-foreground">Distribusi Kategori</h3>
            <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Berdasarkan aktivitas transaksi bulan ini</p>
          </div>

          <div class="space-y-6">
            <!-- Pengeluaran -->
            <div v-if="topExpenseCategories.length > 0" class="space-y-3">
              <h4 class="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-red-500" />
                PENGELUARAN
              </h4>
              <div class="space-y-1">
                <div v-for="cat in topExpenseCategories" :key="cat.name" class="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors group">
                  <span class="text-xs font-bold text-muted-foreground group-hover:text-foreground">{{ cat.name }}</span>
                  <span class="text-xs font-black tabular-nums text-red-600 dark:text-red-500">Rp {{ formatCurrency(cat.total) }}</span>
                </div>
              </div>
            </div>

            <!-- Pemasukan -->
            <div v-if="topIncomeCategories.length > 0" class="space-y-3">
              <h4 class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                PEMASUKAN
              </h4>
              <div class="space-y-1">
                <div v-for="cat in topIncomeCategories" :key="cat.name" class="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors group">
                  <span class="text-xs font-bold text-muted-foreground group-hover:text-foreground">{{ cat.name }}</span>
                  <span class="text-xs font-black tabular-nums text-emerald-600 dark:text-emerald-400">Rp {{ formatCurrency(cat.total) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistik Cepat -->
        <div class="bg-card border border-border rounded-2xl p-6 shadow-sm bg-gradient-to-br from-primary/5 via-transparent to-transparent">
          <h3 class="text-lg font-black tracking-tight text-foreground">Analisa Cepat</h3>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="p-4 bg-muted/50 rounded-2xl border border-border transition-all hover:border-primary/50">
              <p class="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">Total Aktivitas</p>
              <p class="text-2xl font-black text-foreground">{{ transactions.length }}</p>
            </div>
            <div class="p-4 bg-muted/50 rounded-2xl border border-border transition-all hover:border-primary/50">
              <p class="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">Rerata Nilai</p>
              <p class="text-sm font-black text-foreground">Rp {{ formatCurrency(avgTransaction) }}</p>
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
  if (rate >= 50) return { message: 'Sangat baik!', color: 'text-emerald-600 dark:text-emerald-400' }
  if (rate >= 20) return { message: 'Bagus!', color: 'text-emerald-600 dark:text-emerald-400' }
  return { message: 'Perlu ditingkatkan', color: 'text-red-600 dark:text-red-500' }
}

const getExpenseStatus = (ratio: number) => {
  if (ratio <= 40) return { message: 'Sangat sehat!', color: 'text-emerald-600 dark:text-emerald-400' }
  if (ratio <= 70) return { message: 'Wajar', color: 'text-muted-foreground' }
  return { message: 'Boros!', color: 'text-red-600 dark:text-red-500' }
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
