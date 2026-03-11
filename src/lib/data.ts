import type { Experience, Project, Skill, SocialLink } from './types.js';

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
	gitroll: 'https://gitroll.io/profile/ufyicvm5WrIUMuzZsw0oDLpexgwf1',
	email: 'mailto:hello@peterjohnarao.com'
};

export const projects: Project[] = [
	{
		title: 'powertrackr',
		description: 'Track and reconcile electricity usage and payments.',
		tech: [
			'SvelteKit',
			'TypeScript',
			'Cloudflare Workers',
			'Cloudflare D1',
			'Drizzle ORM',
			'shadcn-svelte'
		],
		url: 'https://powertrackr.peterjohnarao.com',
		stars: 2,
		language: 'Svelte'
	},
	{
		title: 'hrms',
		description:
			'Our capstone project developed as an internal Human Capital Management System for the HR team of an organization to manage employees, employment history and semi-automate PDF generation of HR-related documents.',
		tech: ['SvelteKit', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'TailwindCSS', 'shadcn-svelte'],
		url: 'https://github.com/pitzzahh/hrms',
		stars: 2,
		language: 'Svelte'
	},
	{
		title: 'hris',
		description:
			'Our final project: a Java-based application for managing human resources, built with Maven for the Java NCIII final project.',
		tech: ['Java', 'Maven', 'MySQL', 'Lombok', 'JUnit', 'Mockito'],
		url: 'https://github.com/pitzzahh/hris',
		stars: 2,
		language: 'Java'
	},
	{
		title: 'heda',
		description:
			'Load scheduling, voltage drop analysis, and short circuit calculations for electrical tasks.',
		tech: ['SvelteKit', 'TypeScript', 'Tauri', 'shadcn-svelte'],
		url: 'https://github.com/pitzzahh/heda',
		stars: 6,
		language: 'Svelte'
	},

	{
		title: 'evently',
		description: 'Event attendance management with QR scanning and reporting.',
		tech: ['SvelteKit', 'TypeScript', 'Tauri', 'TailwindCSS', 'shadcn-svelte'],
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
		title: 'lrnr',
		description: 'Learning Management System API — fast, type-safe, built on Hono and Bun.',
		tech: ['TypeScript', 'Hono', 'Bun', 'OpenAPI'],
		url: 'https://github.com/pitzzahh/lrnr',
		stars: 4,
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
	},
	{
		title: 'agora-token-server',
		description:
			'This is a Spring Boot application that provides a REST API for generating Agora RTC tokens.',
		tech: ['Java', 'Spring Boot', 'Gradle', 'REST API'],
		url: 'https://github.com/pitzzahh/agora-token-server',
		stars: 2,
		language: 'Java'
	}
];

export const skills: Skill[] = [
	{ name: 'Java', category: 'language' },
	{ name: 'Svelte / SvelteKit', category: 'framework' },
	{ name: 'JS/TS', category: 'language' },
	{ name: 'Cloudflare Workers', category: 'tool' },
	{ name: 'Cloudflare Pages', category: 'tool' },
	{ name: 'Cloudflare D1', category: 'database' },
	{ name: 'Tauri', category: 'framework' },
	{ name: 'Hono', category: 'framework' },
	{ name: 'Drizzle ORM', category: 'tool' },
	{ name: 'Bun', category: 'tool' },
	{ name: 'Node.js', category: 'tool' },
	{ name: 'Vite', category: 'tool' },
	{ name: 'Git', category: 'tool' },
	{ name: 'Docker', category: 'tool' },
	{ name: 'PostgreSQL', category: 'database' },
	{ name: 'SQLite', category: 'database' },
	{ name: 'C#', category: 'language' },
	{ name: 'Python', category: 'language' }
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

export const experiencesRaw = [
	{
		company: 'HSJ Technologies OPC',
		role: 'Full Stack Developer',
		type: 'Part-time',
		start: { y: 2025, m: 1, d: 1 },
		end: null,
		location: 'Legaspi, Bicol Region, Philippines',
		skills: ['Desktop Development', 'Web Application Development', '+2 skills']
	},
	{
		company: 'BICOLIT.ORG INC.',
		role: 'Student Tech Lead',
		type: 'Apprenticeship',
		start: { y: 2024, m: 8, d: 1 },
		end: null,
		location: 'Legaspi, Bicol Region, Philippines · Hybrid',
		skills: ['Java Development', 'Web Development', '+1 skill']
	},
	{
		company: 'DepED - SDO Legazpi',
		role: 'Full Stack Developer',
		type: 'Internship',
		start: { y: 2025, m: 2, d: 1 },
		end: { y: 2025, m: 6, d: 30 },
		location: 'Legaspi, Bicol Region, Philippines',
		skills: []
	}
];

export const experiences: Experience[] = [
	{
		company: 'HSJ Technologies OPC',
		role: 'Full Stack Developer',
		type: 'Part-time',
		start: '2025-01-01',
		end: null,
		location: 'Legaspi, Bicol Region, Philippines',
		skills: ['Desktop Development', 'Web Application Development', '+2 skills'],
		url: 'https://hsjtechnologies.com'
	},
	{
		company: 'BICOLIT.ORG INC.',
		role: 'Student Tech Lead',
		type: 'Apprenticeship',
		start: '2024-08-01',
		end: null,
		location: 'Legaspi, Bicol Region, Philippines · Hybrid',
		skills: ['Java Development', 'Web Development', '+1 skill'],
		url: 'https://bicolit.org'
	},
	{
		company: 'DepED - SDO Legazpi',
		role: 'Full Stack Developer',
		type: 'Internship',
		start: '2025-02-01',
		end: '2025-06-30',
		location: 'Legaspi, Bicol Region, Philippines',
		skills: []
	}
];
