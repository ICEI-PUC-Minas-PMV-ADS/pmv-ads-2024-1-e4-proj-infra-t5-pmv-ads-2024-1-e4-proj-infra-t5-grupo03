import { api } from '@/lib/api'
import { response } from '@/lib/response'
import axios from 'axios'
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache'

const games = {
  all: api('games', 'games').get,
  byId: api('games', 'gamesById').get,
  releases: api('games', 'releases').get,
}

const getGames = async ({ page = 1, releases = false, search = undefined }) => {
  let results

  try {
    results = await (releases
      ? games.releases({
          params: { page, page_size: 15 },
        })
      : games.all({ params: { page, page_size: 5 } }))
  } catch (error) {
    response.error('Erro buscando lista de jogos', error)
  }
  console.log(results.data)

  if (!results.data) return response.error('Erro buscando lista de jogos')

  return response.success({
    games: results.data.results,
    page: Number.parseInt(page),
    next: Number.parseInt(page) + 1,
    prev: page > 1 ? page - 1 : null,
    count: results.data.count,
    totalPages: Math.ceil(results.data.count / results.data.results.length),
  })
}

const cachedGames = cache(
  async ({
    page = 1,
    pageSize = 15,
    lancamentos = false,
    busca = undefined,
  }) => {
    const queryParameters = {
      page,
      search: busca,
    }

    throw new Error('Api de jogos não está integrada')

    let results

    try {
      results = await gamesApi.games.get({ queryParameters })
    } catch (error) {
      error.queryParameters = queryParameters
      response.error('Erro buscando lista de jogos')
    }

    if (!results) return response.error('Erro buscando lista de jogos')

    return response.success({
      games: results.results,
      page: Number.parseInt(page),
      next: Number.parseInt(page) + 1,
      prev: page > 1 ? page - 1 : null,
      count: results.count,
      totalPages: Math.ceil(results.count / pageSize),
    })
  },
  ['games'],
)

const cachedReleases = cache(
  async (page = 1) => await cachedGames({ page, lancamentos: true }),
  ['releases'],
)

const cachedGameByIdOrSlug = cache(
  async (idOuSlug) => {
    const errorMsg = 'Erro ao buscar jogo'

    let result

    try {
      result = await gamesApi.games.byGame_pkId(idOuSlug).get()
    } catch (error) {
      error.idOuSlug = idOuSlug
      response.error(errorMsg, error.message)
    }

    if (!result) return response.error(errorMsg)

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      yearReleased: result.released?.year || undefined,
      rating: result.rating,
      parent_platforms: result.parent_platforms,
      platforms: result.platforms,
      developers: result.developers,
      genres: result.genres,
      publishers: result.publishers,
      tags: result.tags,
      esrb_rating: result.esrb_rating,
      background_image: result.background_image,
      background_image_additional: result.background_image_additional,
    }
  },
  ['game'],
)

const cachedCardsDataByGameIds = async (...gameIds) =>
  Object.fromEntries(
    await Promise.allSettled(
      gameIds.map((gameId) =>
        cachedCardDataByGameId(gameId).then(({ success, data }) => [
          gameId,
          success ? data : undefined,
        ]),
      ),
    ).then((results) => results.map((r) => r.value)),
  )

const cachedCardDataByGameId = cache(
  async (gameId) => {
    const errorMsg = 'Erro ao buscar dados do jogo'

    let result

    try {
      result = await gamesApi.games.byGame_pkId(gameId).get()
    } catch (error) {
      error.gameId = gameId
      response.error(errorMsg)
    }

    if (!result) return response.error(errorMsg)

    return response.success({
      id: result.id,
      name: result.name,
      slug: result.slug,
      rating: result.rating,
      esrb_rating: result.esrb_rating,
      background_image: result.background_image,
    })
  },
  ['game-card-data'],
)

export {
  getGames,
  cachedGames,
  cachedReleases,
  cachedGameByIdOrSlug,
  cachedCardDataByGameId,
  cachedCardsDataByGameIds,
}
