<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-2xl bg-white border-gray-200 text-black shadow-lg overflow-hidden">
      <CardContent class="pt-8 px-6 pb-6">
        <!-- Headers -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight mb-1 font-heading">Kebijakan Privasi</h1>
          <p class="text-sm text-zinc-500 leading-snug font-medium">
            Terakhir diperbarui: Maret 2026
          </p>
        </div>
        
        <!-- Content -->
        <div class="space-y-6 text-zinc-600 text-[13px] leading-relaxed h-[55vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
          <section>
            <h2 class="text-base font-bold text-black mb-2">1. Pendahuluan</h2>
            <p>Selamat datang di GoKasir. Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan privasi ini akan menginformasikan kepada Anda tentang bagaimana kami menjaga data pribadi Anda saat Anda mengunjungi situs web kami, serta memberitahu Anda tentang hak privasi Anda dan bagaimana hukum melindungi Anda.</p>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">2. Data yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan, menggunakan, menyimpan, dan mentransfer berbagai jenis data pribadi tentang Anda yang telah kami kelompokkan sebagai berikut: Data Identitas, Data Kontak, Data Teknis, Data Penggunaan, serta Data Pemasaran dan Komunikasi. Hal ini termasuk informasi yang Anda berikan saat membuat akun.</p>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">3. Bagaimana Kami Menggunakan Data Anda</h2>
            <p>Kami hanya akan menggunakan data pribadi Anda jika hukum mengizinkannya. Secara umum, kami akan menggunakan data pribadi Anda untuk menyediakan layanan bagi Anda, berkomunikasi dengan Anda (termasuk mengirim pesan administratif), dan untuk meningkatkan pengalaman pengguna di platform kami.</p>
          </section>
          
          <section>
            <h2 class="text-base font-bold text-black mb-2">4. Keamanan Data</h2>
            <p>Kami telah menerapkan langkah-langkah keamanan yang tepat untuk mencegah data pribadi Anda hilang secara tidak sengaja, digunakan, atau diakses secara tidak sah, diubah, atau diungkapkan. Kami membatasi akses ke data pribadi Anda hanya kepada karyawan dan pihak ketiga yang memiliki kebutuhan bisnis untuk mengetahuinya.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-black mb-2">5. Hak Hukum Anda</h2>
            <p>Dalam kondisi tertentu, Anda memiliki hak berdasarkan undang-undang perlindungan data terkait data pribadi Anda, termasuk hak untuk meminta akses, koreksi, penghapusan, pembatasan, transfer, atau keberatan terhadap pemrosesan. Jika Anda ingin menggunakan hak-hak ini, silakan hubungi tim dukungan kami.</p>
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
  title: `Kebijakan Privasi - ${appName}`,
  description: `Pelajari bagaimana ${appName} menjaga keamanan data Anda. Kami berkomitmen untuk melindungi privasi setiap pengguna platform kasir kami.`,
  ogTitle: `Kebijakan Privasi - ${appName}`,
  ogDescription: `Informasi lengkap mengenai kebijakan penggunaan data di ${appName}.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Kebijakan Privasi - ${appName}`,
  twitterDescription: `Keamanan data Anda adalah prioritas kami di ${appName}.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ],
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'kebijakan privasi gokasir, data gokasir, privasi aplikasi kasir, gokasir pos indonesia' },
    { name: 'author', content: 'GoKasir Team' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName }
  ]
})
</script>
