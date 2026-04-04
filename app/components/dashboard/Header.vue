<template>
  <header class="h-14 shrink-0 flex items-center justify-between px-4 border-b border-gray-200 dark:border-zinc-800/60 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-sm sticky top-0 z-20 transition-colors duration-300">
    <!-- Left: Toggle + Breadcrumb -->
    <div class="flex items-center gap-3">
      <SidebarTrigger class="h-8 w-8 text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/60" />

      <Separator orientation="vertical" class="h-4 bg-gray-200 dark:bg-zinc-800" />

      <nav class="hidden sm:flex items-center gap-1.5 text-sm text-gray-400 dark:text-zinc-500">
        <NuxtLink to="/dashboard" class="hover:text-gray-900 dark:hover:text-white transition-colors font-medium">GoKasir</NuxtLink>
        <ChevronRight class="w-3.5 h-3.5" />
        <span class="text-gray-900 dark:text-white font-medium capitalize">{{ currentPage }}</span>
      </nav>
    </div>

    <!-- Right: Notif + Avatar -->
    <div class="flex items-center gap-2">
      <!-- Notifications -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="relative h-8 w-8 text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/60">
            <Bell class="w-4 h-4" />
            <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-1 ring-white dark:ring-[#09090b]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-72 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white">
          <DropdownMenuLabel class="flex items-center justify-between">
            <span>Notifikasi</span>
            <Badge variant="secondary" class="text-xs bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border-0">3 Baru</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator class="bg-gray-100 dark:bg-zinc-800" />
          <div class="space-y-1 p-1">
            <NotifItem
              v-for="n in notifications"
              :key="n.id"
              :title="n.title"
              :time="n.time"
              :desc="n.desc"
              :unread="n.unread"
            />
          </div>
          <DropdownMenuSeparator class="bg-gray-100 dark:bg-zinc-800" />
          <DropdownMenuItem class="justify-center text-xs text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer">
            Lihat semua notifikasi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Theme Toggle -->
      <Button
        variant="ghost"
        size="icon"
        :title="isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'"
        class="h-8 w-8 text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/60 transition-colors"
        @click="toggleTheme"
      >
        <Transition name="theme-icon" mode="out-in">
          <Sun v-if="isDark" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </Transition>
      </Button>

      <!-- User Avatar -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/60 p-0">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage src="" alt="User" />
              <AvatarFallback class="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-[11px] font-semibold rounded-lg">
                {{ isMounted && userName ? userName.charAt(0).toUpperCase() : 'GK' }}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white">
          <DropdownMenuLabel class="font-normal">
            <p class="text-sm font-medium">{{ isMounted && userName ? userName : 'GoKasir Admin' }}</p>
            <p class="text-xs text-gray-400 dark:text-zinc-500">{{ isMounted && userEmail ? userEmail : 'admin@gokasir.com' }}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator class="bg-gray-100 dark:bg-zinc-800" />
          <DropdownMenuItem class="hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer gap-2 text-sm">
            <User class="w-4 h-4 text-gray-400 dark:text-zinc-400" /> Profil
          </DropdownMenuItem>
          <DropdownMenuItem class="hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer gap-2 text-sm">
            <Settings class="w-4 h-4 text-gray-400 dark:text-zinc-400" /> Pengaturan
          </DropdownMenuItem>
          <DropdownMenuSeparator class="bg-gray-100 dark:bg-zinc-800" />
          <DropdownMenuItem
            class="hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer gap-2 text-sm text-red-500 dark:text-red-400 focus:text-red-500"
            @click="handleLogout"
          >
            <LogOut class="w-4 h-4" /> Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  PanelLeft, ChevronRight, Bell, User, Settings, LogOut, Sun, Moon
} from 'lucide-vue-next'

const { isDark, toggle: toggleTheme } = useColorMode()

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[segments.length - 1] || 'Dashboard'
})

const notifications = [
  { id: 1, title: 'Pesanan Baru #1024', desc: 'Meja 3 memesan Nasi Goreng', time: '2 menit lalu', unread: true },
  { id: 2, title: 'Pembayaran Berhasil', desc: 'Pesanan #1023 telah dibayar', time: '15 menit lalu', unread: true },
  { id: 3, title: 'Menu Habis', desc: 'Ayam Bakar sudah habis', time: '1 jam lalu', unread: true },
]

const token = useLocalStorage<string | null>('token', null)
const role = useLocalStorage<string | null>('role', null)
const userName = useLocalStorage<string | null>('name', null)
const userEmail = useLocalStorage<string | null>('email', null)

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

function handleLogout() {
  token.value = null
  role.value = null
  userName.value = null
  userEmail.value = null
  router.push('/auth/login')
}

// Inline NotifItem component
const NotifItem = defineComponent({
  props: {
    title: String,
    desc: String,
    time: String,
    unread: Boolean
  },
  setup(props) {
    return () => h('div', {
      class: 'flex items-start gap-3 p-2 rounded-md hover:bg-zinc-800/60 cursor-pointer transition-colors'
    }, [
      props.unread
        ? h('span', { class: 'mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0' })
        : h('span', { class: 'mt-1.5 w-1.5 h-1.5 shrink-0' }),
      h('div', { class: 'flex-1 min-w-0' }, [
        h('p', { class: 'text-xs font-medium text-white truncate' }, props.title),
        h('p', { class: 'text-xs text-zinc-500 truncate mt-0.5' }, props.desc),
        h('p', { class: 'text-[10px] text-zinc-600 mt-1' }, props.time),
      ])
    ])
  }
})
</script>

<style scoped>
/* Sun/Moon swap animation */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.7);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.7);
}
</style>
