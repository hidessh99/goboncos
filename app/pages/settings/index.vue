<template>
  <div class="px-4 py-8 sm:px-8 space-y-8 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="space-y-2">
      <h1 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">Pengaturan</h1>
      <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Kelola profil dan pengaturan akun Anda secara mendalam.</p>
    </header>

    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Sidebar Navigation -->
      <aside class="w-full lg:w-64 shrink-0 transition-all">
        <nav class="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 w-full whitespace-nowrap lg:whitespace-normal',
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                : 'text-zinc-400 dark:text-zinc-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.name }}
          </button>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 space-y-12">
        <!-- Content: Profil -->
        <section v-if="activeTab === 'profile'" class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-tight antialiased">Informasi Profil</h2>
              <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Perbarui nama lengkap dan alamat email utama Anda.</p>
            </div>

            <Card class="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-100 dark:shadow-none overflow-hidden relative">
              <div v-if="isLoadingProfile" class="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm z-10 flex items-center justify-center">
                 <Loader class="w-8 h-8 animate-spin text-blue-600" />
              </div>
              <CardContent class="p-8 space-y-8">
                <div class="space-y-6 max-w-xl">
                  <div class="space-y-3">
                    <Label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Nama Lengkap</Label>
                    <Input 
                      v-model="name"
                      class="h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none" 
                    />
                  </div>

                  <div class="space-y-3">
                    <Label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Alamat Email</Label>
                    <Input 
                      v-model="email"
                      type="email"
                      class="h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none" 
                    />
                  </div>

                  <Button 
                    @click="handleSaveProfile"
                    :disabled="isSubmittingProfile"
                    class="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <Loader2 v-if="isSubmittingProfile" class="w-4 h-4 animate-spin mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Danger Zone: Hapus Akun -->
          <div class="pt-8 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl font-black text-red-500 tracking-tighter uppercase leading-tight antialiased">Hapus Akun</h2>
              <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Ini akan menghapus akun Anda secara permanen beserta seluruh data transaksi.</p>
            </div>

            <Card class="bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20 rounded-3xl overflow-hidden backdrop-blur-sm">
              <CardContent class="p-8 space-y-6">
                <div class="flex items-start gap-4 text-red-600 dark:text-red-400">
                  <ShieldAlert class="w-6 h-6 shrink-0 mt-0.5" />
                  <div class="space-y-1">
                    <p class="font-black text-sm uppercase tracking-wider leading-none">Peringatan Kritis</p>
                    <p class="text-sm font-medium opacity-80 leading-relaxed">Harap berhati-hati. Setelah akun dihapus, tidak ada cara untuk memulihkannya kembali atau mengakses data histori keuangan Anda.</p>
                  </div>
                </div>
                <Button 
                   @click="handleDeleteAccount"
                   variant="destructive" 
                   class="h-12 px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all self-start"
                >
                  Hapus Akun Saya
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Content: Kata Sandi -->
        <section v-if="activeTab === 'password'" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="space-y-1">
            <h2 class="text-xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-tight">Keamanan Akun</h2>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Perbarui kata sandi Anda secara berkala untuk keamanan ekstra.</p>
          </div>

          <Card class="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden">
            <CardContent class="p-8 space-y-8">
              <form @submit.prevent="handleChangePassword" class="space-y-6 max-w-xl">
                <div class="space-y-3">
                  <Label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Kata Sandi Lama</Label>
                  <div class="relative">
                    <Input 
                      v-model="passwordForm.old_password"
                      :type="showOldPassword ? 'text' : 'password'"
                      class="h-14 pl-6 pr-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold transition-all outline-none" 
                      required
                    />
                    <button 
                      type="button" 
                      @click="showOldPassword = !showOldPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      <Eye v-if="!showOldPassword" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <Label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Kata Sandi Baru</Label>
                  <div class="relative">
                    <Input 
                      v-model="passwordForm.new_password"
                      :type="showNewPassword ? 'text' : 'password'"
                      class="h-14 pl-6 pr-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold transition-all outline-none" 
                      required
                    />
                    <button 
                      type="button" 
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      <Eye v-if="!showNewPassword" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <Label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Konfirmasi Kata Sandi Baru</Label>
                  <div class="relative">
                    <Input 
                      v-model="passwordForm.confirm_password"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="h-14 pl-6 pr-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold transition-all outline-none" 
                      required
                    />
                    <button 
                       type="button" 
                       @click="showConfirmPassword = !showConfirmPassword"
                       class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit"
                  :disabled="isSubmittingPassword || !passwordForm.new_password"
                  class="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Loader2 v-if="isSubmittingPassword" class="w-4 h-4 animate-spin mr-2" />
                  Ubah Kata Sandi
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <!-- Content: Tampilan -->
        <section v-if="activeTab === 'appearance'" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="space-y-1">
            <h2 class="text-xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-tight">Pengaturan Tampilan</h2>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Sesuaikan bagaimana dashboard Anda tampil di berbagai perangkat.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              @click="mode = 'light'"
              :class="[
                'p-6 rounded-[2.5rem] border-2 transition-all space-y-4 text-left group',
                mode === 'light' 
                  ? 'border-blue-600 bg-white dark:bg-zinc-800' 
                  : 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900/30'
              ]"
            >
              <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <Sun class="w-6 h-6" />
              </div>
              <div>
                <p class="font-black text-xs uppercase tracking-widest text-zinc-900 dark:text-white">Terang (Light)</p>
                <p class="text-[10px] font-medium text-zinc-400 mt-1 uppercase">Bersih & Klasik</p>
              </div>
            </button>

            <button 
              @click="mode = 'dark'"
              :class="[
                'p-6 rounded-[2.5rem] border-2 transition-all space-y-4 text-left group',
                mode === 'dark' 
                  ? 'border-blue-600 bg-white dark:bg-zinc-800 shadow-2xl shadow-blue-500/10' 
                  : 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900/30'
              ]"
            >
              <div class="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
                <Moon class="w-6 h-6" />
              </div>
              <div>
                <p class="font-black text-xs uppercase tracking-widest text-zinc-900 dark:text-white">Gelap (Dark)</p>
                <p class="text-[10px] font-medium text-zinc-400 mt-1 uppercase">Nyaman & Modern</p>
              </div>
            </button>

            <button 
              @click="mode = 'auto'"
              :class="[
                'p-6 rounded-[2.5rem] border-2 transition-all space-y-4 text-left group',
                mode === 'auto' 
                  ? 'border-blue-600 bg-white dark:bg-zinc-800' 
                  : 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900/30'
              ]"
            >
              <div class="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Laptop class="w-6 h-6" />
              </div>
              <div>
                <p class="font-black text-xs uppercase tracking-widest text-zinc-900 dark:text-white">Sistem (Sync)</p>
                <p class="text-[10px] font-medium text-zinc-400 mt-1 uppercase">Mengikuti Perangkat</p>
              </div>
            </button>
          </div>
        </section>

        <!-- Placeholder Sections -->
        <section v-if="['notifications', 'telegram'].includes(activeTab)" class="h-64 flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-500">
           <div class="w-20 h-20 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-300 dark:text-zinc-600 border border-dashed border-zinc-200 dark:border-zinc-700">
              <component :is="tabs.find(t => t.id === activeTab)?.icon" class="w-10 h-10" />
           </div>
           <p class="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Fitur ini sedang dalam pengembangan</p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  User, Lock, Monitor, Bell, Send, ShieldAlert, Loader2, Eye, EyeOff, Sun, Moon, Laptop, Loader
} from 'lucide-vue-next'
import { useLocalStorage, useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { changePassword, getProfile, updateProfile, deleteAccount } from '~/server/api/public/auth'
import { alertSuccess, alertError } from '@/lib/alert'
import Swal from 'sweetalert2'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Pengaturan Akun ',
  robots: 'noindex, nofollow'
})

