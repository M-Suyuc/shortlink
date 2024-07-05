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

  return <LinkClient data={shorts} />
}

export default DashboardPage
