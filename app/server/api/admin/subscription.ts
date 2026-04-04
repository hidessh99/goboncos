export interface AuthInfo {
  ID: string
  Name: string
  Email: string
  Role: string
}

export interface SubscriptionPlanInfo {
  id: string
  name: string
  price: number
  duration_days: number
  created_at: string
}

export interface SubscriptionItem {
  id: string
  auth: AuthInfo
  subscription_plan: SubscriptionPlanInfo
  start_date: string
  end_date: string
  status: string
  created_at: string
}

/**
 * GET /admin/subscription
 * Ambil daftar semua langganan dengan pagination dan search
 */
export const getSubscriptions = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/admin/subscription?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * PATCH /admin/subscription/:id/status
 * Ubah status langganan (active/inactive)
 */
export const updateSubscriptionStatus = async (id: string, status: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/subscription/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: status.toLowerCase() }),
  })
}

/**
 * DELETE /admin/subscription/:id
 * Hapus langganan permanen
 */
export const deleteSubscription = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/subscription/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
