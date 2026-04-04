<template>
  <div class="flex h-screen overflow-hidden bg-white dark:bg-[#09090b] text-gray-900 dark:text-white transition-colors duration-300">
    <SidebarProvider>
      <slot name="sidebar">
        <DashboardSidebar />
      </slot>
      <SidebarInset class="flex flex-1 flex-col min-w-0 overflow-hidden bg-white dark:bg-[#09090b]">
        <!-- Header -->
        <slot name="header">
          <DashboardHeader />
        </slot>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto w-full">
          <slot />
        </main>

        <!-- Footer -->
        <slot name="footer">
          <DashboardFooter />
        </slot>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '~/components/ui/sidebar'
</script>
