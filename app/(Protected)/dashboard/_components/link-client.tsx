'use client'

import { Button } from '@/components/ui/button'
import LayoutBorder from '@/components/layout'
import { ListLinks } from '@/components/list-links'
import { Toaster } from '@/components/ui/toaster'
import { Link } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useModalContext } from '@/context/modal'

export default function LinkClient({ data }: { data: Link[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const { showModal } = useModalContext()

  const handleRedirect = () => {
    router.push(`${pathname}/link/new`)
    showModal()
  }

  return (
    <LayoutBorder>
      <nav className='py-4 flex justify-end'>
        <Button onClick={handleRedirect}>Create Link</Button>
      </nav>
      <ListLinks data={data} onDelete={() => {}} />
      <Toaster />
    </LayoutBorder>
  )
}
