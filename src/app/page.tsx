'use client';

import Link from 'next/link';

export default function Posts() {
  return (
    <>
      <h1>Posts List</h1>
      <Link href="/posts">
        Goto Posts
      </Link>
    </>
  );
}