const tabs = [
  { id: 'profile', name: 'Profil', icon: User },
  { id: 'password', name: 'Kata Sandi', icon: Lock },
  { id: 'appearance', name: 'Tampilan', icon: Monitor },
  { id: 'notifications', name: 'Notifikasi', icon: Bell },
  { id: 'telegram', name: 'Telegram', icon: Send },
]

const activeTab = ref('profile')
const mode = useColorMode()

const userId = ref('')
const name = useLocalStorage('name', 'User')
const email = useLocalStorage('email', 'user@example.com')
const token = useLocalStorage('token', '')

const isSubmittingProfile = ref(false)
const isSubmittingPassword = ref(false)
const isLoadingProfile = ref(false)

const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordForm = ref({
  old_password: '',
  new_password: '',
  confirm_password: ''
})

const fetchProfile = async () => {
    if (!token.value) return
    
    isLoadingProfile.value = true
    try {
        const res = await getProfile(token.value)
        const result = await res.json()
        if (res.ok && result.success) {
            userId.value = result.payload.id
            name.value = result.payload.name
            email.value = result.payload.email
        }
    } catch (error) {
        console.error('Failed to fetch profile', error)
    } finally {
        isLoadingProfile.value = false
    }
}

onMounted(() => {
    fetchProfile()
})

