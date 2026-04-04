<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Manajemen Plan Langganan</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola paket langganan untuk sistem {{ appName }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Button 
          id="btn-tambah-plan"
          class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-5 rounded-xl shadow-lg shadow-indigo-500/20"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Plan
        </Button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-plan"
          v-model="searchQuery"
          placeholder="Cari nama plan..." 
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
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5 ml-2">
                    Nama Plan
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5">
                    Harga
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5">
                    Durasi
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
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
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data plan...</p>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="plans.length === 0">
                <TableCell colspan="5" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Zap class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tidak ada data plan ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow 
                v-else 
                v-for="plan in plans" 
                :key="plan.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors" 
                @click="openPlanDetail(plan)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(plan.name)}`">
                      {{ plan.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 truncate">{{ plan.name }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 font-medium">
                  {{ formatCurrency(plan.price) }}
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 font-medium truncate">
                  {{ plan.duration_days }} Hari
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 font-medium">
                  {{ formatDate(plan.created_at) }}
                </TableCell>
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5" @click.stop>
                    <button @click="openPlanDetail(plan)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button @click="openEditModal(plan)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-amber-50 hover:text-amber-600 transition-all">
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button @click="confirmDelete(plan.id)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all">
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
           <Loader2 class="w-8 h-8 animate-spin mx-auto text-indigo-500" />
           <p class="mt-2 text-sm font-medium">Memuat data plan...</p>
        </div>
        <div v-else-if="plans.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Zap class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Tidak ada data plan.</p>
        </div>
        <div 
          v-else 
          v-for="plan in plans" 
          :key="plan.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
          @click="openPlanDetail(plan)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(plan.name)}`">
                {{ plan.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[13px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ plan.name }}</h4>
                <p class="text-[11px] font-medium text-emerald-600 mt-0.5">{{ formatCurrency(plan.price) }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5 italic">Durasi: {{ plan.duration_days }} Hari</p>
              </div>
            </div>
            <div @click.stop="openPlanDetail(plan)" class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
               <Eye class="w-[14px] h-[14px]" />
            </div>
          </div>
          <div class="mt-4 flex gap-2.5 pt-4 border-t border-gray-50 dark:border-zinc-800/60" @click.stop>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50 text-xs font-bold gap-2" @click="openEditModal(plan)">
               <Pencil class="w-3.5 h-3.5" />
               Edit
             </Button>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold gap-2" @click="confirmDelete(plan.id)">
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
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-0 overflow-hidden outline-none shadow-2xl border-none">
        <div v-if="selectedPlan" class="p-8 space-y-6">
          <div class="flex flex-col items-center text-center space-y-4">
            <div :class="`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedPlan.name)}`">
              {{ selectedPlan.name.charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-1">
              <h3 class="text-xl font-black text-gray-900 dark:text-white">{{ selectedPlan.name }}</h3>
              <p class="text-emerald-600 font-bold text-lg">{{ formatCurrency(selectedPlan.price) }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800/50">
               <div class="flex justify-between items-center">
                 <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durasi Aktif</span>
                 <span class="text-sm font-bold">{{ selectedPlan.duration_days }} Hari</span>
               </div>
            </div>
            <div class="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800/50">
               <div class="flex justify-between items-center">
                 <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dibuat Pada</span>
                 <span class="text-sm font-bold">{{ formatDate(selectedPlan.created_at) }}</span>
               </div>
            </div>
          </div>

          <Button variant="outline" class="w-full py-7 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50" @click="isDetailModalOpen = false">Tutup Detail</Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create/Edit Form Dialog -->
    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl rounded-[2rem] p-0 overflow-hidden outline-none">
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center gap-4 p-6 sm:p-8 border-b border-gray-50 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20">
            <div :class="`w-14 h-14 rounded-3xl flex items-center justify-center text-white shadow-xl ${isEditing ? 'bg-amber-500' : 'bg-indigo-600'}`">
              <Pencil v-if="isEditing" class="w-7 h-7" />
              <Plus v-else class="w-7 h-7" />
            </div>
            <div>
              <DialogTitle class="text-[17px] sm:text-xl font-black text-gray-900 dark:text-white leading-tight">
                {{ isEditing ? 'Edit Plan' : 'Tambah Paket' }}
              </DialogTitle>
              <DialogDescription class="text-[13px] font-medium text-gray-400 dark:text-zinc-500 mt-0.5">
                Kelola detail paket langganan.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-6 sm:p-8 space-y-6">
            <div class="space-y-5">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-1">Nama Plan <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" placeholder="Contoh: Premium Gen Z" class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" required />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-1">Harga (Rp) <span class="text-red-500">*</span></label>
                  <input v-model.number="form.price" type="number" placeholder="10000" class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" required />
                </div>
                <div class="space-y-2">
                  <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-1">Durasi (Hari) <span class="text-red-500">*</span></label>
                  <input v-model.number="form.duration_days" type="number" placeholder="30" class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" required />
                </div>
              </div>
            </div>

            <div class="flex gap-4 pt-6 border-t border-gray-50 dark:border-zinc-800/50">
              <Button type="button" variant="ghost" class="flex-1 rounded-2xl py-7 font-black text-xs uppercase tracking-widest text-gray-400" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button type="submit" class="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-7 font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20" :disabled="isSubmitting || !form.name.trim()">
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
                {{ isEditing ? 'Update Plan' : 'Simpan Plan' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[2rem] border-none p-8 max-w-[90vw] sm:max-w-md shadow-2xl">
        <AlertDialogHeader class="space-y-4">
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto">
             <Trash2 class="w-8 h-8" />
          </div>
          <div class="space-y-2 text-center">
            <AlertDialogTitle class="text-[20px] font-black text-gray-900 dark:text-white">Hapus Plan?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-gray-500 px-4">Tindakan ini tidak dapat dibatalkan. Konfirmasi penghapusan plan permanent.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-3 mt-8">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black bg-gray-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl h-14 font-black shadow-lg shadow-red-500/20 transition-all"
          >
            Hapus Plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, ChevronsUpDown, Eye, Pencil, Trash2, Loader2, Plus, Zap
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getPlans, createPlan, updatePlan, deletePlan, type PlanItem } from '@/server/api/admin/plan'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')

const plans = ref<PlanItem[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedPlan = ref<PlanItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isDeleteDialogOpen = ref(false)
const deletePlanId = ref<string | null>(null)

const form = ref({
  name: '',
  price: 0,
  duration_days: 30,
})

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-blue-500 to-sky-600',
  'bg-gradient-to-br from-pink-500 to-rose-600',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
]
function getAvatarColor(name: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(val)
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
const fetchPlans = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getPlans(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      plans.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching plans:', error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchPlans()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchPlans() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchPlans() } }

// ─── Handlers ───────────────────────────────────────────────────────────────
const openPlanDetail = (plan: PlanItem) => {
  selectedPlan.value = plan
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { name: '', price: 0, duration_days: 14 }
  isFormModalOpen.value = true
}

const openEditModal = (plan: PlanItem) => {
  isEditing.value = true
  selectedPlan.value = plan
  form.value = { 
    name: plan.name, 
    price: plan.price, 
    duration_days: plan.duration_days, 
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = isEditing.value 
      ? await updatePlan(selectedPlan.value!.id, form.value, token)
      : await createPlan(form.value, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Plan diperbarui.' : 'Plan dibuat.')
      isFormModalOpen.value = false
      fetchPlans()
    } else {
      alertError(result.message || 'Gagal menyimpan plan.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = (id: string) => {
  deletePlanId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deletePlanId.value) return
  try {
    const token = localStorage.getItem('token') || ''
    const response = await deletePlan(deletePlanId.value, token)
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Plan dihapus.')
      fetchPlans()
    } else {
      alertError(result.message || 'Gagal menghapus plan.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => fetchPlans())
</script>
