import { collections as appCollections } from '@/lib/constants'
import {
  ArrowLeftRight,
  Gamepad2,
  Heart,
  ListEnd,
  ListRestart,
  TextSearch,
  Trophy,
} from 'lucide-react'

const iconSize = 20
const strokeWidth = 1.25

const largeIconSize = 32
const largeIconStrokeWidth = 1.75

const iconset = {
  FAVORITE: (props) => <Heart {...props} />,

  PLAYING: (props) => <Gamepad2 {...props} />,
  COMPLETED: (props) => <Trophy {...props} />,
  DROPPED: (props) => <></>,
  TO_PLAY: (props) => <ListEnd {...props} />,
  TO_REPLAY: (props) => <ListRestart {...props} />,

  OWNED: (props) => <></>,
  WANTED: (props) => <TextSearch {...props} />,
  ALREADY_HAD: (props) => <></>,
  BORROWED: (props) => <ArrowLeftRight {...props} />,
  WISHED: (props) => <></>,
}

const collectionsWithLabelsAndIcons = Object.keys(appCollections).map(
  (collectionId) => ({
    id: collectionId,
    label: appCollections[collectionId],
    icon: iconset[collectionId]({ size: iconSize, strokeWidth }),
    iconLarge: iconset[collectionId]({
      size: largeIconSize,
      strokeWidth: largeIconStrokeWidth,
    }),
  }),
)

export { collectionsWithLabelsAndIcons }
