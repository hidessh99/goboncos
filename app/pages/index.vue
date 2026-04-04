<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, CheckCircle2, LayoutDashboard, 
  Wallet, BarChart3, Users, Smartphone, Zap,
  MessageCircle, HelpCircle, ChevronRight, PieChart, Sparkles
} from 'lucide-vue-next'

const config = useRuntimeConfig()
const appName = config.public.APP_NAME || 'GO Boncos'

// SEO
useHead({
  title: `${appName} - Catat Keuangan Tanpa Overthinking`,
  meta: [
    { name: 'description', content: `Atur duit jadi lebih chill. Dari e-wallet sampai tabungan healing, semua terpantau di ${appName}.` }
  ]
})

definePageMeta({ layout: false })

const problems = [
  {
    title: 'Self-Reward Berujung Boncos?',
    description: 'Niatnya healing cuma segelas kopi, kok tiba-tiba saldo ludes? Mari kita tracking!',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500'
  },
  {
    title: 'Lupa Langganan Apa Saja?',
    description: 'Netflix, Spotify, YouTube... Banyak langganan tapi jarang dipake? Stop buang-buang duit!',
    color: 'bg-amber-50',
    iconColor: 'text-amber-500'
  },
  {
    title: 'FOMO Bikin Saldo Kritis?',
    description: 'Ikut tren sana-sini tapi dompet teriak? Tenang, kita bantu atur prioritas hidupmu.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500'
  }
]

