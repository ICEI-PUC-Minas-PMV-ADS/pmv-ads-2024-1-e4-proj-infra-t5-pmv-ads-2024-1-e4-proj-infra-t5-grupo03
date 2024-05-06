import { GamesGrid } from '@/components/GamesGrid'
import { GridSkeleton } from '@/components/GridSkeleton'
import { Suspense } from 'react'

export default async function Search({ searchParams }) {
  const { page = 1, busca = null } = searchParams

  return (
    <Suspense fallback={<GridSkeleton />}>
      <GamesGrid busca={busca} {...{ page }} />
    </Suspense>
  )
}
