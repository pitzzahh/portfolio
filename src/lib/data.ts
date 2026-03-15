import type { Experience, Project, Skill, SocialLink } from './types.js';

export const personalInfo = {
	name: 'Peter John Arao',
	handle: 'pitzzahh',
	role: 'Full-Stack Developer',
	location: 'Bicol, Philippines',
	bio: 'Since 2020 I’ve worked across Java, modern frontend stacks, and desktop tooling. I design and implement responsive, high‑performance user interfaces and server APIs, and I’ve contributed to HR systems, utility apps (powertrackr), and several marketing sites. My priorities are security, maintainability, clear APIs, and shipping value — from database design and ORM integration to selecting the right deployment and delivery approach based on project requirements. I contribute to open‑source and enjoy solving production problems end‑to‑end.',
	currentProject: 'powertrackr',
	devTo: 'https://dev.to/pitzzahh',
	twitter: 'https://x.com/araopjcode',
	github: 'https://github.com/pitzzahh',
	gitroll: 'https://gitroll.io/profile/ufyicvm5WrIUMuzZsw0oDLpexgwf1',
	email: 'hello@peterjohnarao.com'
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
		title: 'Mayon Golf Course',
		description:
			'Part-time front-end work on the public site: implemented layouts, integrated content, and improved performance and cross-device behavior.',
		tech: ['SvelteKit', 'TypeScript', 'TailwindCSS'],
		url: 'https://mayongolfcourse.com',
		stars: 0,
		language: 'Svelte'
	},
	{
		title: 'SparkPoint',
		description: 'Front-end/UX work on the public marketing site and landing pages.',
		tech: ['NextJS', 'TailwindCSS'],
		url: 'https://sparkpoint.io',
		stars: 0,
		language: 'NextJS'
	},
	{
		title: 'IgniteTax AI',
		description: 'Front-end development and UI implementation for the product marketing site.',
		tech: ['NextJS', 'TailwindCSS'],
		url: 'https://www.ignitetax.ai',
		stars: 0,
		language: 'NextJS'
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
			'Spring Boot application that provides a REST API for generating Agora RTC tokens.',
		tech: ['Java', 'Spring Boot', 'Gradle', 'REST API'],
		url: 'https://github.com/pitzzahh/agora-token-server',
		stars: 2,
		language: 'Java'
	}
];

export const skills: Skill[] = [
	{ name: 'Java', category: 'language' },
	{ name: 'Spring', category: 'framework' },
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
	{ name: 'Vitest', category: 'tool' },
	{ name: 'TestingLibrary', category: 'tool' }
];

export const socialLinks: SocialLink[] = [
	{ label: 'Email', href: `mailto:${personalInfo.email}`, icon: 'email' },
	{ label: 'GitHub', href: 'https://github.com/pitzzahh', icon: 'github' },
	{
		label: 'GitRoll',
		href: 'https://gitroll.io/profile/ufyicvm5WrIUMuzZsw0oDLpexgwf1',
		icon: 'gitroll'
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
		skills: [
			'Desktop Development',
			'Web Application Development',
			'SpringBoot Development',
			'Flutter Development'
		],
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
		company: 'ALPHA CENTAURI GARMENTS CORPORATION',
		role: 'Web Developer',
		type: 'Internship',
		start: '2026-01-20',
		end: '2026-02-09',
		location: '117 Mo Ignacia Ave. Quezon City',
		skills: ['NextJS', 'Redux', 'TailwindCSS', 'Neon DB']
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
