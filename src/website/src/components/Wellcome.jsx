'use client'

import { waitFor } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

export const Wellcome = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const wellcome = searchParams.get('wellcome')

  const removeWellcome = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('wellcome')

    router.push(pathname + params.toString())
  }, [searchParams, pathname, router])

  useEffect(
    () => async () => {
      if (wellcome) {
        await waitFor(1000)

        toast(`Olá, ${wellcome}! É um prazer ter você em nossa comunidade!`)

        await waitFor(3000)

        removeWellcome()
      }
    },
    [removeWellcome, wellcome],
  )

  return null
}
