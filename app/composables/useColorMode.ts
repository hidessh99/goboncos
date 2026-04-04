import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'

export type ColorMode = 'dark' | 'light' | 'system'

const COLOR_MODE_KEY = 'gokasir-color-mode'



export function useColorMode() {
  const prefersDark = usePreferredDark()

  // Simpan sebagai plain string di LocalStorage (bukan JSON)
  const stored = useLocalStorage<ColorMode>(COLOR_MODE_KEY, 'light', {
    serializer: {
      read: (v: string): ColorMode => {
        if (v === 'dark' || v === 'system') return v as ColorMode
        return 'light' // default
      },
      write: (v: ColorMode): string => v,
    }
  })

  // Resolved status: apakah saat ini mode gelap?
  const isDark = computed<boolean>(() => {
    if (stored.value === 'system') return prefersDark.value
    return stored.value === 'dark'
  })

  // Apply class 'dark' ke <html> (client-only)
  function applyTheme(dark: boolean) {
    if (import.meta.client) {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Reactive — update <html> setiap kali isDark berubah
  if (import.meta.client) {
    watch(isDark, applyTheme, { immediate: true })
  }

  function toggle() {
    stored.value = isDark.value ? 'light' : 'dark'
  }

  function setMode(mode: ColorMode) {
    stored.value = mode
  }

  return { mode: stored, isDark, toggle, setMode }
}
