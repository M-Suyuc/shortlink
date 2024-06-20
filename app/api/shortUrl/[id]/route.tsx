import prisma from '@/lib/prismadb'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { url: string } }
) {
  try {
    const body = await req.json()
    const session = await auth()

    const { url, shortLink } = body
    console.log(body)

    const userId = session?.user?.id

    if (!session?.user) return null

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!url) {
      return new NextResponse('Url is required', { status: 400 })
    }

    if (!shortLink) {
      return new NextResponse('shortLink is required', { status: 400 })
    }

    // const link = await prisma.link.update({
    //   where
    //   // data: {
    //   //   url,
    //   //   shortLink: shortLink,
    //   //   creatorId: userId
    //   // }
    // })

    // return NextResponse.json(link)
  } catch (error) {
    console.log('[SHORT_URL]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const idLink = params.id
  const session = await auth()
  const userId = session?.user?.id

  if (!session?.user) return null

  if (!userId) {
    return new NextResponse('Unauthenticated', { status: 403 })
  }

  if (!params.id) {
    return new NextResponse('Link id is required', { status: 400 })
  }

  try {
    const Link = await prisma.link.delete({
      where: {
        id: idLink
      }
    })
    return NextResponse.json(Link)
  } catch (error) {
    console.log('[LINK_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
