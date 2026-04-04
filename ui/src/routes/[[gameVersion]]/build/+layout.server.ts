import type { LayoutServerLoad } from './$types';
import { validateVersion } from '$lib/versioning/validate';
import { getBuild } from '$lib/service/api';
import { ApiError } from '$lib/service/error';

export const load: LayoutServerLoad = async ({ parent, params, setHeaders }) => {
	await parent();

	let build;
	let error;
	if (params.buildId) {
		try {
			build = (await getBuild(params.buildId)).data;
		} catch (err) {
			if (err instanceof ApiError) {
				error = err.serialize();
			} else {
				console.error(err);
			}
		}
	}

	if (!error) {
		setHeaders({
			'cache-control': 'public, max-age=3600',
		});
	}

	return {
		gameVersion: validateVersion(params.gameVersion),
		build,
		error,
	};
};
