import { auth } from '@/auth'
import prisma from '@/lib/prismadb'
import { redirect } from 'next/navigation'

export default function Redirect() {
  return null
}

export async function generateMetadata({
  params
}: {
  params: { shortLink: string }
}) {
  const { shortLink } = params
  const session = await auth()
  const userId = session?.user?.id

  if (!session?.user) {
    redirect('/dashboard')
  }

  const link = await prisma.link.findUnique({
    where: { shortLink, creatorId: userId }
  })

  if (link) {
    redirect(new URL(link.url).toString())
  } else {
    redirect('/dashboard')
  }
}
