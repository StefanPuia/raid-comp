import type { InviteStatus } from '#lib/consts.ts';
import type { PlayerClass } from '#lib/versioning/PlayerClass.ts';
import type { PlayerSpec } from '#lib/versioning/PlayerSpecialisation.ts';
import type { GameVersionSlug } from '#lib/versioning/GameVersion.ts';
import type { ApiError } from '#lib/service/error.ts';
import type { Build as ApiBuild } from '#lib/service/api.ts';

export type BuildId = string;
export type GroupId = 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BuildPlayer = {
	id: string;
	name: string;
	realm?: string;
	class: PlayerClass;
	spec?: PlayerSpec;
	status: InviteStatus;
	group?: GroupId;
};

export type Build = {
	gameVersion: GameVersionSlug;
	buildId: BuildId;
	name: string;
	players: BuildPlayer[];
	meta: {
		total: number;
		tanks: number;
		healers: number;
		dps: number;
		rangedDps: number;
		meleeDps: number;
		unknown: number;
		description: string;
	};
};

export type BuildPageParams = {
	grouped?: boolean;
	build?: ApiBuild;
	error?: ApiError;
	gameVersion: GameVersionSlug;
};
