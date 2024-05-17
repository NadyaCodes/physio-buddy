import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Physio <span className="text-[hsl(280,100%,70%)]">Buddy</span> App
        </h1>
        <div className="flex w-1/4 justify-between">
          <Link
            href="/input"
            className="rounded-lg border-2 border-yellow-400 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
          >
            Create
          </Link>
          <Link
            href="/buddy"
            className="rounded-lg border-2 border-yellow-400 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
          >
            Buddy
          </Link>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
