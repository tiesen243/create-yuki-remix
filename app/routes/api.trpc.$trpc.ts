import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { env } from '@/lib/env'
import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: Request) => {
  return createTRPCContext({
    headers: req.headers,
  })
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined,
  })

export const loader: LoaderFunction = async ({ request }) => {
  return handler(request)
}

export const action: ActionFunction = async ({ request }) => {
  return handler(request)
}
