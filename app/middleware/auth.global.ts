/**
 * Global Middleware: auth.global
 * Berjalan otomatis di setiap navigasi halaman.
 *
 * - Halaman publik (/auth/*, /) → lewati cek token
 * - Halaman lain (dashboard, dll.) → wajib ada token, jika tidak redirect ke /auth/login
 */
export default defineNuxtRouteMiddleware((to) => {
  // Hanya dijalankan di sisi client (localStorage tidak tersedia di SSR)
  if (import.meta.server) return

  // ── Daftar prefix/path yang bebas diakses tanpa token ──
  const publicPaths = [
    '/',           // Landing / Home page
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/privacy-policy',
    '/auth/terms-and-conditions',
  ]

  const isPublicRoute =
    publicPaths.includes(to.path) ||
    to.path.startsWith('/auth/')  // semua sub-halaman /auth/* juga aman

  if (isPublicRoute) return // skip auth check

  // ── Cek token untuk halaman terproteksi ──
  const token = localStorage.getItem('token')

  if (!token || token.trim() === '') {
    return navigateTo('/auth/login', { replace: true })
  }
})
