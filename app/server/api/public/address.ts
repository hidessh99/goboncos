export interface AddressPayload {
  address: string
  city: string
  state: string
  zip_code: string
  country: string
}

export const saveAddress = async (payload: AddressPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl
  return await fetch(`${baseUrl}/api/auth/address/create-or-update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const getAddress = async (token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl
  return await fetch(`${baseUrl}/api/auth/address`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
}

export const getPublicAddress = async (token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl
  return await fetch(`${baseUrl}/public/address`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
}
