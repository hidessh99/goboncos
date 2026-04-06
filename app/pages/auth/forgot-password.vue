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
        <div class="mb-8 text-center px-4">
          <h1 class="text-2xl font-extrabold tracking-tight mb-2 italic">Lupa Sandi? 🧠</h1>
          <p class="text-sm text-zinc-500 leading-relaxed font-medium">
            Tarang aja, masukin email lo di bawah. Kita bantu kirim link biar lo bisa tetep <span class="text-rose-500 font-bold italic">mindful</span> soal duit.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleResetRequest">
          <div class="space-y-5">
            
            <!-- Email -->
            <div class="space-y-1.5 ml-1">
              <Label for="email" class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Email Terdaftar</Label>
              <Input 
                id="email" 
                v-model="email"
                type="email" 
                placeholder="rehat@genz.com" 
                class="h-12 bg-zinc-50 border-zinc-100 text-black focus-visible:ring-black placeholder:text-zinc-300 rounded-[1rem] transition-all"
                required
              />
            </div>

            <Button type="submit" :disabled="loading" class="w-full h-14 bg-black text-white hover:bg-zinc-800 mt-2 rounded-[1rem] font-bold tracking-wide transition-all active:scale-[0.97] shadow-xl shadow-black/10 group">
              <span v-if="loading" class="flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                Tunggu ya...
              </span>
              <span v-else class="flex items-center gap-2">
                Kirim Link Reset
                <Sparkles class="h-4 w-4 text-rose-300 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </div>
          
          <div class="mt-10 text-center text-sm font-medium">
            <span class="text-zinc-400">Udah inget sandinya?</span>
            <NuxtLink to="/auth/login" class="text-black hover:text-rose-600 underline underline-offset-8 decoration-zinc-100 hover:decoration-rose-100 transition-all font-bold ml-2">
              Masuk Sini Gih
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
import { Sparkles } from 'lucide-vue-next'
import { alertSuccess, alertError } from '@/lib/alert'


definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const appName = config.public.APP_NAME || 'GO Boncos'
const url = useRequestURL()

const email = ref('')
const loading = ref(false)

useSeoMeta({
  title: `Lupa Kata Sandi - ${appName} | Atur Duit Jadi Chill`,
  description: `Reset password akun ${appName} lo biar bisa lanjut pantau saldo healing lo. Gak pake ribet!`,
  ogTitle: `Lupa Kata Sandi - ${appName}`,
  ogDescription: `Layanan pemulihan akun buat lo yang lupa sandinya. Tarang aja kita bantu.`,
  ogImage: 'https://asset.hidessh.com/icon-hidessh2.png',
  ogUrl: url.href,
  ogType: 'website',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: `Lupa Kata Sandi - ${appName} | Atur Duit Jadi Chill`,
  twitterDescription: `Reset password akun ${appName} lo biar bisa lanjut pantau saldo healing lo.`,
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
  ]
})

const handleResetRequest = async () => {
  loading.value = true
  try {
    // Call reset password API logic here in the future
    await alertSuccess('Link reset berasil dikirim ke email lo!')
  } catch (err) {
    alertError('Yah, ada masalah pas kirim link. Coba lagi bentar lagi ya.')
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

