<script lang="ts">
	import { experiences, personalInfo } from '$lib/data.js';
	import { reveal } from '$lib/hooks/actions.js';

	const years = new Date().getFullYear() - 2020;
</script>

<section class="section" id="about">
	<div class="container">
		<p class="eyebrow num" use:reveal>04</p>
		<h2 class="h2" use:reveal={60}>About</h2>
		<div class="about-grid">
			<div use:reveal={120}>
				<p>
					Hi, I'm <strong>{personalInfo.name}</strong> (<strong>@{personalInfo.handle}</strong>
					online), based in Legazpi, Bicol.
				</p>
				<p>
					Daily stack is <strong>TypeScript + SvelteKit</strong>, strong Java underneath,
					comfortable across REST APIs and Tauri desktops. Right now I am building
					<strong>{personalInfo.currentProject}</strong>, an electricity usage and payment tracker.
				</p>
				<p>I contribute to open source and enjoy production problems end to end.</p>
			</div>
			<div>
				<div class="stat" use:reveal={140}>
					<b class="num">98<span class="u">+</span></b><span>public repos on GitHub</span>
				</div>
				<div class="stat" use:reveal={200}>
					<b class="num">{years}<span class="u">yrs</span></b><span>building since 2020</span>
				</div>
				<div class="stat" use:reveal={260}>
					<b class="num">{String(experiences.length).padStart(2, '0')}</b><span
						>roles across product & internships</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: var(--gap-xl);
		align-items: start;
		margin-top: 30px;
	}
	.about-grid p {
		color: var(--muted);
		line-height: 1.75;
		margin: 0 0 18px;
	}
	.about-grid strong {
		color: var(--fg);
		font-weight: 600;
	}
	.stat {
		border-top: 1px solid var(--border);
		padding: 20px 0;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}
	.stat b {
		font-family: var(--font-display);
		font-size: clamp(46px, 5vw, 66px);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1;
		font-variant-numeric: lining-nums;
	}
	.stat b .u {
		font-size: 0.45em;
		color: var(--muted);
		font-weight: 500;
	}
	.stat span {
		color: var(--muted);
		font-size: 13.5px;
		max-width: 22ch;
		text-align: right;
	}
	@media (max-width: 920px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
