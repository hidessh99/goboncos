<script setup lang="ts">
// Mengarahkan halaman utama (index) ke halaman home
definePageMeta({
  middleware: [
    () => navigateTo('/home', { redirectCode: 301 })
  ]
})
</script>
