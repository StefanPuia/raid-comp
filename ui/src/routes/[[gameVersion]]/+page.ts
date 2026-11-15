import type { PageLoad } from './$types';
import { validateVersion } from '#lib/versioning/validate.ts';

export const load: PageLoad = async ({ parent }) => {
	return {
		...(await parent()),
		gameVersion: validateVersion(),
	};
};
