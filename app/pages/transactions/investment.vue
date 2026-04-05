<template>
  <div class="px-4 py-8 sm:px-8 space-y-10 max-w-7xl mx-auto">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="space-y-2">
        <h1 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
          Transaksi <span class="text-blue-600">Investasi</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Pantau dan kelola portofolio investasi Anda secara sistematis dan real-time.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <!-- Document Export Tools -->
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
          id="btn-tambah-investasi"
          class="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all gap-3"
          @click="openCreateModal"
        >
          <Plus class="w-5 h-5" />
          Tambah Investasi
        </Button>
      </div>
    </header>

    <!-- Toolbar: Search Section -->
    <section class="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
      <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-4 shadow-xl shadow-blue-500/5">
        <div class="relative">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            v-model="searchQuery"
            placeholder="Cari asetm emiten, atau instrumen (misal: BBCA, Bitcoin)..." 
            class="w-full h-14 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 placeholder:text-zinc-400 placeholder:font-medium"
          />
        </div>
      </div>
    </section>

    <!-- Main Content: Data Table & Grid -->
    <main class="space-y-6">
      <!-- Desktop Data Grid -->
      <div class="hidden md:block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 px-8 flex items-center gap-2">
                 Nama Aset / Emiten
                 <ChevronsUpDown class="w-3 h-3 opacity-30" />
              </TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Kategori</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Sumber Dana</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Nilai Investasi</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Tanggal Beli</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading">
              <TableCell colspan="6" class="h-64 text-center">
                <Loader2 class="w-10 h-10 animate-spin mx-auto text-blue-600 opacity-20" />
              </TableCell>
            </TableRow>
            <TableRow v-else-if="investments.length === 0">
              <TableCell colspan="6" class="h-64 text-center">
                <div class="flex flex-col items-center gap-4 grayscale opacity-40">
                  <Grid2X2 class="w-12 h-12 text-zinc-400" />
                  <p class="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Portofolio Kosong</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow 
              v-else 
              v-for="item in investments" 
              :key="item.id" 
              class="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-all duration-300 group" 
              @click="openDetailModal(item)"
            >
              <TableCell class="py-6 px-8">
                <div class="flex items-center gap-4">
                  <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg ${getAvatarColor(item.name)}`">
                    {{ item.name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-[15px] font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors leading-none uppercase">{{ item.name }}</span>
                </div>
              </TableCell>
              <TableCell class="py-6">
                <span class="inline-flex items-center h-7 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50">
                  {{ item.investment_category?.name }}
                </span>
              </TableCell>
              <TableCell class="py-6 text-[13px] font-bold text-zinc-400 italic">
                {{ item.financial?.name }}
              </TableCell>
              <TableCell class="py-6 font-black text-zinc-900 dark:text-white tabular-nums">
                Rp {{ formatCurrency(item.amount) }}
              </TableCell>
              <TableCell class="py-6 text-[13px] font-bold text-zinc-400 dark:text-zinc-500">
                {{ formatDate(item.purchase_date) }}
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

      <!-- Mobile/Tablet Adaptive Grid -->
      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-700 delay-200">
        <div 
          v-for="item in investments" 
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
                <p class="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase mt-1 tracking-widest">{{ item.investment_category?.name }}</p>
              </div>
            </div>
            <button class="w-12 h-12 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
               <Eye class="w-5 h-5" />
            </button>
          </div>

          <div class="bg-zinc-50 dark:bg-zinc-800/40 rounded-[1.5rem] p-5 flex flex-col items-center border border-zinc-100 dark:border-zinc-800/50">
             <span class="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Nilai Investasi</span>
             <h3 class="text-xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter antialiased">Rp {{ formatCurrency(item.amount) }}</h3>
             <div class="flex items-center gap-1.5 mt-2 opacity-50">
                <div class="w-1 h-1 rounded-full bg-zinc-400"></div>
                <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{{ item.financial?.name }}</span>
             </div>
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

    <!-- Dialogs: High-Fidelity Information & CRUD -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <div v-if="selectedInvestment" class="p-10 space-y-8">
          <div class="flex flex-col items-center text-center space-y-6">
            <div :class="`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedInvestment.name)}`">
              {{ selectedInvestment.name.charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedInvestment.name }}</h3>
              <div class="inline-flex h-8 px-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] items-center">
                 {{ selectedInvestment.investment_category?.name }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4 text-left">
             <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 flex flex-col items-center">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Total Nilai Investasi</span>
              <p class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter antialiased">Rp {{ formatCurrency(selectedInvestment.amount) }}</p>
            </div>
            <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-3">
               <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sumber Dana</span>
                  <span class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ selectedInvestment.financial?.name }}</span>
               </div>
               <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Tanggal Beli</span>
                  <span class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ formatDate(selectedInvestment.purchase_date) }}</span>
               </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            class="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:text-blue-600 transition-all font-bold" 
            @click="isDetailModalOpen = false"
          >
            Tutup Informasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-xl bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <div class="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div class="flex items-center gap-6 p-10 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 backdrop-blur-xl z-20">
            <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl ${isEditing ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-600 shadow-blue-500/20'}`">
              <TrendingUp v-if="isEditing" class="w-8 h-8" />
              <Plus v-else class="w-8 h-8" />
            </div>
            <div class="text-left">
              <DialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                {{ isEditing ? 'Edit' : 'Catat' }} <span class="text-blue-600">Investasi</span>
              </DialogTitle>
              <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1">Manajemen Portofolio Berjangka</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-10 space-y-8">
            <div class="space-y-6 text-left">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nama Aset / Emiten <span class="text-blue-600">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="E.g. BBCA, Bitcoin, Emas Antam" 
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Kategori Investasi <span class="text-blue-600">*</span></label>
                    <div class="relative">
                      <select v-model="form.investment_category_id" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 outline-none appearance-none cursor-pointer" required>
                         <option value="" disabled>Pilih Kategori...</option>
                         <option v-for="cat in investmentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                      </select>
                      <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                    </div>
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Sumber Dana <span class="text-blue-600">*</span></label>
                    <div class="relative">
                      <select v-model="form.financial_id" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 outline-none appearance-none cursor-pointer" required>
                         <option value="" disabled>Pilih Financial...</option>
                         <option v-for="fin in financialAssets" :key="fin.id" :value="fin.id">{{ fin.name }} (Rp {{ formatCurrency(fin.saldo) }})</option>
                      </select>
                      <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                    </div>
                 </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nilai Investasi <span class="text-blue-600">*</span></label>
                    <input 
                      v-model="form.amount" 
                      type="number" 
                      placeholder="0" 
                      class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-black text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 tabular-nums" 
                      required
                    />
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Tanggal Beli <span class="text-blue-600">*</span></label>
                    <input 
                      v-model="form.purchase_date" 
                      type="date" 
                      class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all" 
                      required
                    />
                 </div>
              </div>
            </div>

            <div class="flex gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 h-15 rounded-2xl font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button 
                type="submit" 
                class="flex-1 h-15 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all" 
                :disabled="isSubmitting || !form.name.trim() || !form.financial_id"
              >
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Simpan Data' : 'Catat Investasi' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Dangerous Area: Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[3rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6 text-center">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto shadow-xl">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Hapus Investasi?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Data portofolio ini akan dihapus permanen. Tindakan ini tidak akan mengembalikan saldo ke akun financial Anda secara otomatis.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all font-bold"
          >
            Ya, Hapus Saja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Grid2X2, FileText, FileSpreadsheet, TrendingUp, ChevronDown, ChevronsUpDown
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
  getInvestments, createInvestment, updateInvestment, deleteInvestment, 
  getPublicInvestmentCategories, type InvestmentItem 
} from '~/server/api/public/investment'
import { getFinancials } from '~/server/api/public/finance'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Manajemen Investasi',
  robots: 'noindex, nofollow'
})

