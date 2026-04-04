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

    <SidebarGroup>
       <SidebarGroupLabel>Accounting Area</SidebarGroupLabel>
                <!-- Kategori -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Transaksi">
            <NuxtLink to="/transactions">
              <LayoutGrid class="h-4 w-4" />
              <span>Transaksi</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Laporan">
            <NuxtLink to="/transactions/report">
              <PieChart class="h-4 w-4" />
              <span>Laporan</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Investasi">
            <NuxtLink to="/transactions/investment">
              <TrendingUp class="h-4 w-4" />
              <span>Investasi</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Target">
            <NuxtLink to="/transactions/goal">
              <Target class="h-4 w-4" />
              <span>Target</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Finance">
            <NuxtLink to="/finance">
              <LayoutGrid class="h-4 w-4" />
              <span>Finance</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Kategori">
            <NuxtLink to="/finance/category">
              <LayoutGrid class="h-4 w-4" />
              <span>Kategori</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
    </SidebarGroup>
        

    <SidebarContent>
      <!-- cashier -->
      <SidebarGroup v-if="isMounted && canAccesscashier">
        <SidebarGroupLabel>Transaksi Area</SidebarGroupLabel>
        <SidebarMenu>
          <!-- Costumer with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="CostumerOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                <Users class="h-4 w-4" />
                <span>Transaksi</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in CostumerItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          
  

          <!-- community  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="CommunityOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Users class="h-4 w-4" />
                  <span>Community</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in CommunityItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <a :href="item.url" target="_blank" rel="noopener noreferrer">
                        <span>{{ item.title }}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- community  with submenu -->
        </SidebarMenu>
      </SidebarGroup>

      <!-- admin Area -->
      <SidebarGroup v-if="isMounted && canAccessAdminArea">
        <SidebarGroupLabel>Admin Area</SidebarGroupLabel>
        <SidebarMenu>
          <!-- users  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminUserOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <UserCheck class="h-4 w-4" />
                  <span>Subscription</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in SubscriptionItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- users  with submenu -->

          <!-- server   with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminFinanceOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Finance</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminFinanceItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>

                    <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Investment">
            <NuxtLink to="/admin/investment/category">
              <LayoutGrid class="h-4 w-4" />
              <span>Investment</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>



          <!-- server month  with submenu -->

          <!-- server payas with submenu -->
        </SidebarMenu>
      </SidebarGroup>

      <!-- warehouse Area -->
      
        <SidebarGroup v-if="isMounted && canAccesswarehouse">
        <SidebarGroupLabel>Warehouse</SidebarGroupLabel>
        <SidebarMenu>



                    <!-- Staff -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Staff">
            <NuxtLink to="/employer/staff">
              <LayoutGrid class="h-4 w-4" />
              <span>Staff</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <!-- month  with submenu -->

          <!-- always  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="ProdukOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Produk</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in ProdukItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- always  with submenu -->

          <!-- payas  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="SellerpayasOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Pay As</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in SellerServerpayasItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- month  with submenu -->
        </SidebarMenu>

        <SidebarMenu>
          <!-- users  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="SellerWdOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <CreditCard class="h-4 w-4" />
                  <span>Withdraw</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in SellerWidthdrawItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- users  with submenu -->
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child />
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              :side-offset="4"
            >
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/dian-pratama.png" alt="@dianpratama" />
                    <AvatarFallback class="rounded-lg">
                      DP
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Dian Pratama</span>
                    <span class="truncate text-xs">dianpratama2@gmail.com</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
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
} from 'lucide-vue-next'




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
    title: 'Category',
    url: '/admin/finance/category',
  },
  {
    title: 'Type',
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
    title: 'Announcement',
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
    title: 'View',
    url: '/users',
  },
  {
    title: 'Setting',
    url: '/users/settings',
  },
]

const token = useLocalStorage('token', '')
const role = useLocalStorage('role', '')


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

// Initialize profile data on component mount
onMounted(() => {
  isMounted.value = true
  if (token.value) {
    // fetchUserProfile()
  }
})
</script>
