<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Transaksi Investasi</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Catat dan pantau portofolio investasi Anda secara real-time</p>
      </div>
      <div class="flex items-center gap-2">
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
          id="btn-tambah-investasi"
          class="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-5 rounded-xl shadow-sm shadow-emerald-500/20 ml-1"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Investasi
        </Button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-investment"
          v-model="searchQuery"
          placeholder="Cari aset/emiten (misal: BBCA)..." 
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
                   <div class="ml-2">Nama Aset/Emiten</div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Kategori
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Sumber Dana
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Nilai Investasi
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Tanggal Beli
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="isLoading">
                <TableCell colspan="6" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data investasi...</p>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="investments.length === 0">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Grid2X2 class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Belum ada catatan investasi.</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow 
                v-else 
                v-for="item in investments" 
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
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
                    {{ item.investment_category?.name }}
                  </span>
                </TableCell>
                <TableCell class="text-[12px] font-medium text-gray-600 dark:text-zinc-400 py-2.5 italic">
                  {{ item.financial?.name }}
                </TableCell>
                <TableCell class="text-[13px] font-black text-gray-900 dark:text-zinc-100 py-2.5 tabular-nums">
                  Rp {{ formatCurrency(item.amount) }}
                </TableCell>
                <TableCell class="text-[12px] text-gray-500 dark:text-zinc-500 py-2.5">
                  {{ formatDate(item.purchase_date) }}
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
        <div v-else-if="investments.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Grid2X2 class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Belum ada data investasi.</p>
        </div>
        <div 
          v-for="item in investments" 
          :key="item.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
          @click="openDetailModal(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(item.name)}`">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[14px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ item.name }}</h4>
                <p class="text-[11px] text-zinc-400 mt-1 uppercase font-bold text-emerald-600">{{ item.investment_category?.name }}</p>
                <div class="flex items-center gap-1.5 mt-1">
                   <div class="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                   <span class="text-[10px] font-bold text-zinc-500 truncate">{{ item.financial?.name }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
               <span class="text-[13px] font-black text-zinc-900 dark:text-white tabular-nums">Rp {{ formatCurrency(item.amount) }}</span>
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
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 rounded-[2rem] p-0 overflow-hidden outline-none border-none shadow-2xl">
        <div v-if="selectedInvestment" class="p-8 space-y-6">
          <div class="flex flex-col items-center text-center space-y-4">
            <div :class="`w-20 h-20 rounded-[2rem] flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedInvestment.name)}`">
              {{ selectedInvestment.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedInvestment.name }}</h3>
              <div class="flex items-center justify-center gap-1.5 mt-1.5">
                 <span class="text-[10px] font-black py-0.5 px-2 bg-emerald-500 text-white rounded-full uppercase">{{ selectedInvestment.investment_category?.name }}</span>
                 <span class="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{{ selectedInvestment.id.substring(0,8) }}</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
               <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
                 <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nilai Investasi</span>
                 <p class="text-[15px] font-black text-zinc-900 dark:text-white tabular-nums antialiased">Rp {{ formatCurrency(selectedInvestment.amount) }}</p>
               </div>
               <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
                 <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tanggal Beli</span>
                 <p class="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">{{ formatDate(selectedInvestment.purchase_date) }}</p>
               </div>
            </div>

            <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Sumber Dana (Financial)</span>
              <div class="flex items-center gap-2">
                 <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <p class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ selectedInvestment.financial?.name }}</p>
              </div>
            </div>

            <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Waktu Transaksi</span>
              <p class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ formatDate(selectedInvestment.transaction_date) }}</p>
            </div>
          </div>

          <Button variant="outline" class="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500" @click="isDetailModalOpen = false">Tutup Detail</Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create/Edit Form Dialog -->
    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-xl bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-[2rem] p-0 overflow-hidden outline-none">
        <div class="max-h-[85vh] overflow-y-auto scrollbar-hide">
          <!-- Header -->
          <div class="flex items-center gap-4 p-6 sm:p-8 border-b border-zinc-50 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-20">
            <div :class="`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${isEditing ? 'bg-amber-500 shadow-amber-500/20' : 'bg-emerald-600 shadow-emerald-500/20'}`">
              <TrendingUp v-if="isEditing" class="w-6 h-6 sm:w-7 sm:h-7" />
              <Plus v-else class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <DialogTitle class="text-[16px] sm:text-xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">
                {{ isEditing ? 'Update Investasi' : 'Record New Invest' }}
              </DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
                Pastikan data yang diinput sesuai dengan bukti transaksi Anda.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-6 sm:p-8 space-y-6">
            <div class="space-y-5 text-left">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Nama Aset / Emiten <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Contoh: BBCA, Bitcoin, Reksa Dana Indeks" 
                  class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Kategori Investasi <span class="text-red-500">*</span></label>
                    <select v-model="form.investment_category_id" class="w-full p-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold flex items-center justify-between focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm outline-none appearance-none" required>
                       <option value="" disabled>Pilih Kategori</option>
                       <option v-for="cat in investmentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                    </select>
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Sumber Dana <span class="text-red-500">*</span></label>
                    <select v-model="form.financial_id" class="w-full p-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold flex items-center justify-between focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm outline-none appearance-none" required>
                       <option value="" disabled>Pilih Aset Finansial</option>
                       <option v-for="fin in financialAssets" :key="fin.id" :value="fin.id">{{ fin.name }} (Rp {{ formatCurrency(fin.saldo) }})</option>
                    </select>
                 </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Nilai Investasi <span class="text-red-500">*</span></label>
                    <input 
                      v-model="form.amount" 
                      type="number" 
                      placeholder="0" 
                      class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-black outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm tabular-nums" 
                      required
                    />
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Tanggal Beli <span class="text-red-500">*</span></label>
                    <input 
                      v-model="form.purchase_date" 
                      type="date" 
                      class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" 
                      required
                    />
                 </div>
              </div>
            </div>

            <div class="flex gap-4 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 rounded-[1.25rem] py-8 font-black text-xs uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 h-14" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button type="submit" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.25rem] py-8 font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-600/30 h-14" :disabled="isSubmitting || !form.name.trim() || !form.financial_id">
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Confirm Update' : 'Record Now' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md overflow-hidden relative">
        <div class="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <AlertDialogHeader class="space-y-6">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50/50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto transform -rotate-6 shadow-sm border border-red-100 dark:border-red-900/30">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2 text-center relative z-10">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">Hapus Record?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-400 px-4 leading-relaxed">Data yang dihapus tidak bisa dikembalikan. Saldo financial yang terpotong sebelumnya tidak akan otomatis kembali.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-xs uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all hover:scale-[1.02]">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/30 transition-all hover:scale-[1.02]"
          >
            Sikat! Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Grid2X2, FileText, FileSpreadsheet, TrendingUp
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
  title: 'Investasi & Portfolio ',
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

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-emerald-500 to-teal-600',
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

