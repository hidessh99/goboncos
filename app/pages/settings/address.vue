<template>
  <div class="px-4 py-8 sm:px-8 space-y-12 max-w-5xl mx-auto">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <NuxtLink to="/settings" class="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95">
             <ArrowLeft class="w-5 h-5" />
          </NuxtLink>
          <h1 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
            Pengaturan <span class="text-blue-600">Alamat</span>
          </h1>
        </div>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium ml-13">Sesuaikan informasi lokasi pengiriman dan alamat utama akun Anda.</p>
      </div>
    </header>

    <!-- Main Card -->
    <main class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
      <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden">
        
        <!-- Form Header Deco -->
        <div class="h-2 w-full bg-gradient-to-r from-blue-600/10 via-blue-600 to-blue-600/10"></div>
        
        <div class="p-8 sm:p-12 space-y-10">
          <div class="flex items-center gap-4">
             <div class="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                <MapPin class="w-7 h-7" />
             </div>
             <div>
                <h3 class="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Data Alamat</h3>
                <p class="text-xs font-black text-zinc-400 uppercase tracking-widest mt-1">Lengkapi informasi lokasi dengan benar</p>
             </div>
          </div>

          <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Full Address -->
            <div class="md:col-span-2 space-y-3">
              <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Alamat Lengkap <span class="text-blue-500">*</span></label>
              <textarea 
                v-model="addressForm.address"
                rows="3"
                placeholder="E.g. Jl. Sudirman No. 123, Blok A, Kebayoran Baru"
                class="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all resize-none shadow-sm"
                required
              ></textarea>
            </div>

            <!-- Province -->
            <div class="space-y-3">
              <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Provinsi <span class="text-blue-500">*</span></label>
              <div class="relative group">
                <select 
                  v-model="addressForm.state"
                  @change="onProvinceChange(addressForm.state)"
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="" disabled>Pilih Provinsi...</option>
                  <option v-for="prov in provinces" :key="prov.id" :value="prov.name">{{ prov.name }}</option>
                </select>
                <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <!-- City -->
            <div class="space-y-3">
              <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Kota / Kabupaten <span class="text-blue-500">*</span></label>
              <div class="relative group">
                <select 
                  v-model="addressForm.city"
                  @change="onCityChange(addressForm.city)"
                  :disabled="!addressForm.state || loadingCities"
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
                  <option value="" disabled>{{ loadingCities ? 'Memuat...' : 'Pilih Kota...' }}</option>
                  <option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</option>
                </select>
                <div v-if="loadingCities" class="absolute right-12 top-1/2 -translate-y-1/2">
                   <Loader2 class="w-4 h-4 animate-spin text-blue-600" />
                </div>
                <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <!-- District -->
            <div class="space-y-3">
              <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Kecamatan <span class="text-blue-500">*</span></label>
              <div class="relative group">
                <select 
                  v-model="addressForm.district"
                  :disabled="!addressForm.city || loadingDistricts"
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
                  <option value="" disabled>{{ loadingDistricts ? 'Memuat...' : 'Pilih Kecamatan...' }}</option>
                  <option v-for="dist in districts" :key="dist.id" :value="dist.name">{{ dist.name }}</option>
                </select>
                 <div v-if="loadingDistricts" class="absolute right-12 top-1/2 -translate-y-1/2">
                   <Loader2 class="w-4 h-4 animate-spin text-blue-600" />
                </div>
                <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <!-- Zip Code & Country -->
            <div class="grid grid-cols-2 gap-4">
               <div class="space-y-3">
                  <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Kode Pos <span class="text-blue-500">*</span></label>
                  <input 
                    v-model="addressForm.zip_code"
                    type="text"
                    placeholder="10110"
                    class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 shadow-sm"
                    required
                  />
               </div>
               <div class="space-y-3">
                  <label class="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-1">Negara</label>
                  <input 
                    v-model="addressForm.country"
                    type="text"
                    class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/5/30 border-zinc-100 dark:border-zinc-800/50 font-bold text-zinc-400 cursor-not-allowed"
                    readonly
                  />
               </div>
            </div>

            <!-- Action Button -->
            <div class="md:col-span-2 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button 
                type="submit" 
                class="w-full h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-blue-600/20 active:scale-95 transition-all gap-4"
                :disabled="isSaving"
              >
                <Loader2 v-if="isSaving" class="w-5 h-5 animate-spin" />
                <Check v-else class="w-5 h-5" />
                {{ isSaving ? 'Menyimpan...' : 'Simpan Alamat Utama' }}
              </Button>
            </div>
          </form>
        </div>

        <!-- Footer Info -->
        <div class="p-8 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div class="flex items-center gap-3">
              <ShieldCheck class="w-5 h-5 text-blue-600" />
              <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Informasi Anda Dijamin Aman</p>
           </div>
           <p class="text-[11px] font-black text-blue-600/50 uppercase tracking-[0.2em] animate-pulse">GoBoncos Security System</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, MapPin, Check, ChevronDown, Loader2, ShieldCheck } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { saveAddress, getAddress, type AddressPayload } from '~/server/api/public/address'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Atur Alamat',
  robots: 'noindex, nofollow'
})

