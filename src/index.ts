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
		region: request.cf?.region,
		timezone: request.cf?.timezone,
		latitude: request.cf?.latitude,
		longitude: request.cf?.longitude,
		clientTcpRtt: request.cf?.clientTcpRtt,
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
		console.log(request);
		const acceptHeader = request.headers.get('Accept');

		// Accept html
		if (acceptHeader?.includes('text/html')) {
			return getHtml();
		}

		return getGeo(request);
	},
} satisfies ExportedHandler<Env>;
