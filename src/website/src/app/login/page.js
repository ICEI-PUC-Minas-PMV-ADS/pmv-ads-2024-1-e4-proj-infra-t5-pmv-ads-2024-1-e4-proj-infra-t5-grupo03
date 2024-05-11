import { AuthForm } from '@/components/AuthForm'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Boxgames - Login',
}

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams: { mode, callbackUrl, should_redirect },
}) {
  // 🔀 Bug Next-auth
  if (should_redirect) {
    let url = `/login?mode=${mode || 'login'}`

    if (callbackUrl?.length && !callbackUrl.includes('/login'))
      url += `&callbackUrl=${callbackUrl}`

    redirect(url)
  }

  return <AuthForm {...{ mode, callbackUrl }} />
}
