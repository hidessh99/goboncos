<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-10 transition-colors duration-300">
    
    <!-- Top Header & Filters -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          Transaksi - {{ currentMonthName }} {{ currentYear }}
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 mt-1 text-xs sm:text-sm font-medium">Kelola pemasukan dan pengeluaran Anda dengan efisien.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 lg:mt-0">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Bulan:</span>
          <select v-model="selectedMonth" class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500/50 transition-all cursor-pointer shadow-sm">
            <option v-for="(m, i) in months" :key="i" :value="i+1">{{ m }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Tahun:</span>
          <select v-model="selectedYear" class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500/50 transition-all cursor-pointer shadow-sm">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Income Card -->
      <div class="group relative overflow-hidden bg-white dark:bg-zinc-900/40 border border-emerald-100 dark:border-emerald-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm dark:shadow-[0_0_40px_-15px_rgba(16,185,129,0.1)] hover:border-emerald-500/60 transition-all h-[150px] sm:h-[180px] flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <span class="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">Pemasukan</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
            <TrendingUp class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div>
          <h2 class="text-2xl sm:text-3xl font-black tabular-nums">Rp {{ formatCurrency(totalIncome) }}</h2>
          <p class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-widest">{{ currentMonthName }} {{ currentYear }}</p>
        </div>
      </div>

      <!-- Expense Card -->
      <div class="group relative overflow-hidden bg-white dark:bg-zinc-900/40 border border-rose-100 dark:border-rose-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm dark:shadow-[0_0_40px_-15px_rgba(244,63,94,0.1)] hover:border-rose-500/60 transition-all h-[150px] sm:h-[180px] flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <span class="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 tracking-tight">Pengeluaran</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-500 border border-rose-500/20">
            <TrendingDown class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div>
          <h2 class="text-2xl sm:text-3xl font-black tabular-nums">Rp {{ formatCurrency(totalExpense) }}</h2>
          <p class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-widest">{{ currentMonthName }} {{ currentYear }}</p>
        </div>
      </div>

      <!-- Net Income Card (Full width on small, grid on larger) -->
      <div class="sm:col-span-2 lg:col-span-1 group relative overflow-hidden bg-white dark:bg-zinc-900/40 border border-indigo-100 dark:border-indigo-500/30 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm dark:shadow-[0_0_40px_-15px_rgba(99,102,241,0.1)] hover:border-indigo-500/60 transition-all h-[150px] sm:h-[180px] flex flex-col justify-between">
        <div class="flex items-start justify-between">
          <span class="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Saldo Bersih</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-500 border border-indigo-500/20">
            <ArrowUpRight class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div>
          <h2 class="text-2xl sm:text-3xl font-black tabular-nums">Rp {{ formatCurrency(netIncome) }}</h2>
          <p class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-widest">{{ currentMonthName }} {{ currentYear }}</p>
        </div>
      </div>
    </div>

    <!-- Filter Tabs & Actions -->
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <button 
            v-for="filter in ['Semua', 'Pemasukan', 'Pengeluaran', 'Transfer']" 
            :key="filter"
            @click="activeFilter = filter"
            :class="`whitespace-nowrap px-4 py-1.5 sm:px-6 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeFilter === filter ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`"
          >
            {{ filter }}
          </button>
        </div>
        
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline"
            class="flex-1 sm:flex-none h-11 sm:h-12 border-zinc-200 dark:border-zinc-800 rounded-2xl dark:hover:bg-zinc-900/50"
            @click="exportToPdf"
          >
            <FileText class="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            id="btn-tambah-transaksi"
            class="flex-[2] sm:flex-none bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-black font-black text-[10px] sm:text-xs uppercase tracking-widest gap-2 sm:gap-3 px-6 h-11 sm:h-12 rounded-2xl shadow-xl transition-all"
            @click="openCreateModal"
          >
            <Plus class="w-4 h-4" />
            Tambah
          </Button>
        </div>
      </div>

      <div class="flex items-center gap-3">
         <h3 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight">Transaksi Terakhir</h3>
         <span class="bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-xl text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{{ filteredRecords.length }} Data</span>
      </div>
    </div>

    <!-- Transaction List Grid -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
       <Loader2 class="w-8 h-8 animate-spin text-zinc-400" />
       <p class="text-zinc-400 font-black text-[10px] uppercase tracking-widest">Sinkronisasi...</p>
    </div>
    <div v-else-if="filteredRecords.length === 0" class="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-900 rounded-[40px] gap-4">
       <ReceiptText class="w-12 h-12 text-zinc-300 dark:text-zinc-800" />
       <p class="text-zinc-400 font-bold text-sm">Tidak ada transaksi.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20 sm:pb-8">
       <!-- Transaction Card -->
       <div 
         v-for="item in filteredRecords" 
         :key="item.id"
         class="group bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 hover:shadow-lg dark:hover:bg-zinc-900/60 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-4 relative overflow-hidden"
       >
          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
               <div :class="`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${getTypeShadow(item.category_types?.name)}`">
                  <TrendingDown v-if="item.category_types?.name === 'pengeluaran'" class="w-5 h-5 sm:w-6 sm:h-6" />
                  <TrendingUp v-else-if="item.category_types?.name === 'pemasukan'" class="w-5 h-5 sm:w-6 sm:h-6" />
                  <ArrowRightLeft v-else class="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
               </div>
               <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm sm:text-base font-black text-zinc-900 dark:text-white truncate leading-tight">{{ item.category?.name || 'Lainnya' }}</h4>
                    <span :class="`px-2 py-0.5 rounded-lg text-[7px] sm:text-[8px] font-black uppercase tracking-widest border shrink-0 ${getTypeBadge(item.category_types?.name)}`">
                       {{ item.category_types?.name || '-' }}
                    </span>
                  </div>
                  <p class="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-bold mt-0.5 truncate">{{ item.description || 'Tanpa keterangan' }}</p>
               </div>
            </div>
            
            <div class="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-all transition-duration-300">
               <button @click.stop="openEditModal(item)" class="p-2 text-zinc-400 hover:text-amber-600 transition-colors bg-zinc-50 dark:bg-zinc-800/50 rounded-xl"><Pencil class="w-3.5 h-3.5" /></button>
               <button @click.stop="confirmDelete(item.id)" class="p-2 text-zinc-400 hover:text-rose-500 transition-colors bg-zinc-50 dark:bg-zinc-800/50 rounded-xl"><Trash2 class="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div class="relative z-10 px-0.5">
             <span :class="`text-xl sm:text-2xl font-black tabular-nums tracking-tight ${getTypeValueColor(item.category_types?.name)}`">
                {{ item.category_types?.name === 'pengeluaran' ? '-' : (item.category_types?.name === 'pemasukan' ? '+' : '') }} Rp {{ formatCurrency(item.amount) }}
             </span>
             <p class="text-[10px] font-black text-zinc-500 mt-1 uppercase tracking-widest flex items-center gap-1.5">
                <Wallet class="w-3 h-3 text-zinc-400" />
                {{ item.financial?.name || '-' }}
             </p>
          </div>

          <div class="flex items-center justify-between relative z-10 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
             <div class="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-zinc-400">
                <CalendarDays class="w-3 h-3" />
                {{ formatDate(item.date) }}
             </div>
             <button @click="openDetailModal(item)" class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-500 hover:opacity-70 transition-colors">Detail &rarr;</button>
          </div>
       </div>
    </div>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[95%] sm:max-w-2xl bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-[28px] sm:rounded-[40px] p-0 overflow-hidden shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
          <div class="p-5 sm:p-10 space-y-6 sm:space-y-10">
             <div class="space-y-1.5">
                <DialogTitle class="text-lg sm:text-2xl font-black tracking-tight uppercase leading-tight">{{ isEditing ? 'Update Rekam' : 'Pencatatan Baru' }}</DialogTitle>
                <DialogDescription class="text-zinc-400 text-[10px] sm:text-sm font-medium">Masukan detail transaksi Anda dengan teliti agar data keuangan Anda tetap akurat.</DialogDescription>
             </div>

             <form @submit.prevent="submitForm" class="space-y-6 sm:space-y-8">
                <div class="space-y-6 sm:space-y-8">
                   <!-- Nominal -->
                   <div class="space-y-3">
                      <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest px-1">Nominal Transaksi</label>
                      <div class="relative group">
                         <div class="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-lg sm:text-2xl font-black text-zinc-300 dark:text-zinc-700 transition-colors group-focus-within:dark:text-white group-focus-within:text-zinc-900">Rp</div>
                         <input 
                           v-model="formattedAmount" 
                           type="text" 
                           placeholder="0" 
                           class="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl sm:rounded-[32px] pl-14 sm:pl-20 pr-6 sm:pr-8 py-4 sm:py-8 text-xl sm:text-4xl font-black outline-none focus:border-zinc-900 dark:focus:border-white transition-all tabular-nums text-zinc-900 dark:text-white placeholder-zinc-200 dark:placeholder-zinc-800 shadow-inner"
                           required
                         />
                      </div>
                   </div>

                   <!-- Info Grid -->
                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div class="space-y-2">
                         <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest px-1">Tipe Transaksi</label>
                         <div class="relative">
                           <select v-model="form.category_types_id" class="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-600 appearance-none cursor-pointer" required>
                             <option value="" disabled>Pilih Tipe</option>
                             <option v-for="t in availableTypes" :key="t.id" :value="t.id">{{ t.name.toUpperCase() }}</option>
                           </select>
                           <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                         </div>
                      </div>
                      <div class="space-y-2">
                         <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest px-1">Akun / Aset</label>
                         <div class="relative">
                            <select v-model="form.financial_id" class="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-600 appearance-none cursor-pointer" required>
                              <option value="" disabled>Pilih Akun</option>
                              <option v-for="f in availableFinancials" :key="f.id" :value="f.id">{{ f.name }}</option>
                            </select>
                            <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                         </div>
                      </div>
                      <div class="space-y-2">
                         <div class="flex items-center justify-between px-1">
                            <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest">Kategori</label>
                            <NuxtLink to="/finance/category" class="text-[9px] font-black text-blue-600 hover:text-blue-700 dark:text-blue-400 uppercase tracking-widest hover:underline transition-all">Kelola +</NuxtLink>
                         </div>
                         <div class="relative">
                           <select v-model="form.category_id" class="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-600 appearance-none cursor-pointer" required>
                             <option value="" disabled>Pilih Kategori</option>
                             <option v-for="c in availableCategories" :key="c.id" :value="c.id">{{ c.name }}</option>
                           </select>
                           <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                         </div>
                      </div>
                      <div class="space-y-2">
                         <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest px-1">Tanggal</label>
                         <input v-model="form.date" type="date" class="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-600 cursor-pointer" required />
                      </div>
                   </div>

                   <div class="space-y-2">
                      <label class="text-[9px] sm:text-[11px] font-black text-zinc-500 uppercase tracking-widest px-1">Catatan Tambahan</label>
                      <textarea v-model="form.description" rows="2" class="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-600 transition-all resize-none shadow-inner" placeholder="E.g. Makan siang bareng tim..."></textarea>
                   </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
                   <Button type="button" variant="ghost" class="h-12 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest text-zinc-400 order-2 sm:order-1" @click="isFormModalOpen = false">Batal</Button>
                   <Button type="submit" class="flex-1 h-12 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xl order-1 sm:order-2" :disabled="isSubmitting">
                      <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                      {{ isEditing ? 'Perbarui Data' : 'Rekam Sekarang' }}
                   </Button>
                </div>
             </form>
          </div>
      </DialogContent>
    </Dialog>


    <!-- Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="max-w-md bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-[32px] sm:rounded-[40px] p-0 overflow-hidden shadow-2xl transition-all">
          <DialogTitle class="sr-only">Rincian Transaksi Keuangan</DialogTitle>
          <DialogDescription class="sr-only">Informasi lengkap mengenai histori transaksi yang Anda pilih dari daftar jurnal.</DialogDescription>
          <div v-if="selectedRecord" class="flex flex-col">
            <div :class="`h-24 sm:h-28 w-full relative flex items-center justify-center ${getTypeBg(selectedRecord.category_types?.name)} text-white`">
                <ReceiptText class="w-10 h-10" />
            </div>
            <div class="p-8 sm:p-10 -mt-6 bg-white dark:bg-zinc-950 rounded-t-3xl relative z-10 space-y-8">
              <div class="text-center space-y-3">
                 <span :class="`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${getTypeBadge(selectedRecord.category_types?.name)}`">{{ selectedRecord.category_types?.name }}</span>
                 <h2 class="text-2xl sm:text-3xl font-black tracking-tighter tabular-nums">Rp {{ formatCurrency(selectedRecord.amount) }}</h2>
                 <p class="text-sm font-bold text-zinc-500 dark:text-zinc-400 border-x-2 border-zinc-100 dark:border-zinc-800 inline-block px-4">{{ selectedRecord.description || 'Tanpa Catatan' }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                 <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                    <span class="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Kategori</span>
                    <p class="text-[13px] font-bold truncate">{{ selectedRecord.category?.name || '-' }}</p>
                 </div>
                 <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                    <span class="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Aset</span>
                    <p class="text-[13px] font-bold truncate">{{ selectedRecord.financial?.name || '-' }}</p>
                 </div>
                 <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 col-span-2">
                    <span class="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Waktu</span>
                    <p class="text-[13px] font-bold">{{ formatDate(selectedRecord.date) }} • {{ formatTime(selectedRecord.created_at) }}</p>
                 </div>
              </div>

              <Button variant="outline" class="w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest border-zinc-200 dark:border-zinc-800 text-zinc-500" @click="isDetailModalOpen = false">Tutup Detail</Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[32px] border-zinc-100 dark:border-zinc-800 p-8 sm:p-10 shadow-2xl">
         <AlertDialogHeader class="space-y-4 text-center">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 mx-auto">
               <Trash2 class="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div class="space-y-2">
              <AlertDialogTitle class="text-xl sm:text-2xl font-black uppercase text-zinc-900 dark:text-white">Batalkan Transaksi?</AlertDialogTitle>
              <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400 px-4">Tindakan ini permanen. Saldo pada aset terkait akan secara otomatis disesuaikan.</AlertDialogDescription>
            </div>
         </AlertDialogHeader>
         <div class="flex flex-col sm:flex-row gap-3 mt-8">
            <AlertDialogCancel class="flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 border-none transition-all order-2 sm:order-1">Batal</AlertDialogCancel>
            <AlertDialogAction 
              @click="executeDelete" 
              class="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/20 order-1 sm:order-2"
            >
              Hapus Data
            </AlertDialogAction>
         </div>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  TrendingUp, TrendingDown, ArrowUpRight, Plus, Loader2, ReceiptText, 
  Pencil, Trash2, CalendarDays, Wallet, ArrowRightLeft, Search, Eye, FileText, ChevronDown
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogTitle
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  getAccountingRecords, createAccountingRecord, updateAccountingRecord, deleteAccountingRecord, 
  type AccountingItem 
} from '~/server/api/public/accounting'
import { getCategories, getPublicCategoryTypes, type CategoryItem, type CategoryType } from '~/server/api/public/finance-category'
import { getFinancials, type FinancialItem } from '~/server/api/public/finance'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Riwayat Transaksi ',
  robots: 'noindex, nofollow'
})


