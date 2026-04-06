<template>
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-w-2xl bg-white dark:bg-zinc-900 border-none rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      <CardContent class="p-10 sm:p-12">
        <!-- Headers -->
        <div class="mb-10 text-center sm:text-left">
          <h1 class="text-4xl font-black tracking-tighter mb-2 font-heading uppercase text-zinc-900 dark:text-white leading-tight">
            Syarat & <span class="text-blue-600">Ketentuan</span>
          </h1>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <p class="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest leading-none">
              Efektif Per 05 April 2026
            </p>
          </div>
        </div>
        
        <!-- Content -->
        <div class="space-y-8 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-h-[50vh] overflow-y-auto pr-6 scrollbar-hide antialiased font-medium text-justify sm:text-left">
          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">1. Penggunaan Layanan</h2>
            <p class="text-left">Dengan mendaftar di GoBoncos, Anda setuju untuk menggunakan platform ini hanya untuk tujuan manajemen keuangan personal yang sah. Anda dilarang menggunakan GoBoncos untuk aktivitas ilegal, penipuan, atau pencucian uang.</p>
          </section>
          
          <section class="space-y-3 text-left">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">2. Akun & Keamanan</h2>
            <p class="text-left">Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi dan token akses Anda. GoBoncos tidak bertanggung jawab atas kerugian finansial yang disebabkan oleh kelalaian pengguna dalam mengamankan kredensial akun.</p>
          </section>
          
          <section class="space-y-3 text-left">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">3. Paket Langganan (Subscription)</h2>
            <p class="text-left">Kami menawarkan berbagai paket langganan (Trial, Basic, Pro, Advanced). Pemilihan paket menentukan kapasitas fitur yang dapat Anda akses, seperti jumlah akun keuangan dan fitur analitik. Pembayaran biaya langganan dilakukan di muka dan tidak dapat dikembalikan (*non-refundable*).</p>
          </section>
          
          <section class="space-y-3 text-left">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">4. Akurasi Data Transaksi</h2>
            <p class="text-left">GoBoncos adalah alat pencatatan. Kami tidak menjamin keakuratan laporan jika data yang diinput oleh pengguna tidak sesuai. Anda disarankan untuk melakukan rekonsiliasi data secara berkala antara akun riil dan catatan di aplikasi.</p>
          </section>
          
          <section class="space-y-3 text-left">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">5. Batasan Tanggung Jawab</h2>
            <p class="text-left">Dalam keadaan apa pun GoBoncos tidak bertanggung jawab atas kerugian tidak langsung, konsekuensial, atau kehilangan keuntungan yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan platform kami.</p>
          </section>
        </div>

        <!-- Footer Action -->
        <div class="mt-10 pt-8 border-t border-zinc-50 dark:border-zinc-800 text-center">
          <NuxtLink to="/auth/register" class="group flex items-center justify-center gap-3 mx-auto">
            <div class="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
               <ArrowLeft class="w-4 h-4" />
            </div>
            <span class="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Setuju & Kembali</span>
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()
const appName = config.public.APP_NAME || 'GoBoncos'
const url = useRequestURL()

useSeoMeta({
  title: `Syarat dan Ketentuan - ${appName}`,
  description: `Aturan main dan ketentuan penggunaan layanan manajamen keuangan GoBoncos.`,
  ogTitle: `Syarat dan Ketentuan - ${appName}`,
  ogDescription: `Aturan main dan ketentuan penggunaan layanan manajamen keuangan GoBoncos.`,
  ogImage: 'https://asset.hidessh.com/icon-hidessh2.png',
  ogUrl: url.href,
  ogType: 'website',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: `Syarat dan Ketentuan - ${appName}`,
  twitterDescription: `Aturan main dan ketentuan penggunaan layanan manajamen keuangan GoBoncos.`,
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
</script>
