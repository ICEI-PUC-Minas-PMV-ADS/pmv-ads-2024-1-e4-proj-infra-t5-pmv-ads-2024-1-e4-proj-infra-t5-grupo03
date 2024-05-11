'use client'

import { authenticate } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useFormState as useActionState, useFormStatus } from 'react-dom'

const formTexts = {
  login: {
    title: 'Login',
    buttonTitle: 'Entrar',
    buttonTitlePending: 'Entrando...',
    noAccount: 'Não tem uma conta?',
    switchMode: 'Cadastre-se',
    switchModeLink: '?mode=register',
  },
  register: {
    title: 'Cadastre-se',
    buttonTitle: 'Cadastrar',
    buttonTitlePending: 'Cadastrando...',
    noAccount: 'Já tem uma conta?',
    switchMode: 'Entrar',
    switchModeLink: '?mode=login',
  },
}

export function AuthForm({ mode, callbackUrl }) {
  const authenticateWithParams = authenticate.bind(null, mode, callbackUrl)

  const [{ message, lastOperation, fieldErrors }, dispatch] = useActionState(
    authenticateWithParams,
    {
      message: undefined,
      lastOperation: mode,
      fieldErrors: undefined,
    },
  )

  if (
    callbackUrl &&
    !callbackUrl.includes('/login') &&
    !formTexts[mode].switchModeLink.includes('&callbackUrl=')
  )
    formTexts[mode].switchModeLink += `&callbackUrl=${callbackUrl}`

  const strings = formTexts[mode]

  return (
    <section className='flex h-full items-center'>
      <Card
        className='mx-auto w-96 bg-card/30 ring-1 ring-card/10 drop-shadow-lg backdrop-blur-xl transition-all duration-700 animate-in
        fade-in zoom-in-95 slide-in-from-bottom-6'
      >
        <CardHeader>
          <CardTitle className='text-2xl transition-all duration-700 animate-in fade-in'>
            {strings.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={dispatch}>
            <FormContent
              {...{ strings, mode, message, lastOperation, fieldErrors }}
            />
          </form>

          <div className='mt-4 space-x-2 text-center text-sm'>
            <span>{strings.noAccount}</span>
            <Link
              href={strings.switchModeLink}
              className='underline decoration-orange-500/75 decoration-dotted'
            >
              {strings.switchMode}
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function FormContent({ strings, mode, message, lastOperation, fieldErrors }) {
  const { pending: isPending } = useFormStatus()
  const isRegisterMode = mode === 'register'
  console.log(fieldErrors)
  return (
    <div className='grid gap-8'>
      {isRegisterMode && (
        <div className='grid gap-2 duration-700 ease-out animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5'>
          <Label htmlFor='username'>Usuário</Label>

          {fieldErrors?.username && (
            <p className='text-amber-600 transition-all duration-700 animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5'>
              {fieldErrors?.username}
            </p>
          )}

          <Input
            name='username'
            type='text'
            placeholder='ex.: johnwick'
            className='lowercase'
            autocomple='off'
            required
            disabled={isPending}
          />
        </div>
      )}

      <div className='grid gap-2'>
        <Label htmlFor='email'>E-mail</Label>

        {fieldErrors?.email && (
          <p className='text-amber-600 transition-all duration-700 animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5'>
            {fieldErrors?.email}
          </p>
        )}

        <Input
          name='email'
          type='email'
          placeholder='ex.: john@continental.com'
          autocomple='email'
          required
          disabled={isPending}
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='password'>Senha</Label>
        <p className='text-xs text-muted-foreground'>Pelo menos 8 caracteres</p>

        {fieldErrors?.password && (
          <p className='text-amber-600 transition-all duration-700 animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5'>
            {fieldErrors?.password}
          </p>
        )}

        <Input name='password' type='password' required disabled={isPending} />
      </div>

      {isRegisterMode && (
        <div className='grid gap-2'>
          <Label htmlFor='confirmPassword'>Confirme a senha</Label>

          {fieldErrors?.confirmPassword && (
            <p className='text-amber-600 transition-all duration-700 animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5'>
              {fieldErrors?.confirmPassword}
            </p>
          )}

          <Input
            name='confirmPassword'
            type='password'
            required
            disabled={isPending}
          />
        </div>
      )}

      {message && mode === lastOperation && (
        <Label
          className={cn(
            'h-[0%] text-center text-amber-600 transition-all duration-700',
            !isPending &&
              'h-[100%] animate-in fade-in zoom-in-95 slide-in-from-bottom-0.5',
            isPending &&
              'slide-out-from-top-0.5 animate-out fade-out zoom-out-95 fill-mode-forwards',
          )}
        >
          {message}
        </Label>
      )}

      <Button
        type='submit'
        variant={'secondary'}
        className={cn(
          'w-full transition-all duration-500 ease-out',
          ' hover:-translate-y-0.5 hover:scale-[102%] hover:shadow-lg hover:shadow-orange-400/20',
          isPending &&
            'pointer-events-none animate-pulse bg-transparent opacity-70 duration-1000',
        )}
      >
        {isPending ? strings.buttonTitlePending : strings.buttonTitle}
      </Button>
    </div>
  )
}
