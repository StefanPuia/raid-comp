import type { LayoutLoad } from './$types';
import { ApiError } from '#lib/service/error.ts';

export const load: LayoutLoad = async ({ parent, data }) => {
	await parent();
	return {
		...data,
		error: data.error ? ApiError.deserialize(data.error) : undefined,
	};
};
