
"use client";

import { useEffect, useState } from "react";

type Repo = {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	html_url: string;
};

export default function AgentPage() {
	const [repos, setRepos] = useState<Repo[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadRepos = async () => {
			try {
				const res = await fetch("/api/poc");
				const data = await res.json();

				setRepos(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		loadRepos();
	}, []);

	if (loading) {
		return <div className="p-8">Loading repositories...</div>;
	}

	return (
		<div className="mx-auto max-w-6xl p-8">
			<h1 className="mb-8 text-3xl font-bold">GitHub Repositories</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{repos.map((repo) => (
					<a
						key={repo.id}
						href={repo.html_url}
						target="_blank"
						rel="noreferrer"
						className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:shadow-lg"
					>
						<h2 className="font-semibold text-black">{repo.name}</h2>

						<p className="mt-2 text-sm text-zinc-600">
							{repo.description || "No description"}
						</p>

						<div className="mt-4 flex items-center justify-between text-sm text-blue-800">
							<span>{repo.language || "Unknown"}</span>

							<span>⭐ {repo.stargazers_count}</span>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
