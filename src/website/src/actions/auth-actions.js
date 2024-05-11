'use server'

import { signIn, signOut } from '@/auth'
import { register } from '@/lib/api/user'
import { waitFor } from '@/lib/utils'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'

const goToLogin = async () => {
  await signIn()
}

const authenticate = async (mode, callbackUrl, previousState, formData) => {
  const {
    username = undefined,
    email,
    password,
    confirmPassword = undefined,
  } = Object.fromEntries(formData)

  console.log(['\t AUTH...'], {
    mode,
    callbackUrl,
    username,
    email,
    password,
    confirmPassword,
  })

  try {
    if (mode === 'login') {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        redirectTo: callbackUrl || '/',
      })
    }

    if (mode === 'register') {
      const result = await register({
        username,
        email,
        password,
        confirmPassword,
      })

      if (result.error?.fieldErrors)
        return {
          message: 'Confira os dados e tente novamente',
          fieldErrors: result.error.fieldErrors,
          lastOperation: mode,
        }

      if (result.error)
        return {
          message: 'Algo deu errado, tente novamente',
          lastOperation: mode,
        }

      revalidatePath('/colecoes')

      await signIn('credentials', {
        email,
        password,
        redirect: true,
        redirectTo: callbackUrl
          ? `${callbackUrl}&wellcome=${username}`
          : `/?wellcome=${username}`,
      })
    }

    throw new Error(`Operação ${mode} inválida`)
  } catch (error) {
    if (error.type === 'CredentialsSignin')
      return {
        message: 'Verifique seu usuário e senha e tente novamente',
        lastOperation: mode,
      }

    if (error instanceof AuthError)
      return { message: 'Erro ao tentar autenticar' }

    throw error
  }
}

const logout = async () => {
  console.log('SAINDO...')

  try {
    await signOut()
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: Redirecionamento do NextAuth
    throw error
  } finally {
    revalidatePath('/colecoes')
  }
}

export { authenticate, goToLogin, logout }
