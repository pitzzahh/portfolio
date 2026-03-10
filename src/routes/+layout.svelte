<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/nav.svelte';
	import { useLenis } from '$lib/lenis.svelte.js';
	import { scrollY } from 'svelte/reactivity/window';
	import site from '$lib/site';

	let { children } = $props();

	useLenis();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="author" content="Peter John Arao" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@araopjcode" />
</svelte:head>

<Nav scrollY={scrollY.current ?? 0} />

<main>
	{@render children()}
</main>
