<template>
  <div class="px-4 py-8 sm:px-8 space-y-10 max-w-7xl mx-auto">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="space-y-2">
        <h1 class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
          Transaksi <span class="text-blue-600">Investasi</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Pantau dan kelola portofolio investasi Anda secara sistematis dan real-time.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <!-- Document Export Tools -->
        <div class="flex items-center gap-2 mr-2">
          <Button 
            variant="outline"
            class="w-12 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-red-500 hover:bg-red-50/50 transition-all duration-300 shadow-sm"
            title="Export PDF"
            @click="exportToPdf"
          >
            <FileText class="w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            class="w-12 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-blue-600 hover:bg-blue-50/50 transition-all duration-300 shadow-sm"
            title="Export Excel"
            @click="exportToExcel"
          >
            <FileSpreadsheet class="w-5 h-5" />
          </Button>
        </div>

        <Button 
          id="btn-tambah-investasi"
          class="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all gap-3"
          @click="openCreateModal"
        >
          <Plus class="w-5 h-5" />
          Tambah Investasi
        </Button>
      </div>
    </header>

    <!-- Toolbar: Search Section -->
    <section class="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
      <div class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-4 shadow-xl shadow-blue-500/5">
        <div class="relative">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            v-model="searchQuery"
            placeholder="Cari asetm emiten, atau instrumen (misal: BBCA, Bitcoin)..." 
            class="w-full h-14 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 placeholder:text-zinc-400 placeholder:font-medium"
          />
        </div>
      </div>
    </section>

    <!-- Investment Card Grid (Unified Responsive View) -->
    <main class="space-y-8 pb-20 sm:pb-10">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-4">
         <Loader2 class="w-10 h-10 animate-spin text-blue-600/30" />
         <p class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] animate-pulse">Sinkronisasi Portfolio...</p>
      </div>

      <div v-else-if="investments.length === 0" class="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-100 dark:border-zinc-800/60 rounded-[3rem] gap-6">
         <div class="w-20 h-20 rounded-full bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center">
            <TrendingUp class="w-10 h-10 text-zinc-300 dark:text-zinc-800" />
         </div>
         <p class="text-zinc-400 font-black text-[11px] uppercase tracking-widest text-center">Belum ada catatan investasi.<br/><span class="opacity-40 font-bold lowercase italic text-xs">Mulai catat pertumbuhan aset Anda hari ini.</span></p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
         <div 
           v-for="item in investments" 
           :key="item.id"
           class="group bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-[32px] p-6 sm:p-8 hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:bg-zinc-900/60 hover:border-blue-100/50 dark:hover:border-blue-900/30 transition-all flex flex-col justify-between gap-8 relative overflow-hidden"
           @click="openDetailModal(item)"
         >
            <!-- Hover Action Overlay -->
            <div class="absolute right-6 top-6 flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-all duration-300" @click.stop>
               <button @click="openEditModal(item)" class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 transition-all">
                  <Pencil class="w-4 h-4" />
               </button>
               <button @click="confirmDelete(item.id)" class="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all">
                  <Trash2 class="w-4 h-4" />
               </button>
            </div>

            <div class="space-y-6">
               <div class="flex items-center gap-5">
                  <div :class="`w-14 h-14 rounded-3xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-xl transition-transform group-hover:scale-105 duration-500 ${getAvatarColor(item.name)}`">
                    {{ item.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="min-w-0 pr-10 sm:pr-0">
                    <h4 class="text-[17px] font-black text-zinc-900 dark:text-white truncate tracking-tight uppercase leading-none">{{ item.name }}</h4>
                    <span class="inline-flex mt-2 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 border border-blue-100/50 dark:border-blue-900/20">
                      {{ item.investment_category?.name }}
                    </span>
                  </div>
               </div>

               <div class="space-y-1.5">
                  <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Total Nilai</span>
                  <h3 class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter leading-none">Rp {{ formatCurrency(item.amount) }}</h3>
                  <div class="flex items-center gap-2 mt-3 text-zinc-400 font-bold text-[11px] px-1">
                     <Wallet class="w-3.5 h-3.5 text-zinc-300" />
                     {{ item.financial?.name }}
                  </div>
               </div>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
               <div class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <CalendarDays class="w-4 h-4 opacity-50" />
                  {{ formatDate(item.purchase_date) }}
               </div>
               <div class="flex items-center gap-2" @click.stop>
                  <!-- Take Profit Button -->
                  <button @click="openProfitModal(item)" class="h-10 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all border border-emerald-100/30 dark:border-emerald-900/30 shadow-sm" title="Take Profit">
                    <ArrowUpRight class="w-3.5 h-3.5" />
                    TP / Sell
                  </button>
                  <button @click="openAmountModal(item)" class="h-10 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all shadow-sm">
                    <History class="w-3.5 h-3.5" />
                    Price
                  </button>
                  <button @click="openDetailModal(item)" class="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 flex items-center justify-center text-zinc-400 hover:text-blue-600 transition-all border border-zinc-100 dark:border-zinc-800/60 shadow-sm">
                    <Eye class="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      <!-- Pagination Hub -->
      <footer class="flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
        <div class="flex items-center gap-3">
           <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-500/20">
              {{ currentPage }}
           </div>
           <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest">
              Halaman {{ currentPage }} <span class="mx-2 opacity-30">dari</span> {{ totalPages }}
           </p>
        </div>

        <div class="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            class="flex-1 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-zinc-50"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Sebelumnya
          </Button>
          <Button 
            variant="outline" 
            class="flex-1 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-zinc-50"
            :disabled="currentPage >= totalPages"
            @click="nextPage"
          >
            Selanjutnya
          </Button>
        </div>
      </footer>
    </main>

    <!-- Dialogs: High-Fidelity Information & CRUD -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Rincian detail riwayat investasi yang Anda pilih.</DialogDescription>
        <div v-if="selectedInvestment" class="p-10 space-y-8">
          <div class="flex flex-col items-center text-center space-y-6">
            <div :class="`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedInvestment.name)}`">
              {{ selectedInvestment.name.charAt(0).toUpperCase() }}
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedInvestment.name }}</h3>
              <div class="inline-flex h-8 px-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] items-center">
                 {{ selectedInvestment.investment_category?.name }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4 text-left">
             <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 flex flex-col items-center">
              <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Total Nilai Investasi</span>
              <p class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter antialiased">Rp {{ formatCurrency(selectedInvestment.amount) }}</p>
            </div>
            <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-3">
               <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sumber Dana</span>
                  <span class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ selectedInvestment.financial?.name }}</span>
               </div>
               <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Tanggal Beli</span>
                  <span class="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">{{ formatDate(selectedInvestment.purchase_date) }}</span>
               </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            class="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:text-blue-600 transition-all font-bold" 
            @click="isDetailModalOpen = false"
          >
            Tutup Informasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-xl bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogDescription class="sr-only">Formulir untuk memperbarui atau mencatat transaksi investasi baru ke dalam portofolio Anda.</DialogDescription>
        <div class="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div class="flex items-center gap-6 p-10 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 backdrop-blur-xl z-20">
            <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl ${isEditing ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-600 shadow-blue-500/20'}`">
              <TrendingUp v-if="isEditing" class="w-8 h-8" />
              <Plus v-else class="w-8 h-8" />
            </div>
            <div class="text-left">
              <DialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                {{ isEditing ? 'Edit' : 'Catat' }} <span class="text-blue-600">Investasi</span>
              </DialogTitle>
              <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1">Manajemen Portofolio Berjangka</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-10 space-y-8">
            <div class="space-y-6 text-left">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nama Aset / Emiten <span class="text-blue-600">*</span></label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="E.g. BBCA, Bitcoin, Emas Antam" 
                  class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" 
                  required
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Kategori Investasi <span class="text-blue-600">*</span></label>
                    <div class="relative">
                      <select v-model="form.investment_category_id" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 outline-none appearance-none cursor-pointer" required>
                         <option value="" disabled>Pilih Kategori...</option>
                         <option v-for="cat in investmentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                      </select>
                      <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                    </div>
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Sumber Dana <span class="text-blue-600">*</span></label>
                    <div class="relative">
                      <select v-model="form.financial_id" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 outline-none appearance-none cursor-pointer" required>
                         <option value="" disabled>Pilih Financial...</option>
                         <option v-for="fin in financialAssets" :key="fin.id" :value="fin.id">{{ fin.name }} (Rp {{ formatCurrency(fin.saldo) }})</option>
                      </select>
                      <ChevronDown class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                    </div>
                 </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nilai Investasi <span class="text-blue-600">*</span></label>
                    <input 
                      v-model="formattedAmount" 
                      type="text" 
                      placeholder="0" 
                      class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-black text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 tabular-nums" 
                      required
                    />
                 </div>
                 <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Tanggal Beli <span class="text-blue-600">*</span></label>
                    <input 
                      v-model="form.purchase_date" 
                      type="date" 
                      class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 transition-all" 
                      required
                    />
                 </div>
              </div>
            </div>

            <div class="flex gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 h-15 rounded-2xl font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button 
                type="submit" 
                class="flex-1 h-15 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all" 
                :disabled="isSubmitting || !form.name.trim() || !form.financial_id"
              >
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Simpan Data' : 'Catat Investasi' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Dangerous Area: Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[3rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6 text-center">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto shadow-xl">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Hapus Investasi?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Data portofolio ini akan dihapus permanen. Tindakan ini tidak akan mengembalikan saldo ke akun financial Anda secara otomatis.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-10">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all font-bold"
          >
            Ya, Hapus Saja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Change Amount Modal -->
    <Dialog :open="isAmountModalOpen" @update:open="val => { if (!isSubmitting) isAmountModalOpen = val }">
       <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
          <DialogTitle class="sr-only">Update Harga Pasar Investasi</DialogTitle>
          <div class="p-10 space-y-8 text-center">
             <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-2xl">
                <TrendingUp class="w-8 h-8" />
             </div>
             
             <div class="space-y-1">
                <h3 class="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Update Harga Pasar</h3>
                <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic truncate">{{ selectedInvestment?.name }}</p>
             </div>

             <div class="space-y-3 text-left">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Harga Pasar Terbaru (Rp)</label>
                <div class="relative group">
                   <div class="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-zinc-300 dark:text-zinc-700 group-focus-within:text-indigo-600">Rp</div>
                   <input v-model="amountFormatted" type="text" placeholder="0" class="w-full h-18 pl-16 pr-8 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-2xl font-black tabular-nums transition-all outline-none focus:border-indigo-500 shadow-inner" autofocus />
                </div>
             </div>

             <div class="flex gap-4">
                <Button variant="outline" class="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" @click="isAmountModalOpen = false">Batal</Button>
                <Button class="flex-1 h-14 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/10" :disabled="isSubmitting" @click="submitAmountChange">
                   <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                   Update Harga
                </Button>
             </div>
          </div>
       </DialogContent>
    </Dialog>

     <!-- Take Profit Modal -->
     <Dialog :open="isProfitModalOpen" @update:open="val => { if (!isSubmitting) isProfitModalOpen = val }">
        <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
           <DialogTitle class="sr-only">Cairkan Profit Investasi</DialogTitle>
           <div class="p-10 space-y-8 text-center">
              <div class="w-20 h-20 rounded-[2rem] bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                 <ArrowUpRight class="w-10 h-10" />
              </div>
              
              <div class="space-y-1">
                 <h3 class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">Take Profit</h3>
                 <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest italic truncate">{{ selectedInvestment?.name }}</p>
              </div>
 
              <div class="space-y-3 text-left">
                 <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-2">Nominal Pencairan (Rp)</label>
                 <div class="relative group">
                    <div class="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-300 dark:text-zinc-700 group-focus-within:text-emerald-500 transition-colors">Rp</div>
                    <input v-model="profitAmountFormatted" type="text" placeholder="0" class="w-full h-20 pl-18 pr-8 rounded-[1.5rem] border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-3xl font-black tabular-nums transition-all outline-none focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5 shadow-inner" autofocus />
                 </div>
              </div>
 
              <div class="flex gap-4">
                 <Button variant="outline" class="flex-1 h-16 rounded-[1.25rem] font-black uppercase text-[10px] tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800 transition-all hover:bg-zinc-50" @click="isProfitModalOpen = false">Batal</Button>
                 <Button class="flex-1 h-16 rounded-[1.25rem] bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-500/10 transition-all" :disabled="isSubmitting || profitAmount <= 0" @click="submitProfit">
                    <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                    Ambil Cuan
                 </Button>
              </div>
           </div>
        </DialogContent>
     </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, FileText, FileSpreadsheet, TrendingUp, ChevronDown, History, Coins, Wallet, CalendarDays, ArrowUpRight
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogTitle
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  getInvestments, createInvestment, updateInvestment, deleteInvestment, 
  getPublicInvestmentCategories, updateInvestmentAmount, investmentProfit, type InvestmentItem 
} from '~/server/api/public/investment'
import { getFinancials } from '~/server/api/public/finance'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Manajemen Investasi',
  robots: 'noindex, nofollow'
})

