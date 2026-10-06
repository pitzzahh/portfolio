<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { magnetic, reveal } from '#lib/hooks/actions.js';
	import site from '#lib/site.js';

	const status = $derived(page.status ?? 500);
	const rawMessage = $derived(page.error?.message?.trim() || '');
	const path = $derived(page.url?.pathname || '/');

	const is404 = $derived(status === 404);

	const copy = $derived.by(() => {
		if (status === 404)
			return {
				kicker: '404 · Not found',
				title: 'Lost in transit.',
				lead: 'That page is gone. It moved or never existed. Go home and start over.'
			};
		if (status === 403)
			return {
				kicker: '403 · Forbidden',
				title: 'Off limits.',
				lead: "You can't open this route. If that seems wrong, go back and try another link."
			};
		if (status === 429)
			return {
				kicker: '429 · Too many requests',
				title: 'Slow down a touch.',
				lead: 'Rate limiting kicked in. Wait a moment, then retry. The site is not going anywhere.'
			};
		if (status >= 500)
			return {
				kicker: `${status} · Server hiccup`,
				title: 'Something broke.',
				lead: 'My code broke here. Reload the page. If it still fails, ping me and I will fix it.'
			};
		return {
			kicker: `${status} · Something went sideways`,
			title: 'Unexpected detour.',
			lead: 'This route threw an error instead of a page. Head home and pick up where you left off.'
		};
	});

	function goBack() {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			window.history.back();
		} else {
			goto(resolve('/'));
		}
	}

	function retry() {
		if (typeof window !== 'undefined') window.location.reload();
	}
</script>

<svelte:head>
	<title>{status} - {is404 ? 'Page not found' : 'Something went wrong'} · {site.title}</title>
	<meta
		name="description"
		content={is404
			? 'That page does not exist. Go to the homepage or browse selected work.'
			: `Something failed (${status}). Go to the homepage.`}
	/>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="theme-color" content="#0d1013" />
</svelte:head>

<section class="section err" aria-labelledby="err-title">
	<span class="ghost num" aria-hidden="true">{status}</span>
	<div class="container err-inner">
		<p class="pill" use:reveal><span class="dot"></span>{copy.kicker}</p>

		<h1 id="err-title">
			<span class="mask"><span class="code num">{status}</span></span>
			<span class="mask"><span class="thin">{copy.title}</span></span>
		</h1>

		<div class="err-sub">
			<div>
				<p class="lead" use:reveal={80}>{copy.lead}</p>
				<div class="err-cta" use:reveal={140}>
					<a
						class="btn btn-primary"
						use:magnetic
						href={resolve('/')}
						data-sveltekit-preload-data="hover">Back to home</a
					>
					{#if status >= 500}
						<button class="btn btn-secondary" type="button" onclick={retry}>Reload page</button>
					{:else}
						<button class="btn btn-secondary" type="button" onclick={goBack}>Go back</button>
					{/if}
				</div>

				<dl class="detail" use:reveal={200} aria-label="Error details">
					<div>
						<dt class="meta">PATH</dt>
						<dd class="meta num path">{path}</dd>
					</div>
					<div>
						<dt class="meta">STATUS</dt>
						<dd class="meta num">{status}</dd>
					</div>
					{#if rawMessage && rawMessage.toLowerCase() !== 'not found'}
						<div>
							<dt class="meta">DETAIL</dt>
							<dd class="meta">{rawMessage}</dd>
						</div>
					{/if}
				</dl>
			</div>

			<nav class="shortcuts" use:reveal={240} aria-label="Where to next">
				<p class="meta">WHERE TO NEXT</p>
				<ul>
					<li>
						<a href={resolve('/#work')}>Selected work <span aria-hidden="true">→</span></a>
					</li>
					<li>
						<a href={resolve('/#stack')}>Stack <span aria-hidden="true">→</span></a>
					</li>
					<li>
						<a href={resolve('/#about')}>About <span aria-hidden="true">→</span></a>
					</li>
					<li>
						<a href={resolve('/#contact')}>Contact <span aria-hidden="true">→</span></a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</section>

<style>
	.err {
		min-height: 100svh;
		display: flex;
		align-items: flex-end;
		padding: 9rem 0 4.5rem;
		overflow: clip;
		position: relative;
	}
	.ghost {
		position: absolute;
		right: -0.06em;
		top: 3.5rem;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(160px, 28vw, 420px);
		line-height: 1;
		letter-spacing: -0.04em;
		color: transparent;
		-webkit-text-stroke: 1px var(--border);
		opacity: 0.9;
		pointer-events: none;
		user-select: none;
	}
	.err-inner {
		position: relative;
		width: 100%;
	}
	.mask {
		overflow: hidden;
		display: block;
		padding-bottom: 0.09em;
		margin-bottom: -0.09em;
	}
	.mask > span {
		display: block;
		transform: translateY(115%);
		animation: rise 1s var(--ease-out) forwards;
	}
	.mask:nth-child(2) > span {
		animation-delay: 0.08s;
	}
	@keyframes rise {
		to {
			transform: translateY(0);
		}
	}
	.err h1 {
		font-size: var(--fs-h1);
		line-height: 1.04;
		letter-spacing: -0.022em;
		margin: 22px 0 18px;
		font-weight: 700;
	}
	.err h1 .code {
		font-variant-numeric: tabular-nums;
	}
	.err h1 .thin {
		color: var(--muted);
		font-weight: 400;
		font-style: italic;
		font-size: clamp(34px, 6vw, 72px);
		letter-spacing: -0.02em;
	}
	.err-sub {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: var(--gap-xl);
		align-items: start;
		margin-top: 8px;
	}
	.err-sub .lead {
		max-width: 52ch;
	}
	.err-cta {
		display: flex;
		gap: var(--gap-sm);
		margin-top: 30px;
		flex-wrap: wrap;
	}
	.detail {
		margin: 34px 0 0;
		padding: 0;
		display: grid;
		gap: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
		max-width: 560px;
		overflow: hidden;
	}
	.detail > div {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 18px;
	}
	.detail > div + div {
		border-top: 1px solid var(--border);
	}
	.detail dt {
		flex-shrink: 0;
		letter-spacing: 0.08em;
	}
	.detail dd {
		margin: 0;
		text-align: right;
		overflow-wrap: anywhere;
	}
	.detail .path {
		max-width: 32ch;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.shortcuts {
		border-top: 1px solid var(--border);
		padding-top: 18px;
		justify-self: end;
		width: 100%;
		max-width: 320px;
	}
	.shortcuts p {
		margin: 0 0 6px;
		letter-spacing: 0.08em;
	}
	.shortcuts ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.shortcuts li {
		border-bottom: 1px solid var(--border);
	}
	.shortcuts li:first-child {
		border-top: 1px solid var(--border);
	}
	.shortcuts a {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 13px 2px;
		font-family: var(--font-display);
		font-size: 19px;
		font-weight: 600;
		letter-spacing: -0.015em;
	}
	.shortcuts a span {
		color: var(--muted);
		font-weight: 400;
		transition:
			transform 0.2s var(--ease-out),
			color 0.2s;
	}
	.shortcuts a:hover span {
		transform: translateX(4px);
		color: var(--accent);
	}
	@media (max-width: 920px) {
		.err {
			padding-top: 7rem;
		}
		.err-sub {
			grid-template-columns: 1fr;
		}
		.shortcuts {
			justify-self: start;
			max-width: none;
		}
		.ghost {
			top: 4.5rem;
			opacity: 0.6;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.mask > span {
			transform: none;
			animation: none;
		}
	}
</style>
