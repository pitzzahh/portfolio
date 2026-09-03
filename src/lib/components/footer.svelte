<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { scrollTo } from '$lib/hooks/controller.svelte';

	const year = new Date().getFullYear();

	function backToTop(e: MouseEvent) {
		e.preventDefault();
		scrollTo('#top', { duration: 1.6 });
	}
</script>

<footer class="pagefoot">
	<div class="container row">
		<span>© {year} {personalInfo.name} · Legazpi, Bicol</span>
		<span class="meta"><a class="totop" href="#top" onclick={backToTop}>Back to top ↑</a></span>
	</div>
</footer>

<style>
	.pagefoot {
		padding-block: 34px;
		border-top: 1px solid var(--border);
		color: var(--muted);
		font-size: 13px;
	}
	.pagefoot .row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}
	.totop {
		transition: color 0.15s ease;
	}
	.totop:hover {
		color: var(--fg);
	}
</style>
