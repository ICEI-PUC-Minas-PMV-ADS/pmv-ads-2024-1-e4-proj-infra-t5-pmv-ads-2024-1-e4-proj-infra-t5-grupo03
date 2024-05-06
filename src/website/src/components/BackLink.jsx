'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function BackLink() {
  const router = useRouter()

  return (
    <Button type='button' variant='link' onClick={() => router.back()}>
      Voltar
    </Button>
  )
}
