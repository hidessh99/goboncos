export interface AccountingItem {
  id: string
  category_types: {
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
  category: {
    id: string
    name: string
    created_at: string
  }
  amount: number
  description: string
  date: string
  created_at: string
}

export interface CreateAccountingPayload {
  category_types_id: string
  financial_id: string
  category_id: string
  amount: number
  description: string
  date: string
}

/**
 * GET /public/accounting
 */
export const getAccountingRecords = async (token: string, page: number = 1, pageSize: number = 10, search: string = '', month: number | null = null, year: number | null = null) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }
  if (month) {
    params.append('month', month.toString())
  }
  if (year) {
    params.append('year', year.toString())
  }


  return await fetch(`${baseUrl}/public/accounting?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /public/accounting
 */
export const createAccountingRecord = async (payload: CreateAccountingPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/accounting`, {
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
 * PUT /public/accounting/:id
 */
export const updateAccountingRecord = async (id: string, payload: Partial<CreateAccountingPayload>, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/accounting/${id}`, {
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
 * DELETE /public/accounting/:id
 */
export const deleteAccountingRecord = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/accounting/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
