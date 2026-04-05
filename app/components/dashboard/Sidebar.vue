<template>
  <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/dashboard">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Command class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Dashboard</span>

              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <!-- Search Bar -->
    </SidebarHeader>


    <SidebarContent class="scrollbar-hide">
      <!-- Main Navigation -->
      <SidebarGroup>
        <SidebarGroupLabel class="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-4 mb-2">Akuntansi</SidebarGroupLabel>
        <SidebarMenu class="gap-1 px-2">
          <!-- Transaksi -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Transaksi" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/transactions" class="flex items-center gap-3 w-full">
                <ArrowLeftRight class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Transaksi</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <!-- Akun Finance -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Keuangan" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/finance" class="flex items-center gap-3 w-full">
                <DollarSign class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Akun Keuangan</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <!-- Kategori -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Kategori" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/finance/category" class="flex items-center gap-3 w-full">
                <LayoutGrid class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Kategori</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- Perencanaan Group -->
      <SidebarGroup>
        <SidebarGroupLabel class="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-6 mb-2">Perencanaan</SidebarGroupLabel>
        <SidebarMenu class="gap-1 px-2">
          <!-- Investasi -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Investasi" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/transactions/investment" class="flex items-center gap-3 w-full">
                <TrendingUp class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Investasi</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <!-- Target & Impian -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Target Impian" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/transactions/goal" class="flex items-center gap-3 w-full">
                <Target class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Target Impian</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- Insight Group -->
      <SidebarGroup>
        <SidebarGroupLabel class="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-6 mb-2">Analitik & Laporan</SidebarGroupLabel>
        <SidebarMenu class="gap-1 px-2">
          <!-- Laporan -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Laporan" class="h-11 rounded-xl transition-all duration-300 hover:bg-sidebar-accent group">
              <NuxtLink to="/transactions/report" class="flex items-center gap-3 w-full">
                <PieChart class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70 group-hover:text-sidebar-foreground">Analitik</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- Admin Area (Conditional) -->
      <SidebarGroup v-if="isMounted && canAccessAdminArea">
        <SidebarGroupLabel class="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-6 mb-2">Kontrol Admin</SidebarGroupLabel>
        <SidebarMenu class="gap-1 px-2">
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Subscription" class="h-11 rounded-xl transition-all duration-300 hover:bg-amber-500/10 group">
              <NuxtLink to="/admin/subscription" class="flex items-center gap-3 w-full">
                <UserCheck class="h-4 w-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-amber-500/70 group-hover:text-amber-500">Langganan</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Finance Admin" class="h-11 rounded-xl transition-all duration-300 hover:bg-amber-500/10 group">
              <NuxtLink to="/admin/finance/category" class="flex items-center gap-3 w-full">
                <Server class="h-4 w-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                <span class="text-xs font-bold uppercase tracking-wider text-amber-500/70 group-hover:text-amber-500">Finance Master</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- Warehouse/Staff Area (Conditional) -->
      <SidebarGroup v-if="isMounted && canAccesswarehouse">
        <SidebarGroupLabel class="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-6 mb-2">Operasional</SidebarGroupLabel>
        <SidebarMenu class="gap-1 px-2">
 
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>




    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-300"
              >
                <Avatar class="h-9 w-9 rounded-xl shadow-sm border border-sidebar-border/50">
                  <AvatarImage src="" :alt="displayName" />
                  <AvatarFallback class="rounded-xl bg-gradient-to-br from-zinc-800 to-black text-white text-[10px] font-black uppercase">
                    {{ displayName.substring(0, 2) }}
                  </AvatarFallback>
                </Avatar>
                <div v-if="state !== 'collapsed'" class="grid flex-1 text-left text-sm leading-tight ml-1">
                  <span class="truncate font-black tracking-tight text-sidebar-foreground">{{ displayName }}</span>
                  <span class="truncate text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-wider">Akun Aktif</span>
                </div>
                <ChevronRight v-if="state !== 'collapsed'" class="ml-auto size-4 text-sidebar-foreground/30" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl p-2 shadow-2xl border-sidebar-border/50 backdrop-blur-xl bg-sidebar/95"
              :side="isMobile ? 'bottom' : 'right'"
              :align="isMobile ? 'end' : 'end'"
              :side-offset="8"
            >
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-3 px-3 py-3 text-left text-sm bg-sidebar-accent/30 rounded-xl mb-1">
                  <Avatar class="h-10 w-10 rounded-xl border-2 border-sidebar-border/20 shadow-lg">
                    <AvatarImage src="" :alt="displayName" />
                    <AvatarFallback class="rounded-xl bg-gradient-to-br from-zinc-800 to-black text-white text-xs font-black uppercase">
                      {{ displayName.substring(0, 2) }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-black tracking-tight text-sidebar-foreground uppercase text-xs">{{ displayName }}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator class="bg-sidebar-border/30 my-1" />
              <DropdownMenuGroup class="space-y-0.5">
                <DropdownMenuItem as-child class="rounded-lg h-10 px-3 focus:bg-sidebar-accent transition-colors cursor-pointer group">
                  <NuxtLink to="/settings/profile" class="flex w-full items-center gap-3">
                    <User class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                    <span class="text-xs font-bold text-sidebar-foreground/70 group-hover:text-sidebar-foreground uppercase tracking-wider">Profil</span>
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child class="rounded-lg h-10 px-3 focus:bg-sidebar-accent transition-colors cursor-pointer group">
                  <NuxtLink to="/subscription" class="flex w-full items-center gap-3">
                    <User class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                    <span class="text-xs font-bold text-sidebar-foreground/70 group-hover:text-sidebar-foreground uppercase tracking-wider">Langganan</span>
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child class="rounded-lg h-10 px-3 focus:bg-sidebar-accent transition-colors cursor-pointer group">
                   <NuxtLink to="/settings/address" class="flex w-full items-center gap-3">
                    <CreditCard class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                    <span class="text-xs font-bold text-sidebar-foreground/70 group-hover:text-sidebar-foreground uppercase tracking-wider">Alamat</span>
                   </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child class="rounded-lg h-10 px-3 focus:bg-sidebar-accent transition-colors cursor-pointer group">
                  <NuxtLink to="/settings" class="flex w-full items-center gap-3">
                    <Settings2 class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                    <span class="text-xs font-bold text-sidebar-foreground/70 group-hover:text-sidebar-foreground uppercase tracking-wider">Pengaturan</span>
                  </NuxtLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator class="bg-sidebar-border/30 my-1" />
              <DropdownMenuItem @click="logout" class="rounded-lg h-10 px-3 focus:bg-red-500/10 focus:text-red-500 transition-all cursor-pointer group flex items-center gap-3">
                <LogOut class="h-4 w-4 text-sidebar-foreground/50 group-hover:text-red-500 transition-colors" />
                <span class="text-xs font-black uppercase tracking-widest text-sidebar-foreground/70 group-hover:text-red-500">Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

import {
  Command,
  Settings2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  CreditCard,
  LogOut,
  LayoutGrid,
  User,
  DollarSign,
  Server,
  Users,
  FileText,
  UserCheck,
  PieChart,
  TrendingUp,
  Target,
  ArrowLeftRight,
} from 'lucide-vue-next'

import {
  useSidebar,
} from '~/components/ui/sidebar'




import { useLocalStorage } from '@vueuse/core'
import { ref, onMounted, computed } from 'vue'
import { alertError } from '../../lib/alert'

const isMounted = ref(false)

// gokasir 

const ProdukOpen = ref(false)

// gokasir 

// Reactive state for collapsible menus

const CommunityOpen = ref(false)
const ProfilOpen = ref(false)
const LogOpen = ref(false)

const AdminUserOpen = ref(false)
const AdminFinanceOpen = ref(false)
const AdminInvestmentOpen = ref(false)
const AdminServeralwaysOpen = ref(false)
const AdminServerMonthOpen = ref(false)
const AdminServerpayasOpen = ref(false)
const AdminSettingsOpen = ref(false)

const CostumerOpen = ref(false)
const SellerWdOpen = ref(false)
const SellerpayasOpen = ref(false)
const SellersvralwaysOpen = ref(false)

const AdminWDOpen = ref(false)

const UserAlwaysOpen = ref(false)
const invoiceOpen = ref(false)
const UserPayAsOpen = ref(false)
const PriceOpen = ref(false)
const PriceItems = [
  {
    title: 'Server Month',
    url: '/price/servermonth',
  },
  {
    title: 'Server Always',
    url: '/price/serveralways',
  },
  {
    title: 'Server PayAs',
    url: '/price/serverpayas',
  },
]

// user navigasi
const UserMonthOpen = ref(false)

const AdminFinanceItems = [

  {
    title: 'Kategori',
    url: '/admin/finance/category',
  },
  {
    title: 'Tipe',
    url: '/admin/finance/category-type',
  },
  

]

const AdminInvestmentItems = [
  {
    title: 'Category',
    url: '/admin/investment/category',
  },
]

const AdminWDItems = [

  {
    title: 'Withdraw',
    url: '/admin/withdraw',
  },
  {
    title: 'Pending',
    url: '/admin/withdraw/pending',
  },
  {
    title: 'PayAs',
    url: '/admin/withdraw/payas',
  },
]

const AdminSettingsItems = [

  {
    title: 'Pengumuman',
    url: '/admin/settings/announcement',
  },

]

const AdminServerpayasItems = [
  {
    title: 'Servers',
    url: '/admin/servers/payas',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/payas/account',
  },
  {
    title: 'Errors',
    url: '/admin/servers/payas/errors',
  },
]

const AdminServerMonthItems = [
  {
    title: 'Servers',
    url: '/admin/servers/month',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/month/account',
  },
]

const AdminServeralwaysItems = [
  {
    title: 'Servers',
    url: '/admin/servers/always',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/always/account',
  },
]

const CostumerItems = [
  {
    title: 'Finance',
    url: '/finance',
  },
    {
    title: 'Kategori',
    url: '/finance/category',
  },
  

]

const ProdukItems = [
  {
    title: 'Supplier',
    url: '/employer/supplier',
  },
  {
    title: 'Kategori',
    url: '/employer/product/category',
  },

]

const SellerServerpayasItems = [
  {
    title: 'Servers',
    url: '/sellers/server/payas',
  },
  {
    title: 'Accounts',
    url: '/sellers/server/payas/account',
  },
  {
    title: 'Errors',
    url: '/sellers/server/payas/errors',
  },

]

const SellerWidthdrawItems = [
  {
    title: 'Payout',
    url: '/sellers/withdraw',
  },
  {
    title: 'Pending',
    url: '/sellers/withdraw/pending',
  }, {
    title: 'PayAs',
    url: '/sellers/withdraw/payas',
  },

]

// menu users

const UserMonthItems = [
  {
    title: 'Create',
    url: '/users/month/create',
  },
  {
    title: 'Account',
    url: '/users/month',
  },
]

const UserPayAsItems = [
  {
    title: 'Create',
    url: '/users/payas/create',
  },
  {
    title: 'Account',
    url: '/users/payas',
  },
]

const invoiceItems = [
  {
    title: 'Topup',
    url: '/users/balance/billing',
  },
  {
    title: 'Account',
    url: '/invoice/account',
  },
]

const UserAlwaysItems = [
  {
    title: 'Create',
    url: '/users/always/create',
  },
  {
    title: 'Account',
    url: '/users/always',
  },
]

const LogItems = [
  {
    title: 'Activity',
    url: '/users/activity',
  },
  {
    title: 'Loging',
    url: '/users/log',
  },
]

const CommunityItems = [
  {
    title: 'Telegram',
    url: 'https://t.me/hidessh',
  },
  {
    title: 'Facebook',
    url: 'https://fb.me/4hidessh',
  },
]

const SubscriptionItems = [
    {
    title: 'List',
    url: '/admin/subscription',
  },
  {
    title: 'Plan',
    url: '/admin/subscription/plan',
  },

]

const ProfileItems = [
  {
    title: 'Lihat',
    url: '/settings/profile',
  },
  {
    title: 'Pengaturan',
    url: '/settings',
  },
]

const { state, isMobile } = useSidebar()

const token = useLocalStorage('token', '')
const role = useLocalStorage('role', '')
const name = useLocalStorage('name', 'User')
const email = useLocalStorage('email', 'user@example.com')

const displayName = computed(() => isMounted.value ? name.value : 'User')
const displayEmail = computed(() => isMounted.value ? email.value : 'user@example.com')


// access cashier
const canAccesscashier = computed(() => {
  return ['admin', 'warehouse', 'employer'].includes(role.value)
})

// access admin
const canAccessAdminArea = computed(() => {
  return role.value === 'admin'
})

// access warehouse
const canAccesswarehouse = computed(() => {
  return ['admin', 'warehouse'].includes(role.value)
})

// Logout function
const logout = () => {
  token.value = ''
  role.value = ''
  name.value = ''
  email.value = ''
  navigateTo('/auth/login')
}

// Initialize profile data on component mount
onMounted(() => {
  isMounted.value = true
})
</script>
