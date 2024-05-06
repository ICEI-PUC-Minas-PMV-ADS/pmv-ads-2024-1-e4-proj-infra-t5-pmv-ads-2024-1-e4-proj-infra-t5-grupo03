import { GameCard } from './GameCard'
import { Pagination } from '@/components/ui/pagination'
import { buscarJogos, buscarLancamentos } from '@/lib/games'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Suspense } from 'react'

export async function GamesGrid({
  page = 1,
  lancamentos = false,
  busca = undefined,
}) {
  const result = lancamentos
    ? await buscarLancamentos(page)
    : await buscarJogos({ page, busca })

  if (result.success) {
    const {
      data: { games, next, prev, totalPages },
    } = result
  }

  return (
    <div className='flex min-h-full flex-wrap justify-center gap-8 py-16 ease-out animate-in fade-in'>
      {result.success &&
        games?.length &&
        games.map(({ id, slug, name, background_image, rating }) => (
          <GameCard key={id} {...{ slug, name, background_image, rating }} />
        ))}

      {result.success && totalPages && (
        <Suspense>
          <Pagination {...{ page, next, prev, totalPages }} />
        </Suspense>
      )}

      {!result.success && (
        <div className='grid min-h-full grid-flow-row place-content-center place-items-center'>
          <p className='text-lg'>
            Encontramos um problema e estamos trabalhando para resolvê-lo o mais
            rápido possível
          </p>

          <p>🚧👷🏻🛠️🚧</p>
        </div>
      )}

      {result.success && !games.length && <p>Nenhum jogo encontrado</p>}
    </div>
  )
}
