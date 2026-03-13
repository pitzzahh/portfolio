<script module lang="ts">
	/**
	 * Format date to "Mon YYYY" or "Present"
	 */
	function formatDate(iso?: string | null): string {
		if (!iso) return 'Present';
		const d = new Date(iso);
		// Using 'short' month name + year
		return d.toLocaleDateString(undefined, {
			month: 'short',
			year: 'numeric'
		});
	}

	function formatElapsedTime(startDate: string | Date, endDate?: string | Date): string {
		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();

		let years = end.getFullYear() - start.getFullYear();
		let months = end.getMonth() - start.getMonth();
		let days = end.getDate() - start.getDate();

		if (days < 0) {
			months--;
			const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
			days += prevMonthLastDay;
		}

		if (months < 0) {
			years--;
			months += 12;
		}

		const parts: string[] = [];
		if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
		if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
		if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);

		if (parts.length === 0) return '0 days';
		if (parts.length === 1) return parts[0];
		return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
	}

	function getHref(url?: string): string | undefined {
		if (!url) return undefined;
		// You can enhance this later with import.meta.env.BASE_URL if needed
		return url;
	}
</script>

<script>
	import { experiences } from '$lib/data';
	import { reveal, stagger } from '$lib/actions.js';
</script>

<section class="experience" id="exp">
	<div class="experience-inner">
		<header class="section-header" use:reveal={{ direction: 'up', delay: 0, once: false }}>
			<span class="section-index">({experiences.length})</span>
			<h2 class="section-title">Experience</h2>
		</header>

		<ol
			class="experience-list"
			use:stagger={{ direction: 'up', initialDelay: 80, step: 60, once: false }}
		>
			{#each experiences as exp (exp.company + exp.start)}
				<li class="experience-row">
					<div class="exp-main">
						<div class="exp-meta" use:reveal={{ direction: 'up', delay: 40, once: false }}>
							<h3 class="exp-role">{exp.role}</h3>
							<p class="exp-company">
								{#if getHref(exp.url)}
									<a href={getHref(exp.url)} target="_blank" rel="noopener noreferrer">
										{exp.company}
									</a>
								{:else}
									{exp.company}
								{/if}
							</p>
						</div>

						<div class="exp-side" use:reveal={{ direction: 'up', delay: 80, once: false }}>
							<p class="exp-type">{exp.type}</p>
							<p class="exp-dates">
								{formatDate(exp.start)} – {formatDate(exp.end)} · {formatElapsedTime(
									exp.start,
									exp.end || undefined
								)}
							</p>
							<p class="exp-location">{exp.location}</p>
						</div>
					</div>

					{#if exp.skills?.length}
						<p class="exp-skills">
							{exp.skills.join(', ')}
						</p>
					{/if}
				</li>
			{/each}
		</ol>

		<div class="experience-footer" use:reveal={{ direction: 'up', delay: 120, once: false }}>
			<p class="disclaimer">Dates and durations are calculated based on provided ISO dates.</p>
		</div>
	</div>
</section>

<style>
	.experience {
		padding: 8rem 3rem;
	}

	.experience-inner {
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
	.experience-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.experience-row {
		border-top: 1px solid var(--border);
		padding: 1.25rem 0;
	}

	.experience-row:last-child {
		border-bottom: 1px solid var(--border);
	}

	.exp-main {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
	}

	.exp-meta {
		max-width: 66%;
	}

	.exp-role {
		font-size: clamp(1.05rem, 2.5vw, 1.25rem);
		margin: 0;
		font-weight: 600;
		color: var(--fg);
	}

	.exp-company {
		margin: 0.35rem 0 0;
		color: var(--fg-muted);
		font-size: 0.9rem;
	}

	.exp-company a {
		color: inherit;
		text-decoration: none;
		border-bottom: 1px dotted transparent;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.exp-company a:hover {
		color: var(--fg);
		border-color: var(--fg-muted);
	}

	.exp-side {
		text-align: right;
		min-width: 220px;
	}

	.exp-type {
		color: var(--fg-muted);
		font-size: 0.8rem;
		margin: 0 0 0.25rem;
	}

	.exp-dates {
		color: var(--fg);
		font-weight: 500;
		margin: 0;
		font-size: 0.85rem;
	}

	.exp-location {
		color: var(--fg-muted);
		font-size: 0.85rem;
		margin-top: 0.25rem;
	}

	.exp-skills {
		color: var(--fg-subtle);
		margin: 0.75rem 0 0;
		font-size: 0.85rem;
	}

	.experience-footer {
		margin-top: 2rem;
		display: flex;
		justify-content: flex-end;
	}

	.disclaimer {
		font-size: 0.8rem;
		color: var(--fg-muted);
		margin: 0;
	}

	@media (max-width: 768px) {
		.experience {
			padding: 6rem 1.5rem;
		}

		.exp-main {
			flex-direction: column;
			gap: 0.5rem;
		}

		.exp-side {
			text-align: left;
			min-width: 0;
		}
	}

	@media (max-width: 480px) {
		.experience {
			padding: 4rem 1.4rem;
		}

		.exp-meta {
			max-width: 100%;
		}
	}
</style>
