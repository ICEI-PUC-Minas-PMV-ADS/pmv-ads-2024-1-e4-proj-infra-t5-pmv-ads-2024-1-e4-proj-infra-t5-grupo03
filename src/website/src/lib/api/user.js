import { api } from '@/lib/api'
import { response } from '@/lib/response'
import { loginSchema, registerSchema } from '@/lib/schemas'

const users = {
  register: api('users', 'create').post,
  login: api('users', 'login').post,
  update: api('users', 'update').post,
}

const register = async ({
  username,
  email,
  password,
  confirmPassword,
  // nintendo_account,
  // steam_account,
  // microsoft_account,
  // epic_account,
}) => {
  console.log({
    username,
    email,
    password,
    confirmPassword,
  })

  const result = registerSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  })

  console.log(result.error?.formErrors?.fieldErrors)

  if (!result.success && result.error?.formErrors?.fieldErrors)
    return response.error({
      fieldErrors: result.error?.formErrors?.fieldErrors,
    })

  try {
    const registerResponse = await users.register({
      username: result.data.username,
      email: result.data.email,
      password: result.data.password,
      // nintendo_account,
      // steam_account,
      // microsoft_account,
      // epic_account,
    })

    if (registerResponse.error) return response.error(registerResponse.error)

    return response.success(registerResponse?.data)
  } catch (error) {
    return response.error('Falha ao registrar o usuário')
  }
}

const login = async ({ email, password }) => {
  const result = loginSchema.safeParse({ email, password })

  if (!result.success)
    return response.error(
      result.error.errors.map(({ message }) => message).join('\n'),
    )

  try {
    const result = await users.login({
      email,
      password,
    })

    if (!result.data?.user) return response.error('Usuário ou senha incorretos')

    const { user } = result.data
    return response.success({ user })
  } catch (error) {
    return response.error('Falha ao fazer login', { error, log: true })
  }
}

const generateToken = async ({ email }) => {
  const result = await users.post({
    email,
  })

  return result
}

const update = async ({
  nickname,
  email,
  nintendo_account,
  steam_account,
  microsoft_account,
  epic_account,
  role,
}) => {
  const result = await users.put({
    nickname,
    email,
    nintendo_account,
    steam_account,
    microsoft_account,
    epic_account,
    role,
  })

  return result
}

export { register, login }
