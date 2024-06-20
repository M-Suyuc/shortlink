import { auth } from '@/auth'
import prisma from '@/lib/prismadb'
import LinkClient from './_components/link-client'

const DashboardPage = async () => {
  const session = await auth()
  const userId = session?.user?.id

  const shorts = await prisma.link.findMany({
    where: {
      creatorId: userId
    }
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <LinkClient data={shorts} />
      </div>
    </div>
  )
}

export default DashboardPage
