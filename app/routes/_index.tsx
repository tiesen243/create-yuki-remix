import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/trpc'

const Page: React.FC = () => {
  const [name, setName] = useState<string>('')
  const { data, isLoading } = api.post.hello.useQuery({ text: 'world' })
  const { data: post, refetch } = api.post.getLatest.useQuery()
  const createPost = api.post.create.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    createPost.mutate({ name })
    setName('')
    await refetch()
  }

  return (
    <main className="container py-4">
      <h1 className="text-2xl font-bold">{isLoading ? 'loading...' : data?.greeting}</h1>

      <h2 className="mt-4 text-lg font-semibold">Latest post: {post?.name}</h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <Button disabled={createPost.isPending}>Submit</Button>
      </form>
    </main>
  )
}

export default Page
