// Partes de una url
// https://lenguajejs.com/javascript/peticiones-http/url/

import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { NextResponse } from 'next/server'

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  protectedRoute
} from './routes'

export const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  // console.log({ nextUrl })
  const isLoggedIn = !!req.auth
  // console.log('***************Auth***************', req.auth)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isProtectedRoute = protectedRoute.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const isRoute = nextUrl.pathname.split('/').pop()

  if (isApiAuthRoute) {
    return
  }

  if (nextUrl.pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
  }

  // check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
      // Al usar  new URL simpre hay que pasar como segundo parametro el nextUrl: para que cree una nueva
      // example 👆 new URL('/foo', 'https://example.org/');
      // https://example.org/foo
    }
    return
  }

  // If it's not authenticated and is not isProtectedRoute --> redirect
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search
    // console.log({ callbackUrl }) -----> { callbackUrl: '/dashboard' }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    // console.log({ encodedCallbackUrl }) -----> { encodedCallbackUrl: '%2Fdashboard' }
    return NextResponse.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      // Al usar  new URL simpre hay que pasar como segundo parametro el nextUrl: para que cree una nueva
      // example 👆 new URL('/foo', 'https://example.org/');
      // https://example.org/foo
    )
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/l/:link*']
}
