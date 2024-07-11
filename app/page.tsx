import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex justify-center items-center gap-4 min-h-[calc(100vh-5rem)] h-full'>
      <Link
        href='/dashboard'
        className={buttonVariants({
          variant: 'outline',
          className: 'block text-xl px-10 py-7'
        })}
      >
        Create a new shortLink
      </Link>
    </main>
  )
}
