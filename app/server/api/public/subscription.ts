export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration_days: number
  created_at: string
}

export const getSubscriptionPlans = async (token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl
  return await fetch(`${baseUrl}/public/subscription-plan`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
