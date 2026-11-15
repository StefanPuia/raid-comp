import { IconProvider } from '#lib/versioning/IconProvider.ts';

export class MidnightIconProvider extends IconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('inv_cosmicvoid_groundstate', size);
	}
}
