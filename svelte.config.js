import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { getNodeMajorVersion } from 'typescript'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter(),
		trailingSlash: 'never',
	},
}

export default config
