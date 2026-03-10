import type { Project, Skill, SocialLink } from './types.js';

export const personalInfo = {
	name: 'Peter John Arao',
	handle: 'pitzzahh',
	role: 'Full-Stack Developer',
	location: 'Bicol, Philippines',
	bio: 'I build things for the web — and sometimes the desktop. Focused on clean architecture, great developer experience, and software that actually solves problems.',
	currentProject: 'powertrackr',
	devTo: 'https://dev.to/pitzzahh',
	twitter: 'https://x.com/araopjcode',
	github: 'https://github.com/pitzzahh',
	gitroll: 'https://gitroll.io/profile/ufyicvm5WrIUMuzZsw0oDLpexgwf1'
};

export const projects: Project[] = [
	{
		title: 'powertrackr',
		description: 'Track and reconcile electricity usage and payments.',
		tech: ['TypeScript', 'SvelteKit', 'Tauri'],
		url: 'https://github.com/pitzzahh/powertrackr',
		stars: 2,
		language: 'TypeScript'
	},
	{
		title: 'heda',
		description:
			'Load scheduling, voltage drop analysis, and short circuit calculations for electrical tasks.',
		tech: ['Svelte', 'TypeScript'],
		url: 'https://github.com/pitzzahh/heda',
		stars: 6,
		language: 'Svelte'
	},
	{
		title: 'lrnr',
		description: 'Learning Management System API — fast, type-safe, built on Hono and Bun.',
		tech: ['TypeScript', 'Hono', 'Bun', 'OpenAPI'],
		url: 'https://github.com/pitzzahh/lrnr',
		stars: 4,
		language: 'TypeScript'
	},
	{
		title: 'evently',
		description: 'Event attendance management with QR scanning and reporting.',
		tech: ['Svelte', 'TypeScript'],
		url: 'https://github.com/pitzzahh/evently',
		stars: 1,
		language: 'Svelte'
	},
	{
		title: 'signaldb-adapter-tauri',
		description: 'SignalDB persistence adapter for Tauri apps with optional encryption.',
		tech: ['TypeScript', 'Tauri', 'SignalDB'],
		url: 'https://github.com/pitzzahh/signaldb-adapter-tauri',
		stars: 2,
		language: 'TypeScript'
	},
	{
		title: 'pdf-to-md-api',
		description:
			'FastAPI service converting PDFs to Markdown, JSON, or HTML with OCR and optional LLM.',
		tech: ['Python', 'FastAPI'],
		url: 'https://github.com/pitzzahh/pdf-to-md-api',
		stars: 2,
		language: 'Python'
	}
];

export const skills: Skill[] = [
	{ name: 'TypeScript', category: 'language' },
	{ name: 'Python', category: 'language' },
	{ name: 'Java', category: 'language' },
	{ name: 'Svelte / SvelteKit', category: 'framework' },
	{ name: 'Hono', category: 'framework' },
	{ name: 'FastAPI', category: 'framework' },
	{ name: 'Tauri', category: 'framework' },
	{ name: 'Bun', category: 'tool' },
	{ name: 'Node.js', category: 'tool' },
	{ name: 'Vite', category: 'tool' },
	{ name: 'Git', category: 'tool' },
	{ name: 'Docker', category: 'tool' },
	{ name: 'PostgreSQL', category: 'database' },
	{ name: 'SQLite', category: 'database' },
	{ name: 'Drizzle ORM', category: 'database' }
];

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', href: 'https://github.com/pitzzahh', icon: 'github' },
	{ label: 'dev.to', href: 'https://dev.to/pitzzahh', icon: 'devto' },
	{ label: 'X / Twitter', href: 'https://x.com/araopjcode', icon: 'twitter' },
	{
		label: 'GitRoll',
		href: 'https://gitroll.io/profile/ufyicvm5WrIUMuzZsw0oDLpexgwf1',
		icon: 'gitroll'
	}
];
