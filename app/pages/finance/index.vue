<template>
  <div class="px-4 py-8 sm:px-8 space-y-10 max-w-7xl mx-auto">
    <!-- Header: Refined Reference Style -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
          Pencatatan <span class="text-blue-600">Keuangan</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Kelola saldo aset, tabungan, dan inventaris finansial Anda secara terpadu.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <!-- Export Actions: Stylish & Compact -->
        <div class="flex items-center gap-2 mr-2">
          <Button 
            variant="outline"
            class="w-12 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-red-500 hover:bg-red-50/50 transition-all duration-300 shadow-sm"
            title="Export PDF"
            @click="exportToPdf"
          >
            <FileText class="w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            class="w-12 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-blue-600 hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
            title="Export Excel"
            @click="exportToExcel"
          >
            <FileSpreadsheet class="w-5 h-5" />
          </Button>
        </div>

        <Button 
          id="btn-tambah-aset"
          class="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all gap-3"
          @click="openCreateModal"
        >
          <Plus class="w-5 h-5" />
          Tambah Aset
        </Button>
      </div>
    </header>

    <!-- Toolbar: Search (Inspired by Admin Layout) -->
    <section class="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
      <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-4 shadow-xl shadow-blue-500/5">
        <div class="relative">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            v-model="searchQuery"
            placeholder="Cari aset atau kategori..." 
            class="w-full h-14 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 placeholder:text-zinc-400 placeholder:font-medium"
          />
        </div>
      </div>
    </section>

    <!-- Content Area: Responsive Match -->
    <main class="space-y-6">
      <!-- Desktop Performance Table -->
      <div class="hidden md:block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 px-8 flex items-center gap-2">
                 Nama Aset
                 <ChevronsUpDown class="w-3 h-3 opacity-30" />
              </TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Kategori</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Saldo</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Tanggal</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading">
              <TableCell colspan="5" class="h-64 text-center">
                <Loader2 class="w-10 h-10 animate-spin mx-auto text-blue-600 opacity-20" />
              </TableCell>
            </TableRow>
            <TableRow v-else-if="financials.length === 0">
              <TableCell colspan="5" class="h-64 text-center">
                <div class="flex flex-col items-center gap-4 grayscale opacity-40">
                  <Grid2X2 class="w-12 h-12 text-zinc-400" />
                  <p class="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Data Tidak Ditemukan</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow 
              v-else 
              v-for="item in financials" 
              :key="item.id" 
              class="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-all duration-300 group" 
              @click="openDetailModal(item)"
            >
              <TableCell class="py-6 px-8">
                <div class="flex items-center gap-4">
                  <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg ${getAvatarColor(item.name)}`">
                    {{ item.name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-[15px] font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors leading-none">{{ item.name }}</span>
                </div>
              </TableCell>
              <TableCell class="py-6">
                <span class="inline-flex items-center h-7 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50">
                  {{ item.financial_category?.name || 'UMUM' }}
                </span>
              </TableCell>
              <TableCell class="py-6 font-black text-zinc-900 dark:text-white tabular-nums">
                Rp {{ formatCurrency(item.saldo) }}
              </TableCell>
              <TableCell class="py-6 text-[13px] font-bold text-zinc-400 dark:text-zinc-500">
                {{ formatDate(item.created_at) }}
              </TableCell>
              <TableCell class="py-6 text-center pr-8">
                <div class="flex items-center justify-center gap-2" @click.stop>
                  <button @click="openDetailModal(item)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 transition-all">
                    <Eye class="w-5 h-5" />
                  </button>
                  <button @click="openEditModal(item)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 transition-all">
                    <Pencil class="w-5 h-5" />
                  </button>
                  <button @click="confirmDelete(item.id)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Mobile/Tablet Interactive Grid -->
      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-700 delay-200">
        <div 
          v-for="item in financials" 
          :key="item.id"
          class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/5 active:scale-[0.98] transition-all space-y-6 relative overflow-hidden group"
          @click="openDetailModal(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div :class="`w-14 h-14 rounded-3xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-xl ${getAvatarColor(item.name)}`">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h4 class="text-[17px] font-black text-zinc-900 dark:text-white truncate leading-tight tracking-tight uppercase">{{ item.name }}</h4>
                <p class="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase mt-1 tracking-widest">{{ item.financial_category?.name }}</p>
              </div>
            </div>
            <button class="w-12 h-12 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
               <Eye class="w-5 h-5" />
            </button>
          </div>

          <div class="bg-zinc-50 dark:bg-zinc-800/40 rounded-[1.5rem] p-5 flex flex-col items-center border border-zinc-100 dark:border-zinc-800/50">
             <span class="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Total Saldo</span>
             <h3 class="text-xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter antialiased">Rp {{ formatCurrency(item.saldo) }}</h3>
          </div>

          <div class="flex gap-3 pt-6 border-t border-zinc-50 dark:border-zinc-800/60" @click.stop>
             <Button 
              variant="outline" 
              class="flex-1 h-12 rounded-2xl border-amber-100 dark:border-amber-900/30 text-amber-600 text-[10px] font-black uppercase tracking-widest gap-2" 
              @click="openEditModal(item)"
             >
               <Pencil class="w-4 h-4" />
               Edit
             </Button>
             <Button 
              variant="outline" 
              class="flex-1 h-12 rounded-2xl border-red-100 dark:border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest gap-2" 
              @click="confirmDelete(item.id)"
             >
               <Trash2 class="w-4 h-4" />
               Hapus
             </Button>
          </div>
        </div>
      </div>

      <!-- Pagination Hub -->
      <footer class="flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
        <div class="flex items-center gap-3">
           <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-500/20">
              {{ currentPage }}
           </div>
           <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest">
              Halaman {{ currentPage }} <span class="mx-2 opacity-30">dari</span> {{ totalPages }}
           </p>
        </div>

        <div class="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            class="flex-1 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-zinc-50"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Sebelumnya
          </Button>
          <Button 
            variant="outline" 
            class="flex-1 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-zinc-50"
            :disabled="currentPage >= totalPages"
            @click="nextPage"
          >
            Selanjutnya
          </Button>
        </div>
      </footer>
    </main>

    <!-- Dialogs: High-Quality Detail & Form -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Rincian detail aset keuangan yang Anda pilih.</DialogDescription>
        <div v-if="selectedFinancial" class="p-10 space-y-8">
          <div class="flex flex-col items-center text-center space-y-6">
            <div :class="`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedFinancial.name)}`">
              {{ selectedFinancial.name.charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedFinancial.name }}</h3>
              <div class="inline-flex h-8 px-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] items-center">
                 {{ selectedFinancial.financial_category?.name }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4 text-left">
             <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 flex flex-col items-center">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Informasi Saldo</span>
              <p class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter antialiased">Rp {{ formatCurrency(selectedFinancial.saldo) }}</p>
            </div>
            <div v-if="selectedFinancial.description" class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Catatan/Keterangan</span>
              <p class="text-[13px] font-bold text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ selectedFinancial.description }}</p>
            </div>
            <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center px-8">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Input Terakhir</span>
              <p class="text-[13px] font-bold text-zinc-600 dark:text-zinc-300">{{ formatDate(selectedFinancial.created_at) }}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            class="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:text-blue-600 transition-all" 
            @click="isDetailModalOpen = false"
          >
            Tutup Informasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-lg bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Formulir untuk memperbarui atau mendaftarkan aset keuangan baru ke dalam sistem.</DialogDescription>
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center gap-6 p-10 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 backdrop-blur-xl z-20">
            <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl ${isEditing ? 'bg-amber-500' : 'bg-blue-600'}`">
              <Pencil v-if="isEditing" class="w-8 h-8" />
              <Plus v-else class="w-8 h-8" />
            </div>
            <div class="text-left">
              <DialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                {{ isEditing ? 'Edit' : 'Tambah' }} <span class="text-blue-600">Aset</span>
              </DialogTitle>
              <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1">Sistem Pencatatan Finansial</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-10 space-y-8">
            <div class="space-y-6 text-left">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nama Aset <span class="text-blue-600">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Contoh: Tabungan Utama, Kas Kecil, dll" 
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Kategori <span class="text-blue-600">*</span></label>
                    <div class="relative">
                      <select 
                        v-model="form.financial_category_id" 
                        class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 outline-none appearance-none cursor-pointer" 
                        required
                      >
                         <option value="" disabled>Pilih Kategori...</option>
                         <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                      </select>
                      <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                    </div>
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Saldo Awal <span class="text-blue-600">*</span></label>
                    <input 
                      v-model="formattedSaldo" 
                      type="text" 
                      placeholder="0" 
                      class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                      required
                    />
                 </div>
              </div>

              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Deskripsi Opsional</label>
                <textarea 
                  v-model="form.description" 
                  rows="3" 
                  placeholder="Keterangan tambahan mengenai aset ini..." 
                  class="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div class="flex gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 h-15 rounded-2xl font-black text-[11px] uppercase tracking-widest border-zinc-100 dark:border-zinc-800" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button 
                type="submit" 
                class="flex-1 h-15 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all" 
                :disabled="isSubmitting || !form.name.trim() || !form.financial_category_id"
              >
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Simpan' : 'Daftarkan' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[3rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6 text-center">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto shadow-xl">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Hapus Catatan?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Data aset ini akan dihapus secara permanen dari sistem pencatatan keuangan Anda.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all font-bold"
          >
            Hapus Sekarang
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Grid2X2, FileText, FileSpreadsheet, ChevronDown, ChevronsUpDown
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription, DialogTitle
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  getFinancials, createFinancial, updateFinancial, deleteFinancial, 
  getPublicFinancialCategories, type FinancialItem, type FinancialCategory 
} from '~/server/api/public/finance'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Pencatatan Keuangan',
  robots: 'noindex, nofollow'
})


