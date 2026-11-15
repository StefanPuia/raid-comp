import { IconProvider } from '#lib/versioning/IconProvider.ts';

export class ForeverIconProvider extends IconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('inv_hammer_unique_sulfuras', size);
	}
}
