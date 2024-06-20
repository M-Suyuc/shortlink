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

interface Props {
  data: Link[]
  onDelete: (id: string) => void
}

export const ListLinks: React.FC<Props> = ({ data, onDelete }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { showModal } = useModalContext()

  const handle = (id: string) => {
    router.push(`${pathname}/link/${id}`)
    showModal()
  }

  // const onDelete = async (id: string) => {
  //   let options = {
  //     method: 'DELETE'
  //   }

  //   try {
  //     setloading(true)
  //     await fetch(`/api/shortUrl/${id}`, options)
  //     router.refresh()
  //   } catch (error) {
  //     console.error('Error:', error)
  //   } finally {
  //     setloading(false)
  //   }
  // }

  return (
    <>
      {data && (
        <div className='grid gap-4 grid-cols-auto-fill-100  w-full h-full'>
          {data.map((item: Link) => (
            <article
              key={item.id}
              className='flex flex-col gap-2 border border-neutral-700/70 p-4 rounded-md dark:bg-black'
            >
              <div className='flex justify-between'>
                <div>
                  <p>{item.shortLink}</p>
                  <h3>{item.url}</h3>
                </div>
                <div className='flex gap-2'>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild onClick={() => handle(item.id)}>
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
                      <TooltipTrigger asChild onClick={() => {}}>
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
                      <TooltipTrigger asChild onClick={() => onDelete(item.id)}>
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
                {item.createdAt.toDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
