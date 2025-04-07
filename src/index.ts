// @ts-ignore
import HOME_HTML from './index.html';

import { DEFAULT_HEADERS } from './config';

function getHtml(): Response {
	return new Response(HOME_HTML, {
		headers: {
			...DEFAULT_HEADERS,
			'Content-Type': 'text/html',
		},
	});
}

function getGeo(request: Request): Response {
	const data = {};
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
