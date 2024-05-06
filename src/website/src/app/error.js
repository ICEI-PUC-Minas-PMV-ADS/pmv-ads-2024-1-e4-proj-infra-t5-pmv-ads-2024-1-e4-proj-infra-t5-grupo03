'use client'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-bold text-orange-600'>Algo deu errado!</h2>

      <p className='font-semibold'>{error.message}</p>

      <Button type='button' variant='secondary' onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  )
}