interface Province { id: string; name: string }
interface City { id: string; name: string }
interface District { id: string; name: string }

// ─── Location Data ───────────────────────────────────────────────────────────
const provinces = ref<Province[]>([])
const cities = ref<City[]>([])
const districts = ref<District[]>([])

const loadingCities = ref(false)
const loadingDistricts = ref(false)
const isSaving = ref(false)

const addressForm = ref({
  address: '',
  city: '',
  state: '',
  district: '', // Kept for UI but not in SAVE payload example
  zip_code: '',
  country: 'Indonesia'
})

// Fetch provinces
const fetchProvinces = async () => {
  try {
    const response = await fetch('https://apicodepos.hidessh.com/api/provinces.json')
    if (!response.ok) throw new Error('Gagal mengambil data provinsi')
    provinces.value = await response.json()
  } catch (error) {
    alertError(error instanceof Error ? error.message : 'Kesalahan Saat Memuat Provinsi')
  }
}

// Fetch cities based on province
const fetchCities = async (provinceId: string) => {
  try {
    loadingCities.value = true
    const response = await fetch(`https://apicodepos.hidessh.com/api/regencies/${provinceId}.json`)
    if (!response.ok) throw new Error('Gagal mengambil data kota')
    cities.value = await response.json()
    
    // Reset dependant fields
    districts.value = []
    addressForm.value.city = ''
    addressForm.value.district = ''
  } catch (error) {
    alertError(error instanceof Error ? error.message : 'Kesalahan Saat Memuat Kota')
  } finally {
    loadingCities.value = false
  }
}

// Fetch districts based on city
const fetchDistricts = async (cityId: string) => {
  try {
    loadingDistricts.value = true
    const response = await fetch(`https://apicodepos.hidessh.com/api/districts/${cityId}.json`)
    if (!response.ok) throw new Error('Gagal mengambil data kecamatan')
    districts.value = await response.json()
    addressForm.value.district = ''
  } catch (error) {
    alertError(error instanceof Error ? error.message : 'Kesalahan Saat Memuat Kecamatan')
  } finally {
    loadingDistricts.value = false
  }
}

// Handle province change
const onProvinceChange = async (provinceName: string, autoCity?: string) => {
  if (!provinceName) return
  const selectedProvince = provinces.value.find(p => p.name === provinceName)
  if (selectedProvince) {
    await fetchCities(selectedProvince.id)
    if (autoCity) {
      addressForm.value.city = autoCity
      await onCityChange(autoCity)
    }
  }
}

// Handle city change
const onCityChange = async (cityName: string, autoDistrict?: string) => {
  if (!cityName) return
  const selectedCity = cities.value.find(c => c.name === cityName)
  if (selectedCity) {
    await fetchDistricts(selectedCity.id)
    if (autoDistrict) {
      addressForm.value.district = autoDistrict
    }
  }
}

const fetchUserAddress = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getAddress(token)
    const result = await response.json()
    if (response.ok && result.success && result.payload) {
      const p = result.payload
      addressForm.value = {
        address: p.address || '',
        city: p.city || '',
        state: p.state || '',
        zip_code: p.zip_code || '',
        country: p.country || 'Indonesia',
        district: '' // Will try to load if data permits later
      }
      // Re-trigger cascades if values exist
      if (addressForm.value.state) {
        await onProvinceChange(addressForm.value.state, addressForm.value.city)
      }
    }
  } catch (error) {
    console.error('Error fetching address:', error)
  }
}

// ─── Save Operation ──────────────────────────────────────────────────────────
const handleSave = async () => {
  isSaving.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      address: addressForm.value.address,
      city: addressForm.value.city,
      state: addressForm.value.state,
      zip_code: addressForm.value.zip_code,
      country: addressForm.value.country
    }

    const response = await saveAddress(payload, token)

    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Data alamat berhasil diperbarui secara permanen.')
    } else {
      alertError(result.message || 'Gagal menyimpan alamat.')
    }
  } catch (error) {
    alertError('Masalah koneksi jaringan saat menyimpan data.')
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  await fetchProvinces()
  await fetchUserAddress()
})
</script>

<style scoped>
/* Optional: Custom scrollbar for better aesthetics */
select::-webkit-scrollbar {
  width: 6px;
}
select::-webkit-scrollbar-track {
  background: transparent;
}
select::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.dark select::-webkit-scrollbar-thumb {
  background: #3f3f46;
}
</style>
