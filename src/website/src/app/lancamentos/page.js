import { GamesGrid } from '@/components/GamesGrid'
import { Loader } from '@/components/Loader'
import { Suspense } from 'react'

export const metadata = {
  title: 'Boxgames - Lançamentos',
}

export default async function Releases({ searchParams }) {
  let { page } = searchParams
  page ??= 1

  return (
    <Suspense fallback={<Loader />}>
      <GamesGrid lancamentos {...{ page }} />
    </Suspense>
  )
}
