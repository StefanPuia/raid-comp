import type { Build } from '$lib/service/api';
import { GameVersionSlug } from '$lib/versioning/GameVersion';
import { foreverPlayers, livePlayers } from './mock.data';

// only exported as a fallback, there should be no need to export the rest.
export const liveBuildWithVersion: Build = {
	gameVersion: GameVersionSlug.LIVE,
	buildId: 'liveBuild',
	name: 'Live build',
	players: livePlayers,
};

const liveBuildWithNoVersion: Build = <Build>{
	buildId: 'liveNoVerBuild',
	name: 'Live build without version',
	players: livePlayers,
};

const foreverBuild: Build = {
	gameVersion: GameVersionSlug.FOREVER,
	buildId: 'foreverBuild',
	name: 'WoW Forever build',
	players: foreverPlayers,
};

export const mockBuilds = [liveBuildWithVersion, liveBuildWithNoVersion, foreverBuild];
