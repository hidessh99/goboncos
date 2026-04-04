<template>
  <div :class="isDark ? 'dark' : ''">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { isDark } = useColorMode()
</script>
