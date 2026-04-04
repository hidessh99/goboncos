/**
 * Investment Category API Helper
 */

export interface InvestmentCategoryItem {
  id: string
  name: string
  created_at: string
}

export interface CreateInvestmentCategoryPayload {
  name: string
}

/**
 * GET /admin/investment-category
 */
export const getInvestmentCategories = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) params.append('search', search)

  return await fetch(`${baseUrl}/admin/investment-category?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /admin/investment-category
 */
export const createInvestmentCategory = async (payload: CreateInvestmentCategoryPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/investment-category`, {
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
 * PUT /admin/investment-category/:id
 */
export const updateInvestmentCategory = async (id: string, payload: CreateInvestmentCategoryPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/investment-category/${id}`, {
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
 * DELETE /admin/investment-category/:id
 */
export const deleteInvestmentCategory = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/investment-category/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
