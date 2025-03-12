'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Layout from '@/components/Layout';
import { useData, Entity } from '@/hooks/useData';
import { useSearchParams } from 'next/navigation';

export default function EntityDetail() {
  const { entities } = useData();
	const searchParams = useSearchParams();
  const [entity, setEntity] = useState<Entity | undefined>(undefined);

  useEffect(() => {
    const found = entities.find(e => e.id.toString() === searchParams.get("id"));
    setEntity(found);
  }, [entities, searchParams]);

  if (!entity) {
    return (
      <Layout>
        <p>Entity not found.</p>
        <Link className="text-blue-600 hover:underline" href="/posts">
          Back to list
        </Link>
      </Layout>
    );
  }

  return (
    <>
      <Card title={entity.name} description={entity.description}>
        <p>ID: {entity.id}</p>
      </Card>
      <Link className="mt-4 inline-block text-blue-600 hover:underline" href="/posts">
        Back to list
      </Link>
    </>
  );
}

