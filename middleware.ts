// Partes de una url
// https://lenguajejs.com/javascript/peticiones-http/url/

import NextAuth from 'next-auth'
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  checkRoutesPrefix,
  protectedRoutes,
  publicRoutes
} from './routes'
import authConfig from '@/auth.config'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  // console.log({ nextUrl })
  const isLoggedIn = !!req.auth
  // console.log('***************Auth***************', req.auth)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
  // const slugRoute = req.nextUrl.pathname.split('/').pop()
  // const isCheckRoute = nextUrl.pathname.startsWith(checkRoutesPrefix)

  if (isApiAuthRoute) {
    return
  }

  if (nextUrl.pathname === '/' && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
  }

  // check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
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
    return Response.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      // Al usar  new URL simpre hay que pasar como segundo parametro el nextUrl: para que cree una nueva
      // example 👆 new URL('/foo', 'https://example.org/');
      // https://example.org/foo
    )
  }

  // ⚙️ If Slug contains ``c``, redirect to /check/:slug:
  // if (slugRoute?.endsWith('&c')) {
  //   return NextResponse.redirect(
  //     new URL(`/check/${slugRoute.replace('&c', '')}`, nextUrl)
  //   )
  // }

  // ⚙️ Protected routes. If not authenticated, redirect to /auth:

  // ⚙️ Redirect using slug:
  // If not public route and not protected route:
  // if (!isPublicRoute && !isProtectedRoute && !isCheckRoute) {
  //   const getDataApi = await urlFromServer(slugRoute!);

  //   if (getDataApi.redirect404) {
  //     console.log("🚧 Error - Redirect 404: ", slugRoute);
  //   }

  //   if (getDataApi.error) {
  //     return NextResponse.json({ error: getDataApi.message }, { status: 500 });
  //   }

  //   if (getDataApi.url) {
  //     return NextResponse.redirect(new URL(getDataApi.url).toString());
  //   }
  // }
  // return;
  // return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
