import { auth } from '@/auth'
import { unstable_noStore as noStore } from 'next/cache'

// import { cache as cacheUntilRequestFinishes } from 'react'

const session = async () => {
  const session = await auth()

  // console.log(['session:', session])

  return session
}

const currentUser = async () => {
  const currentUser = (await session())?.user

  // console.log(['currentUser:', currentUser])

  return currentUser
}

const isLoggedIn = async () => Boolean(await currentUser())

export { currentUser, isLoggedIn }
