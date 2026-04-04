<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm bg-white border-gray-200 text-black shadow-lg overflow-hidden">
      <CardContent class="pt-8 px-6 pb-6">
        <!-- Headers -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight mb-1">Daftar Akun Baru</h1>
          <p class="text-sm text-zinc-500 leading-snug font-medium">
            Lengkapi data di bawah ini untuk mulai mengelola bisnis Anda.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister">
          <div class="space-y-4">
            
            <!-- Name -->
            <div class="space-y-1.5">
              <Label for="name" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Nama Lengkap</Label>
              <Input 
                id="name" 
                v-model="form.name"
                type="text" 
                placeholder="Contoh: Budi Santoso" 
                class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl"
                required
              />
            </div>
            
            <!-- Phone Number -->
            <div class="space-y-1.5">
              <Label for="phone" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Nomor Telepon (WhatsApp)</Label>
              <Input 
                id="phone" 
                v-model="form.phone_number"
                type="text" 
                placeholder="628XXXXXXXXX" 
                class="bg-white border-zinc-200 text-black font-mono focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl"
                @input="form.phone_number = form.phone_number.replace(/[^0-9]/g, '')"
                required
              />
            </div>

            <!-- Company Name -->
            <div class="space-y-1.5">
              <Label for="company_name" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Nama Bisnis / Toko</Label>
              <Input 
                id="company_name" 
                v-model="form.company_name"
                type="text" 
                placeholder="Contoh: Toko Berkah" 
                class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl"
                required
              />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <Label for="email" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Alamat Email</Label>
              <Input 
                id="email" 
                v-model="form.email"
                type="email" 
                placeholder="nama@gmail.com" 
                class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl"
                required
              />
            </div>
            
            <!-- Password -->
            <div class="space-y-1.5">
              <div class="relative">
                <Label for="password" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Kata Sandi</Label>
                <div class="relative mt-1">
                  <Input 
                    id="password" 
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="******" 
                    class="bg-white border-zinc-200 text-black font-mono focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl pr-10"
                    required
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOff v-if="!showPassword" class="h-4 w-4" />
                    <Eye v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div class="text-[10px] text-zinc-400 text-center px-2 pt-4 pb-1 leading-relaxed">
              Dengan mendaftar, Anda menyetujui 
              <NuxtLink to="/auth/terms-and-conditions" class="underline underline-offset-4 text-zinc-600 hover:text-black font-bold">Ketentuan Layanan</NuxtLink> 
              dan 
              <NuxtLink to="/auth/privacy-policy" class="underline underline-offset-4 text-zinc-600 hover:text-black font-bold">Kebijakan Privasi</NuxtLink> kami.
            </div>

            <Button type="submit" :disabled="loading" class="w-full bg-black text-white hover:bg-zinc-800 mt-2 rounded-xl py-6 font-bold shadow-lg shadow-black/10 transition-all active:scale-[0.98]">
              {{ loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang' }}
            </Button>
          </div>
          
          <div class="mt-8 text-center text-sm text-zinc-500">
            Sudah memiliki akun? 
            <NuxtLink to="/auth/login" class="text-black hover:underline underline-offset-4 font-bold transition-colors ml-1">
              Masuk Di Sini
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-vue-next'
import { userRegister } from '@/server/api/public/auth'
import { alertSuccess, alertError, alertWarning, alertLoading } from '@/lib/alert'


definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Daftar Akun Baru - ${appName} | Mulai Kelola Bisnis Gratis`,
  description: `Daftar di ${appName} sekarang. Platform kasir pintar gratis untuk UMKM guna mengelola transaksi, stok, dan laporan keuangan dengan aman dan efisien.`,
  ogTitle: `Daftar Akun Baru - ${appName}`,
  ogDescription: `Gabung dengan ${appName} untuk manajemen POS yang lebih modern dan cepat.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Daftar Akun Baru - ${appName}`,
  twitterDescription: `Solusi kasir pintar UMKM Indonesia - Daftar di ${appName} sekarang.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'daftar gokasir, aplikasi kasir gratis, pos indonesia, aplikasi kasir umkm, manajemen gokasir' },
    { name: 'author', content: 'GoKasir Team' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName }
  ]
})

const form = ref({
  name: '',
  email: '',
  phone_number: '',
  company_name: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const handleRegister = async () => {
  // Validate phone number
  if (!form.value.phone_number.startsWith('62')) {
    alertWarning('Nomor telepon harus dimulai dengan kode negara 62')
    return
  }
  if (form.value.phone_number.length < 10) {
    alertWarning('Nomor telepon minimal harus 10 karakter')
    return
  }

  loading.value = true

  try {
    const response = await userRegister(form.value)
    const result = await response.json()
    if (response.ok) {
      await alertSuccess('Pendaftaran berhasil! Silakan masuk untuk melanjutkan.')
      navigateTo('/auth/login')
    } else {
      alertError(result.message || 'Gagal melakukan pendaftaran. Silakan coba kembali.')
    }
  } catch (error) {
    console.error('Register error:', error)
    alertError('Terjadi kesalahan saat pendaftaran. Silakan coba lagi nanti.')
  } finally {
    loading.value = false
  }
}
</script>
