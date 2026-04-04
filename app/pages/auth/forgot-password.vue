<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm bg-white border-gray-200 text-black shadow-lg overflow-hidden">
      <CardContent class="pt-8 px-6 pb-6">
        <!-- Headers -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight mb-1">Lupa Kata Sandi</h1>
          <p class="text-sm text-zinc-500 leading-snug font-medium">
            Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent>
          <div class="space-y-4">
            
            <!-- Email -->
            <div class="space-y-1.5">
              <Label for="email" class="text-xs font-bold text-zinc-700 uppercase tracking-wider">Alamat Email Terdaftar</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="halo@bisnisanda.com" 
                class="bg-white border-zinc-200 text-black focus-visible:ring-zinc-400 placeholder:text-zinc-400 rounded-xl"
              />
            </div>

            <Button type="submit" class="w-full bg-black text-white hover:bg-zinc-800 mt-2 rounded-xl py-6 font-bold shadow-lg shadow-black/10 transition-all active:scale-[0.98]">
              Kirim Tautan Atur Ulang
            </Button>
          </div>
          
          <div class="mt-8 text-center text-sm text-zinc-500 font-medium">
            Sudah ingat kata sandi Anda? 
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
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Lupa Kata Sandi - ${appName}`,
  description: `Atur ulang kata sandi akun ${appName} Anda dengan aman untuk kembali mengelola bisnis Anda tanpa hambatan.`,
  ogTitle: `Lupa Kata Sandi - ${appName}`,
  ogDescription: `Layanan pemulihan akun untuk pengguna ${appName}.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Lupa Kata Sandi - ${appName}`,
  twitterDescription: `Atur ulang kata sandi ${appName} Anda untuk kembali berjualan.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'noindex, follow' },
    { name: 'keywords', content: 'reset password gokasir, lupa sandi gokasir, gokasir pos, pemulihan akun' },
    { name: 'author', content: 'GoKasir Team' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName }
  ]
})
</script>