// ─── Data Fetching ────────────────────────────────────────────────────────
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
    // Fetch Categories from public endpoint
    const resCat = await getPublicInvestmentCategories(token, 1, 100)
    const resultCat = await resCat.json()
    if (resCat.ok) investmentCategories.value = resultCat.payload || []

    // Fetch Financial Assets
    const resFin = await getFinancials(token, 1, 100)
    const resultFin = await resFin.json()
    if (resFin.ok) financialAssets.value = resultFin.payload || []
    
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

// ─── Export Handlers ────────────────────────────────────────────────────────
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
      headStyles: { fillColor: [5, 150, 105] }, // Emerald 600
      styles: { fontSize: 8, font: 'helvetica', fontStyle: 'bold' }
    })
    doc.save(`portfolio-investasi-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) {
    console.error('PDF Export Error:', err)
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
      'Sumber Dana (Financial)': item.financial?.name || '-',
      'Nilai Investasi': item.amount,
      'Tanggal Beli': formatDate(item.purchase_date),
      'ID Transaksi': item.id
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Portfolio')
    XLSX.writeFile(workbook, `report-investasi-${new Date().getTime()}.xlsx`)
    alertSuccess('Laporan Excel berhasil diunduh.')
  } catch (err) {
    console.error('Excel Export Error:', err)
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Handlers ───────────────────────────────────────────────────────────────
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
    const payload: any = { 
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
      alertSuccess(isEditing.value ? 'Data investasi diperbarui.' : 'Investasi berhasil dicatat.')
      isFormModalOpen.value = false
      fetchInvestments()
    } else {
      alertError(result.message || 'Gagal menyimpan transaksi investasi.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan saat memproses transaksi.')
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
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Rekaman investasi dihapus.')
      fetchInvestments()
    } else {
      alertError(result.message || 'Gagal menghapus data investasi.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => {
  fetchInvestments()
  fetchDependencies()
})
</script>
