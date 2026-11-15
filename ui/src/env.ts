import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_MOCKS_ENABLED: { public: true, static: true },
	PUBLIC_API_BASE_PATH: { public: true, static: true },
	PUBLIC_TURNSTILE_SITE_KEY: { public: true, static: true },
});
