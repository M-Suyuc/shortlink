'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BoxesIcon, LogOut, LucideHome, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function MenuProfile({ session }: { session: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className='w-8 h-8 rounded-full cursor-pointer'
          src={session.image}
          alt='user photo'
          width={100}
          height={100}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-64 mr-6 mt-3 py-4 rounded-xl'>
        <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
        <DropdownMenuLabel className='text-gray-400 py-0 font-light'>
          {session.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer  py-2'>
          <Link
            href='/home'
            className='text-base font-light w-full h-full text-black dark:text-gray-400 flex items-center'
          >
            <LucideHome className='size-5 mr-3 dark:text-gray-400' />
            Home Page
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='cursor-pointer py-2'>
          <Link
            href='/dashboard'
            className='text-base font-light w-full h-full text-black dark:text-gray-400 flex items-center'
          >
            <BoxesIcon className='size-5 mr-3 dark:text-gray-400' />
            Dashboard
          </Link>
          {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='cursor-pointer py-2'>
          <Link
            href='/dashboard'
            className='text-base font-light w-full h-full text-black dark:text-gray-400 flex items-center '
          >
            <Settings className='size-5 mr-3 dark:text-gray-400' />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: '/'
            })
          }
          className='cursor-pointer text-base font-light  w-full h-full dark:text-gray-400 py-2'
        >
          <LogOut className='size-5 mr-3 dark:text-gray-400' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
