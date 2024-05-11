'use server'

import { cookies } from 'next/headers'

export const getVisitorId = async () => {
  const cookieStore = cookies()

  return cookieStore.get('visitorId')?.value
}
