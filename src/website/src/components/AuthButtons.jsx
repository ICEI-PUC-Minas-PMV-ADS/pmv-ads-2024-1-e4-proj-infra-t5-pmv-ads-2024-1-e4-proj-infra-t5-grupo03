import { goToLogin, logout } from '@/actions/auth-actions'
import { LogIn, LogOut } from 'lucide-react'

const LoginButton = () => (
  <form action={goToLogin} className='w-full'>
    <button
      type='submit'
      className='flex h-12 w-full items-center justify-center px-2 py-1.5'
    >
      <LogIn className='mr-2 h-4 w-4' />
      <span>Entrar</span>
    </button>
  </form>
)

const LogoutButton = () => (
  <form action={logout} className='h-full w-full'>
    <button type='submit' className='flex h-8 w-full items-center px-2 py-1.5'>
      <LogOut className='mr-2 h-4 w-4' />
      <span>Sair</span>
    </button>
  </form>
)

export { LoginButton, LogoutButton }
