import Link from 'next/link'
import { MenuProfile } from './menu-profile'
import { GithubLogo, Logo } from './logos'
import { auth } from '@/auth'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { ModeToggle } from './toggle-theme'

const Navbar = async () => {
  const session = await auth()

  return (
    <nav className='flex items-center h-18 border-b border-neutral-200/80 dark:border-neutral-200/10 dark:bg-[#030303]'>
      <div className='max-w-(--breakpoint-2xl) w-full flex px-4 flex-wrap items-center justify-between mx-auto'>
        <span className='select-none'>
          <Logo />
        </span>
        <div className='flex items-center space-x-1 h-10'>
          <Link href='https://github.com/M-Suyuc/shortlink' target='_blank' className='inline-flex items-center p-3 h-full  dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-md'>
            <GithubLogo className='size-6' />
          </Link>
          <ModeToggle />
          {session ? (
            <>
              <MenuProfile session={session?.user} />
            </>
          ) : (
            <Link
              href='/dashboard'
              className={buttonVariants({
                variant: 'outline',
                className: 'group inline-flex font-light h-full  dark:hover:bg-neutral-800'
              })}
            >
              <span>Get Started</span>
              <ArrowRight className='ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1' />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
