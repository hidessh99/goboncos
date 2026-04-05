// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  site: {
    url: 'https://goboncos.hidessh.com',
    name: 'GoBoncos - Manajemen Keuangan & Investasi',
    description: 'Platform pencatatan keuangan dan manajemen investasi modern yang aman dan efisien.',
    defaultLocale: 'id',
  },
  sitemap: {
    zeroRuntime: true,
    enabled: true,
    autoLastmod: true,
    exclude: ['/admin/**', '/employer/**', '/dashboard/**'],
  },
  robots: {
    enabled: true,
    disallow: ['/admin', '/employer', '/dashboard', '/auth/reset-password'],
    allow: ['/auth/login', '/auth/register', '/subscription', '/auth/privacy-policy', '/auth/terms-and-conditions'],
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  css: ['~/assets/css/tailwind.css'],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  vite: {
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'lucide-vue-next',
        'class-variance-authority',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'sweetalert2',
        'jspdf',
        'jspdf-autotable',
        'xlsx',
      ]
    }
  },  runtimeConfig: {
    // baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    turnstileSecretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
    public: {
      baseUrl: process.env.NUXT_PUBLIC_API_BASE || process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com/api/v1',
      APP_WEB: process.env.NUXT_PUBLIC_APP_WEB || 'GoBoncos',
      APP_NAME: process.env.NUXT_PUBLIC_APP_NAME || 'GoBoncos',
      appLogo: process.env.NUXT_PUBLIC_APP_LOGO || '',
      appFavicon: process.env.NUXT_PUBLIC_APP_FAVICON || '',
      APP_SECRETKEY: process.env.NUXT_PUBLIC_APP_SECRETKEY || '',
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
      },
    },
  },
  experimental: {
    appManifest: false,
  },
})
