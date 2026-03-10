<script lang="ts">
	import { onMount } from 'svelte';

	const items = [
		'TypeScript',
		'SvelteKit',
		'Tauri',
		'Hono',
		'Bun',
		'FastAPI',
		'Python',
		'Drizzle ORM',
		'PostgreSQL',
		'SQLite',
		'Vite',
		'Node.js',
		'Docker',
		'Git',
		'OpenAPI'
	];

	// Duplicate for seamless loop
	const track = [...items, ...items];

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div class="marquee" aria-hidden="true" class:visible={mounted}>
	<div class="marquee-track">
		{#each track as item, i (i)}
			<span class="marquee-item">
				{item}
				<span class="sep">·</span>
			</span>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		width: 100%;
		padding: 1.5rem 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		opacity: 0;
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		user-select: none;
	}

	.marquee.visible {
		opacity: 1;
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: scroll 28s linear infinite;
	}

	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			/* Move exactly half — the duplicated portion */
			transform: translateX(-50%);
		}
	}

	.marquee-item {
		display: inline-flex;
		align-items: center;
		gap: 1.25rem;
		padding: 0 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		white-space: nowrap;
	}

	.sep {
		color: var(--border-strong);
		font-size: 0.6rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
