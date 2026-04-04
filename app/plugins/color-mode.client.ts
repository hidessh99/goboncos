// Plugin: apply dark/light class ke <html> saat pertama kali load (client-only)
// Baca localStorage sebagai plain string — bukan JSON.parse — untuk hindari crash SSR
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    try {
      // Baca sebagai plain string, bukan JSON
      const raw = localStorage.getItem('gokasir-color-mode')
      const mode = (raw === 'light' || raw === 'system') ? raw : 'dark'

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = mode === 'system' ? prefersDark : mode === 'dark'

      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // Fallback: default dark mode
      document.documentElement.classList.add('dark')
    }
  }
})
