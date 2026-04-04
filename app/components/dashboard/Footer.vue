<template>
  <footer class="shrink-0 border-t border-gray-200 dark:border-zinc-800/60 bg-white dark:bg-[#09090b] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors duration-300">
    <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-600">
      <div class="w-4 h-4 rounded bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
        <ShoppingBag class="w-2.5 h-2.5 text-white" />
      </div>
      <span>&copy; {{ year }} GoKasir. All rights reserved.</span>
    </div>
    <div class="flex items-center gap-4 text-xs text-gray-400 dark:text-zinc-600">
      <NuxtLink to="/auth/privacy-policy" class="hover:text-gray-700 dark:hover:text-zinc-400 transition-colors">
        Kebijakan Privasi
      </NuxtLink>
      <span class="w-px h-3 bg-gray-200 dark:bg-zinc-800" />
      <NuxtLink to="/auth/terms-and-conditions" class="hover:text-gray-700 dark:hover:text-zinc-400 transition-colors">
        Syarat & Ketentuan
      </NuxtLink>
      <span class="w-px h-3 bg-gray-200 dark:bg-zinc-800" />
      <span class="text-gray-300 dark:text-zinc-700">v1.0.0</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next'
const year = new Date().getFullYear()
</script>
