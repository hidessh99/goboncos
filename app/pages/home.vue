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
useSeoMeta({
  title: `${appName} - Catat Keuangan Tanpa Overthinking`,
  ogTitle: `${appName} - Catat Keuangan Tanpa Overthinking`,
  description: `Atur duit jadi lebih chill. Dari e-wallet sampai tabungan healing, semua terpantau di ${appName}. Satu-satunya aplikasi pengelola keuangan yang paham gaya hidup Gen Z.`,
  ogDescription: `Atur duit jadi lebih chill. Dari e-wallet sampai tabungan healing, semua terpantau di ${appName}. Satu-satunya aplikasi pengelola keuangan yang paham gaya hidup Gen Z.`,
  ogImage: 'https://asset.hidessh.com/icon-hidessh2.png',
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} - Catat Keuangan Tanpa Overthinking`,
  twitterDescription: `Atur duit jadi lebih chill. Dari e-wallet sampai tabungan healing, semua terpantau di ${appName}.`,
  author: 'HideSSH',
  ogType: 'website',
  ogLocale: 'id_ID',
  keywords: 'pencatatan keuangan, investasi, goboncos',
  ogUrl: 'https://goboncos.hidessh.com',
  themeColor: '#009eed',
})

useHead({
  htmlAttrs: {
    lang: 'id'
  },
  meta: [
    { name: 'google-site-verification', content: 'upWtkn9Ubcvz1-9qrUWsJcFs2TkFkshvmMfsgdhLf2k' }
  ],
  link: [
    { rel: 'shortcut icon', type: 'image/png', href: 'https://asset.hidessh.com/icon-hidessh2.png' },
    { rel: 'icon', type: 'image/svg+xml', href: 'https://asset.hidessh.com/icon-hidessh2.png' },
    { rel: 'apple-touch-icon', href: 'https://asset.hidessh.com/icon-hidessh2.png' }
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


const faqs = [
  {
    question: `Berapa harga langganan ${appName}?`,
    answer: `Gratis trial selama 14 hari! Setelah itu, kamu bisa pilih paket mulai dari Rp 19.000/bulan. Seluruh paket punya manfaat fitur yang sama, cuma durasinya aja yang beda.`
  },
  {
    question: 'Apakah data keuangan gue aman di sini?',
    answer: 'Keamanan lu itu prioritas. Data lu dienkripsi secara aman dan kita gak akan pernah share atau jual data transaksi ke pihak ketiga mana pun.'
  },
  {
    question: 'Bisa otomatis narik data dari bank / e-wallet gak?',
    answer: 'Untuk sekarang kita fokus ke mode input manual dan smart tracking. Tujuannya biar lu bisa lebih \'mindful\' dan ngerasain langsung kemana aja tuh duit lu pergi.'
  },
  {
    question: 'Asisten AI-nya bisa bantu apa aja sih?',
    answer: 'Macem-macem! Asisten AI bisa bantu input transaksi harian lo (pemasukan, pengeluaran, transfer), baca struk/mutasi untuk jadi draft transaksi, analisis habit pengeluaran, dan kasih peringatan kalau udah over budget.'
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
          <NuxtLink to="#fitur" class="text-sm font-medium text-zinc-800 hover:text-black transition-colors">Fitur</NuxtLink>
          <NuxtLink to="#solusi" class="text-sm font-medium text-zinc-800 hover:text-black transition-colors">Target</NuxtLink>
          <NuxtLink to="#testimoni" class="text-sm font-medium text-zinc-800 hover:text-black transition-colors">Cerita</NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <Button variant="ghost" class="hidden sm:inline-flex" as-child>
            <NuxtLink to="/auth/login" class="text-zinc-800 hover:text-black">Masuk</NuxtLink>
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
            <div class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 mb-6">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
              STOP OVERTHINKING SOAL DUIT
            </div>
            <h1 class="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl mb-8">
              Atur Keuangan <br /> Jadi Lebih <span class="relative inline-block text-rose-700">
                Chill & Estetik
                <svg class="absolute -bottom-2 left-0 w-full h-3 text-rose-100/50" fill="currentColor" viewBox="0 0 100 10">
                  <path d="M0 10 Q 50 0 100 10" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </span>
            </h1>
            <p class="mb-10 text-xl leading-relaxed text-zinc-600 max-w-lg">
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
            <div class="mt-8 flex items-center gap-4 text-sm text-zinc-800">
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
                  <div class="flex justify-between items-center text-xs font-bold text-zinc-800">
                    <span class="bg-zinc-200 px-2 py-1 rounded">Budgeting April</span>
                    <span class="bg-black text-white px-2 py-1 rounded">Saldo: Rp 4.250.000</span>
                  </div>
                  <div class="flex gap-4">
                    <div class="h-24 flex-1 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                      <div class="h-3 w-1/2 bg-rose-50 rounded mb-2"></div>
                      <div class="text-sm font-bold text-rose-700 italic">Self Reward</div>
                      <div class="h-4 w-full bg-rose-100 rounded mt-2"></div>
                    </div>
                    <div class="h-24 flex-1 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                      <div class="h-3 w-1/2 bg-emerald-50 rounded mb-2"></div>
                      <div class="text-sm font-bold text-emerald-700 italic">Tabungan Konser</div>
                      <div class="h-4 w-full bg-emerald-100 rounded mt-2"></div>
                    </div>
                  </div>
                  <div class="flex-1 bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col gap-4">
                    <div class="flex justify-between border-b pb-2">
                       <span class="text-xs font-bold text-zinc-800">PENGELUARAN TERAKHIR</span>
                       <span class="text-xs font-bold text-zinc-800">LIHAT SEMUA</span>
                    </div>
                    <div v-for="i in 2" :key="i" class="flex justify-between items-center bg-zinc-50 p-2 rounded-xl">
                      <div class="flex items-center gap-2">
                        <div class="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white text-xs">☕</div>
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
                  <div class="text-xs opacity-70">Status Akhir Bulan</div>
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
            <p class="text-lg text-zinc-600">Capek dimarahin diri sendiri gara-gara duit gak jelas lari kemana?</p>
          </div>
          <div class="grid gap-8 md:grid-cols-3">
            <Card v-for="(problem, index) in problems" :key="index" :class="[problem.color, 'border-none rounded-[2rem] shadow-none hover:translate-y-[-8px] transition-transform duration-300']">
              <CardContent class="p-10 flex flex-col items-center text-center">
                <div :class="[problem.iconColor, 'mb-6 h-12 w-12 rounded-full flex items-center justify-center bg-white shadow-sm ring-8 ring-white/20']">
                  <HelpCircle class="h-6 w-6" />
                </div>
                <h3 class="text-2xl font-bold mb-4">{{ problem.title }}</h3>
                <p class="text-zinc-700 leading-relaxed">{{ problem.description }}</p>
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
              <p class="text-lg text-zinc-600">Didesain khusus buat kita yang pengen hidup balance: tetep bisa gaya, tapi saldo tetep aman.</p>
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
              <p class="text-zinc-600 leading-relaxed group-hover:text-zinc-700">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- High Contrast Section -->
      <section class="bg-black text-white py-24 lg:py-32 overflow-hidden relative">
        <div class="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
            <div class="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-1.5 text-xs font-semibold mb-8 border border-zinc-700">
              🌈 GAYA HIDUP VS SALDO
            </div>
            <h2 class="text-4xl lg:text-6xl font-extrabold mb-8 max-w-4xl mx-auto leading-tight">
              Bisa Makan Enak <span class="text-rose-500 italic">Tanpa Perasaan</span> Bersalah Di Akhir Bulan
            </h2>
            <p class="text-xl text-zinc-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              {{ appName }} bantuin kamu membagi budget buat hal yang kamu suka dan hal yang kamu butuhin. Gak perlu lagi takut liat saldo di tanggal tua.
            </p>
            <div class="flex justify-center flex-wrap gap-12 text-center">
               <div v-for="stat in ['98%', 'Rp 0', '24 Jam']" :key="stat" class="flex flex-col gap-2">
                 <div class="text-4xl font-bold">{{ stat }}</div>
                 <div class="text-sm text-zinc-300 font-medium tracking-widest uppercase">
                    {{ stat === '98%' ? 'Pengguna Puas' : stat === 'Rp 0' ? 'Biaya Admin' : 'Siap Pantau' }}
                 </div>
               </div>
            </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="harga" class="py-24 lg:py-32 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-5xl font-black tracking-tight mb-8">Harga</h2>
            <p class="text-zinc-600 text-lg leading-relaxed mb-6">
              Produk yang dijual adalah layanan langganan aplikasi pengelolaan keuangan {{ appName }}. Semua paket memiliki manfaat yang sama, dengan perbedaan pada durasi berlangganan. Harga ditampilkan dalam mata uang Rupiah.
            </p>
            <p class="text-zinc-600 font-medium">Mulai dari trial gratis 14 hari, lalu pilih paket yang paling cocok.</p>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
            <!-- Trial Card -->
            <div class="relative rounded-[2rem] border border-zinc-200 bg-white p-8 flex flex-col h-full shadow-sm transition-all hover:shadow-md">
              <div class="flex justify-between items-center mb-6">
                <span class="text-xs font-bold tracking-widest text-zinc-600 uppercase">14 Hari</span>
                <span class="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Free Trial</span>
              </div>
              <h3 class="text-2xl font-bold mb-2">Trial 14 Hari</h3>
              <div class="text-zinc-600 text-sm line-through mb-1">Rp 1.000</div>
              <div class="text-4xl font-black mb-6">Rp 0</div>
              <p class="text-zinc-600 text-sm leading-relaxed mt-auto">Akses penuh semua fitur selama 14 hari, tanpa bayar di awal.</p>
            </div>

            <!-- 1 Month Card -->
            <div class="relative rounded-[2rem] border border-zinc-100 bg-zinc-50/50 p-8 flex flex-col h-full shadow-sm transition-all hover:shadow-md">
              <div class="flex justify-between items-center mb-6">
                 <span class="text-xs font-bold tracking-widest text-zinc-600 uppercase">1 Bulan</span>
                 <span class="bg-white border border-zinc-200 text-zinc-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hemat Rp 6.000</span>
              </div>
              <h3 class="text-2xl font-bold mb-2">Paket 1 Bulan</h3>
              <div class="text-zinc-600 text-sm line-through mb-1">Rp 65.000</div>
              <div class="text-4xl font-black mb-6">Rp 2.000</div>
              <p class="text-zinc-600 text-sm leading-relaxed mt-auto">Cocok untuk coba penuh semua fitur {{ appName }}.</p>
            </div>

            <!-- 3 Months Card (Best Deal) -->
            <div class="relative rounded-[2rem] border-2 border-rose-200 bg-white p-8 flex flex-col h-full shadow-[0_20px_50px_-20px_rgba(251,113,133,0.3)] ring-4 ring-rose-50 ring-offset-0 transition-all hover:scale-[1.02]">
               <div class="flex justify-between items-center mb-6">
                  <span class="text-xs font-bold tracking-widest text-zinc-600 uppercase">3 Bulan</span>
                  <span class="bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">Best Deal</span>
               </div>
               <h3 class="text-2xl font-bold mb-2">Paket 3 Bulan</h3>
               <div class="text-zinc-600 text-sm line-through mb-1">Rp 75.000</div>
               <div class="text-4xl font-black mb-4 text-rose-700">Rp 3.000</div>
               <div class="inline-flex mb-6 bg-rose-50 text-rose-800 text-xs font-bold px-3 py-1 rounded-full self-start">Paling direkomendasikan</div>
               <p class="text-zinc-600 text-sm leading-relaxed mt-auto">Lebih hemat untuk penggunaan rutin setiap hari.</p>
            </div>

            <!-- 6 Months Card -->
            <div class="relative rounded-[2rem] border border-zinc-100 bg-zinc-50/50 p-8 flex flex-col h-full shadow-sm transition-all hover:shadow-md">
               <div class="flex justify-between items-center mb-6">
                  <span class="text-xs font-bold tracking-widest text-zinc-600 uppercase">6 Bulan</span>
                  <span class="bg-rose-50 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-100">Hemat Rp 51.000</span>
               </div>
               <h3 class="text-2xl font-bold mb-2">Paket 6 Bulan</h3>
               <div class="text-zinc-600 text-sm line-through mb-1">Rp 50.000</div>
               <div class="text-4xl font-black mb-6">Rp 5.000</div>
               <p class="text-zinc-600 text-sm leading-relaxed mt-auto">Pilihan paling stabil untuk bangun kebiasaan finansial.</p>
            </div>
          </div>

          <!-- Benefits Card -->
          <div class="max-w-5xl mx-auto rounded-[2.5rem] border border-zinc-100 bg-white p-8 sm:p-14 shadow-sm relative overflow-hidden group">
            <div class="absolute -right-20 -top-20 h-64 w-64 bg-zinc-50 rounded-full blur-3xl group-hover:bg-rose-50/50 transition-colors duration-500"></div>
            <h3 class="text-2xl sm:text-3xl font-bold mb-12 relative z-10">Manfaat yang Didapat di Semua Paket</h3>
            <div class="grid gap-x-16 gap-y-8 md:grid-cols-2 relative z-10">
              <div v-for="(benefit, b) in [
                'Akses semua fitur pencatatan keuangan Goboncos',
                'Tracking pemasukan, pengeluaran, aset, hutang, dan goals',
                'Laporan dan analitik pengeluaran per periode',
                'Multi-account: bank, e-wallet, dan cash',
                'Asisten AI Goboncos untuk insight keuangan harian',
                'OCR struk dan invoice dari gambar/PDF'
              ]" :key="b" class="flex items-start gap-5 group/item">
                <div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white group-hover/item:bg-rose-600 transition-colors">
                  <CheckCircle2 class="h-3.5 w-3.5" />
                </div>
                <span class="text-zinc-700 font-medium group-hover/item:text-black transition-colors">{{ benefit }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-24 lg:py-32 bg-white">
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900">
              Frequently Asked <span class="text-rose-600">Questions.</span>
            </h2>
            <p class="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              Masih ragu buat pakai {{ appName }}? Cek jawaban dari pertanyaan yang sering ditanyain ini.
            </p>
          </div>

          <div class="grid gap-6">
             <div 
               v-for="(faq, i) in faqs" 
               :key="i" 
               class="bg-white border border-zinc-100 rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 group"
             >
                <h3 class="text-lg sm:text-xl font-bold text-zinc-900 mb-4 group-hover:text-rose-600 transition-colors">{{ faq.question }}</h3>
                <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-medium">{{ faq.answer }}</p>
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
        <p class="text-zinc-600 text-sm">© 2026 {{ appName }}. Dibangun buat kamu yang pengen maju.</p>
        <div class="flex gap-6">
          <a href="#" class="text-zinc-600 hover:text-black transition-colors">Instagram</a>
          <a href="#" class="text-zinc-600 hover:text-black transition-colors">TikTok</a>
          <a href="#" class="text-zinc-600 hover:text-black transition-colors">Twitter</a>
        </div>
      </div>
    </footer>

    <!-- FAB for Support (Chat AI style) -->
    <div class="fixed bottom-8 right-8 z-[60]">
       <Button 
         class="h-16 w-16 rounded-full bg-black text-white shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
         aria-label="Tanya Asisten AI"
       >
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
