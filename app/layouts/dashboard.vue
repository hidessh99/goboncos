<template>
  <DashboardBody>
    <slot />
  </DashboardBody>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

// --- SEO Dinamis ---
useHead({
  // Menambahkan akhiran nama aplikasi secara otomatis ke setiap judul halaman
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName
  }
})

useSeoMeta({
  title: appName,
  ogTitle: appName,
  description: 'Sistem POS & Manajemen Bisnis Terintegrasi untuk UMKM Indonesia. Kelola transaksi, stok, pelanggan, dan laporan keuangan dalam satu dashboard pintar.',
  ogDescription: 'Sistem POS & Manajemen Bisnis Terintegrasi untuk UMKM Indonesia. Kelola transaksi, stok, pelanggan, dan laporan keuangan dalam satu dashboard pintar.',
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  ogSiteName: appName,
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: appName,
  twitterDescription: 'Kelola bisnis UMKM Anda lebih efisien dengan GoKasir. Pantau penjualan, stok, dan laporan keuangan harian secara real-time.',
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }, // Dashboard internal pages are usually private
    { name: 'author', content: 'GoKasir Team' },
    { name: 'theme-color', content: '#6366f1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})
</script>