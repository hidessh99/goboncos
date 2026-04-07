/**
 * Admin User API Helper
 */

export interface UserItem {
  id: string
  name: string
  email: string
  phone_number: string
  role: string
  created_at: string
}

/**
 * GET /admin/user
 */
export const getUsers = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) params.append('search', search)

  return await fetch(`${baseUrl}/admin/user?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * DELETE /admin/user/:id
 */
export const deleteUser = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
