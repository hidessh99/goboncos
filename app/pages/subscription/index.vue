<template>
  <div class="px-4 py-12 sm:px-8 space-y-16 max-w-7xl mx-auto min-h-screen">
    <!-- Header Section -->
    <header class="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-8 duration-700">
      <div class="inline-flex h-9 px-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] items-center border border-blue-100 dark:border-blue-800/50">
        Premium Experience
      </div>
      <div class="space-y-4">
        <h1 class="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-[0.9] antialiased">
          Pilih Paket <span class="text-blue-600">Terbaik</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Tingkatkan performa manajemen keuangan Anda dengan fitur eksklusif GoBoncos. Mulai dari pelacakan aset hingga analitik mendalam.
        </p>
      </div>
    </header>

    <!-- Pricing Grid -->
    <main class="relative">
      <!-- Background Glow Decoration -->
      <div class="absolute inset-0 flex items-center justify-center -z-10 blur-3xl opacity-20 pointer-events-none">
        <div class="w-[500px] h-[500px] bg-blue-500 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-1">
        <div v-if="isLoading" v-for="i in 4" :key="i" class="h-[500px] rounded-[3rem] bg-zinc-50 dark:bg-zinc-800/50 animate-pulse border border-zinc-100 dark:border-zinc-800/50"></div>
        
        <div 
          v-else
          v-for="plan in plans" 
          :key="plan.id"
          :class="[
            'relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] p-8 shadow-2xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] active:scale-95 group overflow-hidden',
            plan.name.toLowerCase() === 'pro' ? 'ring-2 ring-blue-600 ring-offset-8 dark:ring-offset-zinc-950 scale-105 md:scale-110 lg:scale-105 z-10' : 'shadow-blue-500/5 hover:shadow-blue-500/10'
          ]"
        >
          <!-- Featured Badge -->
          <div v-if="plan.name.toLowerCase() === 'pro'" class="absolute top-0 right-0 py-2 px-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-[1.5rem]">
            Best Pick
          </div>

          <div class="space-y-8 relative z-10">
            <!-- Icon/Visual -->
            <div :class="[
              'w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-6',
              getPlanIconColor(plan.name)
            ]">
              <component :is="getPlanIcon(plan.name)" class="w-8 h-8 text-white" />
            </div>

            <!-- Title & Price -->
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none antialiased">
                {{ plan.name }}
              </h3>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums">Rp {{ formatCurrency(plan.price) }}</span>
                <span class="text-xs font-black text-zinc-400 uppercase tracking-widest">/ {{ plan.duration_days }} Hari</span>
              </div>
            </div>

            <!-- Feature List (Static Example for Polish) -->
            <ul class="space-y-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <li v-for="feat in getMockFeatures(plan.name)" :key="feat" class="flex items-center gap-3 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                <div class="w-5 h-5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                   <Check class="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                </div>
                {{ feat }}
              </li>
            </ul>
          </div>

          <div class="pt-10">
            <Button 
              :class="[
                'w-full h-14 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95',
                plan.name.toLowerCase() === 'pro' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-400 border border-zinc-100 dark:border-zinc-700/50'
              ]"
              @click="subscribePlan(plan)"
            >
              Berlangganan
            </Button>
          </div>
          
          <!-- Decorative Background Shape -->
          <div :class="[
             'absolute -bottom-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-700 pointer-events-none',
             plan.name.toLowerCase() === 'pro' ? 'bg-blue-400' : 'bg-zinc-400'
          ]"></div>
        </div>
      </div>
    </main>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  Check, ShieldCheck, Zap, Diamond, Star, Rocket, Loader2
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { getSubscriptionPlans, type SubscriptionPlan } from '~/server/api/public/subscription'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Pilih Paket Langganan - GoBoncos',
  description: 'Tingkatkan performa manajemen keuangan Anda dengan fitur eksklusif GoBoncos.'
})

const plans = ref<SubscriptionPlan[]>([])
const isLoading = ref(true)

const fetchPlans = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getSubscriptionPlans(token)
    const result = await response.json()
    if (response.ok && result.success) {
      // Sort plans for better presentation (Trial -> Basic -> Pro -> Advan)
      const order = ['trial', 'basic', 'pro', 'advan']
      plans.value = (result.payload || []).sort((a: SubscriptionPlan, b: SubscriptionPlan) => {
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase())
      })
    }
  } catch (error) {
    console.error('Error fetching plans:', error)
    alertError('Gagal memuat paket langganan.')
  } finally {
    isLoading.value = false
  }
}

const formatCurrency = (val: number) => {
  return val.toLocaleString('id-ID')
}

// ─── Plan Helpers ────────────────────────────────────────────────────────────
const getPlanIcon = (name: string) => {
  const n = name.toLowerCase()
  if (n === 'trial') return Rocket
  if (n === 'basic') return Star
  if (n === 'pro') return Zap
  if (n === 'advan') return Diamond
  return Star
}

const getPlanIconColor = (name: string) => {
  const n = name.toLowerCase()
  if (n === 'trial') return 'bg-zinc-400 shadow-lg shadow-zinc-400/20'
  if (n === 'basic') return 'bg-sky-500 shadow-lg shadow-sky-500/20'
  if (n === 'pro') return 'bg-blue-600 shadow-lg shadow-blue-600/30'
  if (n === 'advan') return 'bg-indigo-600 shadow-lg shadow-indigo-600/30'
  return 'bg-blue-600'
}

const getMockFeatures = (name: string) => {
  const n = name.toLowerCase()
  if (n === 'trial') return ['Akses Dashboard Dasar', 'Maksimal 1 Akun Keuangan', 'Support via Komunitas']
  if (n === 'basic') return ['Laporan Bulanan Dasar', 'Maksimal 3 Akun Keuangan', 'Sinkronisasi Cepat', 'Tanpa Iklan']
  if (n === 'pro') return ['Analitik Lanjutan', 'Multi-Akun Unlimited', 'Export Data PRO', 'Support Prioritas']
  if (n === 'advan') return ['Semua Fitur Pro', 'Analitik Real-time', 'Pendampingan Finansial', '24/7 Dedicated Support']
  return ['Fitur Standar']
}

const subscribePlan = (plan: SubscriptionPlan) => {
  alertInfo(`Menghubungkan ke gerbang pembayaran untuk paket ${plan.name.toUpperCase()}...`)
  // Implementation for subscription logic here
}

onMounted(() => {
  fetchPlans()
})
</script>

<style scoped>
.animate-in {
  animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
