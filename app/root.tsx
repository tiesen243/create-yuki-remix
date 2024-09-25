import '@/styles/tailwind.css'

import type { MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { ThemeProvider } from 'next-themes'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
)

const App: React.FC = () => <Outlet />

export default App

export const meta: MetaFunction = () => [{ title: 'Remix Starter' }]
