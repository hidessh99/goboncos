<template>
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-w-2xl bg-white dark:bg-zinc-900 border-none rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      <CardContent class="p-10 sm:p-12">
        <!-- Headers -->
        <div class="mb-10 text-center sm:text-left">
          <h1 class="text-4xl font-black tracking-tighter mb-2 font-heading uppercase text-zinc-900 dark:text-white">
            Kebijakan <span class="text-blue-600">Privasi</span>
          </h1>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <p class="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest leading-none">
              Terakhir diperbarui: 05 April 2026
            </p>
          </div>
        </div>
        
        <!-- Content -->
        <div class="space-y-8 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-h-[50vh] overflow-y-auto pr-6 scrollbar-hide antialiased font-medium">
          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">1. Komitmen GoBoncos</h2>
            <p class="text-left">Selamat datang di GoBoncos. Kami berkomitmen penuh untuk melindungi privasi finansial Anda. Platform kami dirancang untuk membantu Anda mencatat transaksi tanpa membocorkan data sensitif kepada pihak yang tidak berwenang.</p>
          </section>
          
          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">2. Data Finansial & Investasi</h2>
            <p class="text-left">Kami mengumpulkan data yang Anda masukkan secara sukarela, termasuk namun tidak terbatas pada: saldo akun keuangan, riwayat transaksi, portofolio investasi, dan kategori pengeluaran. Data ini dienkripsi dan hanya dapat diakses oleh Anda melalui token autentikasi yang sah.</p>
          </section>
          
          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">3. Data Lokasi & Alamat</h2>
            <p class="text-left">Untuk kebutuhan personalisasi profil dan verifikasi akun, kami mengumpulkan data alamat yang meliputi Provinsi, Kota, dan Kecamatan. Data ini digunakan untuk memberikan konteks regional dalam laporan atau fitur spesifik lokasi di masa mendatang.</p>
          </section>
          
          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">4. Keamanan & Enkripsi</h2>
            <p class="text-left">GoBoncos menggunakan standar industri untuk mengamankan data Anda. Semua komunikasi antara browser Anda dan server kami menggunakan enkripsi SSL/TLS. Kami tidak membagikan riwayat transaksi Anda kepada jaringan periklanan atau pihak ketiga mana pun tanpa seizin Anda.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight text-left">5. Hak Akses Data</h2>
            <p class="text-left">Anda memiliki hak penuh untuk mengunduh (eksport) data transaksi Anda dalam format PDF atau Excel, serta hak untuk menghapus akun dan seluruh data terkait secara permanen melalui pengaturan profil.</p>
          </section>
        </div>

        <!-- Footer Action -->
        <div class="mt-10 pt-8 border-t border-zinc-50 dark:border-zinc-800">
          <NuxtLink to="/auth/register" class="group flex items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
               <ArrowLeft class="w-4 h-4" />
            </div>
            <span class="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Kembali ke Pendaftaran</span>
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

const appName = 'GoBoncos'

useSeoMeta({
  title: `Kebijakan Privasi - ${appName}`,
  description: `Pelajari bagaimana ${appName} menjaga keamanan data finansial dan investasi Anda.`,
})
</script>
