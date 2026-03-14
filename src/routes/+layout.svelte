<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/nav.svelte';
	import { useLenis } from '$lib/lenis.svelte.js';
	import { scrollY } from 'svelte/reactivity/window';
	import site from '$lib/site';

	let { children } = $props();

	useLenis();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<meta name="author" content={site.author} />
	<meta name="keywords" content={site.keywords.join(', ')} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:locale" content={site.locale} />
</svelte:head>

<Nav scrollY={scrollY.current ?? 0} />

<main>
	{@render children()}
</main>
