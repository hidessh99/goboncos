<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Daftar Langganan Tenant</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola dan pantau status langganan semua tenant</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Export PDF -->
        <Button 
          variant="outline"
          class="w-11 h-11 p-0 rounded-xl border-gray-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
          title="Export PDF"
          @click="exportToPdf"
        >
          <FileText class="w-5 h-5" />
        </Button>
        <!-- Export Excel -->
        <Button 
          variant="outline"
          class="w-11 h-11 p-0 rounded-xl border-gray-200 dark:border-zinc-800 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors shadow-sm"
          title="Export Excel"
          @click="exportToExcel"
        >
          <FileSpreadsheet class="w-5 h-5" />
        </Button>

        <Button 
          variant="outline"
          class="gap-2 h-11 px-5 rounded-xl border-gray-200 dark:border-zinc-800 text-sm font-medium ml-1"
          @click="fetchSubscriptions"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
          <Zap v-else class="w-4 h-4" />
          Refresh
        </Button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-subscription"
          v-model="searchQuery"
          placeholder="Cari email atau nama..." 
          class="pl-9 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all font-medium"
        />
      </div>
    </div>

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      <!-- Table Section (Desktop) -->
      <div class="px-4 pb-4 overflow-x-auto hidden md:block">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 mt-4">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   <div class="ml-2">Pelanggan</div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Plan
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Role
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Masa Aktif
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Status
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="isLoading">
                <TableCell colspan="6" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data langganan...</p>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="subscriptions.length === 0">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Zap class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tidak ada data langganan ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow 
                v-else 
                v-for="sub in subscriptions" 
                :key="sub.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors" 
                @click="openSubDetail(sub)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(sub.auth?.Name)}`">
                      {{ (sub.auth?.Name || 'U').charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 truncate">{{ sub.auth?.Name }}</span>
                      <span class="text-[11px] text-gray-400 truncate">{{ sub.auth?.Email }}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-indigo-600 dark:text-indigo-400 py-2.5 font-bold">
                  {{ sub.subscription_plan?.name }}
                </TableCell>
                <TableCell class="py-2.5 text-center">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {{ sub.auth?.Role || 'USER' }}
                  </span>
                </TableCell>
                <TableCell class="text-[12px] text-gray-500 dark:text-zinc-400 py-2.5">
                   <div class="flex flex-col">
                      <span class="font-medium">{{ formatDate(sub.start_date) }}</span>
                      <span class="text-[10px] text-gray-400">s/d {{ formatDate(sub.end_date) }}</span>
                   </div>
                </TableCell>
                <TableCell class="py-2.5 text-center">
                  <span :class="`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${sub.status.toUpperCase() === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-50 text-red-600 dark:bg-red-900/30'}`">
                    {{ sub.status }}
                  </span>
                </TableCell>
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5" @click.stop>
                    <button @click="openSubDetail(sub)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <!-- Icon Status Ganti -->
                    <button 
                      @click="confirmStatusChange(sub)" 
                      :class="`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${sub.status.toUpperCase() === 'ACTIVE' ? 'text-amber-500 hover:bg-amber-50 hover:text-amber-600' : 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600'}`"
                      :title="sub.status.toUpperCase() === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'"
                    >
                      <Power class="w-[15px] h-[15px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <!-- Card Section (Mobile) -->
      <div class="px-4 py-4 md:hidden flex flex-col gap-4">
        <div v-if="isLoading" class="py-12 text-center text-zinc-500">
           <Loader2 class="w-8 h-8 animate-spin mx-auto text-indigo-500" />
           <p class="mt-2 text-sm font-medium">Memuat data...</p>
        </div>
        <div v-else-if="subscriptions.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Zap class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Tidak ada data langganan.</p>
        </div>
        <div 
          v-else 
          v-for="sub in subscriptions" 
          :key="sub.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative"
          @click="openSubDetail(sub)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3 text-left">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(sub.auth?.Name)}`">
                {{ (sub.auth?.Name || 'U').charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[13px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ sub.auth?.Name }}</h4>
                <p class="text-[11px] text-gray-400 mt-0.5 truncate">{{ sub.auth?.Email }}</p>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1.5 absolute top-4 right-4">
              <span :class="`inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${sub.status.toUpperCase() === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-50 text-red-600 dark:bg-red-900/30'}`">
                {{ sub.status }}
              </span>
              <span class="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800/50">
                {{ sub.subscription_plan?.name }}
              </span>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2 pt-4 border-t border-gray-50 dark:border-zinc-800/60 text-left">
             <div class="flex items-center justify-between">
               <span class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Masa Berlaku</span>
               <span class="text-[11px] font-bold text-gray-700 dark:text-zinc-300 font-mono">{{ formatDate(sub.end_date) }}</span>
             </div>
             <div class="flex gap-2 mt-2" @click.stop>
                <Button 
                  size="sm"
                  variant="outline"
                  class="flex-1 py-4 text-[10px] uppercase font-black tracking-widest gap-2 bg-indigo-50/50 border-indigo-100 text-indigo-600"
                  @click="openSubDetail(sub)"
                >
                  <Eye class="w-3 h-3" />
                  Detail
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  :class="`flex-1 py-4 text-[10px] uppercase font-black tracking-widest gap-2 ${sub.status.toUpperCase() === 'ACTIVE' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`"
                  @click="confirmStatusChange(sub)"
                >
                  <Power class="w-3 h-3" />
                  Status
                </Button>
             </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">Sebelumnya</button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">Selanjutnya</button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-zinc-300">Halaman <span class="font-bold">{{ currentPage }}</span> dari <span class="font-bold">{{ totalPages }}</span></p>
          </div>
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Sebelumnya</button>
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-0 overflow-hidden outline-none shadow-2xl border-none">
        <div v-if="selectedSub" class="p-8 space-y-8">
          <div class="flex flex-col items-center text-center space-y-4">
            <div :class="`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-6 shrink-0 ${getAvatarColor(selectedSub.auth?.Name)}`">
              {{ (selectedSub.auth?.Name || 'U').charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-1">
              <h3 class="text-xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">{{ selectedSub.auth?.Name }}</h3>
              <p class="text-indigo-600 font-bold text-sm tracking-wide">{{ selectedSub.auth?.Email }}</p>
            </div>
            <span :class="`inline-flex items-center px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${selectedSub.status.toUpperCase() === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 shadow-sm border border-emerald-100/50' : 'bg-red-50 text-red-600 dark:bg-red-900/30 shadow-sm border border-red-100/50'}`">
              {{ selectedSub.status }}
            </span>
          </div>
          
          <div class="grid grid-cols-1 gap-3">
             <div class="p-5 rounded-3xl bg-indigo-50/40 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 flex flex-col gap-1 text-left">
              <span class="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-[0.2em] block">Paket Langganan</span>
              <p class="text-sm font-black text-indigo-600 dark:text-indigo-400">{{ selectedSub.subscription_plan?.name }}</p>
            </div>
            <div class="p-5 rounded-3xl bg-gray-50/80 dark:bg-zinc-800/30 border border-gray-100/50 dark:border-zinc-800/50 flex flex-col gap-1 text-left">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block">ID Subscription</span>
              <p class="text-xs font-mono font-bold text-gray-700 dark:text-zinc-300 break-all select-all">{{ selectedSub.id }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-5 rounded-3xl bg-gray-50/80 dark:bg-zinc-800/30 border border-gray-100/50 dark:border-zinc-800/50 text-left">
                <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Mulai</span>
                <p class="text-[12px] font-black mt-1 text-gray-700 dark:text-zinc-200">{{ formatDate(selectedSub.start_date) }}</p>
              </div>
              <div class="p-5 rounded-3xl bg-gray-50/80 dark:bg-zinc-800/30 border border-gray-100/50 dark:border-zinc-800/50 text-left">
                <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Hingga</span>
                <p class="text-[12px] font-black mt-1 text-emerald-600">{{ formatDate(selectedSub.end_date) }}</p>
              </div>
            </div>
             <div class="p-5 rounded-3xl bg-gray-50/80 dark:bg-zinc-800/30 border border-gray-100/50 dark:border-zinc-800/50 flex flex-col gap-1 text-left">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block">User ID</span>
              <p class="text-xs font-mono font-bold text-gray-700 dark:text-zinc-300 break-all select-all">{{ selectedSub.auth?.ID }}</p>
            </div>
          </div>

          <div class="flex gap-3">
             <Button variant="outline" class="flex-1 py-7 rounded-3xl font-black text-xs uppercase tracking-widest text-gray-500" @click="isDetailModalOpen = false">Tutup</Button>
             <Button 
                :class="`flex-1 py-7 rounded-3xl font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-indigo-500/10 ${selectedSub.status.toUpperCase() === 'ACTIVE' ? 'bg-amber-400 hover:bg-amber-500 shadow-amber-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}`" 
                @click="confirmStatusChange(selectedSub)"
             >
                {{ selectedSub.status.toUpperCase() === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan' }}
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Status Change Alert -->
    <AlertDialog :open="isStatusModalOpen" @update:open="isStatusModalOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6">
          <div :class="`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner ${selectedSubStatus === 'ACTIVE' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`">
             <Power class="w-10 h-10" />
          </div>
          <div class="space-y-2 text-center">
            <AlertDialogTitle class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
               {{ selectedSubStatus === 'ACTIVE' ? 'Nonaktifkan Langganan?' : 'Aktifkan Langganan?' }}
            </AlertDialogTitle>
            <AlertDialogDescription class="text-[13px] font-medium text-gray-500 leading-relaxed px-2">
              Status langganan ini akan diubah menjadi <span class="font-bold underline uppercase">{{ selectedSubStatus === 'ACTIVE' ? 'inactive' : 'active' }}</span>.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-xs uppercase tracking-widest bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeStatusChange" 
            :class="`flex-1 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl transition-all ${selectedSubStatus === 'ACTIVE' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}`"
          >
            Ya, Ubah Status
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, Eye, Loader2, Zap, FileText, FileSpreadsheet, Power
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getSubscriptions, updateSubscriptionStatus, type SubscriptionItem } from '@/server/api/admin/subscription'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Admin - Pengelolaan Langganan ',
  robots: 'noindex, nofollow'
})


const subscriptions = ref<SubscriptionItem[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedSub = ref<SubscriptionItem | null>(null)

// Status Change State
const isStatusModalOpen = ref(false)
const selectedSubId = ref<string | null>(null)
const selectedSubStatus = ref<string>('')

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-blue-500 to-sky-600',
  'bg-gradient-to-br from-pink-500 to-rose-600',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
]
function getAvatarColor(name?: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// ─── Data Fetching ────────────────────────────────────────────────────────
const fetchSubscriptions = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getSubscriptions(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      subscriptions.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchSubscriptions()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchSubscriptions() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchSubscriptions() } }

// ─── Export Handlers ────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (subscriptions.value.length === 0) {
    alertError('Tidak ada data untuk diexport.')
    return
  }

  alertInfo('Menyiapkan dokumen PDF...')
  
  try {
    const doc = new jsPDF()
    const tableData = subscriptions.value.map(sub => [
      sub.auth?.Name || '-',
      sub.auth?.Email || '-',
      sub.subscription_plan?.name || '-',
      formatDate(sub.start_date),
      formatDate(sub.end_date),
      sub.status
    ])

    autoTable(doc, {
      head: [['Nama Pelanggan', 'Email', 'Plan', 'Mulai', 'Selesai', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo 600
      styles: { fontSize: 8 }
    })

    doc.save(`langganan-tenant-${new Date().getTime()}.pdf`)
    alertSuccess('PDF berhasil didownload.')
  } catch (err) {
    console.error('PDF Export Error:', err)
    alertError('Gagal membuat PDF. Cek konsol untuk detail.')
  }
}

const exportToExcel = () => {
  if (subscriptions.value.length === 0) {
    alertError('Tidak ada data untuk diexport.')
    return
  }

  alertInfo('Menyiapkan file Excel...')
  
  try {
    const flatData = subscriptions.value.map(sub => ({
      'Nama Pelanggan': sub.auth?.Name || '-',
      'Email': sub.auth?.Email || '-',
      'Plan': sub.subscription_plan?.name || '-',
      'Mulai': formatDate(sub.start_date),
      'Selesai': formatDate(sub.end_date),
      'Status': sub.status
    }))

    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscriptions')
    
    XLSX.writeFile(workbook, `langganan-tenant-${new Date().getTime()}.xlsx`)
    alertSuccess('Excel berhasil didownload.')
  } catch (err) {
    console.error('Excel Export Error:', err)
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Handlers ───────────────────────────────────────────────────────────────
const openSubDetail = (sub: SubscriptionItem) => {
  selectedSub.value = sub
  isDetailModalOpen.value = true
}

const confirmStatusChange = (sub: SubscriptionItem) => {
  selectedSubId.value = sub.id
  selectedSubStatus.value = sub.status.toUpperCase()
  isStatusModalOpen.value = true
}

const executeStatusChange = async () => {
  if (!selectedSubId.value) return
  
  const newStatus = selectedSubStatus.value === 'ACTIVE' ? 'inactive' : 'active'
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await updateSubscriptionStatus(selectedSubId.value, newStatus, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      alertSuccess(`Status langganan diubah menjadi ${newStatus}.`)
      isStatusModalOpen.value = false
      isDetailModalOpen.value = false
      fetchSubscriptions()
    } else {
      alertError(result.message || 'Gagal mengubah status.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isStatusModalOpen.value = false
  }
}

onMounted(() => fetchSubscriptions())
</script>
