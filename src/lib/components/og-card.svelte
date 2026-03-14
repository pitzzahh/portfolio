<svelte:options css="injected" />

<script module lang="ts">
	type OgCardType = {
		title: string;
		subtitle: string;
	};
</script>

<script lang="ts">
	import { personalInfo } from '$lib/data';
	let { title, subtitle }: OgCardType = $props();
</script>

<div class="card" role="img" aria-label="{title} — {subtitle}">
	<div class="overlay" style="display: flex;"></div>
	<div class="content">
		<header class="header">
			<div class="brand">
				<img
					src="https://github.com/pitzzahh.png"
					width="64"
					height="64"
					alt="{personalInfo.name} logo"
					class="logo"
				/>
				<div class="brand-text" role="heading" aria-level="1">
					<span class="brand-title">Contact 👋</span>
					<span class="brand-subtitle">{personalInfo.email.replace('mailto:', '')}</span>
				</div>
			</div>
		</header>

		<main class="body">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</main>
	</div>
</div>

<style>
	/* Explicit tokens used so server-side OG rendering matches the live site */
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	/* Site tokens (dark theme defaults from layout.css) */
	/* --bg:       #0c0c0c
	   --fg:       #e8e8e8
	   --fg-muted: #999
	   --fg-subtle: #b0b0b0
	*/

	.card {
		position: relative;
		width: 1200px; /* matches OG image width from server */
		height: 630px; /* matches OG image height from server */
		display: flex;
		background-color: #0c0c0c; /* site background */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		/* Use Inter as primary font — Inter is registered/loaded by the OG server (+server.ts) */
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
	}

	.overlay {
		position: absolute;
		inset: 0;
		/* subtle dark overlay to ensure text contrast similar to the site */
		background: linear-gradient(120deg, rgba(12, 12, 12, 0.9), rgba(12, 12, 12, 0.15));
	}

	.content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
		padding: 64px;
		color: #e8e8e8; /* site fg */
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	.header {
		display: flex;
		gap: 24px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.logo {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}

	.brand-title {
		font-size: 28px;
		font-weight: 700;
		letter-spacing: 0.06em;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
		color: #e8e8e8;
	}

	.brand-subtitle {
		margin-top: 4px;
		font-size: 12px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: #999; /* site fg-muted */
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	h1 {
		margin: 0;
		font-size: 56px;
		line-height: 1.05;
		font-weight: 700;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
		color: #e8e8e8;
		/* ensure long titles wrap nicely */
		word-wrap: break-word;
		max-width: 100%;
	}

	p {
		margin: 0;
		font-size: 24px;
		color: #b0b0b0; /* site fg-subtle */
		max-width: 1000px;
	}

	/* Make sure the component scales reasonably if other sizes are used */
	@media (max-width: 1200px) {
		.card {
			width: 100%;
			height: auto;
		}
	}
</style>
