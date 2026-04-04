/**
 * Public Investment API Helper
 */

export interface InvestmentItem {
  id: string
  name: string
  investment_category: {
    id: string
    name: string
    created_at: string
  }
  financial: {
    id: string
    name: string
    saldo: number
    description: string
    created_at: string
  }
  purchase_date: string
  transaction_date: string
  amount: number
  created_at: string
}

export interface CreateInvestmentPayload {
  name: string
  investment_category_id: string
  financial_id: string
  purchase_date: string
  transaction_date: string
  amount: number
}

/**
 * GET /public/investment
 */
export const getInvestments = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) params.append('search', search)

  return await fetch(`${baseUrl}/public/investment?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /public/investment
 */
export const createInvestment = async (payload: CreateInvestmentPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/investment`, {
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
 * PUT /public/investment/:id
 */
export const updateInvestment = async (id: string, payload: CreateInvestmentPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/investment/${id}`, {
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
 * DELETE /public/investment/:id
 */
export const deleteInvestment = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/investment/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
/**
 * GET /public/investment-category
 */
export const getPublicInvestmentCategories = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) params.append('search', search)

  return await fetch(`${baseUrl}/public/investment-category?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
