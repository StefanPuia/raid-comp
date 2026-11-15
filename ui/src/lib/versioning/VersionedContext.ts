import type { GameVersion } from '#lib/versioning/GameVersion.ts';
import type { IconProvider } from '#lib/versioning/IconProvider.ts';

export type VersionedContext = {
	iconProvider: IconProvider;
	gameVersion: GameVersion;
};
