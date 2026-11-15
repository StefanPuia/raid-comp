import { IconProvider } from '#lib/versioning/IconProvider.ts';

export class DragonflightIconProvider extends IconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('achievement_dungeon_coablackdragonflight_heroic', size);
	}
}
