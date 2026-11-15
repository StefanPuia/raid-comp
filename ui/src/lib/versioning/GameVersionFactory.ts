import { error } from '@sveltejs/kit';
import type { GameVersion } from '$lib/versioning/GameVersion';
import { GameVersionSlug } from '$lib/versioning/GameVersion';
import type { IconProvider } from '$lib/versioning/IconProvider';
import type { VersionedContext } from '$lib/versioning/VersionedContext';
import { DragonflightIconProvider } from '$lib/versions/dragonflight/DragonflightIconProvider';
import { MidnightIconProvider } from '$lib/versions/midnight/MidnightIconProvider';
import { DragonflightGameVersion } from '$lib/versions/dragonflight/DragonflightGameVersion';
import { MidnightGameVersion } from '$lib/versions/midnight/MidnightGameVersion';
import { ForeverIconProvider } from '$lib/versions/forever/ForeverIconProvider';
import { ForeverGameVersion } from '$lib/versions/forever/ForeverGameVersion';

export class GameVersionFactory {
	static createIconProvider(gameVersion: GameVersionSlug): IconProvider {
		console.log('Creating icon provider for game version:', gameVersion);
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new MidnightIconProvider();
			case GameVersionSlug.DRAGONFLIGHT:
				return new DragonflightIconProvider();
			case GameVersionSlug.FOREVER:
				return new ForeverIconProvider();
			default:
				throw error(400, `Game version ${gameVersion} not supported`);
		}
	}

	static createGameVersion(gameVersion: GameVersionSlug): GameVersion {
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new MidnightGameVersion();
			case GameVersionSlug.DRAGONFLIGHT:
				return new DragonflightGameVersion();
			case GameVersionSlug.FOREVER:
				return new ForeverGameVersion();
			// case GameVersionSlug.WOTLK:
			// 	return new WotlkGameVersion();
			default:
				throw error(400, `Game version ${gameVersion} not supported`);
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
