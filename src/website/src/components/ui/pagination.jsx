'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

const fullPageCount = 9
const reducedPageCount = 5

const Pagination = ({ page, prev, next, totalPages, className, ...props }) => {
  const [morePages, setMorePages] = React.useState(false)
  const searchParams = new URLSearchParams(useSearchParams())

  page = Number.parseInt(page)

  const getHref = (page) => {
    searchParams.set('page', page)
    return searchParams.toString()
  }

  const getPrevHref = () => getHref(prev)

  const getNextHref = () => getHref(next)

  return (
    <nav
      aria-label='pagination'
      className={'mx-auto flex w-full justify-center pt-16'}
      {...props}
    >
      <PaginationContent>
        {prev && (
          <PaginationItem>
            <PaginationPrevious href={`?${getPrevHref()}`} />
          </PaginationItem>
        )}

        {createPagination(
          totalPages,
          page,
          morePages ? fullPageCount : reducedPageCount,
        ).map((pageNum) => (
          <PaginationItem
            key={pageNum}
            className={
              '-translate-y-1 ease-out animate-out fade-out-0 zoom-out-[.97] slide-out-to-bottom-1'
            }
          >
            <PaginationLink
              key={pageNum}
              href={`?${getHref(pageNum)}`}
              isActive={page === pageNum}
              aria-current={page === pageNum}
              className={
                'delay-150 duration-300 ease-out animate-in fade-in-0 zoom-in-[.97] slide-in-from-bottom-1'
              }
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {!morePages && (
          <PaginationItem>
            <PaginationEllipsis onClick={() => setMorePages(!morePages)} />
          </PaginationItem>
        )}

        {next && (
          <PaginationItem>
            <PaginationNext href={`?${getNextHref()}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </nav>
  )
}
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

const PaginationLink = ({ className, isActive, size = 'icon', ...props }) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
    <span>Anterior</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Próxima</span>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ onClick, className, ...props }) => (
  <button
    type='button'
    onClick={onClick}
    title='Mais páginas'
    className={cn(
      buttonVariants({
        variant: 'ghost',
        size: 'icon',
      }),
    )}
  >
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='h-4 w-4' />
      <span className='sr-only'>Mais páginas</span>
    </span>
  </button>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

function createPagination(totalPages, currentPage, numLinks) {
  const adjacentLinks = Math.floor(numLinks / 2)
  const startPage = Math.max(1, currentPage - adjacentLinks)
  const endPage = Math.min(
    totalPages,
    Math.max(currentPage + adjacentLinks, numLinks),
  )

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  )

  if (numLinks >= fullPageCount) {
    if (startPage > 1) pages.unshift(1)

    if (endPage < totalPages) pages.push(totalPages)
  }

  return pages
}

export { Pagination }
