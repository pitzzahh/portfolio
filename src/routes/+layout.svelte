<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/nav.svelte';
	import { initLenis } from '$lib/hooks/controller.svelte';
	import site from '$lib/site';

	let { children } = $props();

	$effect(() => initLenis());
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<meta name="author" content={site.author} />
	<meta name="keywords" content={site.keywords.join(', ')} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:locale" content={site.locale} />
	<script>
		try {
			var s = localStorage.getItem('pja-theme');
			if (s === 'light' || s === 'dark') document.documentElement.setAttribute('data-theme', s);
			else if (window.matchMedia('(prefers-color-scheme: light)').matches)
				document.documentElement.setAttribute('data-theme', 'light');
			else document.documentElement.setAttribute('data-theme', 'dark');
		} catch (e) {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	</script>
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>
