/**
 * Public Goal API Helper
 */

export interface GoalItem {
  id: string
  name: string
  amount: number
  total_goal: number
  goal_date: string
  created_at: string
}

export interface CreateGoalPayload {
  name: string
  total_goal: number
  goal_date: string
}

/**
 * GET /public/goal
 */
export const getGoals = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) params.append('search', search)

  return await fetch(`${baseUrl}/public/goal?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /public/goal
 */
export const createGoal = async (payload: CreateGoalPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/goal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * PUT /public/goal/:id
 */
export const updateGoal = async (id: string, payload: CreateGoalPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/goal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * DELETE /public/goal/:id
 */
export const deleteGoal = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/goal/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * PATCH /public/goal/:id/plus-amount
 */
export const addGoalFund = async (id: string, amount: number, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/goal/${id}/plus-amount`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })
}
