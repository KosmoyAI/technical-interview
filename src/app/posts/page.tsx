'use client';

import Link from 'next/link';
import Card from '@/components/Card';
import { useData } from '@/hooks/useData';

export default function EntityList() {
  const { entities } = useData();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Link className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" href="/posts/new">
          Add New
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entities.map(entity => (
          <Link key={entity.id} href={`/posts/post/?id=${entity.id}`}>
            <Card title={entity.name} description={entity.description} />
          </Link>
        ))}
      </div>
    </>
  );
}

