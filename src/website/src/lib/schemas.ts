import { object, string } from 'zod'

export const loginSchema = object({
  email: string({ required_error: 'Informe o e-mail' })
    .min(3, 'E-mail muito curto')
    .email('E-mail inválido'),
  password: string({ required_error: 'Informe a senha' })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(32, 'A senha deve ter no máximo 16 caracteres'),
})

export const registerSchema = object({
  email: string({ required_error: 'Informe o e-mail' })
    .min(3, 'E-mail muito curto')
    .email('E-mail inválido')
    .transform((value) => value.toLowerCase()),
  username: string({ required_error: 'Informe o nome de usuário' })
    .min(3, 'Usuário muito curto')
    .transform((value) => value.toLowerCase()),
  password: string({ required_error: 'Informe a senha' })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(32, 'A senha deve ter no máximo 16 caracteres'),
  confirmPassword: string({ required_error: 'Confirme a senha' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
})

// export const forgotPasswordSchema = object({
//   email: string({ required_error: 'Informe o e-mail' })
//     .min(1, 'Informe o e-mail')
//     .email('E-mail inválido'),
// })

// export const resetPasswordSchema = object({
//   password: string({ required_error: 'Informe a senha' })
//     .min(8, 'A senha deve ter pelo menos 8 caracteres')
//     .max(32, 'A senha deve ter no máximo 16 caracteres'),
//   confirmPassword: string({ required_error: 'Confirme a senha' }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: 'As senhas não conferem',
//   path: ['confirmPassword'],
// })
