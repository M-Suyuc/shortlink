'use client'

import { Link } from '@prisma/client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Copy, Settings, Trash2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useModalContext } from '@/context/modal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useOrigin } from '@/hooks/use-origin'
import { AlertModal } from './modals/alert-modal'

interface Props {
  data: Link[]
}

export const ListLinks: React.FC<Props> = ({ data }) => {
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const { showModal } = useModalContext()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const origin = useOrigin()
  const search = searchParams.get('search')
  const view = searchParams.get('view')
  const params = new URLSearchParams(searchParams)

  useEffect(() => {
    if (view) {
      setViewMode(view)
    }
  }, [view])

  const handleSetting = (id: string) => {
    router.push(`${pathname}/link/${id}`)
    showModal()
  }

  const onDelete = async (id: string) => {
    try {
      setloading(true)
      await axios.delete(`/api/shortUrl/${id}`)
      router.push('/dashboard')
      router.refresh()
      toast.success('ShortLink deleted.')
    } catch (error) {
      console.error('Error:', error)
      toast.error(
        'Make sure you removed all products using this category first.'
      )
    } finally {
      setloading(false)
      setOpen(false)
    }
  }

  const handleDelete = (id: string) => {
    // TODO Find a way more efficient for delete a shortLink
    setOpen(true)
    if (id) {
      params.set('id', id)
    } else {
      params.delete('id')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const onCopy = async (shortLink: string) => {
    const url = `${origin}/${shortLink}`
    navigator.clipboard.writeText(url)
    toast.success('Copied')
  }

  return (
    <>
      {data && (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            loading={loading}
            onConfirm={() => onDelete(searchParams.get('id')!!)}
          />

          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-2 grid-cols-auto-fill-100'
                : 'flex flex-col gap-2'
            }
          >
            {data.map((item: Link) => {
              // const [formatDate] = item.createdAt.toISOString().split('T')
              const formatDate = item.createdAt.toLocaleDateString('en-us', {
                year: 'numeric',
                day: 'numeric',
                month: 'short'
              })
              return (
                <article
                  key={item.id}
                  className='flex flex-col gap-2 border border-neutral-700/70 p-4 rounded-md dark:bg-black'
                >
                  <div className='flex justify-between '>
                    <p>{item.shortLink}</p>
                    <div className='flex'>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() => handleSetting(item.id)}
                          >
                            <Settings
                              size={38}
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Setting</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() => onCopy(item.shortLink)}
                          >
                            <Copy
                              size={38}
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Copy</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2
                              size={38}
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <h3 className='text-gray-400 truncate'>{item.url}</h3>

                  <p className='text-end text-sm text-neutral-400'>
                    {formatDate}
                  </p>
                </article>
              )
            })}
          </div>
        </>
      )}

      {!data && (
        <span className='text-xl text-center mt-10 w-full inline-block selection:not-sr-only text-neutral-900 dark:text-neutral-500'>
          &apos;{search}&apos; not Found
        </span>
      )}
    </>
  )
}
