<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-2xl bg-white border-gray-200 text-black shadow-lg overflow-hidden">
      <CardContent class="pt-8 px-6 pb-6">
        <!-- Headers -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight mb-1 font-heading">Syarat dan Ketentuan</h1>
          <p class="text-sm text-zinc-500 leading-snug font-medium">
            Terakhir diperbarui: Maret 2026
          </p>
        </div>
        
        <!-- Content -->
        <div class="space-y-6 text-zinc-600 text-[13px] leading-relaxed h-[55vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
          <section>
            <h2 class="text-base font-bold text-black mb-2">1. Persetujuan Ketentuan</h2>
            <p>Dengan mengakses atau menggunakan GoKasir, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini serta Kebijakan Privasi kami. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, maka Anda tidak diizinkan untuk mengakses platform kami, mendaftarkan akun, atau menggunakan layanan kami. Ketentuan ini berlaku untuk semua individu yang berinteraksi dengan sistem kami.</p>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">2. Lisensi Penggunaan</h2>
            <p>Izin diberikan untuk mengunduh sementara satu salinan materi (informasi atau perangkat lunak) di situs web GoKasir hanya untuk tampilan transitori pribadi dan non-komersial. Ini adalah pemberian lisensi, bukan transfer hak milik, dan di bawah lisensi ini Anda tidak diperbolehkan untuk:</p>
            <ul class="list-disc pl-5 mt-3 space-y-2 font-medium">
              <li>Memodifikasi atau menyalin materi.</li>
              <li>Menggunakan materi untuk tujuan komersial apa pun, atau untuk tampilan publik apa pun (komersial atau non-komersial).</li>
              <li>Mencoba mendekompilasi atau merekayasa balik perangkat lunak apa pun yang terkandung di situs web GoKasir.</li>
              <li>Menghapus hak cipta atau notasi kepemilikan lainnya dari materi.</li>
            </ul>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">3. Penafian (Disclaimer)</h2>
            <p>Materi di situs web GoKasir disediakan atas dasar 'apa adanya'. GoKasir tidak memberikan jaminan, baik tersurat maupun tersirat, dan dengan ini menolak serta meniadakan semua jaminan lainnya termasuk, tanpa batasan, jaminan tersirat atau kondisi kelayakan jual, kesesuaian untuk tujuan tertentu, atau non-pelanggaran kekayaan intelektual atau pelanggaran hak lainnya.</p>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">4. Batasan Tanggung Jawab</h2>
            <p>Dalam keadaan apa pun GoKasir atau pemasoknya tidak bertanggung jawab atas kerusakan apa pun (termasuk, tanpa batasan, kerusakan atas hilangnya data atau keuntungan, atau karena gangguan bisnis) yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan materi di platform GoKasir, bahkan jika GoKasir atau perwakilan resmi GoKasir telah diberitahu secara lisan atau tertulis tentang kemungkinan kerusakan tersebut.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-black mb-2">5. Hukum yang Mengatur</h2>
            <p>Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia dan Anda tunduk secara tidak dapat ditarik kembali pada yurisdiksi eksklusif pengadilan di Negara atau lokasi tersebut.</p>
          </section>
        </div>

        <!-- Footer Action -->
        <div class="mt-8 pt-6 border-t border-zinc-100 text-center">
          <NuxtLink to="/auth/register" class="text-zinc-600 hover:text-black transition-colors hover:underline underline-offset-4 text-sm font-bold flex items-center justify-center gap-2">
            &larr; Kembali ke Pendaftaran
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Syarat dan Ketentuan - ${appName}`,
  description: `Baca syarat dan ketentuan penggunaan layanan ${appName}. Ketahui hak dan kewajiban Anda sebagai pengguna platform kasir pintar kami.`,
  ogTitle: `Syarat dan Ketentuan - ${appName}`,
  ogDescription: `Dokumen syarat dan ketentuan resmi penggunaan sistem ${appName}.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Syarat dan Ketentuan - ${appName}`,
  twitterDescription: `Pahami aturan penggunaan ${appName} demi kenyamanan berjualan.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'syarat dan ketentuan gokasir, gokasir pos indonesia, aturan pakai gokasir, aplikasi kasir gratis' },
    { name: 'author', content: 'GoKasir Team' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName }
  ]
})
</script>