const investments = ref<InvestmentItem[]>([])
const investmentCategories = ref<any[]>([])
const financialAssets = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modals State
const isDetailModalOpen = ref(false)
const selectedInvestment = ref<InvestmentItem | null>(null)
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isDeleteDialogOpen = ref(false)
const deleteItemId = ref<string | null>(null)

// Change Amount State
const isAmountModalOpen = ref(false)
const amountToChange = ref(0)
const amountFormatted = computed({
  get: () => amountToChange.value ? amountToChange.value.toLocaleString('id-ID') : '',
  set: (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '')
    amountToChange.value = numeric ? parseInt(numeric, 10) : 0
  }
})

// Take Profit State
const isProfitModalOpen = ref(false)
const profitAmount = ref(0)
const profitAmountFormatted = computed({
  get: () => profitAmount.value ? profitAmount.value.toLocaleString('id-ID') : '',
  set: (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '')
    profitAmount.value = numeric ? parseInt(numeric, 10) : 0
  }
})

const form = ref({
  name: '',
  investment_category_id: '',
  financial_id: '',
  purchase_date: new Date().toISOString().split('T')[0],
  transaction_date: new Date().toISOString().split('T')[0],
  amount: 0
})

const formattedAmount = computed({
  get: () => form.value.amount ? form.value.amount.toLocaleString('id-ID') : '',
  set: (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '')
    form.value.amount = numeric ? parseInt(numeric, 10) : 0
  }
})

