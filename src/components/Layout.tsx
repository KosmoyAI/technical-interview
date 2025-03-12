import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="p-4 bg-gray-200 dark:bg-gray-800">
				<h1 className="text-xl font-bold">Interview Challenge</h1>
			</header>
			<main className="flex-grow container mx-auto p-4">{children}</main>
			<footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center">
				&copy; {new Date().getFullYear()} Your Company
			</footer>
		</div>
	);
}

