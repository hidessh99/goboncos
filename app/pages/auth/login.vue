<template>
  <div class="flex items-center justify-center min-h-screen bg-zinc-50/50 p-4 font-sans selection:bg-rose-100 selection:text-rose-900">
    <!-- Background Decoration -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-50/50 blur-[100px]"></div>
      <div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-50/50 blur-[100px]"></div>
    </div>

    <Card class="w-full max-w-sm bg-white border-zinc-100 text-black shadow-2xl shadow-zinc-200/50 rounded-[2.5rem] overflow-hidden relative z-10 transition-all hover:shadow-zinc-300/50">
      <CardContent class="pt-10 px-8 pb-10">
        <!-- Logo & Branding -->
        <div class="flex flex-col items-center mb-10">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-bold text-2xl mb-4 shadow-lg shadow-black/20 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">G</div>
          <h2 class="text-xl font-black tracking-tight uppercase">{{ appName }}</h2>
        </div>
        
        <!-- Headers -->
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-extrabold tracking-tight mb-2">Selamat Datang 👋</h1>
          <p class="text-sm text-zinc-500 leading-relaxed font-medium">
            Masuk buat lanjutin pantau duit lo biar gak <span class="text-rose-500 font-bold italic">boncos</span> bulan ini.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <div class="space-y-5">
            <!-- Email -->
            <div class="space-y-2">
              <Label for="email" class="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Keren Lo</Label>
              <div class="relative group">
                <Input 
                  id="email" 
                  v-model="form.email"
                  type="email" 
                  placeholder="halo@genz.com" 
                  class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem] transition-all group-hover:bg-zinc-100/50"
                  required
                />
              </div>
            </div>
            
            <!-- Password -->
            <div class="space-y-2">
              <div class="flex items-center justify-between ml-1">
                <Label for="password" class="text-xs font-bold text-zinc-500 uppercase tracking-widest">Kata Sandi</Label>
                <NuxtLink to="/auth/forgot-password" class="text-[10px] text-zinc-400 hover:text-rose-500 transition-colors font-bold uppercase tracking-wider">
                  Lupa?
                </NuxtLink>
              </div>
              <div class="relative group">
                <Input 
                  id="password" 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="Sssttt..." 
                  class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem] pr-10 transition-all group-hover:bg-zinc-100/50"
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

            <Button type="submit" :disabled="loading" class="w-full h-14 bg-black text-white hover:bg-zinc-800 mt-2 rounded-[1rem] font-bold tracking-wide transition-all active:scale-[0.97] shadow-xl shadow-black/10 group">
              <span v-if="loading" class="flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                Sabar ya...
              </span>
              <span v-else class="flex items-center gap-2">
                Mulai Sekarang
                <Sparkles class="h-4 w-4 text-yellow-400 group-hover:animate-pulse" />
              </span>
            </Button>
            
            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-zinc-100"></span>
              </div>
              <div class="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
                <span class="bg-white px-4 text-zinc-300">Atau Pake</span>
              </div>
            </div>

            <Button type="button" variant="outline" class="w-full h-14 bg-white border-zinc-100 text-black hover:bg-zinc-50 rounded-[1rem] font-bold shadow-sm transition-all active:scale-[0.97] flex items-center justify-center gap-3">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Account
            </Button>
          </div>
          
          <div class="mt-10 text-center text-sm font-medium">
            <span class="text-zinc-400">Belum punya akun?</span>
            <NuxtLink to="/auth/register" class="text-black hover:text-rose-600 underline underline-offset-8 decoration-zinc-100 hover:decoration-rose-200 transition-all font-bold ml-2">
              Daftar Gratis
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
import { Eye, EyeOff, Sparkles } from 'lucide-vue-next'
import { userLogin } from '@/server/api/public/auth'
import { alertSuccess, alertError } from '@/lib/alert'


definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const appName = config.public.APP_NAME || 'GO Boncos'
const url = useRequestURL()

useSeoMeta({
  title: `Masuk - ${appName} | Atur Duit Jadi Chill`,
  description: `Masuk ke akun ${appName} lo. Satu-satunya aplikasi pengelola keuangan yang paham gaya hidup Gen Z. Biar gak boncos terus!`,
  ogTitle: `Masuk - ${appName}`,
  ogDescription: `Gak pake overthinking, masuk ke ${appName} buat pantau saldo healing lo.`,
  ogImage: '/og-image.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
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
      alertError(result.message || 'Gagal masuk. Periksa lagi email/password lo ya.')
    }
  } catch (error) {
    console.error('Login error:', error)
    alertError('Terjadi kesalahan saat masuk. Coba lagi bentar lagi.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.font-sans {
  font-family: 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
}
</style>