// ─── Theme: Investment Blue ───────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-blue-500 to-indigo-600',
  'bg-gradient-to-br from-cyan-500 to-blue-600',
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-purple-500 to-pink-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
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

// ─── Data Engine ─────────────────────────────────────────────────────────────
const fetchInvestments = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getInvestments(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      investments.value = result.payload || []
      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    }
  } catch (error) {
    console.error('Error fetching investments:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchDependencies = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const [resCat, resFin] = await Promise.all([
      getPublicInvestmentCategories(token, 1, 100).then(r => r.json()),
      getFinancials(token, 1, 100).then(r => r.json())
    ])
    
    if (resCat.success) investmentCategories.value = resCat.payload || []
    if (resFin.success) financialAssets.value = resFin.payload || []
    
  } catch (error) {
    console.error('Error fetching dependencies:', error)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  fetchInvestments()
})

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchInvestments() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchInvestments() } }

// ─── Document Export ─────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (investments.value.length === 0) {
    alertError('Tidak ada data investasi untuk diexport.')
    return
  }
  alertInfo('Menyiapkan dokumen PDF Portfolio...')
  try {
    const doc = new jsPDF()
    const tableData = investments.value.map(item => [
      item.name,
      item.investment_category?.name || '-',
      item.financial?.name || '-',
      `Rp ${formatCurrency(item.amount)}`,
      formatDate(item.purchase_date)
    ])
    autoTable(doc, {
      head: [['Emiten/Asset', 'Kategori', 'Sumber Dana', 'Nilai Investasi', 'Tanggal Beli']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 8, font: 'helvetica' }
    })
    doc.save(`portfolio-investasi-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat laporan PDF.')
  }
}

const exportToExcel = () => {
  if (investments.value.length === 0) {
    alertError('Tidak ada data investasi untuk diexport.')
    return
  }
  alertInfo('Menyiapkan file Excel Portfolio...')
  try {
    const flatData = investments.value.map(item => ({
      'Emiten/Asset': item.name,
      'Kategori': item.investment_category?.name || '-',
      'Sumber Dana': item.financial?.name || '-',
      'Nilai Investasi': item.amount,
      'Tanggal Beli': formatDate(item.purchase_date)
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Portfolio')
    XLSX.writeFile(workbook, `report-investasi-${new Date().getTime()}.xlsx`)
    alertSuccess('Laporan Excel berhasil diunduh.')
  } catch (err) {
    alertError('Gagal membuat file Excel.')
  }
}

// ─── Interaction Handlers ─────────────────────────────────────────────────────
const openDetailModal = (item: InvestmentItem) => {
  selectedInvestment.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { 
    name: '',
    investment_category_id: '',
    financial_id: '',
    purchase_date: new Date().toISOString().split('T')[0],
    transaction_date: new Date().toISOString().split('T')[0],
    amount: 0
  }
  isFormModalOpen.value = true
}

const openEditModal = (item: InvestmentItem) => {
  isEditing.value = true
  selectedInvestment.value = item
  form.value = { 
    name: item.name, 
    investment_category_id: item.investment_category?.id || '',
    financial_id: item.financial?.id || '',
    purchase_date: item.purchase_date.split('T')[0],
    transaction_date: item.transaction_date.split('T')[0],
    amount: item.amount
  }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = { 
      name: form.value.name,
      investment_category_id: form.value.investment_category_id,
      financial_id: form.value.financial_id,
      purchase_date: form.value.purchase_date || '',
      transaction_date: form.value.transaction_date || '',
      amount: Number(form.value.amount)
    }
    const response = isEditing.value 
      ? await updateInvestment(selectedInvestment.value!.id, payload, token)
      : await createInvestment(payload, token)
    
    const result = await response.json()
    if (response.ok && result.success) {
      alertSuccess(isEditing.value ? 'Data diperbarui.' : 'Investasi dicatat.')
      isFormModalOpen.value = false
      fetchInvestments()
    } else {
      alertError(result.message || 'Gagal menyimpan data.')
    }
  } catch (error) {
    alertError('Masalah koneksi server.')
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
    const response = await deleteInvestment(deleteItemId.value, token)
    if (response.ok) {
      alertSuccess('Rekaman dihapus.')
      fetchInvestments()
    } else {
      alertError('Gagal menghapus data.')
    }
  } catch (error) {
    alertError('Kesalahan sistem.')
  } finally {
    isDeleteDialogOpen.value = false
  }
}

const openAmountModal = (item: InvestmentItem) => {
  selectedInvestment.value = item
  amountToChange.value = item.amount
  isAmountModalOpen.value = true
}

const submitAmountChange = async () => {
  if (!selectedInvestment.value) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await updateInvestmentAmount(selectedInvestment.value.id, amountToChange.value, token)
    if (response.ok) {
      alertSuccess('Harga pasar investasi diperbarui.')
      isAmountModalOpen.value = false
      fetchInvestments()
    } else {
      alertError('Gagal memperbarui nilai investasi.')
    }
  } catch (error) {
    alertError('Kesalahan server.')
  } finally {
    isSubmitting.value = false
  }
}

const openProfitModal = (item: InvestmentItem) => {
  selectedInvestment.value = item
  profitAmount.value = 0
  isProfitModalOpen.value = true
}

const submitProfit = async () => {
  if (!selectedInvestment.value || profitAmount.value <= 0) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await investmentProfit(selectedInvestment.value.id, Number(profitAmount.value), token)
    const result = await response.json()
    if (response.ok) {
      alertSuccess('Profit berhasil dicairkan! Cuan masuk saldo.')
      isProfitModalOpen.value = false
      fetchInvestments()
    } else {
      alertError(result.message)
    }
  } catch (error) {
    alertError('Kesalahan server.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchInvestments()
  fetchDependencies()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
