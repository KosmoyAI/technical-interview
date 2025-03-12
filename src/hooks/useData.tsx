// src/hooks/useData.ts
import { useState, useEffect, useCallback } from 'react';

export interface Entity {
	id: number;
	name: string;
	description: string;
}

function retrieveDataFromLocalStorage() {
	if (typeof window === 'undefined') return [];
	const data = localStorage.getItem('entities');
	return data ? JSON.parse(data) : [];
}

function setEntitiesInLocalStorage(newEntities: Entity[]) {
	if (!newEntities) return;
	localStorage.setItem('entities', JSON.stringify(newEntities));
}

export function useData() {
	const [entities, setEntitiesInHook] = useState<Entity[]>([]);

	const setEntities = useCallback((newEntities: Entity[]) => {
		setEntitiesInLocalStorage(newEntities);
		setEntitiesInHook(newEntities);
	}, []);

	// Fetch initial data from the example API.
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts');
				if (!response.ok) throw new Error('Failed to fetch data');
				const data = await response.json();
				// Map the API data to our entity structure.
				const mappedData: Entity[] = data.slice(0, 10).map((post: {
					id: number;
					title: string;
					body: string;
				}) => ({
					id: post.id,
					name: post.title,
					description: post.body,
				}));
				setEntities(mappedData);
			} catch (err) {
				console.error(err);
			}
		}
		const data = retrieveDataFromLocalStorage();
		if (data.length === 0) {
			fetchData().then(() => console.log('Data fetched'));
		} else {
			setEntities(data);
		}
	}, [setEntities]);

	// Add a new entity using a POST request.
	const addEntity = useCallback(async (entity: Omit<Entity, 'id'>) => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(entity),
			});
			if (!response.ok) throw new Error('Failed to add entity');
			await response.json();

			const findMaxId = (acc: number, cur: Entity) => (cur.id > acc ? cur.id : acc);
			const newId = entities.reduce(findMaxId, 0) + 1;

			const mappedEntity: Entity = {
				id: newId,
				name: entity.name,
				description: entity.description,
			};
			setEntities([...entities, mappedEntity]);
		} catch (err) {
			console.error(err);
		}
	}, [setEntities, entities]);

	return { entities, addEntity };
}

