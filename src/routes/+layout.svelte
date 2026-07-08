<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/nav.svelte';
	import { initLenis } from '$lib/hooks/controller.svelte';
	import { scrollY } from 'svelte/reactivity/window';
	import site from '$lib/site';
	import { onMount } from 'svelte';

	let { children } = $props();

	$effect(() => initLenis());

	let theme = $state<'light' | 'dark'>('dark');

	onMount(() => {
		const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
		theme = prefersLight ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme(e: KeyboardEvent) {
		if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
			theme = theme === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', theme);
		}
	}
</script>

<svelte:window onkeydown={toggleTheme} />

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
