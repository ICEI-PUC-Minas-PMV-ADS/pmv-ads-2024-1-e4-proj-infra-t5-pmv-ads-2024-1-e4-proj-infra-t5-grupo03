'use client'

import { Rating as FluentUiRating } from '@fluentui/react-rating'

const RatingDisplay = (props) => (
  <span className='pointer-events-none max-h-4'>
    <FluentUiRating {...props} />
  </span>
)

const Rating = (props) => (
  <span className='max-h-7 text-orange-400/90'>
    <FluentUiRating {...props} />
  </span>
)

export { Rating, RatingDisplay }
