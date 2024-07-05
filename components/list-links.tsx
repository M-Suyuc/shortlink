import { Link } from '@prisma/client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Copy, Settings, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useModalContext } from '@/context/modal'
import { useState } from 'react'
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

  const { showModal } = useModalContext()

  const router = useRouter()
  const pathname = usePathname()
  const origin = useOrigin()

  const handleSetting = (id: string) => {
    router.push(`${pathname}/link/${id}`)
    showModal()
  }

  const onDelete = async (id: string) => {
    try {
      setloading(true)
      await axios.delete(`/api/shortUrl/${id}`)
      router.refresh()
      toast.success('ShortLink deleted.')
    } catch (error) {
      console.error('Error:', error)
      toast.error(
        'Make sure you removed all products using this category first.'
      )
    } finally {
      setloading(false)
    }
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
            onConfirm={() => onDelete}
          />

          <div className='grid gap-4 grid-cols-auto-fill-100  w-full h-full'>
            {data.map((item: Link) => {
              const [formatDate] = item.createdAt.toISOString().split('T')
              return (
                <article
                  key={item.id}
                  className='flex flex-col gap-2 border border-neutral-700/70 p-5 rounded-md dark:bg-black'
                >
                  <div className='flex justify-between'>
                    <div>
                      <p>{item.shortLink}</p>
                      <h3 className='text-gray-400'>{item.url}</h3>
                    </div>
                    <div className='flex gap-2'>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() => handleSetting(item.id)}
                          >
                            <Settings
                              size={38}
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
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
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Copy</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger
                            asChild
                            onClick={() => onDelete(item.id)}
                          >
                            <Trash2
                              size={38}
                              className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md'
                            />
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <p className='text-end text-sm text-neutral-400'>
                    {formatDate}
                  </p>
                </article>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
