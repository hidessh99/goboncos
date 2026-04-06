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
        <div class="flex flex-col items-center mb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-bold text-2xl mb-4 shadow-lg shadow-black/20 transform rotate-3 hover:rotate-0 transition-transform cursor-default">G</div>
          <h2 class="text-xl font-black tracking-tight uppercase">{{ appName }}</h2>
        </div>

        <!-- Headers -->
        <div class="mb-8 text-center px-4">
          <h1 class="text-2xl font-extrabold tracking-tight mb-2 italic">Mulai Hidup Anti-Boncos 🚀</h1>
          <p class="text-sm text-zinc-500 leading-relaxed font-medium">
            Join bareng <span class="text-black font-bold">50.000+</span> anak muda lainnya yang udah mulai <span class="text-indigo-600 font-bold underline decoration-indigo-100 underline-offset-4">mindful</span> soal duit.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister">
          <div class="space-y-4">
            
            <!-- Name -->
            <div class="space-y-1.5">
              <Label for="name" class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Nama Panggilan</Label>
              <Input 
                id="name" 
                v-model="form.name"
                type="text" 
                placeholder="Misal: Budi Chill" 
                class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem]"
                required
              />
            </div>
            
            <!-- Phone Number -->
            <div class="space-y-1.5">
              <Label for="phone" class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">WhatsApp</Label>
              <Input 
                id="phone" 
                v-model="form.phone_number"
                type="text" 
                placeholder="62812..." 
                class="h-12 bg-zinc-50 border-zinc-100 text-black font-mono focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem]"
                @input="form.phone_number = form.phone_number.replace(/[^0-9]/g, '')"
                required
              />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <Label for="email" class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Email Aktif</Label>
              <Input 
                id="email" 
                v-model="form.email"
                type="email" 
                placeholder="halo@lifestyle.com" 
                class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem]"
                required
              />
            </div>
            
            <!-- Password -->
            <div class="space-y-1.5">
              <div class="relative">
                <Label for="password" class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Kata Sandi Rahasia</Label>
                <div class="relative mt-1">
                  <Input 
                    id="password" 
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="Sssttt..." 
                    class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem] pr-10"
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

            <div class="text-[10px] text-zinc-400 text-center px-6 mt-6 mb-4 leading-relaxed font-medium">
              Dengan daftar, lo setuju sama 
              <NuxtLink to="/auth/terms-and-conditions" class="underline underline-offset-4 text-zinc-600 hover:text-black font-bold">Syarat & Ketentuan</NuxtLink> 
              serta 
              <NuxtLink to="/auth/privacy-policy" class="underline underline-offset-4 text-zinc-600 hover:text-black font-bold">Kebijakan Privasi</NuxtLink> kita.
            </div>

            <Button type="submit" :disabled="loading" class="w-full h-14 bg-black text-white hover:bg-zinc-800 rounded-[1rem] font-bold tracking-wide shadow-xl shadow-black/10 transition-all active:scale-[0.97] group">
              <span v-if="loading" class="flex items-center gap-2">
                  <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                  Lagi diproses...
              </span>
              <span v-else class="flex items-center gap-2">
                  Gas, Daftar Sekarang
                  <Sparkles class="h-4 w-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            
            <div class="mt-8 text-center text-sm font-medium">
              <span class="text-zinc-400">Udah ada akun?</span>
              <NuxtLink to="/auth/login" class="text-black hover:text-indigo-600 underline underline-offset-8 decoration-zinc-100 hover:decoration-indigo-200 transition-all font-bold ml-2">
                Masuk Aja
              </NuxtLink>
            </div>
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
import { Eye, EyeOff, Sparkles } from 'lucide-vue-next'
import { userRegister } from '@/server/api/public/auth'
import { alertSuccess, alertError, alertWarning } from '@/lib/alert'


definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const appName = config.public.APP_NAME || 'GO Boncos'
const url = useRequestURL()

useSeoMeta({
  title: `Daftar Akun Baru - ${appName} | Mulai Hidup Mindful`,
  description: `Daftar di ${appName} sekarang. Satu-satunya aplikasi pengelola keuangan yang paham gaya hidup Gen Z. Biar gak boncos terus!`,
  ogTitle: `Daftar Akun Baru - ${appName}`,
  ogDescription: `Gabung bareng 50rb+ teman lainnya yang udah mulai hidup teratur tanpa kehilangan momen seru.`,
  ogImage: 'https://asset.hidessh.com/icon-hidessh2.png',
  ogUrl: url.href,
  ogType: 'website',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: `Daftar Akun Baru - ${appName} | Mulai Hidup Mindful`,
  twitterDescription: `Gabung bareng 50rb+ teman lainnya yang udah mulai hidup teratur tanpa kehilangan momen seru.`,
  author: 'HideSSH',
  keywords: 'pencatatan keuangan, investasi, goboncos',
  themeColor: '#009eed',
})

useHead({
  htmlAttrs: {
    lang: 'id'
  },
  meta: [
    { name: 'google-site-verification', content: 'upWtkn9Ubcvz1-9qrUWsJcFs2TkFkshvmMfsgdhLf2k' }
  ],
  link: [
    { rel: 'shortcut icon', type: 'image/png', href: 'https://asset.hidessh.com/icon-hidessh2.png' },
    { rel: 'icon', type: 'image/svg+xml', href: 'https://asset.hidessh.com/icon-hidessh2.png' },
    { rel: 'apple-touch-icon', href: 'https://asset.hidessh.com/icon-hidessh2.png' }
  ]
})

const form = ref({
  name: '',
  email: '',
  phone_number: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const handleRegister = async () => {
  if (!form.value.phone_number.startsWith('62')) {
    alertWarning('Nomor WA harus mulai pake 62 ya!')
    return
  }
  if (form.value.phone_number.length < 10) {
    alertWarning('Nomor WA lo kependekan deh kayaknya.')
    return
  }

  loading.value = true

  try {
    const response = await userRegister(form.value)
    const result = await response.json()
    if (response.ok) {
      await alertSuccess('Pendaftaran berhasil! Siap buat hidup anti-boncos.')
      navigateTo('/auth/login')
    } else {
      alertError(result.message || 'Gagal daftar. Coba cek lagi datanya ya.')
    }
  } catch (error) {
    console.error('Register error:', error)
    alertError('Terjadi kesalahan. Coba lagi bentar lagi ya.')
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

