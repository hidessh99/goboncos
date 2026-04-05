<template>
  <div class="px-4 py-8 sm:px-8 space-y-10 max-w-7xl mx-auto transition-all duration-500">
    <!-- Header Section: Premium Summary -->
    <header class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div class="space-y-3">
        <h1 class="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none antialiased">
          Target & <span class="text-blue-600">Impian</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Visualisasikan rencana finansial masa depan Anda dengan data yang terukur.</p>
      </div>

      <!-- Quick Summary Stats -->
      <div class="flex flex-wrap items-center gap-6 p-6 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-blue-500/5">
        <div class="flex items-center gap-4 px-4">
          <div class="w-12 h-12 rounded-[1.25rem] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
             <Wallet class="w-6 h-6" />
          </div>
          <div>
            <p class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Sudah Terkumpul</p>
            <p class="text-lg font-black text-zinc-900 dark:text-white tabular-nums leading-none">Rp {{ formatCurrency(totalSaved) }}</p>
          </div>
        </div>
        
        <div class="hidden sm:block w-px h-10 bg-zinc-100 dark:bg-zinc-800"></div>

        <div class="flex items-center gap-4 px-4">
          <div class="w-12 h-12 rounded-[1.25rem] bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-500">
             <Target class="w-6 h-6" />
          </div>
          <div>
            <p class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Kekurangan Target</p>
            <p class="text-lg font-black text-rose-500 tabular-nums leading-none">Rp {{ formatCurrency(Math.max(0, totalTarget - totalSaved)) }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Toolbar: Search & Main Action -->
    <section class="flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div class="relative w-full sm:max-w-md group">
        <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
        <input 
          v-model="searchQuery"
          placeholder="Cari impian atau rencana tabungan..." 
          class="w-full h-15 pl-14 pr-6 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 placeholder:text-zinc-400 placeholder:font-medium shadow-sm"
        />
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="flex items-center gap-2 p-1.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[1.25rem] shadow-sm">
           <Button variant="ghost" class="w-11 h-11 p-0 rounded-xl text-zinc-400 hover:text-blue-600" title="Export PDF" @click="exportToPdf"><FileText class="w-5 h-5" /></Button>
           <Button variant="ghost" class="w-11 h-11 p-0 rounded-xl text-zinc-400 hover:text-emerald-500" title="Export Excel" @click="exportToExcel"><FileSpreadsheet class="w-5 h-5" /></Button>
        </div>
        <Button 
          class="flex-1 sm:flex-none h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all gap-3"
          @click="openCreateModal"
        >
          <Plus class="w-5 h-5" />
          Target Baru
        </Button>
      </div>
    </section>

    <!-- Content: Adaptive Data Display -->
    <main class="space-y-6">
      <!-- Desktop Performance View -->
      <div class="hidden lg:block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent border-zinc-50 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 pl-10 flex items-center gap-2">
                 Nama Impian <ChevronsUpDown class="w-3 h-3 opacity-30" />
              </TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Saldo Terkumpul</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Pencapaian</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16">Batas Waktu</TableHead>
              <TableHead class="text-[10px] font-black text-zinc-400 uppercase tracking-widest h-16 text-center pr-10">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading">
               <TableCell colspan="5" class="h-64 text-center">
                  <Loader2 class="w-10 h-10 animate-spin mx-auto text-blue-600 opacity-20" />
               </TableCell>
            </TableRow>
            <TableRow v-else-if="goals.length === 0">
               <TableCell colspan="5" class="h-64 text-center">
                  <div class="flex flex-col items-center gap-4 grayscale opacity-40">
                    <Target class="w-12 h-12 text-zinc-400" />
                    <p class="text-[11px] font-black uppercase tracking-widest text-zinc-500">Belum Ada Target Finansial</p>
                  </div>
               </TableCell>
            </TableRow>
            <TableRow 
              v-else 
              v-for="item in goals" 
              :key="item.id" 
              class="border-zinc-50 dark:border-zinc-800/60 hover:bg-blue-50/20 dark:hover:bg-blue-900/10 cursor-pointer transition-all duration-300 group"
              @click="openDetailModal(item)"
            >
              <TableCell class="py-7 pl-10">
                <div class="flex items-center gap-5">
                  <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-lg ${getAvatarColor(item.name)}`">
                    {{ item.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <span class="text-[15px] font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors block leading-none antialiased">{{ item.name }}</span>
                    <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-2 block">Sasaran: Rp {{ formatCurrency(item.total_goal) }}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell class="py-7 font-black text-blue-600 dark:text-blue-400 tabular-nums text-base">
                Rp {{ formatCurrency(item.amount) }}
              </TableCell>
              <TableCell class="py-7 min-w-[200px]">
                <div class="space-y-2">
                  <div class="flex justify-between items-center px-1">
                    <span class="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase">{{ calculatePercent(item.amount, item.total_goal) }}%</span>
                  </div>
                  <div class="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      class="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      :style="{ width: `${calculatePercent(item.amount, item.total_goal)}%` }"
                    ></div>
                  </div>
                </div>
              </TableCell>
              <TableCell class="py-7 text-[13px] font-bold text-zinc-400 dark:text-zinc-500">
                {{ formatDate(item.goal_date) }}
              </TableCell>
              <TableCell class="py-7 text-center pr-10">
                <div class="flex items-center justify-center gap-2" @click.stop>
                   <button @click="openFundModal(item)" class="w-10 h-10 flex items-center justify-center rounded-xl text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all shadow-sm" title="Tabung"><PlusCircle class="w-5 h-5" /></button>
                   <button @click="openEditModal(item)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 transition-all"><Pencil class="w-5 h-5" /></button>
                   <button @click="confirmDelete(item.id)" class="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-all"><Trash2 class="w-5 h-5" /></button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Tablet/Mobile Grid View -->
      <div class="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700 delay-300">
        <div 
          v-for="item in goals" 
          :key="item.id"
          class="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/5 active:scale-[0.98] transition-all space-y-6 relative overflow-hidden group"
          @click="openDetailModal(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-5">
              <div :class="`w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg ${getAvatarColor(item.name)}`">
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h4 class="text-lg font-black text-zinc-900 dark:text-white truncate uppercase tracking-tighter leading-none">{{ item.name }}</h4>
                <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Target: {{ formatDate(item.goal_date) }}</p>
              </div>
            </div>
            <span class="text-xl font-black text-blue-600 dark:text-blue-400 tabular-nums leading-none">{{ calculatePercent(item.amount, item.total_goal) }}%</span>
          </div>

          <div class="space-y-4">
             <div class="bg-zinc-50 dark:bg-zinc-800/40 rounded-[1.5rem] p-5 flex flex-col items-center border border-zinc-100 dark:border-zinc-800/50">
               <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">Terkumpul Sekarang</span>
               <h3 class="text-2xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter">Rp {{ formatCurrency(item.amount) }}</h3>
               <span class="text-[11px] font-medium text-zinc-400 mt-1 italic">/ Rp {{ formatCurrency(item.total_goal) }}</span>
             </div>

             <div class="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
               <div class="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000 ease-out" :style="{ width: `${calculatePercent(item.amount, item.total_goal)}%` }"></div>
             </div>
          </div>

          <div class="flex gap-3 pt-6 border-t border-zinc-50 dark:border-zinc-800/60" @click.stop>
             <Button variant="outline" class="flex-1 h-12 rounded-2xl border-emerald-100 dark:border-emerald-900/30 text-emerald-600 text-[10px] font-black uppercase tracking-widest gap-2" @click="openFundModal(item)"><PlusCircle class="w-4 h-4" />Tabung</Button>
             <Button variant="outline" class="w-12 h-12 p-0 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400" @click="openEditModal(item)"><Pencil class="w-4 h-4" /></Button>
             <Button variant="outline" class="w-12 h-12 p-0 rounded-2xl border-red-50 dark:border-red-900/10 text-red-400" @click="confirmDelete(item.id)"><Trash2 class="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      <!-- Pagination Hub -->
      <footer class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 animate-in fade-in duration-1000">
        <div class="flex items-center gap-4">
           <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-500/20">
              {{ currentPage }}
           </div>
           <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Halaman <span class="text-zinc-900 dark:text-white">{{ currentPage }}</span> dari {{ totalPages }}</p>
        </div>

        <div class="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" class="flex-1 sm:w-32 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all" :disabled="currentPage === 1" @click="prevPage">Sebelumnya</Button>
          <Button variant="outline" class="flex-1 sm:w-32 h-14 rounded-2xl border-zinc-100 dark:border-zinc-800 text-zinc-400 font-black text-[11px] uppercase tracking-widest disabled:opacity-30 transition-all" :disabled="currentPage >= totalPages" @click="nextPage">Selanjutnya</Button>
        </div>
      </footer>
    </main>

    <!-- Modal Dialogs: Re-Architecting with High-End Styles -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogTitle class="sr-only">Rincian Impian Finansial</DialogTitle>
        <DialogDescription class="sr-only">Detail progres dan statistik target menabung yang Anda pilih.</DialogDescription>
        <div v-if="selectedGoal" class="p-10 space-y-8 text-center">
            <div class="flex flex-col items-center space-y-5">
              <div :class="`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedGoal.name)}`">
                {{ selectedGoal.name.charAt(0).toUpperCase() }}
              </div>
              <div class="space-y-1">
                <h3 class="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{{ selectedGoal.name }}</h3>
                <p class="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">{{ calculatePercent(selectedGoal.amount, selectedGoal.total_goal) }}% Tercapai</p>
              </div>
            </div>
          
          <div class="grid grid-cols-1 gap-4 text-left">
             <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 flex flex-col items-center">
               <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Dana Sudah Siap</span>
               <p class="text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter">Rp {{ formatCurrency(selectedGoal.amount) }}</p>
             </div>
             <div class="grid grid-cols-2 gap-4">
                <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
                  <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Total Target</span>
                  <p class="text-[13px] font-black text-zinc-700 dark:text-zinc-200 tabular-nums">Rp {{ formatCurrency(selectedGoal.total_goal) }}</p>
                </div>
                <div class="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 text-right">
                  <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Deadline</span>
                  <p class="text-[13px] font-black text-zinc-700 dark:text-zinc-200">{{ formatDate(selectedGoal.goal_date) }}</p>
                </div>
             </div>
          </div>

          <Button variant="outline" class="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" @click="isDetailModalOpen = false">Tutup Informasi</Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isFormModalOpen" @update:open="val => { if (!isSubmitting) isFormModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-xl bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
        <DialogTitle class="sr-only">Formulir Target Finansial</DialogTitle>
        <DialogDescription class="sr-only">Input data untuk membuat atau memperbarui target rencana finansial Anda.</DialogDescription>
        <div class="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div class="flex items-center gap-6 p-10 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 backdrop-blur-xl z-20">
            <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl ${isEditing ? 'bg-amber-500' : 'bg-zinc-900 dark:bg-white dark:text-black'}`">
              <Target v-if="!isEditing" class="w-8 h-8" />
              <Pencil v-else class="w-8 h-8" />
            </div>
            <div class="text-left">
              <h2 class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">{{ isEditing ? 'Edit' : 'Catat' }} <span class="text-blue-600">Impian</span></h2>
              <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1">Rencana Nyata Untuk Masa Depan</p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="p-10 space-y-8">
            <div class="space-y-6 text-left">
              <div class="space-y-3">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Nama Target / Asset Impian <span class="text-blue-600">*</span></label>
                <input v-model="form.name" type="text" placeholder="E.g. Tabungan Rumah, Dana Pendidikan, Beli Mobil" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Total Target (Rp) <span class="text-blue-600">*</span></label>
                    <input v-model="form.total_goal" type="number" placeholder="0" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-black text-zinc-900 dark:text-white transition-all outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500 tabular-nums" required />
                </div>
                <div class="space-y-3">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-1">Batas Waktu Target <span class="text-blue-600">*</span></label>
                    <input v-model="form.goal_date" type="date" class="w-full h-15 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-500" required />
                </div>
              </div>
            </div>

            <div class="flex gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button type="button" variant="outline" class="flex-1 h-15 rounded-2xl font-black text-[11px] uppercase tracking-widest border-zinc-100 dark:border-zinc-800" :disabled="isSubmitting" @click="isFormModalOpen = false">Batal</Button>
              <Button type="submit" class="flex-1 h-15 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all" :disabled="isSubmitting || !form.name.trim()">
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                {{ isEditing ? 'Simpan' : 'Daftarkan' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Fund Modal: Simplified & High Contrast -->
    <Dialog :open="isFundModalOpen" @update:open="val => { if (!isSubmitting) isFundModalOpen = val }">
       <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-none shadow-2xl rounded-[3rem] p-0 overflow-hidden outline-none">
          <DialogTitle class="sr-only">Tambah Tabungan Impian</DialogTitle>
          <DialogDescription class="sr-only">Input nominal uang untuk ditambahkan ke dalam tabungan target Anda.</DialogDescription>
          <div class="p-10 space-y-10 text-center">
             <div class="w-20 h-20 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center mx-auto shadow-2xl ring-8 ring-blue-500/5">
                <PlusCircle class="w-10 h-10" />
             </div>
             
             <div class="space-y-2">
                <h3 class="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">Tabung Sekarang</h3>
                <p class="text-[11px] font-black text-zinc-400 uppercase tracking-widest italic">Untuk: {{ activeGoal?.name }}</p>
             </div>

             <div class="space-y-3 text-left">
                <label class="text-[10px] font-black text-zinc-400 uppercase tracking-widest block px-2">Masukkan Nominal (Rp)</label>
                <div class="relative group">
                   <div class="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-zinc-300 dark:text-zinc-700 group-focus-within:text-blue-600 transition-colors">Rp</div>
                   <input v-model="fundAmount" type="number" placeholder="0" class="w-full h-20 pl-16 pr-8 rounded-[1.5rem] border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-3xl font-black tabular-nums transition-all outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5" autofocus />
                </div>
             </div>

             <div class="flex gap-4">
                <Button variant="outline" class="flex-1 h-16 rounded-[1.25rem] font-black uppercase text-[10px] tracking-widest text-zinc-400 border-zinc-100 dark:border-zinc-800" @click="isFundModalOpen = false">Nanti Saja</Button>
                <Button class="flex-1 h-16 rounded-[1.25rem] bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-500/10" :disabled="isSubmitting || fundAmount <= 0" @click="submitAddFund">
                   <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin mr-2" />
                   Simpan Dana
                </Button>
             </div>
          </div>
       </DialogContent>
    </Dialog>

    <!-- Delete Alert -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 rounded-[3rem] border-none shadow-2xl p-10 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader class="space-y-6 text-center">
          <div class="w-20 h-20 rounded-[2rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mx-auto shadow-xl">
             <Trash2 class="w-10 h-10" />
          </div>
          <div class="space-y-2">
            <AlertDialogTitle class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-tight">Ikhlaskan Impian?</AlertDialogTitle>
            <AlertDialogDescription class="text-sm font-medium text-zinc-500 dark:text-zinc-400 italic leading-relaxed px-4">Semua riwayat progres menabung untuk rincian impian ini akan dihapus permanen dari memori sistem.</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-4 mt-8">
          <AlertDialogCancel class="flex-1 rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border-none transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction @click="executeDelete" class="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all">Hapus Target</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  Search, Eye, Pencil, Trash2, Loader2, Plus, Target, FileText, FileSpreadsheet, PlusCircle, Wallet, ChevronsUpDown
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
  type GoalItem, type CreateGoalPayload
} from '~/server/api/public/goal'
import { alertSuccess, alertError, alertInfo } from '@/lib/alert'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Target & Impian',
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

const form = ref<CreateGoalPayload>({
  name: '',
  total_goal: 0,
  goal_date: new Date().toISOString().split('T')[0] || ''
})

// Summary Calculations
const totalSaved = computed(() => goals.value.reduce((acc, curr) => acc + curr.amount, 0))
const totalTarget = computed(() => goals.value.reduce((acc, curr) => acc + curr.total_goal, 0))

// ─── Theme: Blue Premium ─────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-blue-600 to-indigo-700',
  'bg-gradient-to-br from-zinc-800 to-zinc-950',
  'bg-gradient-to-br from-sky-500 to-blue-700',
  'bg-gradient-to-br from-indigo-600 to-violet-800',
  'bg-gradient-to-br from-slate-700 to-slate-900',
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

// ─── Logic: Data Integration ───────────────────────────────────────────────────
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

// ─── Export Logic ─────────────────────────────────────────────────────────────
const exportToPdf = () => {
  if (goals.value.length === 0) { alertError('Tidak ada data.'); return }
  alertInfo('Menyiapkan PDF Laporan Target...')
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
      head: [['Nama Impian', 'Terkumpul', 'Target', 'Batas Waktu', 'Progres']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { font: 'helvetica', fontSize: 9 }
    })
    doc.save(`Laporan-Impian-${new Date().getTime()}.pdf`)
    alertSuccess('Laporan PDF berhasil diunduh.')
  } catch (err) { alertError('Gagal ekspor PDF.') }
}

