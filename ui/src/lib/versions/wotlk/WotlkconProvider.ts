import { IconProvider } from '$lib/versioning/IconProvider';

export class WotlkIconProvider extends IconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('expansionicon_wrathofthelichking', size);
	}
}
