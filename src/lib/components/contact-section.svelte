<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { magnetic, reveal } from '$lib/hooks/actions.js';
</script>

<section class="section" id="contact">
	<div class="container cta-wrap">
		<p class="eyebrow num" use:reveal>05</p>
		<h2 use:reveal={60}>Get in touch</h2>
		<p class="lead" use:reveal={120}>
			Have a project in mind or just want to say hi? I'm always open to a conversation.
		</p>
		<div use:reveal={180} style="margin-top:30px">
			<a class="btn btn-primary" use:magnetic href="mailto:{personalInfo.email}"
				>{personalInfo.email}</a
			>
		</div>
		<div class="cta-links" use:reveal={240}>
			<a href="https://github.com/pitzzahh" target="_blank" rel="noopener noreferrer"
				>GitHub <span>↗</span></a
			>
			<a href={personalInfo.gitroll} target="_blank" rel="noopener noreferrer"
				>GitRoll <span>↗</span></a
			>
			<a href={personalInfo.devTo} target="_blank" rel="noopener noreferrer"
				>dev.to <span>↗</span></a
			>
		</div>
	</div>
</section>

<style>
	.cta-wrap {
		text-align: center;
		max-width: 640px;
		margin-inline: auto;
	}
	.cta-wrap .lead {
		margin: 0 auto;
	}
	.cta-wrap h2 {
		font-size: clamp(42px, 6vw, 76px);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.04;
		margin: 18px 0 16px;
	}
	.cta-links {
		display: flex;
		justify-content: center;
		gap: 10px 28px;
		flex-wrap: wrap;
		margin-top: 34px;
	}
	.cta-links a {
		font-family: var(--font-display);
		font-size: clamp(18px, 2.4vw, 25px);
		font-weight: 650;
		letter-spacing: -0.02em;
		display: inline-flex;
		gap: 8px;
		align-items: baseline;
		padding: 10px 4px;
	}
	.cta-links a span {
		color: var(--muted);
		font-weight: 400;
		display: inline-block;
		transition:
			transform 0.3s var(--ease-out),
			color 0.2s;
	}
	.cta-links a:hover span {
		transform: translate(3px, -3px);
		color: var(--accent);
	}
</style>
