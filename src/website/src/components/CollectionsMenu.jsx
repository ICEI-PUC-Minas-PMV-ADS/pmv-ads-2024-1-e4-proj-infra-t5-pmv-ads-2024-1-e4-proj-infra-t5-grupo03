import { collectionsWithLabelsAndIcons } from '@/components/CollectionsLabelsIcons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const CollectionsMenu = () =>
  collectionsWithLabelsAndIcons.map(({ id, label }) => (
    <Link href={`#${id}`} key={id}>
      <Button type='button' variant='ghost' className='opacity-70'>
        {label}
      </Button>
    </Link>
  ))
