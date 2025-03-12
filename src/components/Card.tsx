import React from 'react';

interface CardProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
}

export default function Card({ title, description, children }: CardProps) {
	return (
		<div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
			<h3 className="text-lg font-semibold">{title}</h3>
			{description && <p className="text-gray-600">{description}</p>}
			{children}
		</div>
	);
}

