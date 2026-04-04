// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
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
      APP_WEB: process.env.NUXT_PUBLIC_APP_WEB || 'GO Kasir',
      APP_NAME: process.env.NUXT_PUBLIC_APP_NAME || 'GO Kasir',
      appLogo: process.env.NUXT_PUBLIC_APP_LOGO || '',
      appFavicon: process.env.NUXT_PUBLIC_APP_FAVICON || '',
      APP_SECRETKEY: process.env.NUXT_PUBLIC_APP_SECRETKEY || '',
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
      },
    },
  },
})
