import { error } from '@sveltejs/kit';
import type { GameVersion } from '$lib/versioning/GameVersion';
import { GameVersionSlug } from '$lib/versioning/GameVersion';
import type { IconProvider } from '$lib/versioning/IconProvider';
import type { VersionedContext } from '$lib/versioning/VersionedContext';
import { WotlkGameVersion } from '$lib/versions/wotlk/WotlkGameVersion';
import { WotlkIconProvider } from '$lib/versions/wotlk/WotlkconProvider';
import { DragonflightIconProvider } from '$lib/versions/dragonflight/DragonflightIconProvider';
import { MidnightIconProvider } from '$lib/versions/midnight/MidnightIconProvider';
import { DragonflightGameVersion } from '$lib/versions/dragonflight/DragonflightGameVersion';
import { MidnightGameVersion } from '$lib/versions/midnight/MidnightGameVersion';

export class GameVersionFactory {
	static createIconProvider(gameVersion: GameVersionSlug): IconProvider {
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new MidnightIconProvider();
			case GameVersionSlug.DRAGONFLIGHT:
				return new DragonflightIconProvider();
			case GameVersionSlug.WOTLK:
				return new WotlkIconProvider();
			default:
				throw error(400, 'Game version not supported');
		}
	}

	static createGameVersion(gameVersion: GameVersionSlug): GameVersion {
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new MidnightGameVersion();
			case GameVersionSlug.DRAGONFLIGHT:
				return new DragonflightGameVersion();
			case GameVersionSlug.WOTLK:
				return new WotlkGameVersion();
			default:
				throw error(400, 'Game version not supported');
		}
	}

	static getDefaultContext(): VersionedContext {
		return {
			iconProvider: GameVersionFactory.createIconProvider(GameVersionSlug.LIVE),
			gameVersion: GameVersionFactory.createGameVersion(GameVersionSlug.LIVE),
		};
	}

	static getContext(gameVersion: GameVersionSlug): VersionedContext {
		return {
			iconProvider: GameVersionFactory.createIconProvider(gameVersion),
			gameVersion: GameVersionFactory.createGameVersion(gameVersion),
		};
	}
}
