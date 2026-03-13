<script lang="ts">
	import { projects } from '$lib/data.js';
	import { reveal, stagger } from '$lib/actions.js';
</script>

<section class="project" id="projects">
	<div class="project-inner">
		<header class="section-header" use:reveal={{ direction: 'up', delay: 0, once: false }}>
			<span class="section-index">( {projects.length} )</span>
			<h2 class="section-title">Selected projects</h2>
		</header>

		<ol
			class="project-list"
			use:stagger={{ direction: 'up', initialDelay: 80, step: 60, once: false }}
		>
			{#each projects as project, i (project.title)}
				<li class="project-row">
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="project-link"
						aria-label="View {project.title} on GitHub"
					>
						<span class="project-number">0{i + 1}</span>

						<span class="project-title">{project.title}</span>

						<span class="project-tech">
							{#each project.tech as tag, j (tag)}
								{tag}{j < project.tech.length - 1 ? ', ' : ''}
							{/each}
						</span>

						<span class="project-arrow" aria-hidden="true">↗</span>
					</a>

					<p class="project-desc">{project.description}</p>
				</li>
			{/each}
		</ol>

		<div class="project-footer" use:reveal={{ direction: 'up', delay: 80, once: false }}>
			<a
				href="https://github.com/pitzzahh?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
				class="see-all"
			>
				See all projects
				<span aria-hidden="true">↗</span>
			</a>
		</div>
	</div>
</section>

<style>
	.project {
		padding: 8rem 3rem;
	}

	.project-inner {
		max-width: 960px;
		margin: 0 auto;
	}

	/* ── Section header ── */
	.section-header {
		display: flex;
		justify-content: right;
		align-items: center;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.section-index {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		color: var(--fg-muted);
	}

	.section-title {
		font-size: clamp(1.1rem, 2vw, 1.3rem);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin: 0;
	}

	/* ── List ── */
	.project-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.project-row {
		border-top: 1px solid var(--border);
	}

	.project-row:last-child {
		border-bottom: 1px solid var(--border);
	}

	.project-link {
		display: grid;
		grid-template-columns: 2.5rem 1fr auto auto;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem 0;
		text-decoration: none;
		color: var(--fg);
		transition: opacity 0.2s;
	}

	.project-list:has(.project-link:hover) .project-link:not(:hover) {
		opacity: 0.35;
	}

	.project-number {
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	.project-title {
		font-size: clamp(1.1rem, 2.5vw, 1.5rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--fg);
	}

	.project-tech {
		font-size: 0.75rem;
		font-weight: 400;
		letter-spacing: 0.03em;
		color: var(--fg-muted);
		text-align: right;
		white-space: nowrap;
	}

	.project-arrow {
		font-size: 1rem;
		color: var(--fg-muted);
		flex-shrink: 0;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.project-link:hover .project-arrow {
		transform: translate(3px, -3px);
		color: var(--fg);
	}

	.project-desc {
		font-size: 0.85rem;
		color: var(--fg-subtle);
		line-height: 1.65;
		padding: 0 0 1.5rem 4rem;
		margin: 0;
		max-width: 520px;
	}

	/* ── Footer ── */
	.project-footer {
		margin-top: 3rem;
		display: flex;
		justify-content: flex-end;
	}

	.see-all {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-decoration: none;
		transition:
			color 0.2s,
			gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.see-all:hover {
		color: var(--fg);
		gap: 0.875rem;
	}

	@media (max-width: 768px) {
		.project {
			padding: 6rem 1.5rem;
		}

		.project-link {
			grid-template-columns: 2rem 1fr auto;
			gap: 1rem;
		}

		.project-tech {
			display: none;
		}

		.project-desc {
			padding-left: 3rem;
		}
	}

	@media (max-width: 480px) {
		.project-link {
			grid-template-columns: 2rem 1fr auto;
		}

		.project-number {
			display: none;
		}

		.project-link {
			grid-template-columns: 1fr auto;
		}

		.project-desc {
			padding-left: 0;
		}
	}
</style>
