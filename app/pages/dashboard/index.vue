<template>
  <div class="p-4 sm:p-6 space-y-6 min-h-full">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-zinc-500 mt-0.5">Selamat datang kembali, GoKasir Admin 👋</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" class="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white text-xs gap-1.5 h-8">
          <CalendarDays class="w-3.5 h-3.5" />
          Maret 2026
        </Button>
        <Button size="sm" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs gap-1.5 h-8">
          <Download class="w-3.5 h-3.5" />
          Unduh Laporan
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Pendapatan -->
      <div class="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/60 rounded-xl p-4 hover:border-gray-300 dark:hover:border-zinc-700/60 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-xs text-gray-500 dark:text-zinc-500 font-medium">Total Pendapatan</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 24,5Jt</p>
            <div class="flex items-center gap-1 mt-1.5">
              <TrendingUp class="w-3 h-3 text-emerald-400" />
              <span class="text-xs font-medium text-emerald-400">+12.5%</span>
              <span class="text-xs text-gray-400 dark:text-zinc-600">vs bulan lalu</span>
            </div>
          </div>
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <DollarSign class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Pesanan -->
      <div class="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/60 rounded-xl p-4 hover:border-gray-300 dark:hover:border-zinc-700/60 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-xs text-gray-500 dark:text-zinc-500 font-medium">Total Pesanan</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">1,284</p>
            <div class="flex items-center gap-1 mt-1.5">
              <TrendingUp class="w-3 h-3 text-emerald-400" />
              <span class="text-xs font-medium text-emerald-400">+8.2%</span>
              <span class="text-xs text-gray-400 dark:text-zinc-600">vs bulan lalu</span>
            </div>
          </div>
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
            <ShoppingCart class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Pelanggan -->
      <div class="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/60 rounded-xl p-4 hover:border-gray-300 dark:hover:border-zinc-700/60 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-xs text-gray-500 dark:text-zinc-500 font-medium">Pelanggan Aktif</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">342</p>
            <div class="flex items-center gap-1 mt-1.5">
              <TrendingDown class="w-3 h-3 text-red-400" />
              <span class="text-xs font-medium text-red-400">-3.1%</span>
              <span class="text-xs text-gray-400 dark:text-zinc-600">vs bulan lalu</span>
            </div>
          </div>
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
            <Users class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Menu -->
      <div class="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/60 rounded-xl p-4 hover:border-gray-300 dark:hover:border-zinc-700/60 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-xs text-gray-500 dark:text-zinc-500 font-medium">Menu Tersedia</p>
            <p class="mt-1.5 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">56</p>
            <div class="flex items-center gap-1 mt-1.5">
              <TrendingUp class="w-3 h-3 text-emerald-400" />
              <span class="text-xs font-medium text-emerald-400">+2</span>
              <span class="text-xs text-gray-400 dark:text-zinc-600">item baru</span>
            </div>
          </div>
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <UtensilsCrossed class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <!-- Revenue Bar Chart -->
      <Card class="xl:col-span-2 bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800/60">
        <CardHeader class="pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <CardTitle class="text-sm font-semibold text-gray-900 dark:text-white">Pendapatan Bulanan</CardTitle>
            <CardDescription class="text-xs text-gray-500 dark:text-zinc-500">Tren pendapatan 6 bulan terakhir</CardDescription>
          </div>
          <Tabs v-model="revenueTab" class="w-auto">
            <TabsList class="h-7 bg-gray-100 dark:bg-zinc-800/60 text-xs border-0">
              <TabsTrigger value="revenue" class="text-xs h-6 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-400 dark:text-zinc-400">Pendapatan</TabsTrigger>
              <TabsTrigger value="orders" class="text-xs h-6 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-400 dark:text-zinc-400">Pesanan</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="h-56 sm:h-64 w-full">
            <svg viewBox="0 0 500 200" class="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6366f1" />
                  <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.7" />
                </linearGradient>
                <linearGradient id="barGradOrder" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8b5cf6" />
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0.7" />
                </linearGradient>
              </defs>
              <!-- Grid lines -->
              <line x1="40" y1="10" x2="490" y2="10" stroke="#27272a" stroke-width="1" />
              <line x1="40" y1="52.5" x2="490" y2="52.5" stroke="#27272a" stroke-width="1" />
              <line x1="40" y1="95" x2="490" y2="95" stroke="#27272a" stroke-width="1" />
              <line x1="40" y1="137.5" x2="490" y2="137.5" stroke="#27272a" stroke-width="1" />
              <!-- Bars for revenue -->
              <template v-if="revenueTab === 'revenue'">
                <rect x="75"  y="90"  width="35" height="80"  rx="4" fill="url(#barGrad)" />
                <rect x="148" y="61"  width="35" height="109" rx="4" fill="url(#barGrad)" />
                <rect x="221" y="80"  width="35" height="90"  rx="4" fill="url(#barGrad)" />
                <rect x="294" y="34"  width="35" height="136" rx="4" fill="url(#barGrad)" />
                <rect x="367" y="44"  width="35" height="126" rx="4" fill="url(#barGrad)" />
                <rect x="440" y="10"  width="35" height="160" rx="4" fill="url(#barGrad)" />
              </template>
              <template v-else>
                <rect x="75"  y="106" width="35" height="64"  rx="4" fill="url(#barGradOrder)" />
                <rect x="148" y="72"  width="35" height="98"  rx="4" fill="url(#barGradOrder)" />
                <rect x="221" y="88"  width="35" height="82"  rx="4" fill="url(#barGradOrder)" />
                <rect x="294" y="50"  width="35" height="120" rx="4" fill="url(#barGradOrder)" />
                <rect x="367" y="62"  width="35" height="108" rx="4" fill="url(#barGradOrder)" />
                <rect x="440" y="20"  width="35" height="150" rx="4" fill="url(#barGradOrder)" />
              </template>
              <!-- Labels -->
              <text x="92"  y="185" text-anchor="middle" fill="#52525b" font-size="10">Okt</text>
              <text x="165" y="185" text-anchor="middle" fill="#52525b" font-size="10">Nov</text>
              <text x="238" y="185" text-anchor="middle" fill="#52525b" font-size="10">Des</text>
              <text x="311" y="185" text-anchor="middle" fill="#52525b" font-size="10">Jan</text>
              <text x="384" y="185" text-anchor="middle" fill="#52525b" font-size="10">Feb</text>
              <text x="457" y="185" text-anchor="middle" fill="#52525b" font-size="10">Mar</text>
              <!-- Y-axis labels -->
              <text x="36" y="14"   text-anchor="end" fill="#52525b" font-size="9">30</text>
              <text x="36" y="56"   text-anchor="end" fill="#52525b" font-size="9">22</text>
              <text x="36" y="99"   text-anchor="end" fill="#52525b" font-size="9">15</text>
              <text x="36" y="141"  text-anchor="end" fill="#52525b" font-size="9">7</text>
            </svg>
          </div>
        </CardContent>
      </Card>

      <!-- Top Menu Donut -->
      <Card class="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800/60">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-semibold text-gray-900 dark:text-white">Menu Terlaris</CardTitle>
          <CardDescription class="text-xs text-gray-500 dark:text-zinc-500">Bulan ini</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col items-center gap-4 pt-0">
          <div class="h-40 w-40 relative">
            <svg viewBox="0 0 160 160" class="w-full h-full -rotate-90">
              <!-- Donut segments using stroke-dasharray trick -->
              <circle cx="80" cy="80" r="60" fill="none" stroke="#6366f1" stroke-width="24"
                stroke-dasharray="128.2 248.8" stroke-dashoffset="0" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#8b5cf6" stroke-width="24"
                stroke-dasharray="90.5 287.1" stroke-dashoffset="-128.2" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#ec4899" stroke-width="24"
                stroke-dasharray="67.9 309.7" stroke-dashoffset="-218.7" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f59e0b" stroke-width="24"
                stroke-dasharray="52.8 324.9" stroke-dashoffset="-286.6" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" stroke-width="24"
                stroke-dasharray="37.7 339.9" stroke-dashoffset="-339.4" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span class="text-xl font-bold text-white">1.2K</span>
              <span class="text-[10px] text-zinc-500">terjual</span>
            </div>
          </div>
          <div class="w-full space-y-2">
            <div v-for="(item, i) in topMenus" :key="item.name" class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: chartColors[i] }" />
              <span class="text-xs text-zinc-400 flex-1 truncate">{{ item.name }}</span>
              <span class="text-xs font-medium text-white">{{ item.pct }}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Orders + Activity -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <!-- Recent Orders Table -->
      <Card class="xl:col-span-2 bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800/60">
        <CardHeader class="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle class="text-sm font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</CardTitle>
            <CardDescription class="text-xs text-gray-500 dark:text-zinc-500">{{ recentOrders.length }} pesanan hari ini</CardDescription>
          </div>
          <Button variant="ghost" size="sm" class="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-zinc-800 h-7 px-2 self-start sm:self-auto gap-1">
            Lihat semua <ArrowRight class="w-3 h-3" />
          </Button>
        </CardHeader>
        <CardContent class="pt-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow class="border-gray-100 dark:border-zinc-800/60 hover:bg-transparent">
                <TableHead class="text-xs text-gray-400 dark:text-zinc-500 font-medium py-2 h-auto">ID Pesanan</TableHead>
                <TableHead class="text-xs text-gray-400 dark:text-zinc-500 font-medium py-2 h-auto">Pelanggan</TableHead>
                <TableHead class="text-xs text-gray-400 dark:text-zinc-500 font-medium py-2 h-auto hidden sm:table-cell">Item</TableHead>
                <TableHead class="text-xs text-gray-400 dark:text-zinc-500 font-medium py-2 h-auto">Total</TableHead>
                <TableHead class="text-xs text-gray-400 dark:text-zinc-500 font-medium py-2 h-auto">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="order in recentOrders"
                :key="order.id"
                class="border-gray-100 dark:border-zinc-800/40 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <TableCell class="text-xs text-gray-400 dark:text-zinc-400 py-3 font-mono">#{{ order.id }}</TableCell>
                <TableCell class="py-3">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {{ order.customer[0] }}
                    </div>
                    <span class="text-xs text-gray-900 dark:text-white font-medium truncate max-w-[100px]">{{ order.customer }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-xs text-gray-400 dark:text-zinc-400 py-3 hidden sm:table-cell">{{ order.items }}</TableCell>
                <TableCell class="text-xs text-gray-900 dark:text-white font-medium py-3 whitespace-nowrap">{{ order.total }}</TableCell>
                <TableCell class="py-3">
                  <span :class="[
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                    order.status === 'Selesai' ? 'bg-emerald-500/15 text-emerald-400' :
                    order.status === 'Proses' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-red-500/15 text-red-400'
                  ]">
                    {{ order.status }}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <!-- Activity Feed -->
      <Card class="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800/60">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-semibold text-gray-900 dark:text-white">Aktivitas Terkini</CardTitle>
          <CardDescription class="text-xs text-gray-500 dark:text-zinc-500">Real-time activity</CardDescription>
        </CardHeader>
        <CardContent class="pt-0">
          <ScrollArea class="h-72">
            <div class="relative pl-6">
              <!-- Timeline vertical line -->
              <div class="absolute left-2.5 top-1 bottom-4 w-px bg-gray-200 dark:bg-zinc-800" />
              <div v-for="(act, i) in activities" :key="i" class="flex gap-3 pb-5 relative">
                <!-- Dot -->
                <div :class="[
                  'absolute -left-0.5 top-0.5 w-5 h-5 rounded-full flex items-center justify-center',
                  act.type === 'order' ? 'bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 ring-1 ring-indigo-500/30' :
                  act.type === 'payment' ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 ring-1 ring-emerald-500/30' :
                  'bg-amber-500/20 text-amber-500 dark:text-amber-400 ring-1 ring-amber-500/30'
                ]">
                  <component :is="act.icon" class="w-2.5 h-2.5" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-900 dark:text-white font-medium leading-tight">{{ act.title }}</p>
                  <p class="text-[11px] text-gray-400 dark:text-zinc-600 mt-0.5">{{ act.time }}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  CalendarDays, Download, TrendingUp, TrendingDown, ArrowRight,
  ShoppingCart, DollarSign, Users, UtensilsCrossed, CreditCard, AlertTriangle
} from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: 'Dashboard',
  ogTitle: 'Dashboard',
  description: `Pantau performa bisnis Anda secara real-time di dashboard ${appName}. Lihat total pendapatan, pesanan terbaru, menu terlaris, dan analitik lengkap untuk mengoptimalkan operasional UMKM Anda.`,
  ogDescription: `Kelola transaksi, pantau pendapatan, dan analisis laporan bisnis Anda secara real-time melalui dashboard ${appName}.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Dashboard - ${appName} | Pusat Kendali Bisnis`,
  twitterDescription: `Kelola bisnis UMKM Anda lebih efisien dengan dashboard ${appName}. Pantau penjualan, stok, dan laporan keuangan dalam satu tempat.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'keywords', content: `dashboard gokasir, manajemen kasir, laporan penjualan, pos umkm, aplikasi kasir online, ${appName.toLowerCase()} dashboard, analitik bisnis, manajemen transaksi` },
    { name: 'author', content: 'GoKasir Team' },
    { name: 'application-name', content: appName },
    { name: 'theme-color', content: '#09090b' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName },
  ]
})

const revenueTab = ref('revenue')
const chartColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

const topMenus = [
  { name: 'Nasi Goreng Special', pct: 34 },
  { name: 'Ayam Bakar', pct: 24 },
  { name: 'Mie Goreng', pct: 18 },
  { name: 'Es Teh Manis', pct: 14 },
  { name: 'Lainnya', pct: 10 },
]

const recentOrders = [
  { id: '1024', customer: 'Budi Santoso', items: '3 item', total: 'Rp 87.000', status: 'Selesai' },
  { id: '1023', customer: 'Siti Rahayu', items: '1 item', total: 'Rp 25.000', status: 'Selesai' },
  { id: '1022', customer: 'Ahmad Fauzi', items: '5 item', total: 'Rp 145.000', status: 'Proses' },
  { id: '1021', customer: 'Dewi Kusuma', items: '2 item', total: 'Rp 63.000', status: 'Proses' },
  { id: '1020', customer: 'Rudi Hartono', items: '4 item', total: 'Rp 112.000', status: 'Batal' },
]

const activities = [
  { type: 'order', icon: ShoppingCart, title: 'Pesanan #1024 masuk — Meja 5', time: '2 menit lalu' },
  { type: 'payment', icon: CreditCard, title: 'Pembayaran #1023 berhasil — Rp 25.000', time: '15 menit lalu' },
  { type: 'alert', icon: AlertTriangle, title: 'Menu "Ayam Bakar" hampir habis', time: '34 menit lalu' },
  { type: 'order', icon: ShoppingCart, title: 'Pesanan #1022 masuk — Meja 2', time: '1 jam lalu' },
  { type: 'payment', icon: CreditCard, title: 'Pembayaran #1021 QRIS — Rp 63.000', time: '1.5 jam lalu' },
  { type: 'order', icon: ShoppingCart, title: 'Pesanan #1020 dibatalkan', time: '2 jam lalu' },
  { type: 'payment', icon: CreditCard, title: 'Pembayaran #1019 tunai — Rp 112.000', time: '3 jam lalu' },
]
</script>
