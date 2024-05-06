import { GameDetails } from '@/components/GameDetails'
import { fetchGameByIdOrSlug } from '@/lib/games'

export async function generateMetadata({ params: { slug } }) {
  const { name, background_image } = await fetchGameByIdOrSlug(slug)

  return {
    title: `Boxgames - ${name}`,
    openGraph: {
      images: [background_image],
    },
  }
}

export default async function GameDetailsPage({ params: { slug } }) {
  if (!slug) return null

  return <GameDetails {...{ slug }} />
}