const handleSaveProfile = async () => {
    if (!userId.value) {
        alertError('Profil ID tidak ditemukan. Coba segarkan halaman.')
        return
    }

    isSubmittingProfile.value = true
    try {
        const res = await updateProfile(userId.value, {
            name: name.value,
            email: email.value
        }, token.value)
        
        const result = await res.json()
        if (res.ok && result.success) {
            alertSuccess('Profil berhasil diperbarui!')
        } else {
            alertError(result.message || 'Gagal memperbarui profil.')
        }
    } catch (error) {
        alertError('Gagal terhubung ke server untuk memperbarui profil.')
    } finally {
        isSubmittingProfile.value = false
    }
}

const handleChangePassword = async () => {
    if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
        alertError('Konfirmasi kata sandi baru tidak cocok!')
        return
    }

    if (passwordForm.value.new_password.length < 6) {
        alertError('Kata sandi baru minimal 6 karakter!')
        return
    }

    isSubmittingPassword.value = true
    try {
        const res = await changePassword({
            old_password: passwordForm.value.old_password,
            new_password: passwordForm.value.new_password
        }, token.value)
        
        const result = await res.json()
        if (res.ok && result.success) {
            alertSuccess('Kata sandi berhasil diperbarui!')
            passwordForm.value = { old_password: '', new_password: '', confirm_password: '' }
        } else {
            alertError(result.message || 'Gagal mengubah kata sandi. Pastikan sandi lama benar.')
        }
    } catch (error) {
        alertError('Terjadi kesalahan jaringan saat memproses permintaan Anda.')
    } finally {
        isSubmittingPassword.value = false
    }
}

const handleDeleteAccount = async () => {
    if (!userId.value) return

    const result = await Swal.fire({
        title: 'Hapus Akun?',
        text: 'Aksi ini tidak dapat dibatalkan. Semua data keuangan Anda akan hilang selamanya.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#71717a',
        confirmButtonText: 'Ya, Hapus Sekarang',
        cancelButtonText: 'Batal',
        background: mode.value === 'dark' ? '#18181b' : '#ffffff',
        color: mode.value === 'dark' ? '#ffffff' : '#18181b',
    })

    if (result.isConfirmed) {
        try {
            const res = await deleteAccount(userId.value, token.value)
            const data = await res.json()
            
            if (res.ok && data.success) {
                // Clear state and storage with empty strings for type safety
                token.value = ''
                name.value = ''
                email.value = ''
                userId.value = ''
                
                await Swal.fire({
                    title: 'Akun Dihapus',
                    text: 'Profil Anda telah dihapus secara permanen dari sistem.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: mode.value === 'dark' ? '#18181b' : '#ffffff',
                    color: mode.value === 'dark' ? '#ffffff' : '#18181b'
                })
                
                // Redirect to login
                navigateTo('/login')
            } else {
                alertError(data.message || 'Gagal menghapus akun.')
            }
        } catch (error) {
            alertError('Terjadi kesalahan saat menghapus data.')
        }
    }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
