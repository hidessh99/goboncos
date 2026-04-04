/**
 * POST /public/upload
 * Upload file ke server
 */
export const uploadFile = async (file: File, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const formData = new FormData()
  formData.append('file', file)

  return await fetch(`${baseUrl}/public/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: formData,
  })
}
