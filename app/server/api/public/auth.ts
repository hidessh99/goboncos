export const userRegister = async (data: { email: string, password: string, name: string, phone_number: string, company_name: string }) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const formData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)
  formData.append('name', data.name)
  formData.append('company_name', data.company_name)
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
