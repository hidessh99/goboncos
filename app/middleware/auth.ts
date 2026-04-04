/**
 * Middleware: auth
 * Melindungi halaman dashboard dari akses tanpa token.
 * Jika tidak ada token di localStorage, redirect ke /auth/login.
 */
export default defineNuxtRouteMiddleware(() => {
  // Hanya dijalankan di sisi client (localStorage tidak tersedia di SSR)
  if (import.meta.server) return

  const token = localStorage.getItem('token')

  if (!token || token.trim() === '') {
    return navigateTo('/auth/login', { replace: true })
  }
})
