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
          <DropdownMenuItem as-child class="hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer gap-2 text-sm">
            <NuxtLink to="/settings/profile" class="flex items-center gap-2 w-full">
              <User class="w-4 h-4 text-gray-400 dark:text-zinc-400" /> Profil
            </NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuItem as-child class="hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer gap-2 text-sm">
            <NuxtLink to="/settings" class="flex items-center gap-2 w-full">
              <Settings class="w-4 h-4 text-gray-400 dark:text-zinc-400" /> Pengaturan
            </NuxtLink>
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

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  PanelLeft, ChevronRight, User, Settings, LogOut, Sun, Moon
} from 'lucide-vue-next'

const { isDark, toggle: toggleTheme } = useColorMode()

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[segments.length - 1] || 'Dashboard'
})


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
