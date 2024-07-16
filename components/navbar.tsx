import Link from 'next/link'
import { ThemeToggle } from './toggle-theme'
import { MenuProfile } from './menu-profile'
import { GithubLogo, Logo } from './logos'
import { auth } from '@/auth'
import { DropdownMenuSeparator } from './ui/dropdown-menu'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button'

const Navbar = async () => {
  const session = await auth()

  return (
    <>
      <nav className='px-6 py-3'>
        <div className='max-w-screen-2xl w-full flex flex-wrap items-center justify-between mx-auto'>
          <div className='flex items-center gap-2'>
            <Link href='#' className='p-2.5 rounded-full bg-black'>
              <Logo className='size-6 ' />
            </Link>
            <p className='hidden sm:text-white/80 sm:text-lg sm:font-bold'>
              {session?.user?.name}
            </p>
          </div>
          <div className='flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <Link href='https://github.com/M-Suyuc/shortlink' target='_blank'>
              <GithubLogo className='size-6' />
            </Link>
            <ThemeToggle />
            {session ? (
              <MenuProfile session={session?.user} />
            ) : (
              <Link
                href='/dashboard'
                className={buttonVariants({
                  variant: 'outline',
                  className: 'group inline-flex text-lg font-light py-5'
                })}
              >
                <span>Get Started</span>
                <ArrowRight className='ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1' />
              </Link>
            )}
          </div>
        </div>
      </nav>
      <DropdownMenuSeparator className='w-full' />
    </>
  )
}
export default Navbar
