export interface Project {
	title: string;
	description: string;
	tech: string[];
	url: string;
	stars?: number;
	language: string;
}

export interface Skill {
	name: string;
	category: 'language' | 'framework' | 'tool' | 'database';
}

export interface SocialLink {
	label: string;
	href: string;
	icon: string;
}