const features = [
  {
    title: 'Auto-Sync E-Wallet',
    description: 'Gak perlu input manual satu-satu. Hubungkan dompet digitalmu dan pantau otomatis di sini.',
    icon: Wallet
  },
  {
    title: 'Split Bill Instan',
    description: 'Habis nongkrong bingung bayar berapa? Bagi rata atau sesuai pesanan cuma butuh sekali klik.',
    icon: Users
  },
  {
    title: 'Target Tabungan Healing',
    description: 'Mau konser atau liburan? Pasang targetmu dan kita bantu kumpulin receh demi receh.',
    icon: Sparkles
  },
  {
    title: 'Analisis Gaya Hidup',
    description: 'Berapa banyak duit yang habis buat kopi? Lihat grafik pengeluaranmu secara transparan.',
    icon: PieChart
  },
  {
    title: 'Reminder Bayar Tagihan',
    description: 'Gak ada lagi drama denda telat bayar wifi atau listrik. Kita jagain jadwalnya buat kamu.',
    icon: Zap
  },
  {
    title: 'Laporan Versi Gen Z',
    description: 'Laporan keuangan yang gak bikin pusing. Simpel, estetis, dan gampang dimengerti.',
    icon: BarChart3
  }
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-zinc-900 selection:bg-rose-100 selection:text-rose-900">
    <!-- Sticky Navbar -->
    <nav class="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-lg">G</div>
          <span class="text-xl font-bold tracking-tight">{{ appName }}</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="#fitur" class="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Fitur</NuxtLink>
          <NuxtLink to="#solusi" class="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Target</NuxtLink>
          <NuxtLink to="#testimoni" class="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Cerita</NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <Button variant="ghost" class="hidden sm:inline-flex" as-child>
            <NuxtLink to="/auth/login">Masuk</NuxtLink>
          </Button>
          <Button class="rounded-full bg-black px-6 text-white hover:bg-zinc-800" as-child>
            <NuxtLink to="/auth/register">Mulai Catat</NuxtLink>
          </Button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main>
      <section class="container mx-auto px-4 py-20 lg:py-32 overflow-hidden">
        <div class="grid items-center gap-16 lg:grid-cols-2">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-6">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
              STOP OVERTHINKING SOAL DUIT
            </div>
            <h1 class="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl mb-8">
              Atur Keuangan <br /> Jadi Lebih <span class="relative inline-block text-rose-600">
                Chill & Estetik
                <svg class="absolute -bottom-2 left-0 w-full h-3 text-rose-100/50" fill="currentColor" viewBox="0 0 100 10">
                  <path d="M0 10 Q 50 0 100 10" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </span>
            </h1>
            <p class="mb-10 text-xl leading-relaxed text-zinc-500 max-w-lg">
              Satu-satunya aplikasi pengelola keuangan yang paham gaya hidupmu. Gak cuma catat, tapi bantu kamu biar gak boncos di akhir bulan.
            </p>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" class="h-14 w-full sm:w-auto rounded-full bg-black px-10 text-lg font-semibold hover:bg-zinc-800 transition-all hover:scale-105" as-child>
                <NuxtLink to="/auth/register">
                  Coba Sekarang — Gratis
                  <ArrowRight class="ml-2 h-5 w-5" />
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" class="h-14 w-full sm:w-auto rounded-full border-zinc-200 px-8 text-lg font-semibold hover:bg-zinc-50 transition-all hover:scale-105" as-child>
                <a href="#testimoni">
                  Lihat Review Anak Muda
                </a>
              </Button>
            </div>
            <div class="mt-8 flex items-center gap-4 text-sm text-zinc-400">
              <div class="flex -space-x-2">
                <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/100?u=genz${i}`" class="h-8 w-8 rounded-full border-2 border-white shadow-sm" alt="User">
              </div>
              <span>Digunakan 50.000+ Mahasiswa & Pekerja Muda</span>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-rose-50/50 blur-[100px] pointer-events-none"></div>
            <div class="relative rounded-[2.5rem] border border-zinc-100 bg-white p-4 shadow-2xl overflow-hidden">
               <!-- Abstract UI Mockup -->
               <div class="aspect-[16/10] rounded-[2rem] bg-zinc-50 border border-zinc-100 p-6 flex flex-col gap-6">
                  <div class="flex justify-between items-center text-xs font-bold text-zinc-400">
                    <span class="bg-zinc-200 px-2 py-1 rounded">Budgeting April</span>
                    <span class="bg-black text-white px-2 py-1 rounded">Saldo: Rp 4.250.000</span>
                  </div>
                  <div class="flex gap-4">
                    <div class="h-24 flex-1 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                      <div class="h-3 w-1/2 bg-rose-50 rounded mb-2"></div>
                      <div class="text-sm font-bold text-rose-500 italic">Self Reward</div>
                      <div class="h-4 w-full bg-rose-100 rounded mt-2"></div>
                    </div>
                    <div class="h-24 flex-1 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                      <div class="h-3 w-1/2 bg-emerald-50 rounded mb-2"></div>
                      <div class="text-sm font-bold text-emerald-500 italic">Tabungan Konser</div>
                      <div class="h-4 w-full bg-emerald-100 rounded mt-2"></div>
                    </div>
                  </div>
                  <div class="flex-1 bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col gap-4">
                    <div class="flex justify-between border-b pb-2">
                       <span class="text-[10px] font-bold text-zinc-400">PENGELUARAN TERAKHIR</span>
                       <span class="text-[10px] font-bold text-zinc-400">LIHAT SEMUA</span>
                    </div>
                    <div v-for="i in 2" :key="i" class="flex justify-between items-center bg-zinc-50 p-2 rounded-xl">
                      <div class="flex items-center gap-2">
                        <div class="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-[10px]">☕</div>
                        <div class="h-4 w-24 bg-zinc-200 rounded"></div>
                      </div>
                      <div class="h-4 w-12 bg-rose-100 rounded"></div>
                    </div>
                  </div>
               </div>
            </div>
            <!-- Floating Badge -->
            <div class="absolute -bottom-6 -left-6 rounded-2xl bg-black px-6 py-4 text-white shadow-xl animate-bounce duration-[3s]">
              <div class="flex items-center gap-3">
                <Sparkles class="h-6 w-6 text-yellow-400 fill-yellow-400" />
                <div>
                  <div class="text-[10px] opacity-70">Status Akhir Bulan</div>
                  <div class="font-bold">Masih Bisa Healing! ✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Problems Section -->
      <section class="bg-zinc-50 py-24 lg:py-32">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">Relate Sama Masalah Ini?</h2>
            <p class="text-lg text-zinc-500">Capek dimarahin diri sendiri gara-gara duit gak jelas lari kemana?</p>
          </div>
          <div class="grid gap-8 md:grid-cols-3">
            <Card v-for="(problem, index) in problems" :key="index" :class="[problem.color, 'border-none rounded-[2rem] shadow-none hover:translate-y-[-8px] transition-transform duration-300']">
              <CardContent class="p-10 flex flex-col items-center text-center">
                <div :class="[problem.iconColor, 'mb-6 h-12 w-12 rounded-full flex items-center justify-center bg-white shadow-sm ring-8 ring-white/20']">
                  <HelpCircle class="h-6 w-6" />
                </div>
                <h3 class="text-2xl font-bold mb-4">{{ problem.title }}</h3>
                <p class="text-zinc-600 leading-relaxed">{{ problem.description }}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="fitur" class="py-24 lg:py-32">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div class="max-w-2xl">
              <h2 class="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Fitur Yang Bikin Hidup <br /> Jadi Gak Ribet</h2>
              <p class="text-lg text-zinc-500">Didesain khusus buat kita yang pengen hidup balance: tetep bisa gaya, tapi saldo tetep aman.</p>
            </div>
            <Button variant="link" class="text-black font-semibold text-lg p-0 h-auto rounded-none border-b-2 border-zinc-200 flex items-center gap-2 hover:border-black transition-all">
              Semua Fitur Chill
              <ChevronRight class="h-5 w-5" />
            </Button>
          </div>
          
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(feature, index) in features" :key="index" class="group relative rounded-[2rem] border border-zinc-100 bg-white p-10 hover:border-black/10 hover:shadow-xl transition-all duration-300">
              <div class="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <component :is="feature.icon" class="h-7 w-7" />
              </div>
              <h3 class="text-2xl font-bold mb-4 transition-colors group-hover:text-black">{{ feature.title }}</h3>
              <p class="text-zinc-500 leading-relaxed group-hover:text-zinc-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- High Contrast Section -->
      <section class="bg-black text-white py-24 lg:py-32 overflow-hidden relative">
        <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
            <div class="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-1.5 text-xs font-semibold mb-8 border border-zinc-700">
              🌈 GAYA HIDUP VS SALDO
            </div>
            <h2 class="text-4xl lg:text-6xl font-extrabold mb-8 max-w-4xl mx-auto leading-tight">
              Bisa Makan Enak <span class="text-rose-500 italic">Tanpa Perasaan</span> Bersalah Di Akhir Bulan
            </h2>
            <p class="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {{ appName }} bantuin kamu membagi budget buat hal yang kamu suka dan hal yang kamu butuhin. Gak perlu lagi takut liat saldo di tanggal tua.
            </p>
            <div class="flex justify-center flex-wrap gap-12 text-center">
               <div v-for="stat in ['98%', 'Rp 0', '24 Jam']" :key="stat" class="flex flex-col gap-2">
                 <div class="text-4xl font-bold">{{ stat }}</div>
                 <div class="text-sm text-zinc-500 font-medium tracking-widest uppercase">
                    {{ stat === '98%' ? 'Pengguna Puas' : stat === 'Rp 0' ? 'Biaya Admin' : 'Siap Pantau' }}
                 </div>
               </div>
            </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-24 lg:py-32">
        <div class="container mx-auto px-4 max-w-4xl">
          <h2 class="text-3xl font-extrabold text-center mb-16">Masih Bingung?</h2>
          <div class="space-y-4">
             <div v-for="i in 3" :key="i" class="rounded-2xl border border-zinc-100 p-6 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-colors">
               <div class="font-bold text-lg">
                 {{ i === 1 ? 'Aplikasi ini gratis gak sih?' : i === 2 ? 'Aman gak dataku kalau nyambung bank?' : 'Gimana caranya biar gak boncos?' }}
               </div>
               <div class="h-8 w-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                 <ChevronRight class="h-4 w-4" />
               </div>
             </div>
          </div>
        </div>
      </section>

      <!-- CTA Footer Section -->
      <section id="testimoni" class="container mx-auto px-4 pb-24">
        <div class="rounded-[3rem] bg-indigo-600 p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <!-- Decoration -->
          <div class="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div class="absolute bottom-0 left-0 h-64 w-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <h2 class="text-4xl lg:text-5xl font-extrabold mb-8 relative z-10">Siap Jadi Generasi Pintar Finansial?</h2>
          <p class="text-xl mb-12 text-indigo-100 max-w-2xl mx-auto relative z-10">
            Gabung bareng 50rb+ teman lainnya yang udah mulai hidup teratur tanpa kehilangan momen seru.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button size="lg" class="h-16 w-full sm:w-auto px-12 rounded-full bg-white text-indigo-600 hover:bg-zinc-100 text-lg font-bold shadow-xl" as-child>
              <NuxtLink to="/auth/register">Mulai Catat Gratis</NuxtLink>
            </Button>
            <Button size="lg" variant="ghost" class="h-16 w-full sm:w-auto px-8 rounded-full text-white hover:bg-white/10 text-lg font-semibold" as-child>
              <NuxtLink to="/#fitur">Cek Fitur Lainnya</NuxtLink>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 py-12">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex items-center gap-2">
          <div class="flex h-6 w-6 items-center justify-center rounded bg-black text-white font-bold text-xs">G</div>
          <span class="font-bold">{{ appName }}</span>
        </div>
        <p class="text-zinc-500 text-sm">© 2026 {{ appName }}. Dibangun buat kamu yang pengen maju.</p>
        <div class="flex gap-6">
          <a href="#" class="text-zinc-400 hover:text-black transition-colors">Instagram</a>
          <a href="#" class="text-zinc-400 hover:text-black transition-colors">TikTok</a>
          <a href="#" class="text-zinc-400 hover:text-black transition-colors">Twitter</a>
        </div>
      </div>
    </footer>

    <!-- FAB for Support (Chat AI style) -->
    <div class="fixed bottom-8 right-8 z-[60]">
       <Button class="h-16 w-16 rounded-full bg-black text-white shadow-2xl hover:scale-110 transition-transform active:scale-95 group">
          <Sparkles class="h-7 w-7 group-hover:rotate-12 transition-transform" />
       </Button>
    </div>
  </div>
</template>

<style scoped>
.selection\:bg-rose-100 ::selection { background-color: rgb(255 241 242); }
.selection\:text-rose-900 ::selection { color: rgb(136 19 55); }

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.font-sans {
  font-family: 'Geist', 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
