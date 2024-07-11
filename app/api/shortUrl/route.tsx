import prisma from '@/lib/prismadb'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await auth()

    const { url, shortLink } = body

    const userId = session?.user?.id

    if (!session?.user) return null

    if (!userId) return new NextResponse('Unauthenticated', { status: 403 })

    if (!url) return new NextResponse('Url is required', { status: 400 })

    if (!shortLink)
      return new NextResponse('shortLink is required', { status: 400 })

    const existingLink = await prisma.link.findFirst({
      where: {
        shortLink
      }
    })

    if (existingLink) {
      return NextResponse.json(
        { message: 'shortLink already exists' },
        { status: 500 }
      )
    }

    const link = await prisma.link.create({
      data: {
        url,
        shortLink,
        creatorId: userId
      }
    })

    return NextResponse.json(link)
  } catch (error) {
    console.log('[SHORT_URL]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
