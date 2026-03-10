<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { reveal } from '$lib/actions.js';

	const links = [
		{ label: 'Email', href: personalInfo.email },
		{ label: 'GitHub', href: personalInfo.github },
		{ label: 'X / Twitter', href: personalInfo.twitter },
		{ label: 'dev.to', href: personalInfo.devTo },
		{ label: 'GitRoll', href: personalInfo.gitroll }
	];
</script>

<section class="contact" id="contact">
	<div class="contact-inner">
		<header class="section-header" use:reveal={{ direction: 'up', delay: 0, once: false }}>
			<h2 class="section-title">Contact</h2>
		</header>

		<div class="contact-body">
			<p class="cta" use:reveal={{ direction: 'up', delay: 60, once: false }}>
				Have a project in mind or just want to say hi? I'm always open to a conversation.
			</p>

			<ul class="link-list" use:reveal={{ direction: 'up', delay: 120, once: false }}>
				{#each links as link (link.label)}
					<li>
						<a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link">
							<span class="link-label">{link.label}</span>
							<span class="link-arrow" aria-hidden="true">↗</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.contact {
		padding: 8rem 3rem 10rem;
	}

	.contact-inner {
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

	.contact-body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		align-items: start;
	}

	.cta {
		font-size: clamp(0.95rem, 1.4vw, 1.05rem);
		color: var(--fg-subtle);
		line-height: 1.8;
		margin: 0;
		max-width: 380px;
	}

	/* ── Link list ── */
	.link-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.link-list li {
		border-top: 1px solid var(--border);
	}

	.link-list li:last-child {
		border-bottom: 1px solid var(--border);
	}

	.contact-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.125rem 0;
		text-decoration: none;
		color: var(--fg);
		transition: opacity 0.2s;
	}

	.link-list:has(.contact-link:hover) .contact-link:not(:hover) {
		opacity: 0.35;
	}

	.link-label {
		font-size: clamp(1rem, 2vw, 1.35rem);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.link-arrow {
		font-size: 1rem;
		color: var(--fg-muted);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			color 0.2s;
	}

	.contact-link:hover .link-arrow {
		transform: translate(3px, -3px);
		color: var(--fg);
	}

	@media (max-width: 768px) {
		.contact {
			padding: 6rem 1.5rem 7rem;
		}

		.contact-body {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.cta {
			max-width: 100%;
		}
	}
</style>
