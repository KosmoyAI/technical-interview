'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/hooks/useData';
import Button from '@/components/Button';
import Link from 'next/link';

export default function NewEntity() {
	const { addEntity } = useData();
	const router = useRouter();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() === '') return;

		addEntity({ name, description }).then(() => {
			router.push('/posts');
		});
	}, [name, description, addEntity, router]);

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Add New Entity</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block font-semibold">Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={e => setName(e.target.value)}
						className="mt-1 p-2 border rounded w-full"
					/>
				</div>
				<div>
					<label htmlFor="description" className="block font-semibold">Description</label>
					<textarea
						id="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						className="mt-1 p-2 border rounded w-full"
					/>
				</div>
				<Button type="submit">Add Entity</Button>
			</form>
			<Link className="mt-4 inline-block text-blue-600 hover:underline" href="/posts">
				Back to list
			</Link>
		</>
	);
}