const financials = ref<FinancialItem[]>([])
const categories = ref<FinancialCategory[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedFinancial = ref<FinancialItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

const form = ref({
  name: '',
  financial_category_id: '',
  saldo: 0,
  description: ''
})

const formattedSaldo = computed({
  get: () => form.value.saldo ? form.value.saldo.toLocaleString('id-ID') : '',
  set: (val: string) => {
    // Only extract numerical values from string
    const numeric = val.replace(/[^0-9]/g, '')
    form.value.saldo = numeric ? parseInt(numeric, 10) : 0
  }
})

// ─── Theme: Blue Harmony ─────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-blue-500 to-blue-700',
  'bg-gradient-to-br from-zinc-800 to-zinc-950',
  'bg-gradient-to-br from-slate-400 to-slate-600',
  'bg-gradient-to-br from-sky-500 to-indigo-600',
  'bg-gradient-to-br from-cyan-500 to-blue-500',
]
function getAvatarColor(name: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

const formatCurrency = (val: number) => {
  return val.toLocaleString('id-ID')
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// ─── Logic: Fetches & Watchers ──────────────────────────────────────────────
const fetchFinancials = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getFinancials(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      financials.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching financials:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getPublicFinancialCategories(token, 1, 100)
    const result = await response.json()
    if (response.ok && result.success) {
      categories.value = result.payload || []
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchFinancials()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchFinancials() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchFinancials() } }

// ─── Document Export ────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (financials.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }
  alertInfo('Menyiapkan file PDF...')
  try {
    const doc = new jsPDF()
    const tableData = financials.value.map(item => [
      item.name,
      item.financial_category?.name || '-',
      `Rp ${formatCurrency(item.saldo)}`,
      formatDate(item.created_at)
    ])
    autoTable(doc, {
      head: [['Nama Aset', 'Kategori', 'Saldo', 'Tgl Registrasi']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }, // Blue 600
      styles: { font: 'helvetica', fontSize: 9 }
    })
    doc.save(`Laporan-Finansial-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) {
    alertError('Gagal memproses PDF.')
  }
}

const exportToExcel = () => {
  if (financials.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }
  alertInfo('Membuat Dokumen Excel...')
  try {
    const flatData = financials.value.map(item => ({
      'Nama Aset': item.name,
      'Kategori': item.financial_category?.name || '-',
      'Saldo': item.saldo,
      'Tanggal': formatDate(item.created_at)
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Aset')
    XLSX.writeFile(workbook, `Aset-Keuangan.xlsx`)
    alertSuccess('File Excel berhasil disimpan.')
  } catch (err) {
    alertError('Terjadi kesalahan ekspor Excel.')
  }
}

// ─── Interaction Handlers ────────────────────────────────────────────────────
const openDetailModal = (item: FinancialItem) => {
  selectedFinancial.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { 
    name: '',
    financial_category_id: '',
    saldo: 0,
    description: ''
  }
  isFormModalOpen.value = true
}

const openEditModal = (item: FinancialItem) => {
  isEditing.value = true
  selectedFinancial.value = item
  form.value = { 
    name: item.name, 
    financial_category_id: item.financial_category?.id || '',
    saldo: item.saldo,
    description: item.description
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = { 
      name: form.value.name,
      financial_category_id: form.value.financial_category_id,
      saldo: Number(form.value.saldo),
      description: form.value.description
    }
    const response = isEditing.value 
      ? await updateFinancial(selectedFinancial.value!.id, payload, token)
      : await createFinancial(payload, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Data diperbarui.' : 'Aset ditambahkan.')
      isFormModalOpen.value = false
      fetchFinancials()
    } else {
      alertError(result.message || 'Gagal menyimpan data.')
    }
  } catch (error) {
    alertError('Masalah koneksi server.')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = (id: string) => {
  deleteItemId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteItemId.value) return
  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteFinancial(deleteItemId.value, token)
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Aset berhasil dihapus.')
      fetchFinancials()
    } else {
      alertError(result.message || 'Gagal menghapus aset.')
    }
  } catch (error) {
    alertError('Kesalahan sistem saat menghapus.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => {
  fetchFinancials()
  fetchCategories()
})
</script>
