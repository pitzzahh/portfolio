<script lang="ts">
	import { projects } from '$lib/data.js';
	import { reveal } from '$lib/hooks/actions.js';

	// ponytail: featured slice keeps the DS 6-row index list; hrms stays out (private repo, no public URL).
	const featured = [0, 7, 10, 1, 3, 8].map((i) => projects[i]).filter(Boolean);
</script>

<section class="section" id="work">
	<div class="container">
		<div class="sec-head" use:reveal>
			<div>
				<p class="eyebrow num">01</p>
				<h2 class="h2">Selected work</h2>
			</div>
			<span class="sec-index num">( {String(featured.length).padStart(2, '0')} )</span>
		</div>
		<ol class="work-list">
			{#each featured as project, i (project.title)}
				<li class="work-row" use:reveal={i * 60}>
					<a
						class="work-link"
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View {project.title}"
					>
						<span class="wnum num">{String(i + 1).padStart(2, '0')}</span>
						<span class="wtitle">{project.title} <span class="arr">↗</span></span>
						<span class="wtech">{project.tech.slice(0, 3).join(' · ')}</span>
						<span class="wstar num">{project.stars ? `★ ${project.stars}` : project.language}</span>
					</a>
					<div class="wdesc"><div class="wdesc-in"><p>{project.description}</p></div></div>
				</li>
			{/each}
		</ol>
		<div class="seeall" use:reveal>
			<a
				class="btn btn-ghost btn-arrow"
				href="https://github.com/pitzzahh?tab=repositories"
				target="_blank"
				rel="noopener noreferrer">More on GitHub</a
			>
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
	.work-list {
		list-style: none;
		margin: 34px 0 0;
		padding: 0;
	}
	.work-row {
		border-top: 1px solid var(--border);
		position: relative;
	}
	.work-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.work-row::after {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--fg);
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform 0.55s var(--ease-line);
		pointer-events: none;
	}
	.work-row:hover::after,
	.work-row:focus-within::after {
		transform: scaleX(1);
	}
	.work-link {
		display: grid;
		grid-template-columns: 3.2rem 1.4fr 1fr auto;
		gap: 1.4rem;
		align-items: baseline;
		padding: 24px 0;
		transition: opacity 0.25s ease;
	}
	.work-list:has(.work-link:hover) .work-link:not(:hover) {
		opacity: 0.32;
	}
	.wnum {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
	}
	.wtitle {
		font-family: var(--font-display);
		font-size: clamp(23px, 3vw, 33px);
		font-weight: 600;
		letter-spacing: -0.015em;
		line-height: 1.1;
	}
	.wtitle .arr {
		font-weight: 400;
		color: var(--muted);
		display: inline-block;
		transition:
			transform 0.3s var(--ease-out),
			color 0.2s;
	}
	.work-link:hover .arr {
		transform: translate(4px, -4px);
		color: var(--accent);
	}
	.wtech {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
		text-align: right;
		line-height: 1.7;
	}
	.wstar {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
		padding: 4px 10px;
		white-space: nowrap;
	}
	.wdesc {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		margin-left: 4.6rem;
		transition:
			grid-template-rows 0.45s var(--ease-line),
			opacity 0.3s ease;
	}
	.wdesc-in {
		overflow: hidden;
		min-height: 0;
	}
	.wdesc p {
		margin: 0;
		padding-bottom: 24px;
		color: var(--muted);
		font-size: 15px;
		line-height: 1.65;
		max-width: 62ch;
	}
	.work-row:hover .wdesc,
	.work-row:focus-within .wdesc {
		grid-template-rows: 1fr;
		opacity: 1;
	}
	.seeall {
		display: flex;
		justify-content: flex-end;
		margin-top: 30px;
	}
	@media (hover: none) {
		.wdesc {
			grid-template-rows: 1fr;
			opacity: 1;
		}
	}
	@media (max-width: 920px) {
		.work-link {
			grid-template-columns: 1fr auto;
		}
		.wnum,
		.wtech {
			display: none;
		}
		.wdesc {
			margin-left: 0;
		}
	}
</style>
