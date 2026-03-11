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

export type Experience = {
	company: string;
	role: string;
	type: string;
	start: string;
	end?: string | null;
	location?: string;
	skills?: string[];
	url?: string;
	thumbnail?: string;
};
