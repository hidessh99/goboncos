<template>
  <div class="px-4 py-8 sm:px-8 space-y-10 max-w-7xl mx-auto">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-2">
        <h1 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
          Kategori <span class="text-blue-600">Transaksi</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Klasifikasikan arus kas Anda untuk analisis keuangan yang lebih mendalam.</p>
      </div>
      
      <div class="flex items-center gap-3">

        <Button 
          id="btn-tambah-kategori"
          class="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all gap-3"
          @click="openCreateModal"
        >
          <Plus class="w-5 h-5" />
          Tambah Baru
        </Button>
      </div>
    </header>

    <!-- Toolbar: Search -->
    <section class="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-4 shadow-xl shadow-blue-500/5">
        <div class="relative">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            v-model="searchQuery"
            placeholder="Cari nama kategori di sini..." 
            class="w-full h-14 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 placeholder:text-zinc-400 placeholder:font-medium"
          />
        </div>
      </div>
    </section>

    <!-- Content Area -->
    <main class="space-y-6">
      <!-- Desktop Table -->
      <div class="hidden md:block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 px-8 leading-none">Informasi Kategori</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 text-center leading-none">Tipe Transaksi</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 px-8 leading-none">Dibuat Pada</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 text-center leading-none">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading">
              <TableCell colspan="4" class="h-64 text-center">
                <Loader2 class="w-10 h-10 animate-spin mx-auto text-blue-600 opacity-20" />
              </TableCell>
            </TableRow>
            <TableRow v-else-if="categories.length === 0">
              <TableCell colspan="4" class="h-64 text-center">
                <div class="flex flex-col items-center gap-4 grayscale opacity-40">
                  <Grid2X2 class="w-12 h-12 text-zinc-400" />
                  <p class="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Data Kosong</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow 
              v-else 
              v-for="cat in categories" 
              :key="cat.id" 
              class="border-zinc-100 dark:border-zinc-800/60 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-all duration-300 group" 
              @click="openDetailModal(cat)"
            >
              <TableCell class="py-6 px-8">
                <div class="flex items-center gap-4">
                  <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg ${getAvatarColor(cat.name)}`">
                    {{ cat.name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-[15px] font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors uppercase leading-none">{{ cat.name }}</span>
                </div>
              </TableCell>
              <TableCell class="py-6 text-center">
                <span :class="`inline-flex items-center h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${getTypeColor(cat.category_types?.name)}`">
                  {{ cat.category_types?.name || '-' }}
                </span>
              </TableCell>
              <TableCell class="text-[13px] font-bold text-zinc-400 dark:text-zinc-500 py-6 px-8">
                {{ formatDate(cat.created_at) }}
              </TableCell>
              <TableCell class="py-6 pr-8 text-center">
                <div class="flex items-center justify-center gap-2" @click.stop>
                  <button @click="openDetailModal(cat)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 transition-all">
                    <Eye class="w-5 h-5" />
                  </button>
                  <button @click="openEditModal(cat)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 transition-all">
                    <Pencil class="w-5 h-5" />
                  </button>
                  <button @click="confirmDelete(cat.id)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Mobile Grid -->
      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-700">
        <div 
          v-for="cat in categories" 
          :key="cat.id"
          class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/5 active:scale-[0.98] transition-all space-y-6 relative overflow-hidden group"
          @click="openDetailModal(cat)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div :class="`w-14 h-14 rounded-3xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-xl ${getAvatarColor(cat.name)}`">
                {{ cat.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h4 class="text-[17px] font-black text-zinc-900 dark:text-white truncate leading-tight tracking-tight uppercase">{{ cat.name }}</h4>
                <p :class="`text-[10px] font-black uppercase mt-1 tracking-widest ${getTypeTextColor(cat.category_types?.name)}`">{{ cat.category_types?.name || '-' }}</p>
              </div>
            </div>
            <button class="w-12 h-12 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
               <Eye class="w-5 h-5" />
            </button>
          </div>

          <div class="flex gap-3 pt-6 border-t border-zinc-50 dark:border-zinc-800/60" @click.stop>
             <Button 
              variant="outline" 
              class="flex-1 h-12 rounded-2xl border-amber-100 dark:border-amber-900/30 text-amber-600 text-[10px] font-black uppercase tracking-widest gap-2" 
              @click="openEditModal(cat)"
             >
               <Pencil class="w-4 h-4" />
               Edit
             </Button>
             <Button 
              variant="outline" 
              class="flex-1 h-12 rounded-2xl border-red-100 dark:border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest gap-2" 
              @click="confirmDelete(cat.id)"
             >
               <Trash2 class="w-4 h-4" />
               Hapus
             </Button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
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

    <!-- Dialogs: Detail, Form, Delete -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Informasi detail mengenai kategori transaksi yang dipilih.</DialogDescription>
        <div v-if="selectedCategory" class="p-10 space-y-8">
          <div class="flex flex-col items-center text-center space-y-6">
            <div :class="`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedCategory.name)}`">
              {{ selectedCategory.name.charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedCategory.name }}</h3>
              <div :class="`inline-flex h-8 px-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] items-center ${getTypeColor(selectedCategory.category_types?.name)}`">
                 {{ selectedCategory.category_types?.name || '-' }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4 text-left">
             <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-1">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">User ID / Path</span>
              <p class="text-[13px] font-mono font-bold text-zinc-600 dark:text-zinc-300 truncate">{{ selectedCategory.id }}</p>
            </div>
            <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-1">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Waktu Registrasi</span>
              <p class="text-[13px] font-bold text-zinc-600 dark:text-zinc-300">{{ formatDate(selectedCategory.created_at) }}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            class="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" 
            @click="isDetailModalOpen = false"
          >
            Tutup Informasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Formulir untuk menambah atau memperbarui kategori transaksi ke dalam sistem.</DialogDescription>
        <div class="max-h-[90vh] overflow-y-auto">
          <div class="flex items-center gap-6 p-10 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50">
            <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl ${isEditing ? 'bg-amber-500' : 'bg-blue-600'}`">
              <Pencil v-if="isEditing" class="w-8 h-8" />
              <Plus v-else class="w-8 h-8" />
            </div>
            <div class="text-left">
              <DialogTitle class="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                {{ isEditing ? 'Edit' : 'Tambah' }} <span class="text-blue-600">Kategori</span>
              </DialogTitle>
              <p class="text-xs font-medium text-zinc-400 mt-1 uppercase tracking-tight">Manajemen Klasifikasi Keuangan</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-10 space-y-8">
            <div class="space-y-6 text-left">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nama Kategori <span class="text-blue-500">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Contoh: Makan Siang, Gaji, Listrik" 
                  class="w-full h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                  required
                />
              </div>

              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Tipe Transaksi <span class="text-blue-500">*</span></label>
                <div class="relative">
                  <select 
                    v-model="form.category_types_id" 
                    class="w-full h-14 pl-6 pr-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                    required
                  >
                     <option value="" disabled>Pilih Tipe...</option>
                     <option v-for="type in availableTypes" :key="type.id" :value="type.id">{{ type.name.toUpperCase() }}</option>
                  </select>
                  <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div class="flex gap-4 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button 
                type="submit" 
                class="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all" 
                :disabled="isSubmitting || !form.name.trim() || !form.category_types_id"
              >
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Simpan' : 'Tambah' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[3rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6 text-center">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto shadow-xl">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Hapus Kategori?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Pastikan kategori ini tidak lagi digunakan pada transaksi mana pun sebelum menghapusnya.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
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
  Search, Eye, Pencil, Trash2, Loader2, Plus, Grid2X2, ChevronDown
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
  getCategories, createCategory, updateCategory, deleteCategory, 
  getPublicCategoryTypes, type CategoryItem, type CategoryType 
} from '~/server/api/public/finance-category'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })
useSeoMeta({
  title: 'Kategori Keuangan',
  robots: 'noindex, nofollow'
})


