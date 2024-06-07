import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex justify-center items-center gap-4 min-h-[calc(100vh-5rem)] h-full'>
      <Link
        href='/dashboard'
        className='boder py-3 px-6 rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 font-medium text-lg'
      >
        Create a new shortLink
      </Link>
    </main>
  )
}
