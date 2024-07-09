'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useModalContext } from '@/context/modal'
import { Input } from '@/components/ui/input'
import { LayoutGrid, List, Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

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

  return (
    <nav className='my-4 flex gap-4 h-12'>
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
      <div className='flex justify-center items-center text-gray-500 border border-zinc-800 p-1.5'>
        <LayoutGrid className='cursor-pointer hover:stroke-white p-[6px]  w-full h-full hover:bg-zinc-800 ' />
        <List className='cursor-pointer hover:stroke-white p-[6px] w-full h-full hover:bg-zinc-800' />
      </div>
      {/* btn create*/}
      <Button
        className='bg-black px-6 font-medium text-lg dark:bg-[#ededed] h-full'
        onClick={handleRedirect}
      >
        Create Link
      </Button>
    </nav>
  )
}
