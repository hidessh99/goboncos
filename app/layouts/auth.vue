<template>
  <div class="min-h-screen bg-gray-50 text-black flex flex-col items-center justify-center p-4 selection:bg-zinc-200">
    <div class="w-full max-w-md flex flex-col gap-6">
      <header class="flex justify-center">
        <!-- Optional auth header content can go here -->
      </header>
      
      <main class="w-full">
        <slot />
      </main>

      <footer class="text-center text-sm text-zinc-400 mt-4">
        &copy; 2026 GoKasir. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

// --- SEO Dinamis ---
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName
  }
})

useSeoMeta({
  title: appName,
  ogTitle: appName,
  description: 'Sistem POS Generasi Baru untuk Semua Kebutuhan Bisnis Anda.',
  ogDescription: 'Sistem POS Generasi Baru untuk Semua Kebutuhan Bisnis Anda.',
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})
</script>
