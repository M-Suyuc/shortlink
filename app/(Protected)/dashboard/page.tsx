import { auth } from '@/auth'
import prisma from '@/lib/prismadb'
import LinkClient from './_components/link-client'
import { ListLinks } from '@/components/list-links'
import { Suspense } from 'react'
import Loading from '@/components/ui/loading'

const DashboardPage = async ({
  searchParams
}: {
  searchParams: { search?: string }
}) => {
  const session = await auth()
  const userId = session?.user?.id

  const shorts = await prisma.link.findMany({
    where: {
      creatorId: userId
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const search = searchParams.search || ''

  const filterShortLinks = shorts.filter((short) =>
    short.shortLink.includes(search)
  )

  return (
    <div className='max-w-screen-2xl px-4 mx-auto'>
      <LinkClient />
      <Suspense key={search} fallback={<Loading />}>
        <ListLinks data={filterShortLinks} />
      </Suspense>
      {shorts.length === 0 && (
        <div className='min-h-[calc(100vh-10rem)] grid place-items-center'>
          <span className='text-xl selection:not-sr-only text-neutral-900 dark:text-neutral-500'>
            Start by creating your first shortlink!
          </span>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
