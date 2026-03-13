<script lang="ts">
	import { onMount } from 'svelte';

	const items = [
		'SvelteKit',
		'Java',
		'Cloudflare D1',
		'Cloudflare Workers',
		'TypeScript',
		'Tauri',
		'Hono',
		'Bun',
		'Python',
		'SpringBoot',
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

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="marquee" id="marquee" aria-hidden={!mounted} class:visible={mounted}>
	<div class="marquee-inner">
		<div class="marquee-track">
			{#each track as item, i (i)}
				<span class="marquee-item">
					{item}
					<span class="sep">·</span>
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		width: 100%;
		/* horizontal padding matches project-section (3rem desktop) while keeping a slim vertical gutter */
		padding: 1.5rem 3rem;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		opacity: 0;
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		user-select: none;
	}

	.marquee-inner {
		/* align the track with other sections' inner containers */
		max-width: 960px;
		margin: 0 auto;
		width: 100%;
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

	@media (max-width: 768px) {
		/* match project-section breakpoint and make inner sit flush with the section padding */
		.marquee {
			padding: 1.5rem 1.5rem;
		}
		.marquee-inner {
			/* ensure inner content sits flush at the left edge inside the section padding */
			padding-left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
