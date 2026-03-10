import type { AppTypes } from '$app/types';
import site from '$lib/site.js';
import { personalInfo } from './data';

export type OgEntry = {
	route: ReturnType<AppTypes['RouteId']>;
	slug: string;
	title: string;
	subtitle: string;
};

export const ogEntries: OgEntry[] = [
	{
		route: '/',
		slug: 'home',
		title: personalInfo.name,
		subtitle: site.description
	}
];

export const ogEntriesBySlug = Object.fromEntries(ogEntries.map((entry) => [entry.slug, entry]));
