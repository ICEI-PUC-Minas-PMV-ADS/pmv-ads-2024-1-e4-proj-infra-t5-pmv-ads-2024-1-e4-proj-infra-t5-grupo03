import { collections } from '@/lib/constants'
import { response } from '@/lib/response'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import 'server-only'

const validate = (collection) => !!collections[collection]

const invalidCollection = () => response.error('Coleção inválida')

const revalidateCollections = () => revalidatePath('/colecoes')

async function addGameToCollection(collectionId, gameId) {
  if (!validate(collectionId)) return invalidCollection()

  try {
    // const result = await

    revalidateCollections()

    return response.success(result)
  } catch (error) {
    return response.error('Erro ao adicionar jogo à coleção')
  }
}

async function removeGameFromCollection(collectionId, gameId) {
  if (!validate(collectionId)) return invalidCollection()

  try {
    const result = {}

    revalidatePath('/colecoes')

    return response.success(result)
  } catch (error) {
    return response.error('Erro ao remover jogo da coleção')
  }
}

const listGameCollections = async (gameId) => {
  noStore()

  const gameInCollections = {}

  return response.success({ gameInCollections })
}

const listCollectionGames = async (collectionId) => {
  if (!validate(collectionId)) return invalidCollection()

  try {
    // const gameIds = await

    return response.success({ gameIds })
  } catch (error) {
    return response.error('Erro ao listar jogos da coleção', {
      error: error.message,
      log: true,
    })
  }
}

async function listAllCollectionsGameIds() {
  try {
    // const allCollectionsGameIds = await

    return response.success({ allCollectionsGameIds })
  } catch (error) {
    return response.error('Erro ao listar os jogos de todas as coleções', {
      error: error.message,
      log: true,
    })
  }
}

export {
  collections,
  addGameToCollection,
  removeGameFromCollection,
  listCollectionGames,
  listGameCollections,
  listAllCollectionsGameIds,
  revalidateCollections,
}
