'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useModalContext } from '@/context/modal'
import { Input } from '@/components/ui/input'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import clsx from 'clsx'

export default function LinkClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { showModal } = useModalContext()

  const handleRedirect = () => {
    router.push(`${pathname}/link/new`)
    showModal()
  }

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }, 400)

  const handleViewItems = (view: string) => {
    const params = new URLSearchParams(searchParams)
    if (view) {
      params.set('view', view)
    } else {
      params.delete('view')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <nav className='my-4 flex gap-3 h-10'>
      {/* search */}
      <div className='h-full flex-1 relative text-zinc-600'>
        <Search className='absolute top-[25%] bottom-[-50%] left-4' />
        <Input
          placeholder='Search your shortLink'
          className='h-full placeholder:text-base text-zinc-200 dark:placeholder:text-zinc-600 dark:placeholder:font-medium pl-14'
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
        />
      </div>
      {/* views */}
      <div className='flex items-center text-gray-500 border dark:border-zinc-800 rounded-md p-0.5'>
        <LayoutGrid
          className={clsx(
            'border border-neutral-200 bg-white shadow-sm cursor-pointer dark:border-neutral-800 dark:bg-neutral-950 h-9 w-9 text-xs p-2',
            {
              'bg-neutral-800/20 dark:bg-neutral-700/50':
                searchParams.get('view') === 'grid'
            }
          )}
          onClick={() => handleViewItems('grid')}
        />
        <List
          className={clsx(
            'border border-neutral-200 bg-white shadow-sm cursor-pointer dark:border-neutral-800 dark:bg-neutral-950 h-9 w-9 text-xs p-2',
            {
              'bg-neutral-800/20 dark:bg-neutral-700/50':
                searchParams.get('view') === 'list'
            }
          )}
          onClick={() => handleViewItems('list')}
        />
      </div>
      {/* btn create*/}
      <Button
        className={buttonVariants({
          variant: 'secondary',
          className: 'flex gap-2 bg-black text-white h-full'
        })}
        onClick={handleRedirect}
      >
        <Plus size={14} />
        Create Link
      </Button>
    </nav>
  )
}
