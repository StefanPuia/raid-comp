import { IconProvider } from '$lib/versioning/IconProvider';

export class DragonflightIconProvider extends IconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('achievement_dungeon_coablackdragonflight_heroic', size);
	}
}
