import { error } from '@sveltejs/kit';
import type { GameVersion } from '#lib/versioning/GameVersion.ts';
import { GameVersionSlug } from '#lib/versioning/GameVersion.ts';
import type { IconProvider } from '#lib/versioning/IconProvider.ts';
import type { VersionedContext } from '#lib/versioning/VersionedContext.ts';
import { DragonflightIconProvider } from '#lib/versions/dragonflight/DragonflightIconProvider.ts';
import { MidnightIconProvider } from '#lib/versions/midnight/MidnightIconProvider.ts';
import { DragonflightGameVersion } from '#lib/versions/dragonflight/DragonflightGameVersion.ts';
import { MidnightGameVersion } from '#lib/versions/midnight/MidnightGameVersion.ts';
import { ForeverIconProvider } from '#lib/versions/forever/ForeverIconProvider.ts';
import { ForeverGameVersion } from '#lib/versions/forever/ForeverGameVersion.ts';

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
