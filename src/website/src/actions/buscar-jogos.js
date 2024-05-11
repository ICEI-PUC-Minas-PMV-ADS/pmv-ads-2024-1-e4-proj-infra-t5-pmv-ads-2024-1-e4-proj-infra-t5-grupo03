'use server'

import { redirect } from 'next/navigation'

export async function buscarJogos(formData) {
  redirect(`/search?busca=${formData.get('busca')}&page=1`)
}
