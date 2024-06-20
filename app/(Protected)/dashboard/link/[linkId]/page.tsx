import prisma from '@/lib/prismadb'
import LinkForm from '../../_components/link-form'
import { useModalContext } from '@/context/modal'

const Page = async ({ params }: { params: { linkId: string } }) => {
  const link = await prisma.link.findUnique({
    where: {
      id: params.linkId
    }
  })

  return (
    <div>
      <LinkForm initialData={link} />
    </div>
  )
}
export default Page
