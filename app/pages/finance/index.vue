<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Pencatatan Keuangan</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola aset dan tabungan finansial Anda di sini</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Export Icons -->
        <Button 
          variant="outline"
          class="w-11 h-11 p-0 rounded-xl border-gray-200 dark:border-zinc-800 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
          title="Export PDF"
          @click="exportToPdf"
        >
          <FileText class="w-5 h-5" />
        </Button>
        <Button 
          variant="outline"
          class="w-11 h-11 p-0 rounded-xl border-gray-200 dark:border-zinc-800 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors shadow-sm"
          title="Export Excel"
          @click="exportToExcel"
        >
          <FileSpreadsheet class="w-5 h-5" />
        </Button>

        <Button 
          id="btn-tambah-aset"
          class="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-5 rounded-xl shadow-sm shadow-emerald-500/20 ml-1"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Aset
        </Button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-financial"
          v-model="searchQuery"
          placeholder="Cari aset atau kategori..." 
          class="pl-9 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all font-medium"
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
                   <div class="ml-2">Nama Aset</div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Kategori
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Saldo
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Tanggal Dibuat
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="isLoading">
                <TableCell colspan="5" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data finansial...</p>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="financials.length === 0">
                <TableCell colspan="5" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Grid2X2 class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Belum ada data finansial.</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow 
                v-else 
                v-for="item in financials" 
                :key="item.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors" 
                @click="openDetailModal(item)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(item.name)}`">
                      {{ item.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[150px] sm:max-w-none">{{ item.name }}</span>
                  </div>
                </TableCell>
                <TableCell class="py-2.5">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                    {{ item.financial_category?.name || 'Umum' }}
                  </span>
                </TableCell>
                <TableCell class="text-[13px] font-bold text-gray-900 dark:text-zinc-100 py-2.5 tabular-nums">
                  Rp {{ formatCurrency(item.saldo) }}
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5">
                  {{ formatDate(item.created_at) }}
                </TableCell>
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5" @click.stop>
                    <button @click="openDetailModal(item)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button @click="openEditModal(item)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 transition-colors">
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button @click="confirmDelete(item.id)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all">
                      <Trash2 class="w-[15px] h-[15px]" />
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
           <Loader2 class="w-8 h-8 animate-spin mx-auto text-emerald-500" />
           <p class="mt-2 text-sm font-medium">Memuat data...</p>
        </div>
        <div v-else-if="financials.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Grid2X2 class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Belum ada aset finansial.</p>
        </div>
        <div 
          v-for="item in financials" 
          :key="item.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative"
          @click="openDetailModal(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(item.name)}`">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[14px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ item.name }}</h4>
                <p class="text-[11px] text-gray-400 mt-0.5 truncate uppercase tracking-wider font-bold text-emerald-600">{{ item.financial_category?.name }}</p>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
               <span class="text-[13px] font-black text-gray-900 dark:text-white tabular-nums">Rp {{ formatCurrency(item.saldo) }}</span>
            </div>
          </div>
          <div class="mt-4 flex gap-2.5 pt-4 border-t border-gray-50 dark:border-zinc-800/60" @click.stop>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50 text-xs font-bold gap-2" @click="openEditModal(item)">
               <Pencil class="w-3.5 h-3.5" />
               Edit
             </Button>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold gap-2" @click="confirmDelete(item.id)">
               <Trash2 class="w-3.5 h-3.5" />
               Hapus
             </Button>
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
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-0 overflow-hidden outline-none border-none shadow-2xl">
        <div v-if="selectedFinancial" class="p-8 space-y-6">
          <div class="flex flex-col items-center text-center space-y-4">
            <div :class="`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedFinancial.name)}`">
              {{ selectedFinancial.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">{{ selectedFinancial.name }}</h3>
              <p class="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-widest">{{ selectedFinancial.financial_category?.name }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800/50">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Saldo</span>
              <p class="text-[18px] font-black text-gray-900 dark:text-white tracking-tighter antialiased tabular-nums">Rp {{ formatCurrency(selectedFinancial.saldo) }}</p>
            </div>
            <div v-if="selectedFinancial.description" class="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800/50">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Keterangan</span>
              <p class="text-[13px] font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">{{ selectedFinancial.description }}</p>
            </div>
            <div class="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800/50">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Terakhir Diperbarui</span>
              <p class="text-[13px] font-bold text-gray-700 dark:text-zinc-300">{{ formatDate(selectedFinancial.created_at) }}</p>
            </div>
          </div>

          <Button variant="outline" class="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500" @click="isDetailModalOpen = false">Tutup Detail</Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create/Edit Form Dialog -->
    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl rounded-2xl p-0 overflow-hidden outline-none">
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center gap-4 p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20">
            <div :class="`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${isEditing ? 'bg-amber-500' : 'bg-emerald-600'}`">
              <Pencil v-if="isEditing" class="w-5 h-5 sm:w-6 sm:h-6" />
              <Plus v-else class="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <DialogTitle class="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                {{ isEditing ? 'Edit Aset Keuangan' : 'Tambah Aset Baru' }}
              </DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                Isi form di bawah untuk mencatat aset finansial Anda.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-5 sm:p-6 space-y-5">
            <div class="space-y-4 text-left">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">Nama Aset <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Contoh: Tabungan BRI, Kas Kecil, Dana Darurat" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[13px] font-semibold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">Kategori <span class="text-red-500">*</span></label>
                    <select v-model="form.financial_category_id" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[13px] font-semibold flex items-center justify-between focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm outline-none appearance-none" required>
                       <option value="" disabled>Pilih Kategori</option>
                       <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                    </select>
                 </div>
                 <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">Saldo <span class="text-red-500">*</span></label>
                    <input 
                      v-model="form.saldo" 
                      type="number" 
                      placeholder="0" 
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[13px] font-semibold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" 
                      required
                    />
                 </div>
              </div>

              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">Deskripsi</label>
                <textarea 
                  v-model="form.description" 
                  rows="3" 
                  placeholder="Keterangan tambahan (opsional)..." 
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[13px] font-semibold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm resize-none"
                ></textarea>
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t border-gray-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 rounded-xl py-6 font-bold text-sm" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button type="submit" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-bold text-sm shadow-lg shadow-emerald-500/20" :disabled="isSubmitting || !form.name.trim() || !form.financial_category_id">
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
                {{ isEditing ? 'Simpan Perubahan' : 'Tambah Aset' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-2xl border-none shadow-2xl p-8 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-4">
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto">
             <Trash2 class="w-8 h-8" />
          </div>
          <div class="space-y-2 text-center">
            <AlertDialogTitle class="text-xl font-black text-gray-900 dark:text-white">Hapus Aset?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-gray-500 px-4">Tindakan ini permanen. Pastikan Anda sudah tidak memerlukan data aset ini.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-3 mt-8">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-xs uppercase tracking-widest bg-gray-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 transition-all"
          >
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Grid2X2, FileText, FileSpreadsheet
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
  title: 'Aset & Tabungan ',
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

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-blue-500 to-sky-600',
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-rose-500 to-pink-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
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

// ─── Data Fetching ────────────────────────────────────────────────────────
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

// ─── Export Handlers ────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (financials.value.length === 0) {
    alertError('Tidak ada data untuk diexport.')
    return
  }
  alertInfo('Menyiapkan dokumen PDF...')
  try {
    const doc = new jsPDF()
    const tableData = financials.value.map(item => [
      item.name,
      item.financial_category?.name || '-',
      `Rp ${formatCurrency(item.saldo)}`,
      formatDate(item.created_at)
    ])
    autoTable(doc, {
      head: [['Nama Aset', 'Kategori', 'Saldo', 'Tanggal Dibuat']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }, // Emerald 500
      styles: { fontSize: 8 }
    })
    doc.save(`aset-keuangan-${new Date().getTime()}.pdf`)
    alertSuccess('PDF berhasil didownload.')
  } catch (err) {
    console.error('PDF Export Error:', err)
    alertError('Gagal membuat PDF.')
  }
}

const exportToExcel = () => {
  if (financials.value.length === 0) {
    alertError('Tidak ada data untuk diexport.')
    return
  }
  alertInfo('Menyiapkan file Excel...')
  try {
    const flatData = financials.value.map(item => ({
      'Nama Aset': item.name,
      'Kategori': item.financial_category?.name || '-',
      'Saldo': item.saldo,
      'Tanggal Dibuat': formatDate(item.created_at),
      'Keterangan': item.description || '-'
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets')
    XLSX.writeFile(workbook, `aset-keuangan-${new Date().getTime()}.xlsx`)
    alertSuccess('Excel berhasil didownload.')
  } catch (err) {
    console.error('Excel Export Error:', err)
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Handlers ───────────────────────────────────────────────────────────────
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
      alertSuccess(isEditing.value ? 'Aset diperbarui.' : 'Aset ditambahkan.')
      isFormModalOpen.value = false
      fetchFinancials()
    } else {
      alertError(result.message || 'Gagal menyimpan aset.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
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
    alertError('Kesalahan jaringan.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => {
  fetchFinancials()
  fetchCategories()
})
</script>
