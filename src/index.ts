// @ts-ignore
import homeHtml from './index.html';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const acceptHeader = request.headers.get('Accept');

		// Accept html
		if (acceptHeader?.includes('text/html')) {
			return new Response(homeHtml, {
				headers: {
					'Content-Type': 'text/html',
				},
			});
		}

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
