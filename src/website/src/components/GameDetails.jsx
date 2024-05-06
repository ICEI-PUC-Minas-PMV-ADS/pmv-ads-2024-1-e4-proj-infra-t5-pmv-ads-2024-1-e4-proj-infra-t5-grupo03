import { GameDetailsPageBackground } from './GameDetailsPageBackground'
import { GameDetailsThumb } from './GameDetailsThumb'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Rating, RatingDisplay } from './ui/rating'
import { BackLink } from '@/components/BackLink'
import { GameCollectionsDropdown } from '@/components/GameCollectionsDropdown'
import { Separator } from '@/components/ui/separator'
import { listGameCollections } from '@/lib/collections'
import { fetchGameByIdOrSlug } from '@/lib/games'

const BlocoInformacao = ({ titulo, children }) => (
  <div className='flex flex-col items-center gap-2'>
    <span>{titulo}</span>

    {children}
  </div>
)

const Badges = ({ children }) => (
  <div className='flex shrink flex-wrap justify-center gap-1'>
    {children?.map((badge, i) => (
      <Badge key={badge + i} variant={'secondary'} micro>
        {badge}
      </Badge>
    ))}
  </div>
)

const AvaliacaoComunidade = ({ nota }) => (
  <div className='group flex shrink flex-col place-items-center gap-4'>
    <p className='font-semibold transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110'>
      Nota da comunidade
    </p>

    <div className='grid h-12 w-16 place-content-center rounded-full bg-orange-600/10 ring-[1px] ring-foreground/20 transition-all duration-300 group-hover:scale-110 '>
      <span className='text-2xl font-extrabold text-foreground/90 transition-all duration-300 group-hover:text-foreground/100'>
        {nota?.toFixed(1)}
      </span>
      <div className='absolute h-12 w-16 rounded-full ring-4 ring-orange-600/50 blur transition-all duration-300 group-hover:ring-orange-600/90' />
    </div>

    <div className='scale-[.65] transition-all duration-300 group-hover:scale-[.7]'>
      <RatingDisplay value={nota} />
    </div>
  </div>
)

const Desenvolvedoras = ({ developers }) =>
  developers?.length && (
    <BlocoInformacao titulo='Desenvolvido por'>
      <Badges>{developers?.map((d) => d.name)}</Badges>
    </BlocoInformacao>
  )

const Publicadoras = ({ publishers }) =>
  publishers?.length && (
    <BlocoInformacao titulo='Publicado por'>
      <Badges>{publishers?.map((p) => p.name)}</Badges>
    </BlocoInformacao>
  )

const Plataformas = ({ platforms }) =>
  platforms?.length && (
    <BlocoInformacao titulo='Disponível para'>
      <Badges>{platforms?.map((p) => p.platform.name)}</Badges>
    </BlocoInformacao>
  )

const Generos = (props) => (
  <span className='space-x-2'>
    {props.genres?.map((g) => (
      <Badge key={g.name} variant='secondary'>
        {g.name}
      </Badge>
    ))}

    {!props.genres && (
      <Badge variant='secondary'>Gênero não especificado</Badge>
    )}
  </span>
)

const Lancamento = ({ released }) =>
  released && (
    <span className='grow self-start px-4 align-super text-lg font-extrabold tracking-wide text-muted-foreground'>
      {released}
    </span>
  )

const Titulo = ({ name }) => (
  <h1 className='text-2xl font-semibold tracking-normal'>{name}</h1>
)

const Descricao = ({ description }) => (
  <div
    className='prose max-w-[55ch] shrink-0 text-pretty p-6 font-extralight tracking-wider text-card-foreground dark:prose-invert'
    dangerouslySetInnerHTML={{
      __html:
        description?.replace(/<br\s*\/?>/gi, '<br><br>') ||
        'Este jogo ainda não possui descrição',
    }}
  />
)

const AvaliacaoUsuario = () => (
  <div className='flex flex-col items-center gap-2 '>
    <label className='font-semibold'>Minha avaliação</label>
    <Rating />
  </div>
)

export async function GameDetails({ slug }) {
  const {
    id: gameId,
    name,
    description,
    yearReleased,
    rating,
    platforms,
    developers,
    genres,
    publishers,
    tags,
    esrb_rating,
    background_image,
  } = await fetchGameByIdOrSlug(slug)

  const result = await listGameCollections(gameId)
  const { gameInCollections } = result?.data

  return (
    <>
      <GameDetailsPageBackground src={background_image} />

      <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex grow justify-end py-4'>
          <span className='duration-700 ease-out animate-in fade-in'>
            <BackLink />
          </span>
        </div>

        <Card className='flex flex-wrap bg-card/30 drop-shadow-lg backdrop-blur-xl duration-700 animate-in fade-in slide-in-from-bottom-6'>
          <div className='flex w-60 flex-none flex-col items-center gap-6 p-4 pb-8 text-sm font-medium'>
            <GameDetailsThumb src={background_image} />

            <Desenvolvedoras {...{ developers }} />

            {publishers?.length && <Separator />}

            <Publicadoras {...{ publishers }} />

            {platforms?.length && <Separator />}

            <Plataformas {...{ platforms }} />
          </div>

          <div className='grow'>
            <div className='flex justify-between p-6'>
              <Titulo {...{ name }} />

              <Lancamento {...{ released: yearReleased }} />

              <Generos {...{ genres }} />
            </div>

            <div className='flex flex-wrap justify-between'>
              <Descricao {...{ description }} />

              <div className='flex w-52 flex-col items-center gap-6 p-4 pb-8'>
                <AvaliacaoComunidade nota={rating} />

                <Separator />

                <AvaliacaoUsuario />

                <Separator />

                <GameCollectionsDropdown {...{ gameId, gameInCollections }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
