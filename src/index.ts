// @ts-ignore
import HOME_HTML from './index.html';

import { DEFAULT_HEADERS } from './config';
import { countryCodeToFlagEmoji } from './utils/countryFlag';

function getHtml(): Response {
	return new Response(HOME_HTML, {
		headers: {
			...DEFAULT_HEADERS,
			'Content-Type': 'text/html',
		},
	});
}

function getGeo(request: Request): Response {
	const country = request.cf?.country as string | null;
	const countryFlag = country ? countryCodeToFlagEmoji(country) : null;

	const data = {
		country,
		countryFlag,
		city: request.cf?.city,
		region: request.cf?.region,
		continent: request.cf?.continent,
		regionCode: request.cf?.regionCode,
		postalCode: request.cf?.postalCode,
		metroCode: request.cf?.metroCode,

		latitude: request.cf?.latitude,
		longitude: request.cf?.longitude,
		timezone: request.cf?.timezone,

		colo: request.cf?.colo,
		clientTcpRtt: request.cf?.clientTcpRtt,
		asOrganization: request.cf?.asOrganization,

		ip: request.headers.get('cf-connecting-ip'),
	};

	return Response.json(data, {
		headers: {
			...DEFAULT_HEADERS,
		},
	});
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const acceptHeader = request.headers.get('Accept');

		// Accept html
		if (acceptHeader?.includes('text/html')) {
			return getHtml();
		}

		return getGeo(request);
	},
} satisfies ExportedHandler<Env>;
