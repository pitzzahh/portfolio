<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/nav.svelte';
	import { initLenis } from '$lib/hooks/controller.svelte';
	import { scrollY } from 'svelte/reactivity/window';
	import site from '$lib/site';
	import { onMount } from 'svelte';

	let { children } = $props();

	let theme = $state<'light' | 'dark'>('dark');
	let manualOverride = $state(false);

	function toggleTheme(e: KeyboardEvent) {
		if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
			manualOverride = true;
			theme = theme === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	$effect(() => initLenis());

	onMount(() => {
		const mq = window.matchMedia('(prefers-color-scheme: light)');

		function onThemeChange(e: MediaQueryListEvent) {
			if (manualOverride) return;
			theme = e.matches ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', theme);
		}

		// Apply initial system preference
		onThemeChange({ matches: mq.matches } as MediaQueryListEvent);

		// React to system theme changes (mobile auto-switch, etc.)
		mq.addEventListener('change', onThemeChange);

		return () => mq.removeEventListener('change', onThemeChange);
	});
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
