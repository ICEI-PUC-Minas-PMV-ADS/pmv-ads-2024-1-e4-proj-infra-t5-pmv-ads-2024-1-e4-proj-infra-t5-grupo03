import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((request) => {
  // 🔀 Bug Next-auth
  // Redireciona usuários já autenticados que acessarem a página de login
  const isAuthenticated = !!request.auth
  if (isAuthenticated) return NextResponse.redirect(new URL('/', request.url))
})

export const config = {
  matcher: ['/login:path'],
}
