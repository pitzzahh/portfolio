<script lang="ts">
	import { personalInfo, skills } from '$lib/data.js';
	import { reveal } from '$lib/actions.js';

	const categories = [
		{ key: 'language', label: 'Languages' },
		{ key: 'framework', label: 'Frameworks' },
		{ key: 'tool', label: 'Tools' },
		{ key: 'database', label: 'Data' }
	] as const;

	type CategoryKey = (typeof categories)[number]['key'];

	const grouped = $derived(
		Object.fromEntries(
			categories.map((cat) => [cat.key, skills.filter((s) => s.category === cat.key)])
		) as Record<CategoryKey, typeof skills>
	);
</script>

<section class="about" id="about">
	<div class="about-inner">
		<header class="section-header" use:reveal={{ direction: 'up', delay: 0, once: false }}>
			<h2 class="section-title">About</h2>
		</header>

		<div class="about-grid">
			<div class="about-text" use:reveal={{ direction: 'up', delay: 60, once: false }}>
				<p>
					Hi, I'm <strong>{personalInfo.name}</strong> — full-stack developer based in {personalInfo.location}.
					You can find me as <span class="handle">@{personalInfo.handle}</span> online.
				</p>
				<p>
					I write clean, maintainable code and care about good developer experience. My daily stack
					is TypeScript + Svelte + modern web, but I also have strong Java knowledge (not currently
					used at work, will pursue this more) and I'm comfortable across the stack — REST APIs,
					desktop apps (Tauri), you name it.
				</p>
				<p>
					Right now building
					<a
						href="https://github.com/pitzzahh/powertrackr"
						target="_blank"
						rel="noopener noreferrer"
						class="text-link"
					>
						{personalInfo.currentProject}
					</a>
					— an electricity usage & payment tracker.
				</p>
			</div>

			<div class="about-skills" use:reveal={{ direction: 'up', delay: 120, once: false }}>
				{#each categories as cat (cat.key)}
					<div class="skill-group">
						<span class="skill-group-label">{cat.label}</span>
						<ul class="skill-list">
							{#each grouped[cat.key] as skill (skill.name)}
								<li>{skill.name}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: 8rem 3rem;
	}

	.about-inner {
		max-width: 960px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: clamp(1.1rem, 2vw, 1.3rem);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin: 0;
	}

	/* ── Grid ── */
	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: start;
	}

	/* ── Text ── */
	.about-text {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.about-text p {
		font-size: clamp(0.95rem, 1.4vw, 1.05rem);
		color: var(--fg-subtle);
		line-height: 1.8;
		margin: 0;
	}

	.about-text strong {
		color: var(--fg);
		font-weight: 500;
	}

	.handle {
		color: var(--fg-muted);
		font-size: 0.9em;
	}

	.text-link {
		color: var(--fg);
		text-decoration: none;
		border-bottom: 1px solid var(--border);
		transition: border-color 0.2s;
	}

	.text-link:hover {
		border-color: var(--fg-muted);
	}

	/* ── Skills ── */
	.about-skills {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.skill-group {
		display: grid;
		grid-template-columns: 6rem 1fr;
		gap: 0.5rem 1.5rem;
		align-items: start;
	}

	.skill-group-label {
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding-top: 0.15em;
	}

	.skill-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}

	.skill-list li {
		font-size: 0.875rem;
		color: var(--fg-subtle);
		line-height: 1.6;
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.about {
			padding: 6rem 1.5rem;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}
</style>