const categories = ref<CategoryItem[]>([])
const availableTypes = ref<CategoryType[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedCategory = ref<CategoryItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

const form = ref({
  name: '',
  category_types_id: ''
})

// ─── Theme & Mapping ───────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-blue-500 to-blue-700',
  'bg-gradient-to-br from-zinc-800 to-zinc-950',
  'bg-gradient-to-br from-slate-400 to-slate-600',
  'bg-gradient-to-br from-sky-500 to-indigo-500',
  'bg-gradient-to-br from-cyan-500 to-blue-600',
]
function getAvatarColor(name: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

function getTypeColor(typeName: string | undefined) {
  if (!typeName) return 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500'
  const name = typeName.toLowerCase()
  if (name === 'pemasukan') return 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50'
  if (name === 'pengeluaran') return 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-900/30'
  if (name === 'tranfer' || name === 'transfer') return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
  return 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600'
}

function getTypeTextColor(typeName: string | undefined) {
  if (!typeName) return 'text-zinc-400'
  const name = typeName.toLowerCase()
  if (name === 'pemasukan') return 'text-blue-500 font-black'
  if (name === 'pengeluaran') return 'text-red-500 font-black'
  return 'text-zinc-500 font-bold'
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
const fetchCategories = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCategories(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      categories.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchAvailableTypes = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getPublicCategoryTypes(token)
    const result = await response.json()
    if (response.ok && result.success) {
      availableTypes.value = result.payload || []
    }
  } catch (error) {
    console.error('Error fetching type list:', error)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchCategories()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchCategories() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchCategories() } }

// ─── Handlers ───────────────────────────────────────────────────────────────
const openDetailModal = (item: CategoryItem) => {
  selectedCategory.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { name: '', category_types_id: '' }
  isFormModalOpen.value = true
}

const openEditModal = (item: CategoryItem) => {
  isEditing.value = true
  selectedCategory.value = item
  form.value = { 
    name: item.name, 
    category_types_id: item.category_types?.id || '' 
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = { 
      name: form.value.name,
      category_types_id: form.value.category_types_id
    }
    const response = isEditing.value 
      ? await updateCategory(selectedCategory.value!.id, payload, token)
      : await createCategory(payload, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Kategori diperbarui.' : 'Kategori berhasil ditambahkan.')
      isFormModalOpen.value = false
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal menyimpan kategori.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan saat memproses data.')
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
    const response = await deleteCategory(deleteItemId.value, token)
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Kategori berhasil dihapus.')
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal menghapus kategori.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan saat mencoba menghapus.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}


onMounted(() => {
  fetchCategories()
  fetchAvailableTypes()
})
</script>