const exportToExcel = () => {
  if (goals.value.length === 0) { alertError('Tidak ada data.'); return }
  alertInfo('Membuat Dokumen Excel Impian...')
  try {
    const flatData = goals.value.map(item => ({
      'Nama Impian': item.name,
      'Dana Terkumpul': item.amount,
      'Target Finansial': item.total_goal,
      'Batas Waktu': formatDate(item.goal_date),
      'Progres (%)': calculatePercent(item.amount, item.total_goal)
    }))
    const worksheet = XLSX.utils.json_to_sheet(flatData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Impian')
    XLSX.writeFile(workbook, `Jurnal-Impian.xlsx`)
    alertSuccess('File Excel berhasil disimpan.')
  } catch (err) { alertError('Gagal ekspor Excel.') }
}

// ─── Interaction Handlers ─────────────────────────────────────────────────────
const openDetailModal = (item: GoalItem) => {
  selectedGoal.value = item
  isDetailModalOpen.value = true
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = { name: '', total_goal: 0, goal_date: new Date().toISOString().split('T')[0] || '' }
  isFormModalOpen.value = true
}

const openEditModal = (item: GoalItem) => {
  isEditing.value = true
  selectedGoal.value = item
  form.value = { name: item.name, total_goal: item.total_goal, goal_date: item.goal_date.split(' ')[0] || '' }
  isFormModalOpen.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload: CreateGoalPayload = { 
      name: form.value.name, 
      total_goal: Number(form.value.total_goal), 
      goal_date: form.value.goal_date 
    }
    const response = isEditing.value 
      ? await updateGoal(selectedGoal.value!.id, payload, token)
      : await createGoal(payload, token)
    
    if (response.ok) {
      alertSuccess(isEditing.value ? 'Impian diperbarui.' : 'Impian didaftarkan.')
      isFormModalOpen.value = false
      fetchGoals()
    } else {
      const res = await response.json()
      alertError(res.message || 'Terjadi kesalahan.')
    }
  } catch (error) { alertError('Masalah koneksi.') }
  finally { isSubmitting.value = false }
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
    if (response.ok) {
      alertSuccess('Dana ditambahkan. Semangat menabung!')
      isFundModalOpen.value = false
      fetchGoals()
    } else {
      alertError('Gagal menambahkan dana.')
    }
  } catch (error) { alertError('Masalah koneksi.') }
  finally { isSubmitting.value = false }
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
      alertSuccess('Target telah dihapus.')
      fetchGoals()
    }
  } catch (error) { alertError('Terjadi kesalahan.') }
  finally { isDeleteDialogOpen.value = false }
}

onMounted(() => fetchGoals())
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
