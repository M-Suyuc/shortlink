'use client'
import { useState } from 'react'
import { Copy, Settings, Trash2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import LayoutBorder from '@/components/layout'
import FormLinks from '@/components/form'
import Link from 'next/link'

const shorts = [
  { id: 1, name: '', shortUrl: 'j9gg8', url: 'htttp://hola.com' },
  { id: 2, name: '', shortUrl: 'j9gg8', url: 'htttp://hola.com' },
  { id: 3, name: '', shortUrl: 'j9gg8', url: 'htttp://hola.com' },
  { id: 4, name: '', shortUrl: 'j9gg8', url: 'htttp://hola.com' }
]
// const shorts = ({} = [])

const options = [
  {
    name: 'Settings',
    icon: (
      <Settings
        size={38}
        className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
      />
    )
  },
  {
    name: 'Copy',
    icon: (
      <Copy
        size={38}
        className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
      />
    )
  },
  {
    name: 'Delete',
    icon: (
      <Trash2
        size={38}
        className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
      />
    )
  }
]

/* Data table para hacer qie se vea de forma de lista */
const DashboardPage = () => {
  const [viewShorts, setViewShorts] = useState('grid')

  return (
    <LayoutBorder>
      {/* {shorts.length >= 1 ? (
        <div className='grid gap-4 grid-cols-auto-fill-100  w-full h-full'>
          {shorts.map((item: string[] | any) => (
            <article
              key={item.id}
              className='flex flex-col gap-2 border border-neutral-700/70 p-4 rounded-md dark:bg-black'
            >
              <div className='flex justify-between'>
                <div>
                  <p>{item.shortUrl} </p>
                  <h3>{item.url}</h3>
                </div>
                <div className='flex gap-2'>
                  {options.map((item) => (
                    <TooltipProvider delayDuration={300} key={item.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>{item.icon}</TooltipTrigger>
                        <TooltipContent>
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              <p className='text-end text-sm text-neutral-400'>9 sep 2024</p>
            </article>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center gap-4 w-full min-h-[calc(100vh-5rem)]'>
          <FormLinks />
        </div>
      )} */}
      <Link href='#'> Create a shorlink</Link>
    </LayoutBorder>
  )
}
export default DashboardPage
