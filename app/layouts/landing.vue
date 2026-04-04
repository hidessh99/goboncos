<template>
  <div class="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
    
    <!-- Navbar -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="[isScrolled ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm' : 'bg-transparent']"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Logo -->
          <div class="flex items-center gap-2 shrink-0">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              G
            </div>
            <span class="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">GoKasir</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            <a href="/#fitur" class="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">Fitur</a>
            <a href="/#solusi" class="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">Solusi Bisnis</a>
            <a href="/#harga" class="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">Harga</a>
            <a href="/#testimoni" class="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">Testimoni</a>
          </nav>

          <!-- Auth Buttons -->
          <div class="hidden md:flex items-center gap-3">
            <Button variant="ghost" class="text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800" as-child>
              <NuxtLink to="/auth/login">Log in</NuxtLink>
            </Button>
            <Button class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 text-sm font-medium shadow-lg shadow-indigo-500/20" as-child>
              <NuxtLink to="/auth/register">Coba Gratis</NuxtLink>
            </Button>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
      >
        <div class="px-4 py-6 space-y-4">
          <a href="/#fitur" @click="isMobileMenuOpen = false" class="block text-base font-medium text-zinc-900 dark:text-white">Fitur</a>
          <a href="/#solusi" @click="isMobileMenuOpen = false" class="block text-base font-medium text-zinc-900 dark:text-white">Solusi Bisnis</a>
          <a href="/#harga" @click="isMobileMenuOpen = false" class="block text-base font-medium text-zinc-900 dark:text-white">Harga</a>
          <a href="/#testimoni" @click="isMobileMenuOpen = false" class="block text-base font-medium text-zinc-900 dark:text-white">Testimoni</a>
          <div class="pt-4 flex flex-col gap-3">
            <Button variant="outline" class="w-full justify-center h-11" as-child>
              <NuxtLink to="/auth/login">Log in</NuxtLink>
            </Button>
            <Button class="w-full justify-center h-11 bg-indigo-600 hover:bg-indigo-700 text-white" as-child>
              <NuxtLink to="/auth/register">Coba Gratis</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <!-- Brand -->
          <div class="col-span-2 lg:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                G
              </div>
              <span class="font-bold text-xl text-zinc-900 dark:text-white">GoKasir</span>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-6 max-w-xs">
              GoKasir adalah platform POS & Manajemen Bisnis terpadu untuk memberdayakan UMKM di seluruh Indonesia agar semakin maju.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-semibold text-zinc-900 dark:text-white mb-4">Layanan</h4>
            <ul class="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Point of Sale</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Digital Payment</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Manajemen Stok</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Manajemen Pelanggan</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GoKasir Hardware</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-zinc-900 dark:text-white mb-4">Solusi</h4>
            <ul class="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Kedai Kopi & Cafe</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Restoran Cepat Saji</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Toko Retail</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Barbershop & Salon</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-zinc-900 dark:text-white mb-4">Perusahaan</h4>
            <ul class="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Karir</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog & Artikel</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; 2026 GoKasir Technologies. All rights reserved.
          </p>
          <div class="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Syarat Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-vue-next'

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

// --- SEO Dinamis ---
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName
  }
})

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
