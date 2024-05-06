import { GamesGrid } from '@/components/GamesGrid'

export default async function Home({ searchParams }) {
  const { page = 1 } = searchParams

  return <GamesGrid {...{ page }} />
}
