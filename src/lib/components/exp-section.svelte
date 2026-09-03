<script module lang="ts">
	function range(start: string, end?: string | null): string {
		const s = new Date(start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
		const e = end
			? new Date(end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
			: 'Present';
		return `${s} to ${e}`;
	}
</script>

<script lang="ts">
	import { experiences } from '$lib/data';
	import { reveal } from '$lib/hooks/actions.js';
</script>

<section class="section" id="exp">
	<div class="container split">
		<div class="sticky">
			<p class="eyebrow num" use:reveal>03</p>
			<div class="big" use:reveal={80}>Four<br /><em>roles.</em></div>
			<p class="lead" use:reveal={140}>Part time, apprenticeship, and internships.</p>
		</div>
		<ol class="xplist">
			{#each experiences as exp, i (exp.company + exp.start)}
				<li class="xp" use:reveal={i * 60}>
					<h3 class="xp-role">{exp.role}</h3>
					<p class="xp-co">
						{#if exp.url}
							<a href={exp.url} target="_blank" rel="noopener noreferrer">{exp.company}</a>
						{:else}
							{exp.company}
						{/if}
						· {exp.type}
					</p>
					<div class="xp-meta">
						<span class="meta num">{range(exp.start, exp.end)}</span>
						{#if exp.location}<span class="meta">{exp.location}</span>{/if}
					</div>
					{#if exp.skills?.length}
						<p class="xp-skills">{exp.skills.join(' · ')}</p>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.split {
		display: grid;
		grid-template-columns: 1fr 1.6fr;
		gap: var(--gap-xl);
		align-items: start;
	}
	.sticky {
		position: sticky;
		top: 110px;
	}
	.sticky .big {
		font-family: var(--font-display);
		font-size: clamp(58px, 6.6vw, 104px);
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1;
		margin: 14px 0;
	}
	.sticky .big em {
		font-style: italic;
		font-weight: 400;
		color: var(--muted);
	}
	.xplist {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.xp {
		border-top: 1px solid var(--border);
		padding: 24px 0;
		transition: opacity 0.25s ease;
	}
	.xplist li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.xplist:has(.xp:hover) .xp:not(:hover) {
		opacity: 0.45;
	}
	.xp-role {
		margin: 0;
		font-size: 22px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.xp-co {
		margin: 6px 0 0;
		color: var(--muted);
		font-size: 14.5px;
	}
	.xp-co a {
		border-bottom: 1px solid var(--border);
	}
	.xp-co a:hover {
		color: var(--fg);
		border-color: var(--fg);
	}
	.xp-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		margin-top: 12px;
	}
	.xp-skills {
		margin: 12px 0 0;
		color: var(--muted);
		font-size: 13.5px;
		font-family: var(--font-mono);
	}
	@media (max-width: 920px) {
		.split {
			grid-template-columns: 1fr;
		}
		.sticky {
			position: static;
		}
	}
</style>
