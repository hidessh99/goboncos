<template>
  <div :class="isMounted && isDark ? 'dark' : ''">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { isDark } = useColorMode()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>
