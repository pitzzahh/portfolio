<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/nav.svelte';
	import { useLenis } from '$lib/lenis.svelte.js';
	import { scrollY } from 'svelte/reactivity/window';

	let { children } = $props();

	useLenis();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Peter John Arao — Full-Stack Developer</title>
	<meta
		name="description"
		content="Full-stack developer from Bicol, Philippines. Building clean, efficient software with SvelteKit, TypeScript, and modern web technologies."
	/>
	<meta name="author" content="Peter John Arao" />
	<meta property="og:title" content="Peter John Arao — Full-Stack Developer" />
	<meta
		property="og:description"
		content="Full-stack developer from Bicol, Philippines. Building clean, efficient software with SvelteKit, TypeScript, and modern web technologies."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@araopjcode" />
</svelte:head>

<Nav scrollY={scrollY.current ?? 0} />

<main>
	{@render children()}
</main>
