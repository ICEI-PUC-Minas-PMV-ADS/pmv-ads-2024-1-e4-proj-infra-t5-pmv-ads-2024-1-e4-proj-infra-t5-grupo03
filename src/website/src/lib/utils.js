import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

function resetCache() {
  revalidatePath('/', 'layout')
  revalidateTag('games')
  revalidateTag('game')
  revalidateTag('game-card-data')
  revalidateTag('collection')
}

const waitFor = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export { cn, resetCache, waitFor }
