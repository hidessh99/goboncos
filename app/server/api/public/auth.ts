export const userRegister = async (data: { email: string, password: string, name: string, phone_number: string }) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const formData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)
  formData.append('name', data.name)
  formData.append('phone_number', data.phone_number)

  return await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: formData,
  })
}

export const userLogin = async ({ email, password }: { email: string, password: string }) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
}
export const changePassword = async (data: { old_password: string, new_password: string }, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const formData = new FormData()
  formData.append('old_password', data.old_password)
  formData.append('new_password', data.new_password)

  return await fetch(`${baseUrl}/api/auth/change-password`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  })
}

export const getProfile = async (token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updateProfile = async (id: string, data: { name: string, email: string }, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/user/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
}

export const deleteAccount = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