const records = ref<AccountingItem[]>([])
const availableTypes = ref<CategoryType[]>([])
const availableCategories = ref<CategoryItem[]>([])
const availableFinancials = ref<FinancialItem[]>([])

const isLoading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('Semua')
const currentPage = ref(1)
const pageSize = ref(100) 

// Date Selectors
const now = new Date()
const selectedMonth = ref(now.getMonth() + 1)
const selectedYear = ref(now.getFullYear())
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i)

const currentMonthName = computed(() => months[selectedMonth.value - 1])
const currentYear = computed(() => selectedYear.value)


// Computed Summaries
const totalIncome = computed(() => {
  return records.value
    .filter(r => r.category_types?.name === 'pemasukan')
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalExpense = computed(() => {
  return records.value
    .filter(r => r.category_types?.name === 'pengeluaran')
    .reduce((sum, item) => sum + item.amount, 0)
})

const netIncome = computed(() => totalIncome.value - totalExpense.value)

const filteredRecords = computed(() => {
  let list = records.value
  if (activeFilter.value !== 'Semua') {
    list = list.filter(r => r.category_types?.name.toLowerCase() === activeFilter.value.toLowerCase())
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(r => 
      r.description?.toLowerCase().includes(q) || 
      r.category?.name?.toLowerCase().includes(q)
    )
  }
  return list
})

// Modals State
const isFormModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const selectedRecord = ref<AccountingItem | null>(null)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

const form = ref({
  amount: 0,
  description: '',
  category_types_id: '',
  category_id: '',
  financial_id: '',
  date: new Date().toISOString().split('T')[0]
})

const formattedAmount = computed({
  get: () => form.value.amount ? form.value.amount.toLocaleString('id-ID') : '',
  set: (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '')
    form.value.amount = numeric ? parseInt(numeric, 10) : 0
  }
})

// ─── Helpers ───────────────────────────────────────────────────────────────
const formatCurrency = (val: number) => Math.abs(val).toLocaleString('id-ID')
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const getTypeShadow = (type: string | undefined) => {
  const t = type?.toLowerCase()
  if (t === 'pemasukan') return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500'
  if (t === 'pengeluaran') return 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-500'
  return 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-500'
}

const getTypeBadge = (type: string | undefined) => {
  const t = type?.toLowerCase()
  if (t === 'pemasukan') return 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
  if (t === 'pengeluaran') return 'bg-rose-50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'
  return 'bg-amber-50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400'
}

const getTypeValueColor = (type: string | undefined) => {
  const t = type?.toLowerCase()
  if (t === 'pemasukan') return 'text-emerald-600 dark:text-emerald-500'
  if (t === 'pengeluaran') return 'text-rose-600 dark:text-rose-500'
  return 'text-zinc-900 dark:text-white'
}

const getTypeBg = (type: string | undefined) => {
  const t = type?.toLowerCase()
  if (t === 'pemasukan') return 'bg-emerald-500'
  if (t === 'pengeluaran') return 'bg-rose-500'
  return 'bg-sky-500'
}

// ─── Data Fetching ────────────────────────────────────────────────────────
const fetchData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getAccountingRecords(
      token, 
      currentPage.value, 
      pageSize.value, 
      searchQuery.value,
      selectedMonth.value,
      selectedYear.value
    )
    const result = await response.json()
    if (response.ok && result.success) {
      records.value = result.payload || []
    }
  } catch (error) {
    console.error('Error fetching records:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchDependencies = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const [typesRes, catRes, finRes] = await Promise.all([
      getPublicCategoryTypes(token),
      getCategories(token, 1, 100),
      getFinancials(token, 1, 100)
    ])
    const [t, c, f] = await Promise.all([typesRes.json(), catRes.json(), finRes.json()])
    availableTypes.value = t.payload || []
    availableCategories.value = c.payload || []
    availableFinancials.value = f.payload || []
  } catch (err) {}
}

