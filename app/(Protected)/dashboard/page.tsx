import { auth } from '@/auth'
import { NavbarDashboard } from './_components/link-client'
import { ListLinks } from '@/components/list-links'
import { Suspense } from 'react'
import Loading from '@/components/ui/loading'
import { Link } from 'lucide-react'
import { prisma } from '@/lib/prismadb'

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
    <div className='dark:bg-[#030303] w-full h-[calc(100vh-4.5rem)]'>
      <div className='max-w-(--breakpoint-2xl) w-full mx-auto px-4 '>
        <NavbarDashboard />
        <Suspense key={search} fallback={<Loading />}>
          <ListLinks data={filterShortLinks} />
        </Suspense>
        {shorts.length === 0 && (
          <div className='grid place-items-center h-[calc(100vh-4.5rem)] dark:bg-[#030303] text-neutral-500/60'>
            <span className='inline-flex  items-center  gap-4 text-xl md:text-3xl '>
              <Link className="size-8" />
              Create your first shortlink
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
