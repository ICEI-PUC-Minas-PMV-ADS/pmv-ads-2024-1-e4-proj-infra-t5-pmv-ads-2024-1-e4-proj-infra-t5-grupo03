'use client'

import { Button } from './ui/button'
import { buscarJogos } from '@/actions/buscar-jogos'
import { IconLupa } from '@/components/icons/lupa'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'

export function Search() {
  const searchParams = useSearchParams()
  const busca = searchParams.get('busca')

  return (
    <form
      action={buscarJogos}
      className='group relative flex max-w-60 shrink content-center '
    >
      <Input
        className='opacity-40 transition placeholder:translate-x-3  placeholder:font-semibold focus:opacity-100'
        type='text'
        name='busca'
        defaultValue={busca}
        placeholder='Pesquisar Jogo'
      />

      <Button
        type='submit'
        variant='ghost'
        className='absolute right-0'
        size='icon'
      >
        <IconLupa className='pointer-events-none opacity-30 transition group-hover:opacity-90' />
      </Button>
    </form>
  )
}
