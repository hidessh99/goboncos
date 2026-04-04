import Swal from 'sweetalert2'

/**
 * Enhanced Alert Library dengan Efek Visual
 *
 * Library ini menggunakan SweetAlert2 dengan konfigurasi visual yang diperkaya:
 * - Animasi masuk dan keluar yang smooth
 * - Styling modern dengan Tailwind CSS
 * - Timer dan progress bar
 * - Hover effects pada tombol
 * - Backdrop dengan transparansi
 * - Custom colors untuk setiap jenis alert
 *
 * Fungsi yang tersedia:
 * - alertSuccess(): Alert sukses dengan animasi fadeIn/fadeOut
 * - alertError(): Alert error dengan animasi shake
 * - alertConfirm(): Alert konfirmasi dengan animasi zoom
 * - alertLoading(): Alert loading dengan spinner
 * - alertInfo(): Alert informasi dengan animasi bounce
 * - alertWarning(): Alert peringatan dengan animasi pulse
 * - alertToast(): Toast notification dengan posisi custom
 * - alertInput(): Alert dengan input field
 *
 */

export const alertSuccess = async (message: string) => {
  return Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#10b981',
    background: '#f0fdf4',
    color: '#065f46',
    iconColor: '#10b981',
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster',
    },
    timer: 2000,
    timerProgressBar: true,
    toast: false,
    position: 'center',
    backdrop: 'rgba(0,0,0,0.4)',
    allowOutsideClick: true,
    allowEscapeKey: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-2 border-green-200',
      title: 'text-xl font-bold',
      htmlContainer: 'text-base',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg',
    },
  })
}

export const alertError = async (message: string) => {
  return Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'Try Again',
    confirmButtonColor: '#ef4444',
    background: '#fef2f2',
    color: '#7f1d1d',
    iconColor: '#ef4444',
    showClass: {
      popup: 'animate__animated animate__shakeX animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster',
    },
    timer: 3000,
    timerProgressBar: true,
    toast: false,
    position: 'center',
    backdrop: 'rgba(239, 68, 68, 0.1)',
    allowOutsideClick: true,
    allowEscapeKey: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-2 border-red-200',
      title: 'text-xl font-bold',
      htmlContainer: 'text-base',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg',
    },
  })
}

export const alertConfirm = async (message: string) => {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Confirm Action',
    text: message,
    showCancelButton: true,
    confirmButtonText: '✓ Yes, Continue',
    cancelButtonText: '✗ Cancel',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    background: '#f8fafc',
    color: '#1e293b',
    iconColor: '#3b82f6',
    showClass: {
      popup: 'animate__animated animate__zoomIn animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut animate__faster',
    },
    backdrop: 'rgba(0,0,0,0.5)',
    allowOutsideClick: false,
    allowEscapeKey: true,
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-2 border-blue-200',
      title: 'text-xl font-bold',
      htmlContainer: 'text-base mb-4',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg mr-2',
      cancelButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ml-2',
    },
    buttonsStyling: false,
  })

  return result.isConfirmed
}

// Alert dengan efek loading
export const alertLoading = async (message: string = 'Loading...') => {
  return Swal.fire({
    title: message,
    html: '<div class="flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>',
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: '#ffffff',
    color: '#374151',
    showClass: {
      popup: 'animate__animated animate__fadeIn animate__faster',
    },
    customClass: {
      popup: 'rounded-xl shadow-2xl border border-gray-200',
      title: 'text-lg font-semibold mb-4',
    },
  })
}

// Alert informasi dengan ikon custom
export const alertInfo = async (message: string, title: string = 'Information') => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonText: 'Got it!',
    confirmButtonColor: '#0ea5e9',
    background: '#f0f9ff',
    color: '#0c4a6e',
    iconColor: '#0ea5e9',
    showClass: {
      popup: 'animate__animated animate__bounceIn animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOut animate__faster',
    },
    timer: 10000,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-2 border-sky-200',
      title: 'text-xl font-bold',
      htmlContainer: 'text-base',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg',
    },
  })
}

// Alert warning dengan efek khusus
export const alertWarning = async (message: string, title: string = 'Warning') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonText: 'Understood',
    confirmButtonColor: '#f59e0b',
    background: '#fffbeb',
    color: '#78350f',
    iconColor: '#f59e0b',
    showClass: {
      popup: 'animate__animated animate__pulse animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut animate__faster',
    },
    timer: 4000,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-xl shadow-2xl border-2 border-amber-200',
      title: 'text-xl font-bold',
      htmlContainer: 'text-base',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg',
    },
  })
}

// Toast notification dengan posisi custom
export const alertToast = async (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', position: 'top' | 'top-end' | 'bottom' | 'bottom-end' = 'top-end') => {
  const iconColors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#0ea5e9',
    warning: '#f59e0b',
  }

  const backgrounds = {
    success: '#f0fdf4',
    error: '#fef2f2',
    info: '#f0f9ff',
    warning: '#fffbeb',
  }

  return Swal.fire({
    toast: true,
    position,
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: backgrounds[type],
    iconColor: iconColors[type],
    showClass: {
      popup: 'animate__animated animate__slideInRight animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__slideOutRight animate__faster',
    },
    customClass: {
      popup: 'rounded-lg shadow-lg border border-gray-200 min-w-[300px]',
      title: 'text-sm font-medium',
    },
  })
}

// Alert dengan input field
export const alertInput = async (title: string, placeholder: string = '', inputType: 'text' | 'email' | 'password' | 'number' = 'text') => {
  const result = await Swal.fire({
    title,
    input: inputType,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    background: '#ffffff',
    color: '#1f2937',
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster',
    },
    customClass: {
      popup: 'rounded-xl shadow-2xl border border-gray-200',
      title: 'text-xl font-bold mb-4',
      input: 'rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      confirmButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg mr-2',
      cancelButton: 'rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ml-2',
    },
    inputValidator: (value: string) => {
      if (!value) {
        return 'Please enter a value!'
      }
    },
  })

  return result.value || null
}
