<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { scrollTo } from '$lib/lenis.svelte.js';

	const year = new Date().getFullYear();

	function backToTop(e: MouseEvent) {
		e.preventDefault();
		scrollTo('#top', { duration: 1.6 });
	}
</script>

<footer class="footer">
	<div class="footer-inner">
		<span class="monogram">P.J.A.</span>

		<span class="copy">&copy; {personalInfo.name} — {year}</span>

		<a href="#top" class="back-top" onclick={backToTop} aria-label="Back to top">
			Back to top
			<span class="arrow" aria-hidden="true">↑</span>
		</a>
	</div>
</footer>

<style>
	.footer {
		padding: 2rem 3rem;
		border-top: 1px solid var(--border);
	}

	.footer-inner {
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.monogram {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--fg-muted);
	}

	.copy {
		font-size: 0.75rem;
		color: var(--fg-muted);
		letter-spacing: 0.02em;
	}

	.back-top {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-decoration: none;
		transition:
			color 0.2s,
			gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.back-top:hover {
		color: var(--fg);
		gap: 0.875rem;
	}

	.arrow {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.back-top:hover .arrow {
		transform: translateY(-4px);
	}

	@media (max-width: 600px) {
		.footer {
			padding: 1.75rem 1.5rem;
		}

		.copy {
			display: none;
		}
	}
</style>