const investments = ref<InvestmentItem[]>([])
const investmentCategories = ref<any[]>([])
const financialAssets = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedInvestment = ref<InvestmentItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

const form = ref({
  name: '',
  investment_category_id: '',
  financial_id: '',
  purchase_date: new Date().toISOString().split('T')[0],
  transaction_date: new Date().toISOString().split('T')[0],
  amount: 0
})

// ─── Theme: Investment Blue ───────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-blue-500 to-indigo-600',
  'bg-gradient-to-br from-cyan-500 to-blue-600',
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-purple-500 to-pink-600',
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

// ─── Data Engine ─────────────────────────────────────────────────────────────
const fetchInvestments = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getInvestments(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      investments.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching investments:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchDependencies = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const [resCat, resFin] = await Promise.all([
      getPublicInvestmentCategories(token, 1, 100).then(r => r.json()),
      getFinancials(token, 1, 100).then(r => r.json())
    ])
    
    if (resCat.success) investmentCategories.value = resCat.payload || []
    if (resFin.success) financialAssets.value = resFin.payload || []
    
  } catch (error) {
    console.error('Error fetching dependencies:', error)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchInvestments()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchInvestments() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchInvestments() } }

// ─── Document Export ─────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (investments.value.length === 0) {
    alertError('Tidak ada data investasi untuk diexport.')
    return
  }
  alertInfo('Menyiapkan dokumen PDF Portfolio...')
  try {
    const doc = new jsPDF()
    const tableData = investments.value.map(item => [
      item.name,
      item.investment_category?.name || '-',
      item.financial?.name || '-',
      `Rp ${formatCurrency(item.amount)}`,
      formatDate(item.purchase_date)
    ])
    autoTable(doc, {
      head: [['Emiten/Asset', 'Kategori', 'Sumber Dana', 'Nilai Investasi', 'Tanggal Beli']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 8, font: 'helvetica' }
    })
    doc.save(`portfolio-investasi-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat laporan PDF.')
  }
}

const exportToExcel = () => {
  if (investments.value.length === 0) {
    alertError('Tidak ada data investasi untuk diexport.')
    return
  }
  alertInfo('Menyiapkan file Excel Portfolio...')
  try {
    const flatData = investments.value.map(item => ({
      'Emiten/Asset': item.name,
      'Kategori': item.investment_category?.name || '-',
      'Sumber Dana': item.financial?.name || '-',
      'Nilai Investasi': item.amount,
      'Tanggal Beli': formatDate(item.purchase_date)
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Portfolio')
    XLSX.writeFile(workbook, `report-investasi-${new Date().getTime()}.xlsx`)
    alertSuccess('Laporan Excel berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Interaction Handlers ─────────────────────────────────────────────────────
const openDetailModal = (item: InvestmentItem) => {
  selectedInvestment.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { 
    name: '',
    investment_category_id: '',
    financial_id: '',
    purchase_date: new Date().toISOString().split('T')[0],
    transaction_date: new Date().toISOString().split('T')[0],
    amount: 0
  }
  isFormModalOpen.value = true
}

const openEditModal = (item: InvestmentItem) => {
  isEditing.value = true
  selectedInvestment.value = item
  form.value = { 
    name: item.name, 
    investment_category_id: item.investment_category?.id || '',
    financial_id: item.financial?.id || '',
    purchase_date: item.purchase_date.split('T')[0],
    transaction_date: item.transaction_date.split('T')[0],
    amount: item.amount
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = { 
      name: form.value.name,
      investment_category_id: form.value.investment_category_id,
      financial_id: form.value.financial_id,
      purchase_date: form.value.purchase_date || '',
      transaction_date: form.value.transaction_date || '',
      amount: Number(form.value.amount)
    }
    const response = isEditing.value 
      ? await updateInvestment(selectedInvestment.value!.id, payload, token)
      : await createInvestment(payload, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Data diperbarui.' : 'Investasi dicatat.')
      isFormModalOpen.value = false
      fetchInvestments()
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
    const response = await deleteInvestment(deleteItemId.value, token)
    if (response.ok) {
      alertSuccess('Rekaman dihapus.')
      fetchInvestments()
    } else {
      alertError('Gagal menghapus data.')
    }
  } catch (error) {
    alertError('Kesalahan sistem.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => {
  fetchInvestments()
  fetchDependencies()
})
</script>
