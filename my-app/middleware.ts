import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isCompanyRoute = createRouteMatcher(['/company(.*)'])
const isCustomerRoute = createRouteMatcher(['/customer(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect company and customer routes
  if (isCompanyRoute(req) || isCustomerRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}