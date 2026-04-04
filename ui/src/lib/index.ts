// place files you want to import through the `$lib` alias in this folder.
import { dev } from '$app/environment';
import { PUBLIC_MOCKS_ENABLED } from '$env/static/public';
import type { Build as ApiBuild } from '$lib/service/api';
import type { Build } from '$lib/types';
import type { VersionedContext } from '$lib/versioning/VersionedContext';

export const isMockEnabled = () => dev && PUBLIC_MOCKS_ENABLED === 'true';

export const createBuildData = (build: ApiBuild, context: VersionedContext): Build => {
	const tempData = {
		...build,
		players: build.players.map((p) => context.gameVersion.createPlayer(p)),
		gameVersion: build.gameVersion,
	};

	const meta = {
		total: tempData.players.length,
		tanks: tempData.players.filter((p) => p.spec?.isTank()).length,
		healers: tempData.players.filter((p) => p.spec?.isHealer()).length,
		dps: tempData.players.filter((p) => p.spec?.isMeleeDPS() || p.spec?.isRangedDPS()).length,
		unknown: tempData.players.filter((p) => p.spec == undefined).length,
	};
	const metaDescription =
		`RaidComp: A raid composition tool for World of Warcraft\n${meta.total} players: ${meta.tanks} Tanks, ` +
		`${meta.healers} Healers, ${meta.dps} DPS` +
		(meta.unknown ? `, ${meta.unknown} Unknown` : '');

	return {
		...tempData,
		meta: {
			...meta,
			description: metaDescription,
		},
	};
};
