<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm bg-white border-gray-200 text-black shadow-lg overflow-hidden">
      <CardContent class="pt-8 px-6 pb-6">
        <!-- Badge -->
        <Badge variant="outline" class="rounded-full text-zinc-600 border-zinc-200 bg-zinc-100 hover:bg-zinc-100 px-3 py-1 font-normal mb-6 w-max">
          Keamanan Terjamin
        </Badge>
        
        <!-- Headers -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight mb-1">Selamat Datang Kembali</h1>
          <p class="text-sm text-zinc-500 leading-snug">
            Masuk menggunakan email dan kata sandi Anda untuk mengelola bisnis.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <!-- Email -->
            <div class="space-y-2">
              <Label for="email" class="text-zinc-700">Alamat Email</Label>
              <Input 
                id="email" 
                v-model="form.email"
                type="email" 
                placeholder="halo@gmail.com" 
                class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-lg"
                required
              />
            </div>
            
            <!-- Password -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password" class="text-zinc-700">Kata Sandi</Label>
                <NuxtLink to="/auth/forgot-password" class="text-sm text-zinc-600 hover:underline underline-offset-4 decoration-zinc-300 font-semibold">
                  Lupa kata sandi?
                </NuxtLink>
              </div>
              <div class="relative">
                <Input 
                  id="password" 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="******" 
                  class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-lg pr-10 font-mono"
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

            <Button type="submit" :disabled="loading" class="w-full bg-black text-white hover:bg-zinc-800 mt-2 rounded-lg py-5 font-bold tracking-wide transition-all active:scale-95 shadow-lg shadow-black/10">
              {{ loading ? 'Memproses Masuk...' : 'Masuk Ke Dashboard' }}
            </Button>
            
            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-zinc-100"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-white px-2 text-zinc-400">Atau gunakan</span>
              </div>
            </div>

            <Button type="button" variant="outline" class="w-full bg-white border-zinc-200 text-black hover:bg-zinc-50 rounded-lg py-5 mt-1 font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Lanjutkan dengan Google
            </Button>
          </div>
          
          <div class="mt-8 text-center text-sm text-zinc-500">
            Belum memiliki akun? 
            <NuxtLink to="/auth/register" class="text-black hover:underline underline-offset-4 font-bold transition-colors ml-1">
              Daftar Gratis Sekarang
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff } from 'lucide-vue-next'
import { userLogin } from '@/server/api/public/auth'
import { alertSuccess, alertError, alertLoading } from '@/lib/alert'


definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Masuk - ${appName} | Kelola Bisnis Anda`,
  description: `Masuk ke akun ${appName} Anda. Platform kasir pintar gratis untuk UMKM guna mengelola transaksi, stok, dan laporan keuangan dengan mudah & cepat.`,
  ogTitle: `Login - ${appName}`,
  ogDescription: `Masuk ke akun ${appName} Anda untuk manajemen POS yang lebih efisien.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Login - ${appName}`,
  twitterDescription: `Kelola bisnis Anda lebih mudah dengan masuk ke akun ${appName}.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'login gokasir, aplikasi kasir, kasir pintar, pos gratis, manajemen umkm, gokasir indonesia' },
    { name: 'author', content: 'GoKasir Team' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName }
  ]
})

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

// Session storage using VueUse
const token = useLocalStorage('token', null)
const role = useLocalStorage('role', null)
const name = useLocalStorage('name', null)
const email = useLocalStorage('email', null)
const tokenType = useLocalStorage('token_type', 'Bearer')

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await userLogin(form.value)
    const result = await response.json()
    if (response.ok) {
      // Store session data in LocalStorage via VueUse
      if (result.payload) {
        token.value = result.payload.token || null
        role.value = result.payload.role || null
        name.value = result.payload.name || null
        email.value = result.payload.email || null
        tokenType.value = result.payload.token_type || 'Bearer'
      }

      await alertSuccess('Masuk berhasil! Selamat datang kembali.')
      navigateTo('/dashboard') 
    } else {
      alertError(result.message || 'Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.')
    }
  } catch (error) {
    console.error('Login error:', error)
    alertError('Terjadi kesalahan saat masuk. Silakan coba lagi.')
  } finally {
    loading.value = false
  }
}
</script>
