export interface FinancialCategoryItem {
  id: string
  name: string
  created_at: string
}

export interface CreateFinancialCategoryPayload {
  Name: string
}

/**
 * GET /admin/financial-category
 * Get all financial categories with pagination and search
 */
export const getFinancialCategories = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/admin/financial-category?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /admin/financial-category
 * Create a new financial category
 */
export const createFinancialCategory = async (payload: CreateFinancialCategoryPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/financial-category`, {
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
 * PUT /admin/financial-category/:id
 * Update an existing financial category
 */
export const updateFinancialCategory = async (id: string, payload: Partial<CreateFinancialCategoryPayload>, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/financial-category/${id}`, {
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
 * DELETE /admin/financial-category/:id
 * Delete a financial category
 */
export const deleteFinancialCategory = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/financial-category/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
