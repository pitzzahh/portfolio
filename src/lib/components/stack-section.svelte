<script lang="ts">
	import { skills } from '$lib/data.js';
	import type { Skill } from '$lib/types.js';
	import { reveal } from '$lib/hooks/actions.js';

	const groups = [
		{
			title: 'Languages',
			lede: 'TypeScript and Java most days.',
			kind: 'code' as const,
			cats: ['language'] as Skill['category'][]
		},
		{
			title: 'Frameworks',
			lede: 'SvelteKit for web, Tauri for desktop, Spring Boot for services.',
			kind: 'browser' as const,
			cats: ['framework'] as Skill['category'][]
		},
		{
			title: 'Data & infra',
			lede: 'Cloudflare edge and AWS. Drizzle for schema and migrations.',
			kind: 'database' as const,
			cats: ['database', 'tool'] as Skill['category'][]
		}
	];

	const withTags = groups.map((g) => ({
		...g,
		tags: skills.filter((s) => g.cats.includes(s.category)).slice(0, 7)
	}));
</script>

<section class="section" id="stack">
	<div class="container">
		<div class="sec-head" use:reveal>
			<div>
				<p class="eyebrow num">02</p>
				<h2 class="h2">Stack</h2>
			</div>
			<span class="sec-index num">( 03 )</span>
		</div>
		<div class="grid-3">
			{#each withTags as g, i (g.title)}
				<div class="feature" use:reveal={i * 100}>
					<div class="feature-mark">
						{#if g.kind === 'code'}
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.6"
								aria-hidden="true"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" /></svg
							>
						{:else if g.kind === 'browser'}
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.6"
								aria-hidden="true"
								><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></svg
							>
						{:else}
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.6"
								aria-hidden="true"
								><ellipse cx="12" cy="6" rx="8" ry="3" /><path
									d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
								/></svg
							>
						{/if}
					</div>
					<h3>{g.title}</h3>
					<p>{g.lede}</p>
					<div class="tagrow">
						{#each g.tags as skill (skill.name)}
							<span class="tag">{skill.name}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.sec-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--gap-md);
		margin-bottom: 18px;
	}
	.sec-index {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
		letter-spacing: 0.08em;
	}
	.grid-3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap-lg);
		margin-top: 34px;
	}
	.feature {
		border-top: 1px solid var(--fg);
		padding-top: 22px;
	}
	.feature-mark {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 10px;
		color: var(--fg);
		margin-bottom: 18px;
	}
	.feature-mark svg {
		width: 18px;
		height: 18px;
	}
	.feature h3 {
		margin: 0 0 8px;
		font-size: 20px;
		font-weight: 600;
		letter-spacing: -0.005em;
	}
	.feature p {
		margin: 0 0 14px;
		color: var(--muted);
		font-size: 14.5px;
	}
	.tagrow {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tag {
		display: inline-flex;
		align-items: center;
		padding: 5px 12px;
		color: var(--muted);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
		font-size: 12.5px;
		transition:
			color 0.15s,
			border-color 0.15s;
	}
	.tag:hover {
		color: var(--fg);
		border-color: var(--fg);
	}
	@media (max-width: 920px) {
		.grid-3 {
			grid-template-columns: 1fr;
		}
	}
</style>
