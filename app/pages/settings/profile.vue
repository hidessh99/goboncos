<template>
  <div class="px-4 py-8 sm:px-8 space-y-8 max-w-5xl mx-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="h-64 flex flex-col items-center justify-center space-y-4">
        <div class="relative w-12 h-12">
           <Loader class="w-12 h-12 animate-spin text-blue-600" />
           <div class="absolute inset-0 flex items-center justify-center">
              <User class="w-4 h-4 text-zinc-300" />
           </div>
        </div>
        <p class="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Synchronizing Account...</p>
    </div>
    
    <!-- Profile Card (Modern Minimalist Card like image) -->
    <div 
      v-else-if="user" 
      class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-[0_32px_128px_-32px_rgba(37,99,235,0.06)] overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700"
    >
      <div class="p-8 sm:p-14 space-y-12">
        <!-- Header -->
        <div class="space-y-1">
          <h2 class="text-[15px] font-black text-zinc-900 dark:text-white antialiased leading-none">Profile Information</h2>
          <p class="text-zinc-400 dark:text-zinc-500 text-[13px] font-medium tracking-tight">User's public profile information</p>
        </div>

        <!-- Identity Block -->
        <div class="space-y-2">
           <h3 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-tight antialiased">{{ user.name }}</h3>
           <p class="text-zinc-400 dark:text-zinc-500 font-bold text-[15px] tracking-tight">{{ user.email }}</p>
        </div>

        <!-- Meta Info Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-16">
            <!-- Full Name -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Full Name</p>
               <p class="text-zinc-400 dark:text-zinc-500 font-semibold text-[14px] leading-none">{{ user.name }}</p>
            </div>

            <!-- Location -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Location</p>
               <p class="text-zinc-400 dark:text-zinc-500 font-semibold text-[14px] leading-none">
                  {{ address ? `${address.city}, ${address.state}` : 'Not specified' }}
               </p>
            </div>
            
            <!-- Timezone -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Timezone</p>
               <p class="text-zinc-400 dark:text-zinc-500 font-semibold text-[14px] leading-none">(UTC+07:00)</p>
            </div>

            <!-- Joined Date -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Joined</p>
               <p class="text-zinc-400 dark:text-zinc-500 font-semibold text-[14px] leading-none">
                  {{ formatDate(user.created_at) }}
               </p>
            </div>

            <!-- Phone Number -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Phone Number</p>
               <p class="text-zinc-400 dark:text-zinc-500 font-semibold text-[14px] leading-none">
                  {{ user.phone_number || 'Not specified' }}
               </p>
            </div>

            <!-- Role/Status -->
            <div class="space-y-2.5">
               <p class="text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-90 leading-none">Access Level</p>
               <span class="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/50 dark:border-blue-800/50">
                  {{ user.role }}
               </span>
            </div>
        </div>

        <!-- Footer Link -->
        <div class="pt-10 border-t border-zinc-50 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div class="flex items-center gap-3 text-zinc-300 dark:text-zinc-700">
              <ShieldCheck class="w-5 h-5" />
              <p class="text-[11px] font-black uppercase tracking-widest">Verified Account</p>
           </div>
           
           <NuxtLink to="/settings" class="w-full sm:w-auto">
              <Button variant="outline" class="w-full h-12 px-10 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 font-black text-[11px] uppercase tracking-widest transition-all duration-300 group">
                 Open Full Settings
                 <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
           </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Error/No Data -->
    <div v-else class="text-center py-24 flex flex-col items-center space-y-6 animate-in zoom-in duration-500 grayscale opacity-60">
        <div class="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <User class="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
        </div>
        <div class="space-y-1">
            <p class="text-zinc-900 dark:text-white font-black uppercase tracking-[0.2em] text-xs">Profile Synchronization Failed</p>
            <p class="text-zinc-400 text-xs font-medium uppercase tracking-widest opacity-70">Please verify your connection or re-login</p>
        </div>
        <Button 
          variant="outline" 
          class="h-10 px-6 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold text-xs uppercase"
          @click="fetchUser"
        >
          Retry Connection
        </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  User, ShieldCheck, Loader, ArrowRight
} from 'lucide-vue-next'
import { useLocalStorage } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { getProfile } from '~/server/api/public/auth'
import { getAddress } from '~/server/api/public/address'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Public Profile - User Identity',
  robots: 'noindex, nofollow'
})

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  created_at: string
  phone_number: string
}

const user = ref<UserProfile | null>(null)
const address = ref<any | null>(null)
const isLoading = ref(true)
const token = useLocalStorage('token', '')

const fetchUser = async () => {
    if (!token.value) {
        isLoading.value = false
        return
    }
    
    isLoading.value = true
    try {
        const [profileRes, addressRes] = await Promise.all([
            getProfile(token.value),
            getAddress(token.value)
        ])

        const profileResult = await profileRes.json()
        const addressResult = await addressRes.json()

        if (profileRes.ok && profileResult.success) {
            user.value = profileResult.payload
        }

        if (addressRes.ok && addressResult.success) {
            address.value = addressResult.payload
        }
    } catch (error) {
        console.error('Failed to sync profile data:', error)
    } finally {
        isLoading.value = false
    }
}

const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

onMounted(() => {
    fetchUser()
})
</script>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
}
</style>