const openDetailModal = (item: AccountingItem) => {
  selectedRecord.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { amount: 0, description: '', category_types_id: '', category_id: '', financial_id: '', date: new Date().toISOString().split('T')[0] }
  isFormModalOpen.value = true
}

const openEditModal = (item: AccountingItem) => {
  isEditing.value = true
  selectedRecord.value = item
  form.value = { 
    amount: item.amount, description: item.description, 
    category_types_id: item.category_types?.id || '', 
    category_id: item.category?.id || '', financial_id: item.financial?.id || '', 
    date: item.date.split('T')[0] 
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload: any = { 
      amount: Number(form.value.amount),
      description: form.value.description || '',
      category_types_id: form.value.category_types_id,
      category_id: form.value.category_id,
      financial_id: form.value.financial_id,
      date: form.value.date || new Date().toISOString().split('T')[0]
    }
    const response = isEditing.value 
      ? await updateAccountingRecord(selectedRecord.value!.id, payload as any, token)
      : await createAccountingRecord(payload as any, token)
    if (response.ok) {
      alertSuccess(isEditing.value ? 'Data Diupdate' : 'Berhasil Dicatat')
      isFormModalOpen.value = false
      fetchData()
    }
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
  const token = localStorage.getItem('token') || ''
  const res = await deleteAccountingRecord(deleteItemId.value, token)
  if (res.ok) {
    alertSuccess('Terhapus')
    fetchData()
  }
  isDeleteDialogOpen.value = false
}

const exportToPdf = () => {
  if (records.value.length === 0) return alertError('Tidak ada data.')
  alertInfo('Menyiapkan Laporan...')
  try {
    const doc = new jsPDF()
    const tableData = records.value.map(item => [
      formatDate(item.date),
      item.category_types?.name.toUpperCase() || '-',
      item.description,
      item.category?.name || '-',
      `Rp ${formatCurrency(item.amount)}`
    ])
    autoTable(doc, {
      head: [['Tanggal', 'Tahun', 'Keterangan', 'Kategori', 'Nominal']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [39, 39, 42] }
    })
    doc.save(`jurnal-${selectedMonth.value}-${selectedYear.value}.pdf`)
    alertSuccess('Downloaded')
  } catch (err) {}
}

watch([selectedMonth, selectedYear], () => {
  currentPage.value = 1
  fetchData()
})

onMounted(() => {

  fetchData()
  fetchDependencies()
})
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
