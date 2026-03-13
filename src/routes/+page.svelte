<script lang="ts">
	import HeroSection from '$lib/components/hero-section.svelte';
	import ProjectSection from '$lib/components/project-section.svelte';
	import Marquee from '$lib/components/marquee.svelte';
	import ExperienceSection from '$lib/components/exp-section.svelte';
	import AboutSection from '$lib/components/about-section.svelte';
	import ContactSection from '$lib/components/contact-section.svelte';
	import Footer from '$lib/components/footer.svelte';
	import site from '$lib/site';
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta property="og:locale" content={site.locale} />
	<meta name="description" content={site.description} />
	<link rel="canonical" href="{site.url}/" />
	<meta name="theme-color" content="#0c0c0c" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:url" content="{site.url}/" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:image" content="{site.url}/og/home.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{site.title} backdrop" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="{site.url}/" />
	<meta name="twitter:title" content={site.title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content="{site.url}/og/home.png" />
	<meta name="twitter:image:alt" content="{site.title} backdrop" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<HeroSection />
<ExperienceSection />
<Marquee />
<ProjectSection />
<AboutSection />
<ContactSection />
<Footer />
