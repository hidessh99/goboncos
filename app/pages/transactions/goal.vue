<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Top Summary Card (Premium Responsive Bar) -->
    <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-2xl transition-all duration-300">
      <!-- Info Left -->
      <div class="flex items-center gap-5 w-full lg:w-auto">
        <div class="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center text-white shadow-inner shrink-0 leading-none">
          <Wallet class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-xl font-black text-zinc-900 dark:text-white tracking-tighter antialiased uppercase leading-tight">Target & Impian</h1>
          <p class="text-zinc-500 text-xs font-medium mt-0.5 max-w-[200px] sm:max-w-none">Wujudkan impian finansial Anda dengan rencana yang terukur.</p>
        </div>
      </div>

      <!-- Data & Action Right -->
      <div class="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto mt-2 lg:mt-0">
        <!-- Amounts Section -->
        <div class="flex flex-wrap items-center justify-center sm:justify-end gap-8 sm:gap-10 w-full sm:w-auto">
          <div class="text-center sm:text-right">
            <p class="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 antialiased">SUDAH TERKUMPUL</p>
            <p class="text-xl font-black text-zinc-900 dark:text-white tabular-nums antialiased leading-none">Rp {{ formatCurrency(totalSaved) }}</p>
          </div>
          
          <div class="hidden sm:block w-px h-10 bg-zinc-100 dark:bg-zinc-800"></div>

          <div class="text-center sm:text-left">
            <p class="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 antialiased">SISA TARGET</p>
            <p class="text-xl font-black text-red-500 tabular-nums antialiased leading-none">
              Rp {{ formatCurrency(Math.max(0, totalTarget - totalSaved)) }}
            </p>
          </div>
        </div>

        <!-- Buttons Section -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <div class="flex items-center gap-1.5 h-12 px-1 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 mr-1">
            <Button 
              variant="ghost"
              class="w-10 h-10 p-0 rounded-xl text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
              title="Export PDF"
              @click="exportToPdf"
            >
              <FileText class="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost"
              class="w-10 h-10 p-0 rounded-xl text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
              title="Export Excel"
              @click="exportToExcel"
            >
              <FileSpreadsheet class="w-4 h-4" />
            </Button>
          </div>

          <Button 
            id="btn-tambah-target"
            class="bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 gap-2 h-12 px-8 rounded-2xl font-black text-[11px] uppercase tracking-wider shadow-xl dark:shadow-white/5 transition-all active:scale-95 flex-1 sm:flex-none whitespace-nowrap"
            @click="openCreateModal"
          >
            <Plus class="w-4 h-4" />
            Target Baru
          </Button>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-goal"
          v-model="searchQuery"
          placeholder="Cari impian Anda..." 
          class="pl-9 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-zinc-500/20 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all font-medium"
        />
      </div>
    </div>

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      <!-- Table Section (Desktop) -->
      <div class="px-4 pb-4 overflow-x-auto hidden md:block">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 mt-4">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   <div class="ml-2">Nama Target</div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Terkumpul
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Total Target
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Batas Waktu
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10">
                   Progres
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                   Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="isLoading">
                <TableCell colspan="6" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-zinc-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data target...</p>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="goals.length === 0">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Target class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Belum ada target finansial.</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow 
                v-else 
                v-for="item in goals" 
                :key="item.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors" 
                @click="openDetailModal(item)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(item.name)}`">
                      {{ item.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[150px] sm:max-w-none">{{ item.name }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] font-black text-emerald-600 dark:text-emerald-400 py-2.5 tabular-nums">
                  Rp {{ formatCurrency(item.amount) }}
                </TableCell>
                <TableCell class="text-[13px] font-black text-gray-900 dark:text-zinc-100 py-2.5 tabular-nums">
                  Rp {{ formatCurrency(item.total_goal) }}
                </TableCell>
                <TableCell class="text-[12px] text-gray-500 dark:text-zinc-500 py-2.5">
                  {{ formatDate(item.goal_date) }}
                </TableCell>
                <TableCell class="py-2.5 min-w-[120px]">
                  <div class="flex flex-col gap-1.5">
                    <div class="flex justify-between items-center px-0.5">
                      <span class="text-[10px] font-black text-zinc-400">{{ calculatePercent(item.amount, item.total_goal) }}%</span>
                    </div>
                    <div class="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-700"
                        :style="{ width: `${calculatePercent(item.amount, item.total_goal)}%` }"
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5" @click.stop>
                    <button @click="openFundModal(item)" class="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Tambah Dana">
                      <PlusCircle class="w-[18px] h-[18px]" />
                    </button>
                    <button @click="openEditModal(item)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 transition-colors">
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button @click="confirmDelete(item.id)" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all">
                      <Trash2 class="w-[15px] h-[15px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <!-- Card Section (Mobile) -->
      <div class="px-4 py-4 md:hidden flex flex-col gap-4">
        <div v-if="isLoading" class="py-12 text-center text-zinc-500">
           <Loader2 class="w-8 h-8 animate-spin mx-auto text-zinc-500" />
           <p class="mt-2 text-sm font-medium">Memuat data...</p>
        </div>
        <div v-else-if="goals.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Target class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Belum ada data target.</p>
        </div>
        <div 
          v-for="item in goals" 
          :key="item.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
          @click="openDetailModal(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(item.name)}`">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[14px] font-bold text-gray-900 dark:text-white truncate leading-tight uppercase">{{ item.name }}</h4>
                <p class="text-[11px] text-zinc-400 mt-1 font-bold text-emerald-600 tabular-nums">Rp {{ formatCurrency(item.amount) }} / Rp {{ formatCurrency(item.total_goal) }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-4 space-y-2">
             <div class="flex justify-between items-center text-[10px] font-black text-zinc-400">
                <span>{{ calculatePercent(item.amount, item.total_goal) }}% TERCAPAI</span>
                <span>TARGET: {{ formatDate(item.goal_date) }}</span>
             </div>
             <div class="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-zinc-900 dark:bg-white rounded-full" :style="{ width: `${calculatePercent(item.amount, item.total_goal)}%` }"></div>
             </div>
          </div>

          <div class="mt-4 flex gap-2.5 pt-4 border-t border-gray-50 dark:border-zinc-800/60" @click.stop>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs font-bold gap-2" @click="openFundModal(item)">
               <PlusCircle class="w-3.5 h-3.5" />
               Tabung
             </Button>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50 text-xs font-bold gap-2" @click="openEditModal(item)">
               <Pencil class="w-3.5 h-3.5" />
               Edit
             </Button>
             <Button variant="outline" class="flex-1 h-10 rounded-xl border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold gap-2" @click="confirmDelete(item.id)">
               <Trash2 class="w-3.5 h-3.5" />
               Hapus
             </Button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">Sebelumnya</button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">Selanjutnya</button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-zinc-300">Halaman <span class="font-bold">{{ currentPage }}</span> dari <span class="font-bold">{{ totalPages }}</span></p>
          </div>
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Sebelumnya</button>
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 rounded-[2rem] p-0 overflow-hidden outline-none border-none shadow-2xl">
        <div v-if="selectedGoal" class="p-8 space-y-6">
            <div class="flex flex-col items-center text-center space-y-4">
              <div :class="`w-20 h-20 rounded-[2rem] flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedGoal.name)}`">
                {{ selectedGoal.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <DialogTitle class="text-xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedGoal.name }}</DialogTitle>
                <DialogDescription class="hidden">Detail rencana finansial untuk target {{ selectedGoal.name }}</DialogDescription>
                <div class="flex items-center justify-center gap-1.5 mt-1.5">
                   <span class="text-[10px] font-black py-0.5 px-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full uppercase">{{ calculatePercent(selectedGoal.amount, selectedGoal.total_goal) }}% TERCAPAI</span>
                </div>
              </div>
            </div>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
               <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
                 <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Terkumpul</span>
                 <p class="text-[15px] font-black text-emerald-600 tabular-nums">Rp {{ formatCurrency(selectedGoal.amount) }}</p>
               </div>
               <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
                 <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Target</span>
                 <p class="text-[15px] font-black text-zinc-900 dark:text-white tabular-nums">Rp {{ formatCurrency(selectedGoal.total_goal) }}</p>
               </div>
            </div>

            <div class="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 text-center">
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Batas Waktu Impian</span>
              <p class="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">{{ formatDate(selectedGoal.goal_date) }}</p>
            </div>
          </div>

          <Button variant="outline" class="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-500" @click="isDetailModalOpen = false">Tutup Detail</Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create/Edit Form Dialog -->
    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-xl bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-[2rem] p-0 overflow-hidden outline-none">
        <div class="max-h-[85vh] overflow-y-auto scrollbar-hide">
          <!-- Header -->
          <div class="flex items-center gap-4 p-6 sm:p-8 border-b border-zinc-50 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-20">
            <div :class="`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${isEditing ? 'bg-amber-500 shadow-amber-500/20' : 'bg-zinc-900 dark:bg-white dark:text-black shadow-zinc-900/10'}`">
              <Target v-if="!isEditing" class="w-6 h-6 sm:w-7 sm:h-7" />
              <Pencil v-else class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <DialogTitle class="text-[16px] sm:text-xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">
                {{ isEditing ? 'Update Target' : 'Buat Target Baru' }}
              </DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
                Tentukan rencana finansial Anda hari ini.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-6 sm:p-8 space-y-6">
            <div class="space-y-5 text-left">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Nama Target / Impian <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Contoh: Beli Laptop Baru, Liburan ke Bali" 
                  class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold outline-none focus:ring-4 focus:ring-zinc-500/10 transition-all shadow-sm" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Total Target (Rp) <span class="text-red-500">*</span></label>
                    <input 
                      v-model="form.total_goal" 
                      type="number" 
                      placeholder="0" 
                      class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-black outline-none focus:ring-4 focus:ring-zinc-500/10 transition-all shadow-sm tabular-nums" 
                      required
                    />
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block px-0.5">Batas Waktu <span class="text-red-500">*</span></label>
                    <input 
                      v-model="form.goal_date" 
                      type="date" 
                      class="w-full px-5 py-4 rounded-[1.25rem] border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[13px] font-bold outline-none focus:ring-4 focus:ring-zinc-500/10 transition-all shadow-sm" 
                      required
                    />
                 </div>
              </div>
            </div>

            <div class="flex gap-4 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 rounded-[1.25rem] py-8 font-black text-xs uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 h-14" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button type="submit" class="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-[1.25rem] py-8 font-black text-xs uppercase tracking-widest shadow-2xl h-14" :disabled="isSubmitting || !form.name.trim()">
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Confirm Update' : 'Record Now' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Fund Modal (Tambah Dana) -->
    <Dialog :open="isFundModalOpen" @update:open="val => { if (!isSubmitting) isFundModalOpen = val }">
       <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden outline-none">
          <div class="p-10 space-y-8 text-center text-left">
             <div class="w-20 h-20 rounded-[2rem] bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto shadow-2xl mb-4 group ring-8 ring-zinc-50 dark:ring-white/5">
                <PlusCircle class="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
             </div>
             <div>
                <DialogTitle class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">Tambah Dana Rencana</DialogTitle>
                <DialogDescription class="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Target: {{ activeGoal?.name }}</DialogDescription>
             </div>

             <div class="space-y-2 text-left">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block px-0.5 ml-2">Masukkan Jumlah (Rp)</label>
                <div class="relative group">
                   <div class="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-black text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors duration-300">Rp</div>
                   <input 
                     v-model="fundAmount" 
                     type="number" 
                     placeholder="0" 
                     class="w-full pl-16 pr-8 py-6 rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-2xl font-black tabular-nums outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-8 focus:ring-zinc-900/5 dark:focus:ring-white/5 transition-all duration-300" 
                     autofocus
                   />
                </div>
             </div>

             <div class="flex gap-4">
                <Button variant="outline" class="flex-1 h-16 rounded-[1.25rem] font-black uppercase text-xs tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" @click="isFundModalOpen = false">Nanti Saja</Button>
                <Button class="flex-1 h-16 rounded-[1.25rem] bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-widest hover:opacity-90" :disabled="isSubmitting || fundAmount <= 0" @click="submitAddFund">
                   <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                   Tabung Sekarang!
                </Button>
             </div>
          </div>
       </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md overflow-hidden relative">
        <div class="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <AlertDialogHeader class="space-y-6">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50/50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto transform -rotate-6 shadow-sm border border-red-100 dark:border-red-900/30">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2 text-center relative z-10">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">Hapus Target?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-400 px-4 leading-relaxed italic">Semua data progres menabung untuk target ini akan hilang secara permanen.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-xs uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all hover:scale-[1.02]">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/30 transition-all hover:scale-[1.02]"
          >
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Target, FileText, FileSpreadsheet, PlusCircle, Wallet
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription, DialogTitle
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  getGoals, createGoal, updateGoal, deleteGoal, addGoalFund,
  type GoalItem 
} from '~/server/api/public/goal'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Target & Impian ',
  robots: 'noindex, nofollow'
})

const goals = ref<GoalItem[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedGoal = ref<GoalItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isFundModalOpen = ref(false)
const activeGoal = ref<GoalItem | null>(null)
const fundAmount = ref(0)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

const form = ref({
  name: '',
  total_goal: 0,
  goal_date: new Date().toISOString().split('T')[0]
})

// Summary Calculations
const totalSaved = computed(() => goals.value.reduce((acc, curr) => acc + curr.amount, 0))
const totalTarget = computed(() => goals.value.reduce((acc, curr) => acc + curr.total_goal, 0))

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-zinc-900 to-zinc-700',
  'bg-gradient-to-br from-blue-900 to-blue-700',
  'bg-gradient-to-br from-teal-900 to-teal-700',
  'bg-gradient-to-br from-purple-900 to-purple-700',
  'bg-gradient-to-br from-emerald-900 to-emerald-700',
]
function getAvatarColor(name: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

const formatCurrency = (val: number) => {
  return val.toLocaleString('id-ID')
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const calculatePercent = (current: number, target: number) => {
  if (!target || target <= 0) return 0
  return Math.min(100, Math.floor((current / target) * 100))
}

// ─── Data Fetching ────────────────────────────────────────────────────────
const fetchGoals = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getGoals(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      goals.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching goals:', error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchGoals()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchGoals() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchGoals() } }

// ─── Export Handlers ────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (goals.value.length === 0) {
    alertError('Tidak ada data target untuk diexport.')
    return
  }
  alertInfo('Menyiapkan dokumen PDF Target...')
  try {
    const doc = new jsPDF()
    const tableData = goals.value.map(item => [
      item.name,
      `Rp ${formatCurrency(item.amount)}`,
      `Rp ${formatCurrency(item.total_goal)}`,
      formatDate(item.goal_date),
      `${calculatePercent(item.amount, item.total_goal)}%`
    ])
    autoTable(doc, {
      head: [['Nama Target', 'Terkumpul', 'Total Target', 'Batas Waktu', 'Progres']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [24, 24, 27] }, // Zinc 900
      styles: { fontSize: 8, font: 'helvetica', fontStyle: 'bold' }
    })
    doc.save(`target-finansial-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat laporan PDF.')
  }
}

const exportToExcel = () => {
  if (goals.value.length === 0) {
    alertError('Tidak ada data target untuk diexport.')
    return
  }
  alertInfo('Menyiapkan file Excel Target...')
  try {
    const flatData = goals.value.map(item => ({
      'Nama Target': item.name,
      'Terkumpul': item.amount,
      'Total Target': item.total_goal,
      'Batas Waktu': formatDate(item.goal_date),
      'Progres': `${calculatePercent(item.amount, item.total_goal)}%`
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Target')
    XLSX.writeFile(workbook, `report-target-${new Date().getTime()}.xlsx`)
    alertSuccess('Laporan Excel berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Handlers ───────────────────────────────────────────────────────────────
const openDetailModal = (item: GoalItem) => {
  selectedGoal.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { 
    name: '',
    total_goal: 0,
    goal_date: new Date().toISOString().split('T')[0]
  }
  isFormModalOpen.value = true
}

const openEditModal = (item: GoalItem) => {
  isEditing.value = true
  selectedGoal.value = item
  form.value = { 
    name: item.name, 
    total_goal: item.total_goal,
    goal_date: item.goal_date.split(' ')[0]
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload: any = { 
      name: form.value.name,
      total_goal: Number(form.value.total_goal),
      goal_date: form.value.goal_date || ''
    }
    const response = isEditing.value 
      ? await updateGoal(selectedGoal.value!.id, payload, token)
      : await createGoal(payload, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Target diperbarui.' : 'Target baru dibuat.')
      isFormModalOpen.value = false
      fetchGoals()
    } else {
      alertError(result.message || 'Gagal menyimpan target.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isSubmitting.value = false
  }
}

const openFundModal = (goal: GoalItem) => {
  activeGoal.value = goal
  fundAmount.value = 0
  isFundModalOpen.value = true
}

const submitAddFund = async () => {
  if (!activeGoal.value || fundAmount.value <= 0) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await addGoalFund(activeGoal.value.id, Number(fundAmount.value), token)
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess('Dana ditambahkan. Tetap semangat menabung!')
      isFundModalOpen.value = false
      fetchGoals()
    } else {
      alertError(result.message || 'Gagal menambahkan dana.')
    }
  } catch (error) {
    alertError('Kesalahan jaringan.')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = (id: string) => {
  deleteItemId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteItemId.value) return
  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteGoal(deleteItemId.value, token)
    if (response.ok) {
      alertSuccess('Target dihapus.')
      fetchGoals()
    }
  } catch (error) {
    alertError('Gagal menghapus data.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => fetchGoals())
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
