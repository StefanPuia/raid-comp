import { GameVersion, GameVersionSlug } from '$lib/versioning/GameVersion';
import { versionSource } from './source';

export class MidnightGameVersion extends GameVersion {
	constructor() {
		super(versionSource);
	}

	getSlug(): GameVersionSlug {
		return GameVersionSlug.LIVE;
	}
}
