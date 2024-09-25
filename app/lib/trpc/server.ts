import { createHydrationHelpers } from '@trpc/react-query/rsc'

import type { AppRouter } from '@/server/api/root'
import { createCaller } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'
import { createQueryClient } from './query-client'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = () => {
  const heads = new Headers()
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    headers: heads,
  })
}

const getQueryClient = createQueryClient
const caller = createCaller(createContext)

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
)
